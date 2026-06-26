import Grid from "../components/Grid";

export default function Sva4PonavljamPage() {
  const items = [
    { href: "/kratkosilazni", img: "/assets/images/kisa.png", label: "Kratkosilazni" },
    { href: "/dugosilazni", img: "/assets/images/sunce.png", label: "Dugosilazni" },
    { href: "/dugouzlazni", img: "/assets/images/trava.png", label: "Dugouzlazni" },
    { href: "/kratkouzlazni", img: "/assets/images/rosa.png", label: "Kratkouzlazni" },
    {
      href: "/naglasci-zanaglasna-duzina",
      img: "/assets/images/mjesec.png",
      label: "Naglasci i zanaglasna dužina",
      className: "glslike sredina",
    },
  ];

  return (
    <main className="bodysva4">
      <Grid items={items} />
    </main>
  );
}