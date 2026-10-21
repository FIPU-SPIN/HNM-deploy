/* eslint-disable */
"use client";
import { API_URL } from "@/app/lib/api";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* Gumb za slušanje - UVIJEK točno jedan emoji (ne ovisi o CSS klasi) */
function AudioButton({ onClick, children, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        padding: "12px 20px",
        borderRadius: "12px",
        border: "2px solid #09949b",
        background: "#e0f2f1",
        color: "#0f172a",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        ...style,
      }}
    >
      <span>🔊</span>
      <span>{children}</span>
    </button>
  );
}

// Kamo vodi gumb "Povratak" na kraju svakog kviza
const RETURN_URLS = {
  kviz1: "/stosveznam/GovornaRijec",
  kviz2: "/stosveznam/Inventar",
  kviz3: "/stosveznam/NaglasciUParadigmi",
  kviz4: "/stosveznam/Distribucijska",
  kviz5: "/stosveznam",
};

export default function Quiz({
  steps,
  quizId: quizIdProp = "kviz1",
  returnUrl = "/stosveznam",
  hideAccentSystem = false,
}) {
  // Stvarni kviz određujemo iz samih pitanja (ako stranica ne preda quizId, prop je zadano "kviz1")
  const quizId = steps?.[0]?.quizId || quizIdProp;
  const finalReturnUrl = RETURN_URLS[quizId] || returnUrl;
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

  // Kvizovi u kojima se ide dalje tek nakon točnog odgovora (samo kviz3 i kviz5)
  const isGated = ["kviz3", "kviz5"].includes(quizId);
  const [attempts, setAttempts] = useState({}); // prvi odabir po pitanju (za bodove)
  const [wrongTried, setWrongTried] = useState({}); // pogrešno probani odgovori

  const typingTimer = useRef(null);
  const audioRefs = useRef({});

  // Isto ponašanje kao prije: novi Audio, bez zaustavljanja prethodnog
  const playUrl = (path) => {
    new Audio(`${API_URL}${path}`).play().catch((e) => console.log(e));
  };

  // Originalno puštanje preko <audio> elementa (ostali kvizovi)
  const playAudio = (id) => {
    const audioEl = audioRefs.current[id];
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play().catch((e) => console.log("Greška pri puštanju:", e));
    }
  };

  // Novi izgled gumba za slušanje SAMO za kviz1; svi ostali kvizovi ostaju kakvi su bili
  const isK1 = quizId === "kviz1";
  const renderListen = (refKey, label, path) =>
    isK1 ? (
      <div key={refKey} style={{ width: "100%", maxWidth: "400px" }}>
        <AudioButton onClick={() => playUrl(path)}>{label}</AudioButton>
      </div>
    ) : (
      <div
        key={refKey}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          background: "#f9fbfc",
          padding: "12px 24px",
          borderRadius: "12px",
          border: "1px solid #e5e9ef",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <audio
          ref={(el) => (audioRefs.current[refKey] = el)}
          src={`${API_URL}${path}`}
          preload="auto"
        />
        <button
          onClick={() => playAudio(refKey)}
          className="play-audio-btn"
          style={{ flex: 1, display: "flex", justifyContent: "center" }}
        >
          🔊 {label}
        </button>
      </div>
    );

  /* ===== audio_with_input (kviz5 q4): upis riječi jedna po jedna ===== */
  const AUDIO_INPUT_FALLBACK = {
    q4: ["otvoriti", "zapuhao", "nasukao", "zanimala"],
  };
  const normText = (v) => (v || "").toLowerCase().trim();
  const inputCorrectText = (q, si) => {
    const c = q.sentences?.[si]?.correct ?? AUDIO_INPUT_FALLBACK[q.id]?.[si];
    return Array.isArray(c) ? c[0] : c;
  };
  const isInputRowCorrect = (q, si) => {
    const c = inputCorrectText(q, si);
    return !!c && normText(answers[q.id]?.[si]) === normText(c);
  };
  const allInputCorrect = (q) =>
    (q.sentences || []).every((_, si) => isInputRowCorrect(q, si));

  const handleAudioInput = (q, si, value) => {
    if (isInputRowCorrect(q, si)) return;
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { ...(prev[q.id] || {}), [si]: value },
    }));
    const c = inputCorrectText(q, si);
    const isLast = si === (q.sentences || []).length - 1;
    if (c && normText(value) === normText(c) && isLast && q.lamp) {
      setTimeout(() => setLamp(q.lamp), 350);
    }
  };

  /* ===== GRUPIRANJE PITANJA NA JEDNU STRANICU (kviz1, kviz5) ===== */
  const GROUP_DEFS =
    quizId === "kviz1"
      ? [
          {
            type: "matching",
            ids: ["q3a", "q3b", "q3c", "q3d"],
          },
          {
            // prvi item (q7) je zaglavlje sa zvukovima, ostali su pitanja s odabirom
            type: "listen-choose",
            ids: ["q7", "q7_1", "q7_2", "q7_3", "q7_4"],
          },
        ]
      : quizId === "kviz5"
      ? [{ type: "listen-choose", ids: ["q3_audio", "q3a", "q3b"] }]
      : [];

  const groupedSteps = [];

  steps.forEach((q) => {
    const def = GROUP_DEFS.find((d) => d.ids.includes(q.id));
    if (def) {
      let grp = groupedSteps.find((g) => g.isGroup && g.def === def);
      if (!grp) {
        grp = {
          isGroup: true,
          groupType: def.type,
          def,
          id: `group-${def.type}`,
          items: [],
        };
        groupedSteps.push(grp);
      }
      grp.items.push(q);
    } else {
      groupedSteps.push(q);
    }
  });

  const current = groupedSteps[step];

  const isQLocked = current ? lockedQuestions[current.id] || false : false;
  const hasCorrectAnswer =
    current &&
    current.correct !== null &&
    current.correct !== undefined &&
    current.correct !== "";
  const hasOptions = current && current.options && current.options.length > 0;

  const [correctCount, setCorrectCount] = useState(0);

  const getHardcodedCorrect = (id) => {
    if (id === "q3")
      return [
        ["sova", "sjedi", "na grani"],
        ["gledaju", "ježa", "kraj puta"],
        ["idem", "onamo", "umjesto njega"],
        ["nije", "ispunio", "ni to"],
        ["ne putujem", "na more", "sutra"],
      ];
    if (id === "q4")
      return [
        ["molim te", "nemoj", "kasniti"],
        ["nisam vas", "još", "upoznao"],
        ["čitao sam im", "knjigu", "navečer"],
        ["spavao bih", "danas", "duže"],
        ["hoćeš li", "kolač", "i za njega"],
      ];
    if (id === "q5")
      return [
        ["pogledao me", "i nasmiješio se", "radosno"],
        ["rekao je", "da stiže", "danas"],
        ["reče", "da će doći", "rano"],
        ["pitam", "ali ne odgovara", "odmah"],
        ["ti", "i ja smo", "par"],
      ];
    if (id === "q9")
      return [
        ["kraj", "je"],
        ["u", "ih"],
        ["u", "smo"],
        ["za", "je"],
        ["sa", "će"],
        ["sa", "sam"],
      ];
    return null;
  };

  const perceptionIds = steps
    .filter((q) => {
      if (q.correct !== null && q.correct !== undefined && q.correct !== "")
        return true;
      if (q.type === "audio_with_input") return true;
      if (["q3", "q4", "q5", "q9"].includes(q.id)) return true;
      return false;
    })
    .map((q) => q.id);

  const totalPerception = steps.reduce((acc, q) => {
    if (!perceptionIds.includes(q.id)) return acc;
    if (q.type === "segment-input") return acc + (q.sentences?.length || 0);
    if (q.type === "audio_with_input") return acc + (q.sentences?.length || 0);
    if ((q.type === "multi-select" || q.type === "audio_pairs") && Array.isArray(q.correct))
      return acc + q.correct.length;
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
        const correctParts =
          hardcoded || (q.sentences ? q.sentences.map((s) => s.correct) : []);

        q.sentences?.forEach((s, si) => {
          const sentenceAns = ans[si] || {};
          const sentenceCorrect = correctParts[si] || s.correct || [];

          const allFilled = sentenceCorrect.every(
            (_, pi) => (sentenceAns[pi] || "").trim().length > 0
          );
          const allMatch = sentenceCorrect.every((c, pi) => {
            const userVal = (sentenceAns[pi] || "").toLowerCase().trim();
            return c.toLowerCase().trim() === userVal;
          });

          if (allFilled && allMatch) count += 1;
        });
      } else if (q.type === "audio_with_input") {
        (q.sentences || []).forEach((_, si) => {
          if (isInputRowCorrect(q, si)) count += 1;
        });
      } else if (q.type === "multi-select" || q.type === "audio_pairs") {
        const ansArr = answers[q.id] || [];
        const correctArr = q.correct || [];
        let good = 0;
        let bad = 0;
        ansArr.forEach((a) => {
          if (correctArr.includes(a)) good += 1;
          else bad += 1;
        });
        // u kvizovima s "tek nakon točnog" pogrešni odabiri oduzimaju bodove
        count += isGated ? Math.max(0, good - bad) : good;
      } else {
        const given = isGated ? attempts[q.id] : answers[q.id];
        if (given === q.correct) count += 1;
      }
    });
    setCorrectCount(count);
  }, [answers, attempts, steps, perceptionIds]);

  const handleSelect = (id, value) => {
    if (lockedQuestions[id]) return;

    const question = steps.find((s) => s.id === id);

    // kviz3 / kviz5: pogrešan odgovor se ne zaključava, može se probati ponovno
    const qHasSingleCorrect =
      question &&
      question.correct !== null &&
      question.correct !== undefined &&
      question.correct !== "" &&
      !Array.isArray(question.correct);
    if (isGated && qHasSingleCorrect) {
      setAttempts((prev) => (prev[id] === undefined ? { ...prev, [id]: value } : prev));
      setAnswers((prev) => ({ ...prev, [id]: value }));
      if (String(value) === String(question.correct)) {
        setLockedQuestions((prev) => ({ ...prev, [id]: true }));
        if (question.lamp) setTimeout(() => setLamp(question.lamp), 350);
      } else {
        setWrongTried((prev) => ({ ...prev, [id]: [...(prev[id] || []), value] }));
      }
      return;
    }

    setAnswers((prev) => ({ ...prev, [id]: value }));
    setLockedQuestions((prev) => ({ ...prev, [id]: true }));

    if (question?.lamp) {
      setTimeout(() => setLamp(question.lamp), 350);
    }
  };

  const handleMultiSelect = (id, option) => {
    if (lockedMultiOptions[`${id}-${option}`]) return;
    setAnswers((prev) => {
      const prevArr = prev[id] || [];
      return {
        ...prev,
        [id]: prevArr.includes(option)
          ? prevArr.filter((x) => x !== option)
          : [...prevArr, option],
      };
    });
    setLockedMultiOptions((prev) => ({ ...prev, [`${id}-${option}`]: true }));

    // kviz3 / kviz5: kad su odabrani svi točni, prikaži objašnjenje
    if (isGated) {
      const q = steps.find((x) => x.id === id);
      const nextArr = [...(answers[id] || []), option];
      if (
        q &&
        Array.isArray(q.correct) &&
        q.correct.every((c) => nextArr.includes(c)) &&
        q.lamp
      ) {
        setTimeout(() => setLamp(q.lamp), 350);
      }
    }
  };

  // Odabir primjera u paru (tip "audio_pairs"): jedan odabir po paru, odmah se zaključava
  const handlePairSelect = (q, pairIdx, audioPath) => {
    const key = `${q.id}-pair${pairIdx}`;
    if (lockedMultiOptions[key] || lockedQuestions[q.id]) return;
    setLockedMultiOptions((prev) => ({ ...prev, [key]: true }));
    setAnswers((prev) => ({
      ...prev,
      [q.id]: [...(prev[q.id] || []), audioPath],
    }));
    const totalPairs = Math.floor((q.voices || []).length / 2);
    const answered = (answers[q.id] || []).length + 1;
    if (answered >= totalPairs && q.lamp) {
      setTimeout(() => setLamp(q.lamp), 350);
    }
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

      const question = steps.find((s) => s.id === id);
      if (!question || !question.sentences) return nextQ;

      const sentence = question.sentences[sentenceIndex];
      const isLastSentence = sentenceIndex === question.sentences.length - 1;

      if (isLastSentence) {
        if (typingTimer.current) clearTimeout(typingTimer.current);
        typingTimer.current = setTimeout(() => {
          const sentenceAns = nextQ[id][sentenceIndex];
          const allFilled = Array.from({ length: sentence.parts }).every(
            (_, i) => (sentenceAns[i] || "").trim().length > 0
          );
          if (allFilled) {
            setLockedRows((prevLocked) => ({
              ...prevLocked,
              [`${id}-${sentenceIndex}`]: true,
            }));
            if (question.lamp) setLamp(question.lamp);
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

  const lockCurrent = () => {
    if (current.isGroup) {
      current.items.forEach((q) => {
        setLockedQuestions((prev) => ({ ...prev, [q.id]: true }));
      });
    } else {
      setLockedQuestions((prev) => ({ ...prev, [current.id]: true }));
    }

    if (current.type === "segment-input") {
      const allLocked = {};
      current.sentences?.forEach((_, si) => {
        allLocked[`${current.id}-${si}`] = true;
      });
      setLockedRows((prev) => ({ ...prev, ...allLocked }));
    }
  };

  const handleNext = () => {
    setLamp(null);
    lockCurrent();
    setStep(step + 1);
  };

  const submitQuiz = async () => {
    setLamp(null);
    lockCurrent();

    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/api/quizRez`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quizId: quizIdProp, answers }),
      });
      setTimeout(() => setFinished(true), 300);
    } catch (err) {
      console.error("Greška pri slanju kviza:", err);
    }
  };

  const requiresAnswer = () => {
    if (isGated) {
      if (current.isGroup) {
        return current.items.some((q) => {
          if (!q.options || q.options.length === 0) return false;
          const hasC = q.correct !== null && q.correct !== undefined && q.correct !== "";
          return hasC ? !lockedQuestions[q.id] : !answers[q.id];
        });
      }
      if (current.type === "audio_with_input") return !allInputCorrect(current);
      if (
        (current.type === "select" || current.type === "audio_choice") &&
        hasCorrectAnswer
      )
        return !lockedQuestions[current.id];
      if (current.type === "multi-select" && Array.isArray(current.correct)) {
        const picked = answers[current.id] || [];
        return !current.correct.every((c) => picked.includes(c));
      }
    }
    if (current.isGroup) {
      // zaglavlja bez opcija (npr. q7 sa zvukovima) ne traže odgovor
      return current.items.some(
        (q) => q.options && q.options.length > 0 && !answers[q.id]
      );
    }
    if (
      (current.type === "select" || current.type === "audio_choice") &&
      !answers[current.id]
    )
      return true;
    if (
      current.type === "multi-select" &&
      (!answers[current.id] || answers[current.id].length === 0)
    )
      return true;
    if (
      current.type === "audio_pairs" &&
      (answers[current.id] || []).length < Math.floor((current.voices || []).length / 2)
    )
      return true;
    if (current.type === "audio_select" && hasCorrectAnswer && !answers[current.id])
      return true;
    return false;
  };

  /* Padajući izbornik za grupirana pitanja (regije, izgovori) */
  const renderGroupSelect = (q, placeholder = "-- Odaberi --") => {
    const isLocked = lockedQuestions[q.id];
    const hasCorrect = q.correct !== null && q.correct !== undefined && q.correct !== "";
    const isCorrect = hasCorrect && answers[q.id] === q.correct;
    const isWrongNow =
      isGated && !isLocked && hasCorrect && !!answers[q.id] && answers[q.id] !== q.correct;

    let border = "2px solid #e0e7ef";
    let bg = "#ffffff";
    let color = "#1f2937";
    if (isWrongNow) {
      border = "2px solid #dc2626";
      bg = "#fef2f2";
      color = "#b91c1c";
    } else if (isLocked) {
      if (!hasCorrect) {
        border = "2px solid #09949b";
        bg = "#e0f2f1";
      } else if (isCorrect) {
        border = "2px solid #16a34a";
        bg = "#f0fdf4";
        color = "#15803d";
      } else {
        border = "2px solid #dc2626";
        bg = "#fef2f2";
        color = "#b91c1c";
      }
    }

    return (
      <select
        value={answers[q.id] || ""}
        onChange={(e) => handleSelect(q.id, e.target.value)}
        disabled={isLocked}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border,
          backgroundColor: bg,
          color,
          fontWeight: "600",
          outline: "none",
        }}
      >
        <option value="">{placeholder}</option>
        {q.options.map((opt, j) => (
          <option key={j} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  };

  const renderGroupMark = (q) => {
    const isLocked = lockedQuestions[q.id];
    const hasCorrect = q.correct !== null && q.correct !== undefined && q.correct !== "";
    if (
      isGated &&
      !isLocked &&
      hasCorrect &&
      answers[q.id] &&
      answers[q.id] !== q.correct
    )
      return <span style={{ color: "#dc2626", fontSize: "1.2rem" }}>✗</span>;
    if (!isLocked || !hasCorrect) return null;
    return answers[q.id] === q.correct ? (
      <span style={{ color: "#16a34a", fontSize: "1.2rem" }}>✓</span>
    ) : (
      <span style={{ color: "#dc2626", fontSize: "1.2rem" }}>✗</span>
    );
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#f9fbfc",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e5e9ef",
  };

  if (finished) {
    const percentage =
      totalPerception > 0 ? Math.round((correctCount / totalPerception) * 100) : 0;
    return (
      <div className="quiz-page finished-screen">
        <div className="finished-card">
          <h1 className="finished-title">
            🎉 Čestitamo{userName ? `, ${userName}` : ""}!
          </h1>
          {(hideAccentSystem || isGated) && (
            <p className="finished-text highlight">
              {isGated ? (
                <>
                  Došli ste do kraja kviza. Točno ste riješili{" "}
                  <strong>{correctCount}</strong> od <strong>{totalPerception}</strong>{" "}
                  zadataka.
                </>
              ) : (
                <>
                  Došli ste do kraja kviza. Postigli ste <strong>{correctCount}</strong>{" "}
                  točnih odgovora.
                </>
              )}
            </p>
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
          <Image
            src={`${API_URL}/audio/djevojcica_kviz.png`}
            alt="Čestitamo"
            width={220}
            height={220}
            className="finished-image"
            style={{ transform: "translateX(-24px)" }}
            unoptimized
          />
          <button
            className="return-home-btn"
            onClick={() => (window.location.href = finalReturnUrl)}
          >
            Povratak
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-content">
        <div className="quiz-top-bar">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((step + 1) / groupedSteps.length) * 100}%` }}
            />
          </div>
          {totalPerception > 0 && (
            <div className="scoreboard">
              <span className="scoreboard-icon">🏆</span>
              <span className="scoreboard-value">
                {correctCount}
                <span className="scoreboard-total">/{totalPerception}</span>
              </span>
            </div>
          )}
        </div>

        <div className="quiz-card">
          {/* ================= GRUPA: REGIJE (q3a-q3d) ================= */}
          {current.isGroup && current.groupType === "matching" && (
            <div className="matching-container">
              <p
                className="question-text"
                style={{ marginBottom: "20px", fontSize: "1.1rem", fontWeight: "bold" }}
              >
                Poslušajte rečenice Ponovo je zasjalo sunce. Nakon kiše pojavi se
                duga. Iz koje regije dolazi svaki govornik?
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {current.items.map((q) => (
                  <div key={q.id} style={rowStyle}>
                    <div style={{ flex: 1, minWidth: "150px" }}>
                      <AudioButton onClick={() => playUrl(q.voices[0].audio)}>
                        {q.voices[0].label}
                      </AudioButton>
                    </div>

                    <div style={{ flex: 2 }}>{renderGroupSelect(q, "-- Odaberi regiju --")}</div>

                    <div style={{ width: "30px", textAlign: "center" }}>
                      {renderGroupMark(q)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= GRUPA: TRI IZGOVORA (q7, q7_1 - q7_4) ================= */}
          {current.isGroup && current.groupType === "listen-choose" && (
            <div className="matching-container">
              <p
                className="question-text"
                style={{ marginBottom: "20px", fontSize: "1.1rem", fontWeight: "bold" }}
                dangerouslySetInnerHTML={{ __html: current.items[0].question }}
              />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {(current.items[0].voices || []).map((v, i) => (
                  <div key={i} style={{ flex: 1, minWidth: "140px" }}>
                    <AudioButton onClick={() => playUrl(v.audio)}>{v.label}</AudioButton>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {current.items.slice(1).map((q) => (
                  <div
                    key={q.id}
                    style={{ ...rowStyle, flexWrap: "wrap" }}
                  >
                    <div
                      style={{ flex: 2, minWidth: "220px", fontWeight: 600 }}
                      dangerouslySetInnerHTML={{ __html: q.question }}
                    />
                    <div style={{ flex: 1, minWidth: "160px" }}>
                      {renderGroupSelect(q)}
                    </div>
                    <div style={{ width: "30px", textAlign: "center" }}>
                      {renderGroupMark(q)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= OSTALA PITANJA ================= */}
          {!current.isGroup && (
            <>
              {current.type === "intro" && (
                <>
                  <h1 className="glavni-naslov">{current.title}</h1>
                  {current.image && (
                    <Image
                      src={current.image}
                      width={600}
                      height={500}
                      alt="intro"
                      className="quiz-image"
                      style={{ display: "block", margin: "0 auto" }}
                      unoptimized
                    />
                  )}
                  {current.text && (
                    <p
                      className="quiz-text"
                      dangerouslySetInnerHTML={{ __html: current.text }}
                    />
                  )}
                  {current.note && (
                    <div
                      className="note-box"
                      dangerouslySetInnerHTML={{ __html: current.note }}
                    />
                  )}
                </>
              )}

              {(current.type === "audio" || current.type === "audio2") && (
                <>
                  <h2 style={{ textAlign: "center" }}>{current.title}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                      marginTop: "20px",
                    }}
                  >
                    {current.voices.map((v, i) =>
                      renderListen(
                        `general_${i}`,
                        v.label || `Primjer ${i + 1}`,
                        v.audio || v
                      )
                    )}
                  </div>
                </>
              )}

              {current.type === "audio_select" && (
                <>
                  <p
                    className="question-text"
                    dangerouslySetInnerHTML={{ __html: current.question }}
                  />

                  {!hasCorrectAnswer && !hasOptions ? (
                    /* Samo slušanje - po jedan emoji u svakom gumbu */
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        marginTop: "20px",
                      }}
                    >
                      {current.voices.map((v, i) =>
                        renderListen(`q_${i}`, v.label, v.audio)
                      )}
                    </div>
                  ) : (
                    /* Stari način: odabir klikom na samu kartu govornika */
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        marginTop: "20px",
                      }}
                    >
                      {current.voices.map((v, i) => {
                        const optVal = v.label;
                        const isSelected = answers[current.id] === optVal;
                        const isCorrectOpt = isQLocked && current.correct === optVal;
                        const isWrongSelected = isQLocked && isSelected && !isCorrectOpt;

                        return (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "16px",
                              background:
                                isSelected && !isQLocked
                                  ? "#e0f2f1"
                                  : isCorrectOpt && isSelected
                                  ? "#f0fdf4"
                                  : isWrongSelected
                                  ? "#fef2f2"
                                  : "#f9fbfc",
                              padding: "16px 20px",
                              borderRadius: "12px",
                              border:
                                isSelected && !isQLocked
                                  ? "2px solid #09949b"
                                  : isCorrectOpt && isSelected
                                  ? "2px solid #16a34a"
                                  : isWrongSelected
                                  ? "2px solid #dc2626"
                                  : "1px solid #e5e9ef",
                              cursor: isQLocked ? "default" : "pointer",
                              position: "relative",
                              width: "100%",
                              maxWidth: "400px",
                            }}
                            onClick={() => {
                              if (isQLocked) return;
                              playUrl(v.audio);
                              handleSelect(current.id, optVal);
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playUrl(v.audio);
                              }}
                              style={{
                                background: "#e0f2f1",
                                border: "2px solid #09949b",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem",
                                cursor: "pointer",
                                flexShrink: 0,
                              }}
                              title="Poslušaj"
                            >
                              🔊
                            </button>

                            <span
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {v.label}
                            </span>

                            {isCorrectOpt && isSelected && (
                              <span
                                style={{
                                  color: "#16a34a",
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  right: "16px",
                                }}
                              >
                                ✓
                              </span>
                            )}
                            {isWrongSelected && (
                              <span
                                style={{
                                  color: "#dc2626",
                                  fontSize: "1.2rem",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  right: "16px",
                                }}
                              >
                                ✗
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* SELECT i AUDIO_CHOICE (zvuk odvojen od odabira) */}
              {(current.type === "select" || current.type === "audio_choice") && (
                <>
                  {current.title && <h2>{current.title}</h2>}
                  <p
                    className="question-text"
                    dangerouslySetInnerHTML={{ __html: current.question }}
                  />

                  {current.type === "audio_choice" && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        margin: "20px 0",
                      }}
                    >
                      {(current.voices || []).map((v, i) => (
                        <div key={i} style={{ flex: 1, minWidth: "160px" }}>
                          <AudioButton onClick={() => playUrl(v.audio)}>
                            {v.label}
                          </AudioButton>
                        </div>
                      ))}
                    </div>
                  )}

                  {current.image && (
                    <Image
                      src={current.image}
                      width={600}
                      height={400}
                      alt="pitanje"
                      className="quiz-image"
                      style={{ display: "block", margin: "0 auto" }}
                      unoptimized
                    />
                  )}
                  <div className="options-grid">
                    {current.options.map((opt, i) => {
                      const selected = answers[current.id] === opt;
                      const correctOpt =
                        isQLocked && hasCorrectAnswer && String(current.correct) === String(opt);
                      const wrongSelected = isGated
                        ? hasCorrectAnswer && (wrongTried[current.id] || []).includes(opt)
                        : isQLocked && hasCorrectAnswer && selected && !correctOpt;
                      return (
                        <button
                          key={i}
                          className={`option-pill ${selected && !isQLocked && !wrongSelected ? "active" : ""} ${
                            correctOpt ? "correct" : ""
                          } ${wrongSelected ? "wrong" : ""}`}
                          onClick={() => handleSelect(current.id, opt)}
                          style={{ position: "relative" }}
                        >
                          <span style={{ paddingRight: "24px" }}>{opt}</span>
                          {correctOpt && (
                            <span
                              className="opt-mark"
                              style={{ position: "absolute", right: "12px" }}
                            >
                              ✓
                            </span>
                          )}
                          {wrongSelected && (
                            <span
                              className="opt-mark"
                              style={{ position: "absolute", right: "12px" }}
                            >
                              ✗
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* POSEBNI DIZAJN ZA MULTI-SELECT SA ZVUKOM (TABLICA) */}
              {current.type === "multi-select" &&
                current.voices &&
                current.voices.length > 0 && (
                  <>
                    <p
                      className="question-text"
                      dangerouslySetInnerHTML={{ __html: current.question }}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        marginTop: "20px",
                      }}
                    >
                      {[0, 2, 4, 6].map((pairIndex) => {
                        const pairA = current.voices[pairIndex];
                        const pairB = current.voices[pairIndex + 1];
                        if (!pairA || !pairB) return null;

                        const renderCell = (pair) => {
                          const opt = pair.label;
                          const isSel = answers[current.id]?.includes(opt);
                          const isCor =
                            Array.isArray(current.correct) && current.correct.includes(opt);
                          const isLk =
                            lockedMultiOptions[`${current.id}-${opt}`] || isQLocked;

                          return (
                            <div
                              onClick={() => {
                                if (isLk) return;
                                playUrl(pair.audio);
                                handleMultiSelect(current.id, opt);
                              }}
                              style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                background:
                                  isSel && !isLk
                                    ? "#e0f2f1"
                                    : isLk && isCor && isSel
                                    ? "#f0fdf4"
                                    : isLk && isSel && !isCor
                                    ? "#fef2f2"
                                    : "#f9fbfc",
                                padding: "16px",
                                borderRadius: "12px",
                                border:
                                  isSel && !isLk
                                    ? "2px solid #09949b"
                                    : isLk && isCor && isSel
                                    ? "2px solid #16a34a"
                                    : isLk && isSel && !isCor
                                    ? "2px solid #dc2626"
                                    : "1px solid #e5e9ef",
                                cursor: isLk ? "default" : "pointer",
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playUrl(pair.audio);
                                }}
                                style={{
                                  background: "#ffffff",
                                  border: "2px solid #09949b",
                                  borderRadius: "50%",
                                  width: "40px",
                                  height: "40px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "1.2rem",
                                  cursor: "pointer",
                                  flexShrink: 0,
                                }}
                              >
                                🔊
                              </button>
                              <span style={{ fontWeight: "bold", fontSize: "1.1rem", flex: 1 }}>
                                {pair.label}
                              </span>
                              {isLk && isCor && isSel && (
                                <span style={{ color: "#16a34a", fontSize: "1.2rem" }}>✓</span>
                              )}
                              {isLk && isSel && !isCor && (
                                <span style={{ color: "#dc2626", fontSize: "1.2rem" }}>✗</span>
                              )}
                            </div>
                          );
                        };

                        return (
                          <div
                            key={pairIndex}
                            style={{ display: "flex", gap: "16px", width: "100%" }}
                          >
                            {renderCell(pairA)}
                            {renderCell(pairB)}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

              {/* AUDIO + UPIS RIJEČI (kviz5 q4): sljedeće polje otvara se tek nakon točnog */}
              {current.type === "audio_with_input" && (
                <>
                  <p
                    className="question-text"
                    dangerouslySetInnerHTML={{ __html: current.question }}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "20px 0" }}>
                    {(current.voices || []).map((v, i) => (
                      <div key={i} style={{ flex: 1, minWidth: "200px", maxWidth: "400px" }}>
                        <AudioButton onClick={() => playUrl(v.audio)}>{v.label}</AudioButton>
                      </div>
                    ))}
                  </div>
                  {(current.sentences || []).map((s, si) => {
                    const rowCorrect = isInputRowCorrect(current, si);
                    const enabled =
                      si === 0 ||
                      Array.from({ length: si }).every((_, k) => isInputRowCorrect(current, k));
                    const val = answers[current.id]?.[si] || "";
                    return (
                      <div key={si} className="segment-row" style={{ opacity: enabled ? 1 : 0.5 }}>
                        <p className="segment-prompt">{s.prompt}</p>
                        <div className="segment-inputs modern-segments">
                          <div className="segment-input-wrapper">
                            <input
                              type="text"
                              value={val}
                              disabled={!enabled || rowCorrect}
                              onChange={(e) => handleAudioInput(current, si, e.target.value)}
                              className={`segment-box ${rowCorrect ? "correct" : val ? "active" : ""}`}
                              placeholder="..."
                            />
                          </div>
                        </div>
                        {rowCorrect && (
                          <div
                            style={{
                              marginTop: "8px",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              color: "#16a34a",
                            }}
                          >
                            ✓ Točno
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {/* AUDIO PARES: gumbi za slušanje odvojeni od odabira */}
              {current.type === "audio_pairs" && (
                <>
                  <p
                    className="question-text"
                    dangerouslySetInnerHTML={{ __html: current.question }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      marginTop: "20px",
                    }}
                  >
                    {Array.from({ length: Math.floor((current.voices || []).length / 2) }).map(
                      (_, p) => {
                        const pair = [current.voices[2 * p], current.voices[2 * p + 1]];
                        const key = `${current.id}-pair${p}`;
                        const locked = lockedMultiOptions[key] || isQLocked;
                        const chosen = (answers[current.id] || []).find(
                          (a) => a === pair[0].audio || a === pair[1].audio
                        );
                        const correctArr = Array.isArray(current.correct) ? current.correct : [];

                        return (
                          <div
                            key={p}
                            style={{
                              background: "#f9fbfc",
                              border: "1px solid #e5e9ef",
                              borderRadius: "12px",
                              padding: "16px",
                            }}
                          >
                            <div
                              style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "12px" }}
                            >
                              {pair[0].label}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginBottom: "12px",
                              }}
                            >
                              {pair.map((v, i) => (
                                <div key={i} style={{ flex: 1, minWidth: "140px" }}>
                                  <AudioButton onClick={() => playUrl(v.audio)}>
                                    Primjer {i + 1}
                                  </AudioButton>
                                </div>
                              ))}
                            </div>

                            <div style={{ fontSize: "0.9rem", marginBottom: "8px" }}>
                              Naglasak je pomaknut u:
                            </div>
                            <div className="options-grid">
                              {pair.map((v, i) => {
                                const selected = chosen === v.audio;
                                const isCor = correctArr.includes(v.audio);
                                const showCorrect = locked && isCor;
                                const showWrong = locked && selected && !isCor;
                                return (
                                  <button
                                    key={i}
                                    className={`option-pill ${selected && !locked ? "active" : ""} ${
                                      showCorrect ? "correct" : ""
                                    } ${showWrong ? "wrong" : ""}`}
                                    onClick={() => handlePairSelect(current, p, v.audio)}
                                    style={{ position: "relative" }}
                                  >
                                    <span style={{ paddingRight: "24px" }}>Primjer {i + 1}</span>
                                    {showCorrect && (
                                      <span
                                        className="opt-mark"
                                        style={{ position: "absolute", right: "12px" }}
                                      >
                                        ✓
                                      </span>
                                    )}
                                    {showWrong && (
                                      <span
                                        className="opt-mark"
                                        style={{ position: "absolute", right: "12px" }}
                                      >
                                        ✗
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              )}

              {/* STANDARDNI MULTI-SELECT (BEZ ZVUKA) */}
              {current.type === "multi-select" &&
                (!current.voices || current.voices.length === 0) && (
                  <>
                    <p
                      className="question-text"
                      dangerouslySetInnerHTML={{ __html: current.question }}
                    />
                    <div
                      className="options-grid"
                      style={
                        quizId === "kviz3" && current.id === "q4"
                          ? {
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: "10px",
                            }
                          : undefined
                      }
                    >
                      {current.options.map((opt, i) => {
                        const selected = answers[current.id]?.includes(opt);
                        const isCorrectOpt =
                          Array.isArray(current.correct) && current.correct.includes(opt);
                        const isOptLocked =
                          lockedMultiOptions[`${current.id}-${opt}`] || isQLocked;
                        const wrongSelected = isOptLocked && selected && !isCorrectOpt;

                        return (
                          <button
                            key={i}
                            className={`option-pill ${selected && !isOptLocked ? "active" : ""} ${
                              isOptLocked && isCorrectOpt ? "correct" : ""
                            } ${wrongSelected ? "wrong" : ""}`}
                            onClick={() => handleMultiSelect(current.id, opt)}
                            style={{ position: "relative" }}
                          >
                            <span
                              dangerouslySetInnerHTML={{ __html: opt }}
                              style={{ paddingRight: "24px" }}
                            />
                            {isOptLocked && isCorrectOpt && (
                              <span
                                className="opt-mark"
                                style={{ position: "absolute", right: "12px" }}
                              >
                                ✓
                              </span>
                            )}
                            {wrongSelected && (
                              <span
                                className="opt-mark"
                                style={{ position: "absolute", right: "12px" }}
                              >
                                ✗
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

              {current.type === "segment-input" && (
                <>
                  <p
                    className="question-text"
                    dangerouslySetInnerHTML={{ __html: current.question }}
                  />
                  {(current.sentences || []).map((s, si) => {
                    const hardcodedCorrect = getHardcodedCorrect(current.id);
                    const correctParts = hardcodedCorrect?.[si] || s.correct || [];

                    const sentenceAns = answers[current.id]?.[si] || {};
                    const allMatch = correctParts.every(
                      (c, pi) =>
                        (sentenceAns[pi] || "").toLowerCase().trim() === c.toLowerCase().trim()
                    );
                    const isRowLocked = lockedRows[`${current.id}-${si}`] || isQLocked;
                    const isRowCorrect =
                      allMatch && Object.keys(sentenceAns).length === s.parts;

                    return (
                      <div key={si} className="segment-row">
                        <p className="segment-prompt">{s.prompt}</p>
                        <div className="segment-inputs modern-segments">
                          {Array.from({ length: s.parts }).map((_, pi) => {
                            const val = sentenceAns[pi] || "";
                            const correctText = correctParts[pi] || null;
                            const isThisPartCorrect =
                              correctText &&
                              correctText.toLowerCase().trim() === val.toLowerCase().trim();

                            const inputClass = isRowLocked
                              ? isThisPartCorrect
                                ? "correct"
                                : "wrong"
                              : val
                              ? "active"
                              : "";

                            return (
                              <div key={pi} className="segment-input-wrapper">
                                {s.labels && s.labels[pi] && (
                                  <label className="segment-label">{s.labels[pi]}</label>
                                )}
                                <input
                                  type="text"
                                  value={val}
                                  disabled={isRowLocked}
                                  onFocus={() => handleInputFocus(current.id, si)}
                                  onChange={(e) =>
                                    handleSegmentInput(current.id, si, pi, e.target.value)
                                  }
                                  className={`segment-box ${inputClass}`}
                                  placeholder="..."
                                />
                              </div>
                            );
                          })}
                        </div>

                        {isRowLocked && (
                          <div
                            style={{
                              marginTop: "8px",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              color: isRowCorrect ? "#16a34a" : "#dc2626",
                            }}
                          >
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
                  <p
                    className="question-text"
                    dangerouslySetInnerHTML={{ __html: current.question }}
                  />
                  {current.image && (
                    <Image
                      src={current.image}
                      width={600}
                      height={400}
                      alt="pitanje"
                      className="quiz-image"
                      style={{ display: "block", margin: "0 auto" }}
                      unoptimized
                    />
                  )}
                  <div className="group-container">
                    {["a", "b", "c"].map((groupKey) => (
                      <div
                        key={groupKey}
                        className="group-box clickable-box"
                        onClick={() => {
                          if (!selectedWord || isQLocked) return;
                          setGroups((prev) => {
                            const updated = { ...prev[current.id] };
                            updated.pool = updated.pool.filter((x) => x !== selectedWord);
                            updated[groupKey] = [...updated[groupKey], selectedWord];
                            return { ...prev, [current.id]: updated };
                          });
                          setSelectedWord(null);
                        }}
                      >
                        <h4>{current.groups[groupKey]}</h4>
                        {groups[current.id][groupKey].map((item, i) => (
                          <button
                            key={i}
                            className="word-pill"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isQLocked) return;
                              setGroups((prev) => {
                                const updated = { ...prev[current.id] };
                                updated[groupKey] = updated[groupKey].filter((x) => x !== item);
                                updated.pool = [...updated.pool, item];
                                return { ...prev, [current.id]: updated };
                              });
                            }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ))}
                    <div className="group-box">
                      <h4>Riječi</h4>
                      {groups[current.id].pool.map((item, i) => (
                        <button
                          key={i}
                          className={`word-pill ${selectedWord === item ? "selected" : ""}`}
                          onClick={() => setSelectedWord(item)}
                        >
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
            <button
              className="nav-btn nav-btn-back"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              ← Povratak
            </button>
            {step < groupedSteps.length - 1 && (
              <button
                className="nav-btn nav-btn-next"
                onClick={handleNext}
                disabled={requiresAnswer()}
              >
                Nastavak →
              </button>
            )}
            {step === groupedSteps.length - 1 && (
              <button
                className="nav-btn nav-btn-next"
                onClick={submitQuiz}
                disabled={requiresAnswer()}
              >
                Završi kviz ✓
              </button>
            )}
          </div>
        </div>

        {lamp && (
          <div className="modal-overlay" onClick={() => setLamp(null)}>
            <div className="modal lamp-modal" onClick={(e) => e.stopPropagation()}>
              <div className="lamp-modal-icon">💡</div>
              <h3 className="lamp-modal-title">Objašnjenje</h3>
              <p dangerouslySetInnerHTML={{ __html: lamp }} />
              <button className="lamp-modal-close" onClick={() => setLamp(null)}>
                Razumijem
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}