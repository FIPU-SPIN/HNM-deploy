"use client";
import { API_URL } from "@/app/lib/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchUsers(token);
  }, []);

  const fetchUsers = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/korisnici`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Greška pri dohvaćanju korisnika");
        return;
      }

      setUsers(data);
    } catch (err) {
      setError("Server error");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/admin/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert("Brisanje nije uspjelo");
      return;
    }

    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u._id}</td>
                <td>
                  <button
                    className="admin-btn delete"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}