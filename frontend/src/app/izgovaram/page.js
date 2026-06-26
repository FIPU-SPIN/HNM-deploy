import Grid from "../components/Grid";

export default function IzgovaramPage() {
  const items = [
    { href: "/oprojektu", img: "/assets/images/arena.png", label: "O projektu" },
    { href: "/stosveznam", img: "/assets/images/ruka.png", label: "Što sve znam?" },
    { href: "/slusam", img: "/assets/images/naglasci.png", label: "Slušam" },
    { href: "/izgovaram", img: "/assets/images/izgovor.png", label: "Izgovaram" },
    { href: "/sva4ponavljam", img: "/assets/images/mis.png", label: "Sve 4 ponavljam" },
    { href: "/glagoli", img: "/assets/images/vrana.png", label: "Glagoli u mreži" },
  ];

  return (
    <main className="bodyslusam2">
      <Grid items={items} />
    </main>
  );
}