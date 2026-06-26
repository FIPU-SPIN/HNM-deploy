"use client";
import { API_URL } from "@/app/lib/api";

import { useState } from "react";
import AdminGuard from "@/app/components/AdminGuard";

export default function CreateAdminPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/api/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Greška pri kreiranju admina");
        return;
      }

      setSuccess("Admin uspješno kreiran!");

      setForm({
        username: "",
        email: "",
        password: "",
        role: "admin",
      });

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <AdminGuard allowedRoles={["super_admin"]}>

      <div className="create-dashboard">

        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Create Admin</h2>

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
            <option value="moderator">Moderator</option>
          </select>

          <button type="submit">
            Create
          </button>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "green" }}>
              {success}
            </p>
          )}
        </form>

      </div>

    </AdminGuard>
  );
}