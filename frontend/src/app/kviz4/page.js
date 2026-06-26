"use client";
import { API_URL } from "@/app/lib/api";

import { useEffect, useState } from "react";
import Quiz from "../components/Quiz";

export default function Kviz4Page() {
  const [kviz, setKviz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/quiz/kviz4`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.order - b.order);
        setKviz(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="quiz-loading">
        <p>Učitavanje kviza...</p>
      </div>
    );
  }

  if (!kviz.length) {
    return (
      <div className="quiz-error">
        <p>Nema pitanja za ovaj kviz.</p>
      </div>
    );
  }

  return <Quiz steps={kviz} />;
}