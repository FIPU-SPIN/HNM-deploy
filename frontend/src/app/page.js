import Grid from "./components/Grid";
import Link from "next/link";

export default function HomePage() {
  const items = [
    { href: "/oprojektu", img: "/assets/images/oprojektu.jpg"},
    { href: "/stosveznam", img: "/assets/images/stosveznam.jpg"},
    { href: "/slusam", img: "/assets/images/slusam.jpg" },
    { href: "/izgovaram", img: "/assets/images/izgovaram.jpg"},
    { href: "/sva4ponavljam", img: "/assets/images/ponavljam.jpg" },
    { href: "/glagoli", img: "/assets/images/glagoli.jpg" },
  ];

  return (
    <main className="bodypocetna">
      <div className="home-intro">
        <p>
          Dobro došli na mrežnu stranicu za učenje naglasaka. Ovdje možete razviti tri osnovne kompetencije: <strong>znanje</strong> o hrvatskim naglascima, <strong>vještinu percepcije</strong> naglasaka i intonacije (slušnoga prepoznavanja) i <strong>vještinu produkcije</strong> naglasaka (izgovora). Stranica je namijenjena učenju i poučavanju naglasaka u osnovnoj i srednjoj školi, na fakultetima koji obrazuju studente za javni govor te učenju i poučavanju hrvatskoga jezika kao stranoga i drugoga jezika. Ona je ujedno i mjesto razvoja mrežnih jezičnih alata za hrvatski jezik.
        </p>
        <p>
          Aplikacije će se nadopunjavati tijekom trajanja četverogodišnjega projekta. Zasad Vam je dostupna prva aplikacija: <Link href="/stosveznam" className="home-link"><em>Što sve znam?</em></Link> Provjerite svoje znanje o naglascima, odredite svoj početni naglasni sustav i uživajte u putovanju najizazovnijom normom hrvatskoga standardnog jezika.
        </p>
      </div>
      <Grid items={items} />
    </main>
  );
}