/* eslint-disable */
"use client";
import { API_URL } from "@/app/lib/api";

import { useState, useEffect } from "react";
import Image from "next/image";

// Pitanja koja se boduju kao "tačno/netočno"
const PERCEPTION_IDS = [
  "q3a",
  "q3b",
  "q3c",
  "q3d",
  "q6_1",
  "q7_1",
  "q7_2",
  "q7_3",
];

export default function Quiz({ steps }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lamp, setLamp] = useState(null);
  const [groups, setGroups] = useState({});
  const [finished, setFinished] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [userName, setUserName] = useState("");

  const current = steps[step];

  // Tačnost percepcije (lokalno)
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (!current) return;

    if (current.type === "group-sort" && current.id && !groups[current.id]) {
      setGroups((prev) => ({
        ...prev,
        [current.id]: {
          a: [],
          b: [],
          c: [],
          pool: current.items,
        },
      }));
    }
  }, [current, groups]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setUserName(user.name);
  }, []);

  // ===== PROVJERA TAČNOSTI PERCEPCIJE =====
  const isCorrect = (question, value) => {
    if (!question?.correct) return false;
    const correct = question.correct;

    if (Array.isArray(correct)) {
      const arr = Array.isArray(value) ? value : [value];
      const allCorrect = correct.every((c) => arr.includes(c));
      const noExtra = arr.every((a) => correct.includes(a));
      return allCorrect && noExtra;
    }
    return String(value) === String(correct);
  };

  // ===== ODREĐIVANJE KONAČNOG SUSTAVA =====
  const getAccentSystem = () => {
    const q7_4 = answers?.q7_4;
    if (q7_4 === "3") return "udarni";
    if (q7_4 === "1" || q7_4 === "2") return "visinski";

    // Fallback
    const q5_1 = answers?.q5_1;
    if (q5_1 === "udarni") return "udarni";
    if (q5_1 === "visinski") return "visinski";
    if (q5_1 === "miješani") return "miješani";

    return "miješani";
  };

  const handleSelect = (id, value) => {
    const question = steps.find((s) => s.id === id);
    const previousAnswer = answers[id];

    // Ako je percepcijsko pitanje — preračunaj tačnost
    if (PERCEPTION_IDS.includes(id)) {
      setCorrectCount((prev) => {
        let next = prev;
        if (
          previousAnswer !== undefined &&
          isCorrect(question, previousAnswer)
        ) {
          next -= 1;
        }
        if (isCorrect(question, value)) {
          next += 1;
        }
        return Math.max(0, next);
      });
    }

    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleMultiSelect = (id, option) => {
    const question = steps.find((s) => s.id === id);
    const prevArr = answers[id] || [];
    const newArr = prevArr.includes(option)
      ? prevArr.filter((x) => x !== option)
      : [...prevArr, option];

    if (PERCEPTION_IDS.includes(id)) {
      setCorrectCount((prev) => {
        let next = prev;
        if (prevArr.length > 0 && isCorrect(question, prevArr)) next -= 1;
        if (newArr.length > 0 && isCorrect(question, newArr)) next += 1;
        return Math.max(0, next);
      });
    }

    setAnswers((prev) => ({ ...prev, [id]: newArr }));
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/quizRez`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quizId: "kviz1",
          answers,
        }),
      });

      await res.json();
      setTimeout(() => setFinished(true), 300);
    } catch (err) {
      console.error("Greska pri slanju kviza:", err);
    }
  };

  // ===== POMOĆNA: DA LI PITANJE ZAHTIJEVA ODGOVOR =====
  const requiresAnswer = () => {
    if (current.type === "select") return !answers[current.id];
    if (current.type === "multi-select")
      return !answers[current.id] || answers[current.id].length === 0;
    if (current.type === "audio_select") {
      // Ako nema opcija, ne zahtijeva odgovor
      if (!current.options || current.options.length === 0) return false;
      return !answers[current.id];
    }
    return false;
  };

  // ===== ZAVRŠNI EKRAN =====
  if (finished) {
    const accentSystem = getAccentSystem();

    return (
      <div className="quiz-page finished-screen">
        <div className="finished-card">
          <h1 className="finished-title">
            🎉 Čestitamo{userName ? `, ${userName}` : ""}!
          </h1>

          <p className="finished-text highlight">
            Tvoj je naglasni sustav: <strong>{accentSystem}</strong>
          </p>

          <p className="finished-subtext">
            Točno riješeno: {correctCount} / {PERCEPTION_IDS.length}
          </p>

          <Image
            src={`${API_URL}/audio/djevojcica_kviz.png`}
            alt="Čestitamo"
            width={220}
            height={220}
            className="finished-image"
            unoptimized
          />

          <button
            className="return-home-btn"
            onClick={() => (window.location.href = "/")}
          >
            Povratak na početnu
          </button>
        </div>
      </div>
    );
  }

  // ===== GLAVNI EKRAN =====
  return (
    <div className="quiz-page">
      <div className="quiz-content">
        {/* PROGRESS */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="quiz-card">
          {/* INTRO */}
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

          {/* INFO */}
          {current.type === "info" && (
            <>
              {current.title && <h2>{current.title}</h2>}
              {current.image && (
                <Image
                  src={current.image}
                  width={600}
                  height={500}
                  alt="info"
                  className="quiz-image"
                  style={{ display: "block", margin: "0 auto" }}
                  unoptimized
                />
              )}
              <p
                className="question-text"
                dangerouslySetInnerHTML={{ __html: current.text }}
              />
            </>
          )}

          {/* AUDIO */}
          {(current.type === "audio" || current.type === "audio2") && (
            <>
              <h2>{current.title}</h2>
              <div className="audio-grid">
                {current.voices.map((v, i) => (
                  <div key={i} className="audio-item">
                    <button
                      className="play-audio-btn"
                      onClick={() =>
                        new Audio(`${API_URL}${v.audio || v}`).play()
                      }
                    >
                      {v.label || v}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* AUDIO SELECT */}
          {current.type === "audio_select" && (
            <>
              <p
                className="question-text"
                dangerouslySetInnerHTML={{ __html: current.question }}
              />
              {current.voices && current.voices.length > 0 && (
                <div className="audio-grid">
                  {current.voices.map((v, i) => (
                    <div key={i} className="audio-item">
                      <button
                        className="play-audio-btn"
                        onClick={() => new Audio(`${API_URL}${v.audio}`).play()}
                      >
                        {v.label}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {current.options && current.options.length > 0 && (
                <div className="options-grid">
                  {current.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-pill ${
                        answers[current.id] === opt ? "active" : ""
                      }`}
                      onClick={() => handleSelect(current.id, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* SELECT */}
          {current.type === "select" && (
            <>
              {current.title && <h2>{current.title}</h2>}
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
              <div className="options-grid">
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-pill ${
                      answers[current.id] === opt ? "active" : ""
                    }`}
                    onClick={() => handleSelect(current.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* MULTI SELECT */}
          {current.type === "multi-select" && (
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
              <div className="options-grid">
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-pill ${
                      answers[current.id]?.includes(opt) ? "active" : ""
                    }`}
                    onClick={() => handleMultiSelect(current.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ŽARULJICA — samo nakon odgovora */}
          {current.lamp &&
            current.id &&
            answers[current.id] !== undefined &&
            answers[current.id] !== null &&
            answers[current.id] !== "" &&
            !(
              Array.isArray(answers[current.id]) &&
              answers[current.id].length === 0
            ) && (
              <div className="lamp-inline">
                <button
                  className="lamp-btn"
                  onClick={() => setLamp(current.lamp)}
                >
                  💡 Objašnjenje
                </button>
              </div>
            )}

          {/* NAV */}
          <div className="nav-buttons">
            <button disabled={step === 0} onClick={() => setStep(step - 1)}>
              Povratak
            </button>

            {step < steps.length - 1 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={requiresAnswer()}
              >
                Nastavak
              </button>
            )}

            {step === steps.length - 1 && (
              <button onClick={submitQuiz} disabled={requiresAnswer()}>
                Završi kviz
              </button>
            )}
          </div>
        </div>

        {/* MODAL za lampicu */}
        {lamp && (
          <div className="modal-overlay" onClick={() => setLamp(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <p dangerouslySetInnerHTML={{ __html: lamp }} />
              <button className="modal-close" onClick={() => setLamp(null)}>
                Zatvori
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}