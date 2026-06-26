"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
  allowedRoles = [],
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");

    // nije login
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // role protection
    if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(role)
    ) {
      router.push("/admin");
      return;
    }

    setLoading(false);

  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="admin-loading">
        Loading...
      </div>
    );
  }

  return children;
}