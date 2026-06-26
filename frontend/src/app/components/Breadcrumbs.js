"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");

  const labels = {
  slusam: "Slušam",
  stosveznam: "Što sve znam?",
  izgovaram: "Izgovaram",
  sva4ponavljam: "Sva 4 ponavljam",
  KojimNaglascima: "Kojim naglascima govorim",
  GovornaRijec: "Govorna riječ",
  Inventar: "Inventar",
  Distribucijska: "Distribucijska pravila",
  Paradigma: "Naglasci u paradigmi",
  glaogliumrezi: "Glagoli u mreži",
  oprojektu: "O projektu",
  Ciljevi: "Ciljevi",
  Rezultati: "Rezultati",
  tim: "Tim",
  "naglasci-zanaglasna-duzina": "Naglasci i zanaglasna dužina",
};
  
    return {
      name: labels[part] || decodeURIComponent(part),
      href,
    };
  });

  return (
    <nav className="breadcrumbs">
      <Link href="/">Početna</Link>

      {breadcrumbs.map((crumb, i) => (
        <span key={i}>
          {" > "}
          <Link href={crumb.href}>{crumb.name}</Link>
        </span>
      ))}
    </nav>
  );
}