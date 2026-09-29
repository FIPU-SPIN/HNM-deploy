"use client";
import { API_URL } from "@/app/lib/api";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ŠALJEM:", { ime, email, password });

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ime,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (res.ok) {
        setModal({
          type: "success",
          title: "Uspješna registracija!",
          text: "Tvoj račun je izrađen. Preusmjeravam te na prijavu...",
          onClose: () => router.push("/login"),
        });
      } else {
        setModal({
          type: "error",
          title: "Greška",
          text: data.error || "Došlo je do greške prilikom registracije.",
        });
      }
    } catch (err) {
      console.log("FRONTEND ERROR:", err);
      setModal({
        type: "error",
        title: "Greška",
        text: "Nešto je puklo na requestu. Pokušaj ponovno.",
      });
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Izrada računa</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Ime i prezime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
          />
          <small className="required-text">Obavezno polje</small>
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small className="required-text">Obavezno polje</small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small className="required-text">Obavezno polje</small>
        </div>

        <button type="submit">Izradi račun</button>

        <p className="login-link">
          Već imaš račun? <Link href="/login">Prijavi se</Link>
        </p>
      </form>

      {modal && (
        <div
          className="modal-overlay"
          onClick={() => {
            modal.onClose?.();
            setModal(null);
          }}
        >
          <div
            className={`modal ${modal.type === "error" ? "error" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="modal-icon">
              {modal.type === "success" ? "✅" : "⚠️"}
            </span>
            <h3 className="modal-title">{modal.title}</h3>
            <p className="modal-text">{modal.text}</p>
            <button
              className="modal-button"
              onClick={() => {
                modal.onClose?.();
                setModal(null);
              }}
            >
              U redu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}