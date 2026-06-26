"use client";

import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <nav>
          <Link href="/admin">Dashboard</Link>

          <Link href="/admin/users">
            Korisnici
          </Link>

          <Link href="/admin/tasks">
            Zadaci
          </Link>

          <Link href="/admin/create">
            Kreiraj admina
          </Link>
        </nav>
      </aside>

      <main className="admin-content">
        {children}
      </main>

    </div>
  );
}