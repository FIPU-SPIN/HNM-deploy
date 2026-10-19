/* eslint-disable */
"use client";
import { API_URL } from "@/app/lib/api";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Quiz({
  steps,
  quizId = "kviz1",
  returnUrl = "/stosveznam",
  hideAccentSystem = false,
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lamp, setLamp] = useState(null);
  const [groups, setGroups] = useState({});
  const [finished, setFinished] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [userName, setUserName] = useState("");

  const [lockedQuestions, setLockedQuestions] = useState({});
  const [lockedRows, setLockedRows] = useState({});
  const [lockedMultiOptions, setLockedMultiOptions] = useState({});

  const typingTimer = useRef(null);
  const audioRefs = useRef({});

  const current = steps[step];

  const [correctCount, setCorrectCount] = useState(0);

  const playAudio = (id) => {
    const audioEl = audioRefs.current[id];
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play().catch(e => console.log("Greška pri puštanju:", e));
    }
  };

  const getHardcodedCorrect = (id) => {
    if (id === "q3") return [
      ["sova", "sjedi", "na grani"],
      ["gledaju", "ježa", "kraj puta"],
      ["idem", "onamo", "umjesto njega"],
      ["nije", "ispunio", "ni to"],
      ["ne putujem", "na more", "sutra"]
    ];
    if (id === "q4") return [
      ["molim te", "nemoj", "kasniti"],
      ["nisam vas", "još", "upoznao"],
      ["čitao sam im", "knjigu", "navečer"],
      ["spavao bih", "danas", "duže"],
      ["hoćeš li", "kolač", "i za njega"]
    ];
    if (id === "q5") return [
      ["pogledao me", "i nasmiješio se", "radosno"],
      ["rekao je", "da stiže", "danas"],
      ["reče", "da će doći", "rano"],
      ["pitam", "ali ne odgovara", "odmah"],
      ["ti", "i ja smo", "par"]
    ];
    if (id === "q9") return [
      ["kraj", "je"], ["u", "ih"], ["u", "smo"], ["za", "je"], ["sa", "će"], ["sa", "sam"]
    ];
    return null;
  };

  const perceptionIds = steps
    .filter((q) => {
      if (q.correct !== null && q.correct !== undefined && q.correct !== "") return true;
      if (["q3", "q4", "q5", "q9"].includes(q.id)) return true;
      return false;
    })
    .map((q) => q.id);

  const totalPerception = steps.reduce((acc, q) => {
    if (!perceptionIds.includes(q.id)) return acc;
    if (q.type === "segment-input") return acc + (q.sentences?.length || 0);
    if (q.type === "multi-select" && Array.isArray(q.correct)) return acc + q.correct.length;
    return acc + 1;
  }, 0);

  useEffect(() => {
    if (!current) return;
    if (current.type === "group-sort" && current.id && !groups[current.id]) {
      setGroups((prev) => ({
        ...prev,
        [current.id]: { a: [], b: [], c: [], pool: current.items || [] },
      }));
    }
  }, [current, groups]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setUserName(user.name);
  }, []);

  useEffect(() => {
    let count = 0;
    steps.forEach((q) => {
      if (!perceptionIds.includes(q.id)) return;
      
      if (q.type === "segment-input") {
        const ans = answers[q.id] || {};
        const hardcoded = getHardcodedCorrect(q.id);
        const correctParts = hardcoded || (q.sentences ? q.sentences.map(s => s.correct) : []);
        
        q.sentences?.forEach((s, si) => {
          const sentenceAns = ans[si] || {};
          const sentenceCorrect = correctParts[si] || s.correct || [];
          
          const allFilled = sentenceCorrect.every((_, pi) => (sentenceAns[pi] || "").trim().length > 0);
          const allMatch = sentenceCorrect.every((c, pi) => {
            const userVal = (sentenceAns[pi] || "").toLowerCase().trim();
            return c.toLowerCase().trim() === userVal;
          });

          if (allFilled && allMatch) count += 1;
        });
      } else if (q.type === "multi-select") {
        const ansArr = answers[q.id] || [];
        const correctArr = q.correct || [];
        ansArr.forEach(a => {
          if (correctArr.includes(a)) count += 1;
        });
      } else {
        if (answers[q.id] === q.correct) count += 1;
      }
    });
    setCorrectCount(count);
  }, [answers, steps, perceptionIds]);

  const handleSelect = (id, value) => {
    if (lockedQuestions[id]) return; 
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setLockedQuestions((prev) => ({ ...prev, [id]: true }));
  };

  const handleMultiSelect = (id, option) => {
    if (lockedMultiOptions[`${id}-${option}`]) return;
    setAnswers((prev) => {
      const prevArr = prev[id] || [];
      return {
        ...prev,
        [id]: prevArr.includes(option) ? prevArr.filter((x) => x !== option) : [...prevArr, option]
      };
    });
    setLockedMultiOptions((prev) => ({ ...prev, [`${id}-${option}`]: true }));
  };

  const handleSegmentInput = (id, sentenceIndex, partIndex, value) => {
    if (lockedRows[`${id}-${sentenceIndex}`] || lockedQuestions[id]) return;

    setAnswers((prev) => {
      const prevQ = prev[id] || {};
      const prevSentence = prevQ[sentenceIndex] || {};
      const nextQ = {
        ...prev,
        [id]: {
          ...prevQ,
          [sentenceIndex]: { ...prevSentence, [partIndex]: value },
        },
      };

      const question = steps.find(s => s.id === id);
      if (!question || !question.sentences) return nextQ;

      const sentence = question.sentences[sentenceIndex];
      const isLastSentence = sentenceIndex === question.sentences.length - 1;
      
      if (isLastSentence) {
        if (typingTimer.current) clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => {
          const sentenceAns = nextQ[id][sentenceIndex];
          const allFilled = Array.from({ length: sentence.parts }).every((_, i) => (sentenceAns[i] || "").trim().length > 0);
          if (allFilled) {
            setLockedRows(prevLocked => ({ ...prevLocked, [`${id}-${sentenceIndex}`]: true }));
          }
        }, 5000); 
      }

      return nextQ;
    });
  };

  const handleInputFocus = (id, sentenceIndex) => {
    setLockedRows((prev) => {
      const next = { ...prev };
      for (let i = 0; i < sentenceIndex; i++) {
        next[`${id}-${i}`] = true;
      }
      return next;
    });
  };

  const handleNext = () => {
    setLockedQuestions(prev => ({ ...prev, [current.id]: true }));
    
    if (current.type === "segment-input") {
      const allLocked = {};
      current.sentences?.forEach((_, si) => {
        allLocked[`${current.id}-${si}`] = true;
      });
      setLockedRows(prev => ({ ...prev, ...allLocked }));
    }

    setStep(step + 1);
  };

  const submitQuiz = async () => {
    setLockedQuestions(prev => ({ ...prev, [current.id]: true }));
    if (current.type === "segment-input") {
      const allLocked = {};
      current.sentences?.forEach((_, si) => {
        allLocked[`${current.id}-${si}`] = true;
      });
      setLockedRows(prev => ({ ...prev, ...allLocked }));
    }

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/api/quizRez`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quizId, answers }),
      });
      setTimeout(() => setFinished(true), 300);
    } catch (err) {
      console.error("Greška pri slanju kviza:", err);
    }
  };

  const requiresAnswer = () => {
    if (current.type === "select" && !answers[current.id]) return true;
    if (current.type === "multi-select" && (!answers[current.id] || answers[current.id].length === 0)) return true;
    if (current.type === "audio_select" && current.options && current.options.length > 0 && !answers[current.id]) return true;
    return false;
  };

  const hasCorrectAnswer = current.correct !== null && current.correct !== undefined && current.correct !== "";
  const isQLocked = lockedQuestions[current.id];

  if (finished) {
    const percentage = totalPerception > 0 ? Math.round((correctCount / totalPerception) * 100) : 0;
    return (
      <div className="quiz-page finished-screen">
        <div className="finished-card">
          <h1 className="finished-title">🎉 Čestitamo{userName ? `, ${userName}` : ""}!</h1>
          {hideAccentSystem && (
            <p className="finished-text highlight">Došli ste do kraja kviza. Postigli ste <strong>{correctCount}</strong> točnih odgovora.</p>
          )}
          {totalPerception > 0 && (
            <div className="finished-score">
              <div className="finished-score-circle">
                <span className="finished-score-number">{correctCount}</span>
                <span className="finished-score-total">/ {totalPerception}</span>
              </div>
              <p className="finished-score-label">Točno riješeno ({percentage}%)</p>
            </div>
          )}
          <Image src={`${API_URL}/audio/djevojcica_kviz.png`} alt="Čestitamo" width={220} height={220} className="finished-image" unoptimized />
          <button className="return-home-btn" onClick={() => (window.location.href = returnUrl)}>Povratak</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-content">
        <div className="quiz-top-bar">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          {totalPerception > 0 && (
            <div className="scoreboard">
              <span className="scoreboard-icon">🏆</span>
              <span className="scoreboard-value">{correctCount}<span className="scoreboard-total">/{totalPerception}</span></span>
            </div>
          )}
        </div>

        <div className="quiz-card">
          {/* POSEBNI DIZAJN ZA Q10 */}
          {current.id === "q10" ? (
            <div className="q10-container">
              <p className="question-text" dangerouslySetInnerHTML={{ __html: current.question }} />
              
              <div className="q10-grid">
                {[0, 2, 4, 6].map((pairIndex, i) => {
                  const pairA = current.voices[pairIndex];
                  const pairB = current.voices[pairIndex + 1];
                  
                  const optA = pairA.label.split(")")[0].trim(); 
                  const optB = pairB.label.split(")")[0].trim(); 
                  
                  const isASelected = answers[current.id]?.includes(optA);
                  const isBSelected = answers[current.id]?.includes(optB);

                  const isACorrect = Array.isArray(current.correct) && current.correct.some(c => c === optA || c === `${optA})`);
                  const isBCorrect = Array.isArray(current.correct) && current.correct.some(c => c === optB || c === `${optB})`);

                  const isALocked = lockedMultiOptions[`${current.id}-${optA}`] || isQLocked;
                  const isBLocked = lockedMultiOptions[`${current.id}-${optB}`] || isQLocked;

                  const isAWrong = isALocked && isASelected && !isACorrect;
                  const isBWrong = isBLocked && isBSelected && !isBCorrect;

                  return (
                    <div key={i} className="q10-row">
                      <div className="q10-label">Par {i + 1}:</div>
                      
                      <div className="q10-buttons">
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                          
                          <audio ref={el => audioRefs.current[`q10_a_${i}`] = el} src={`${API_URL}${pairA.audio}`} preload="auto" />
                          
                          <button 
                            className="q10-play-btn"
                            onClick={() => playAudio(`q10_a_${i}`)}
                          >
                            🔊 Poslušaj a
                          </button>
                          <div 
                            className={`q10-btn ${isASelected && !isALocked ? "active" : ""} ${isALocked && isACorrect && isASelected ? "correct" : ""} ${isAWrong ? "wrong" : ""}`}
                            onClick={() => handleMultiSelect(current.id, optA)}
                          >
                            <span className="q10-text">{pairA.label}</span>
                            {isALocked && isACorrect && isASelected && <span className="opt-mark">✓</span>}
                            {isAWrong && <span className="opt-mark">✗</span>}
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                          
                          <audio ref={el => audioRefs.current[`q10_b_${i}`] = el} src={`${API_URL}${pairB.audio}`} preload="auto" />

                          <button 
                            className="q10-play-btn"
                            onClick={() => playAudio(`q10_b_${i}`)}
                          >
                            🔊 Poslušaj b
                          </button>
                          <div 
                            className={`q10-btn ${isBSelected && !isBLocked ? "active" : ""} ${isBLocked && isBCorrect && isBSelected ? "correct" : ""} ${isBWrong ? "wrong" : ""}`}
                            onClick={() => handleMultiSelect(current.id, optB)}
                          >
                            <span className="q10-text">{pairB.label}</span>
                            {isBLocked && isBCorrect && isBSelected && <span className="opt-mark">✓</span>}
                            {isBWrong && <span className="opt-mark">✗</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* STANDARDNI DIZAJN ZA SVA OSTALA PITANJA */}
              {current.type === "intro" && (
                <>
                  <h1 className="glavni-naslov">{current.title}</h1>
                  {current.image && <Image src={current.image} width={600} height={500} alt="intro" className="quiz-image" style={{ display: "block", margin: "0 auto" }} unoptimized />}
                  {current.text && <p className="quiz-text" dangerouslySetInnerHTML={{ __html: current.text }} />}
                  {current.note && <div className="note-box" dangerouslySetInnerHTML={{ __html: current.note }} />}
                </>
              )}

              {(current.type === "audio" || current.type === "audio2") && (
                <>
                  <h2>{current.title}</h2>
                  <div className="audio-grid">
                    {current.voices.map((v, i) => (
                      <div key={i} className="audio-item">
                        <audio ref={el => audioRefs.current[`general_${i}`] = el} src={`${API_URL}${v.audio || v}`} preload="auto" />
                        <button className="play-audio-btn" onClick={() => playAudio(`general_${i}`)}>{v.label || v}</button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* POPRAVLJENI AUDIO_SELECT (Q12) - SADA PUŠTA 1-5-2.wav */}
              {current.type === "audio_select" && (
                <>
                  <p className="question-text" dangerouslySetInnerHTML={{ __html: current.question }} />
                  <div className="options-grid" style={{ flexDirection: "column" }}>
                    {current.voices.map((v, i) => {
                      const optVal = v.label.split(")")[0].trim() + ")";
                      const isSelected = answers[current.id] === optVal || answers[current.id] === v.label;
                      const isCorrectOpt = isQLocked && current.correct && (current.correct === optVal || current.correct === v.label);
                      const isWrongSelected = isQLocked && isSelected && !isCorrectOpt;

                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", marginBottom: "10px" }}>
                          
                          <audio ref={el => audioRefs.current[`q12_${i}`] = el} src={`${API_URL}/audio/1-5-2.wav`} preload="auto" />

                          <button 
                            onClick={() => playAudio(`q12_${i}`)}
                            style={{ background: "#e0f2f1", border: "2px solid #09949b", borderRadius: "50%", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", cursor: "pointer", flexShrink: 0 }}
                            title="Poslušaj"
                          >
                            🔊
                          </button>
                          
                          <div 
                            className={`q10-btn ${isSelected && !isQLocked ? "active" : ""} ${isCorrectOpt && isSelected ? "correct" : ""} ${isWrongSelected ? "wrong" : ""}`}
                            onClick={() => handleSelect(current.id, optVal)}
                            style={{ position: "relative", padding: "16px 20px", width: "100%", justifyContent: "flex-start" }}
                          >
                            <span className="q10-text">{v.label}</span>
                            {isCorrectOpt && isSelected && <span className="opt-mark" style={{ position: "absolute", right: "16px" }}>✓</span>}
                            {isWrongSelected && <span className="opt-mark" style={{ position: "absolute", right: "16px" }}>✗</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {current.type === "select" && (
                <>
                  {current.title && <h2>{current.title}</h2>}
                  <p className="question-text" dangerouslySetInnerHTML={{ __html: current.question }} />
                  {current.image && <Image src={current.image} width={600} height={400} alt="pitanje" className="quiz-image" style={{ display: "block", margin: "0 auto" }} unoptimized />}
                  <div className="options-grid">
                    {current.options.map((opt, i) => {
                      const selected = answers[current.id] === opt;
                      const correctOpt = isQLocked && hasCorrectAnswer && String(current.correct) === String(opt);
                      const wrongSelected = isQLocked && hasCorrectAnswer && selected && !correctOpt;
                      return (
                        <button key={i} className={`option-pill ${selected && !isQLocked ? "active" : ""} ${correctOpt ? "correct" : ""} ${wrongSelected ? "wrong" : ""}`} onClick={() => handleSelect(current.id, opt)} style={{ position: "relative" }}>
                          <span style={{ paddingRight: "24px" }}>{opt}</span>
                          {correctOpt && <span className="opt-mark" style={{ position: "absolute", right: "12px" }}>✓</span>}
                          {wrongSelected && <span className="opt-mark" style={{ position: "absolute", right: "12px" }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {current.type === "multi-select" && (
                <>
                  <p className="question-text" dangerouslySetInnerHTML={{ __html: current.question }} />
                  <div className="options-grid">
                    {current.options.map((opt, i) => {
                      const selected = answers[current.id]?.includes(opt);
                      const isCorrectOpt = Array.isArray(current.correct) && current.correct.includes(opt);
                      const isOptLocked = lockedMultiOptions[`${current.id}-${opt}`] || isQLocked;
                      const wrongSelected = isOptLocked && selected && !isCorrectOpt;

                      return (
                        <button 
                          key={i} 
                          className={`option-pill ${selected && !isOptLocked ? "active" : ""} ${isOptLocked && isCorrectOpt ? "correct" : ""} ${wrongSelected ? "wrong" : ""}`} 
                          onClick={() => handleMultiSelect(current.id, opt)}
                          style={{ position: "relative" }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: opt }} style={{ paddingRight: "24px" }} />
                          {isOptLocked && isCorrectOpt && <span className="opt-mark" style={{ position: "absolute", right: "12px" }}>✓</span>}
                          {wrongSelected && <span className="opt-mark" style={{ position: "absolute", right: "12px" }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {current.type === "segment-input" && (
                <>
                  <p className="question-text" dangerouslySetInnerHTML={{ __html: current.question }} />
                  {(current.sentences || []).map((s, si) => {
                    const hardcodedCorrect = getHardcodedCorrect(current.id);
                    const correctParts = hardcodedCorrect?.[si] || s.correct || [];
                    
                    const sentenceAns = answers[current.id]?.[si] || {};
                    const allMatch = correctParts.every((c, pi) => (sentenceAns[pi] || "").toLowerCase().trim() === c.toLowerCase().trim());
                    const isRowLocked = lockedRows[`${current.id}-${si}`] || isQLocked;
                    const isRowCorrect = allMatch && Object.keys(sentenceAns).length === s.parts;

                    return (
                      <div key={si} className="segment-row">
                        <p className="segment-prompt">{s.prompt}</p>
                        <div className="segment-inputs modern-segments">
                          {Array.from({ length: s.parts }).map((_, pi) => {
                            const val = sentenceAns[pi] || "";
                            const correctText = correctParts[pi] || null;
                            const isThisPartCorrect = correctText && correctText.toLowerCase().trim() === val.toLowerCase().trim();
                            
                            const inputClass = isRowLocked 
                              ? (isThisPartCorrect ? "correct" : "wrong") 
                              : (val ? "active" : "");

                            return (
                              <div key={pi} className="segment-input-wrapper">
                                {s.labels && s.labels[pi] && <label className="segment-label">{s.labels[pi]}</label>}
                                <input
                                  type="text"
                                  value={val}
                                  disabled={isRowLocked}
                                  onFocus={() => handleInputFocus(current.id, si)}
                                  onChange={(e) => handleSegmentInput(current.id, si, pi, e.target.value)}
                                  className={`segment-box ${inputClass}`}
                                  placeholder="..."
                                />
                              </div>
                            );
                          })}
                        </div>
                        
                        {isRowLocked && (
                          <div style={{ marginTop: "8px", fontWeight: "bold", fontSize: "0.9rem", color: isRowCorrect ? "#16a34a" : "#dc2626" }}>
                            {isRowCorrect ? "✓ Točno" : "✗ Netočno"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {current?.type === "group-sort" && current?.groups && groups[current.id] && (
                <>
                  <p className="question-text" dangerouslySetInnerHTML={{ __html: current.question }} />
                  {current.image && <Image src={current.image} width={600} height={400} alt="pitanje" className="quiz-image" style={{ display: "block", margin: "0 auto" }} unoptimized />}
                  <div className="group-container">
                    {["a", "b", "c"].map((groupKey) => (
                      <div key={groupKey} className="group-box clickable-box" onClick={() => {
                        if (!selectedWord || isQLocked) return;
                        setGroups((prev) => {
                          const updated = { ...prev[current.id] };
                          updated.pool = updated.pool.filter(x => x !== selectedWord);
                          updated[groupKey] = [...updated[groupKey], selectedWord];
                          return { ...prev, [current.id]: updated };
                        });
                        setSelectedWord(null);
                      }}>
                        <h4>{current.groups[groupKey]}</h4>
                        {groups[current.id][groupKey].map((item, i) => (
                          <button key={i} className="word-pill" onClick={(e) => {
                            e.stopPropagation();
                            if (isQLocked) return;
                            setGroups((prev) => {
                              const updated = { ...prev[current.id] };
                              updated[groupKey] = updated[groupKey].filter((x) => x !== item);
                              updated.pool = [...updated.pool, item];
                              return { ...prev, [current.id]: updated };
                            });
                          }}>
                            {item}
                          </button>
                        ))}
                      </div>
                    ))}
                    <div className="group-box">
                      <h4>Riječi</h4>
                      {groups[current.id].pool.map((item, i) => (
                        <button key={i} className={`word-pill ${selectedWord === item ? "selected" : ""}`} onClick={() => setSelectedWord(item)}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="nav-buttons">
            <button className="nav-btn nav-btn-back" disabled={step === 0} onClick={() => setStep(step - 1)}>← Povratak</button>
            {step < steps.length - 1 && <button className="nav-btn nav-btn-next" onClick={handleNext} disabled={requiresAnswer()}>Nastavak →</button>}
            {step === steps.length - 1 && <button className="nav-btn nav-btn-next" onClick={submitQuiz} disabled={requiresAnswer()}>Završi kviz ✓</button>}
          </div>
        </div>

        {lamp && (
          <div className="modal-overlay" onClick={() => setLamp(null)}>
            <div className="modal lamp-modal" onClick={(e) => e.stopPropagation()}>
              <div className="lamp-modal-icon">💡</div>
              <h3 className="lamp-modal-title">Objašnjenje</h3>
              <p dangerouslySetInnerHTML={{ __html: lamp }} />
              <button className="lamp-modal-close" onClick={() => setLamp(null)}>Razumijem</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}