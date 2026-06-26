"use client";
import { API_URL } from "@/app/lib/api";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/app/components/AdminGuard";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_URL}/api/admin/korisnici`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Greška pri dohvaćanju korisnika");
        setLoading(false);
        return;
      }

      setUsers(data);
      setFilteredUsers(data);

      setLoading(false);

    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm(
      "Jeste li sigurni da želite obrisati korisnika?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_URL}/api/admin/user/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        alert("Brisanje nije uspjelo");
        return;
      }

      setUsers((prev) =>
        prev.filter((u) => u._id !== id)
      );

    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <AdminGuard allowedRoles={["admin", "super_admin"]}>

      <div className="admin-dashboard">

        <h1 className="admin-title">
          Korisnici
        </h1>

        <div className="admin-card">

          <input
            type="text"
            placeholder="Pretraži po emailu..."
            className="admin-search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p>Nema korisnika.</p>
          ) : (
            <table className="admin-table">

              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Akcija</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id}>

                    <td>{u.email}</td>

                    <td>
                      {u.name || "-"}
                    </td>

                    <td>{u._id}</td>

                    <td>
                      <button
                        className="admin-btn delete"
                        onClick={() =>
                          handleDelete(u._id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>

      </div>

    </AdminGuard>
  );
}