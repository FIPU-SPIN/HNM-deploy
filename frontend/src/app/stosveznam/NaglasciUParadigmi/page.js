/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NaglasciUParadigmiPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main className="bodydruga">

      <div className="naslovna">
        <div className="content-container paradigma">
          
          <h1 className="glavni-naslov">Naglasci u paradigmi</h1>

          <div className="slika-paradigma">
            <Image 
              src="/assets/images/Naglasci_u_paradigmi.png"
              alt="Naslovna slika stranice naglasci u paradigmi"
              width={800}
              height={600}
              priority
            />
          </div>
        </div>
      </div>

      <div className="paradigma-intro">

        <h2>Naglasci u paradigmi</h2>

        <p>
          U morfološkim paradigmama (imeničkoj, glagolskoj, pridjevnoj) naglasak može biti stalan ili se može mijenjati. Naglasku se mijenja ili ton, ili trajanje, ili mjesto. Promijeni li se što od toga, tada ta riječ pripada <b>promjenjivom naglasnom tipu</b> (<i>vrijéme – vrȅmena – vremèna</i>), a ako se ne promijeni, onda riječ pripada <b>nepromjenjivom naglasnom tipu</b> (<i>ljúbav – ljúbavi</i>).
        </p>

        <p>
          Unutar promjenljivoga tipa događaju se mnoge naglasne promjene koje su predvidljive u sinkroniji (u određenom vremenskom stadiju) i koje su zajedničke brojnim naglasnim jedinicama. Takve su promjene općeparadigmatske i počivaju na tzv. općeparadigmatskim naglasnim pravilima po kojima je takav promjenljivi tip predvidljiv. To su, primjerice, silazni naglasci u V jd. i G mn. imenica, kraćenja u N mn. ili duljenja naglasaka pred skupom sa sonantom. Na većem stupnju apstrakcije sve takve općeparadigmatske promjene mogu biti zanemarene u svrstavanju u <b>promjenljivi</b> ili <b>nepromjenljivi naglasni tip</b>, no mi ih ovdje nećemo zanemarivati i promatrat ćemo takve promjene unutar predvidljivo promjenljivoga tipa radi jasnijega i sustavnijega modelskog prikaza.
        </p>

        <h3>Vrste promjena u paradigmi</h3>

        <p>U paradigmi se može promijeniti:</p>

        <ul>
          <li><b>ton</b> naglaska</li>
          <li><b>trajanje</b></li>
          <li><b>ton i trajanje</b></li>
          <li><b>mjesto</b></li>
          <li><b>mjesto i ton</b></li>
          <li><b>mjesto i trajanje</b></li>
          <li><b>mjesto, ton i trajanje</b></li>
        </ul>

        <p>
          Prema tim promjenama riječi unutar promjenljivoga tipa svrstavaju se u skupine nižega reda, u <b>podtipove</b>.
        </p>

        <div className="primjer-box">
          <p><b>Promjenljivi tip:</b> vrijéme - vrȅmena - vremèna</p>
          <p><b>Nepromjenljivi tip:</b> ljúbav - ljúbavi</p>
        </div>

        <h3>Hiperkorekcija</h3>

        <p>
          Danas je u razgovornom jeziku česta pojava da se prema početku riječi pomiču i oni naglasci koji nisu uzlazni ili tipološki uvjetovani (kao rezultat nedovoljno naučene standardne naglasne norme kod neštokavaca), što je najuočljivije na korpusu prefigiranih glagola (nastalih prefiksacijom): <i>napísati &gt; nȁpisati</i>; <i>zaùstavimo &gt; zȁustavimo</i> i sl. Takvu pojavu nazivamo <b>hiperkorekcijom</b> i u standardu se smatra, zasad, pogreškom. Riječ je o analoškoj pojavi. Na prefiks se, dakle, pomiču samo silazni naglasci: dugosilazni, iza kojega ostaje zanaglasna dužina, i kratkosilazni.
        </p>

        <h3>Retrakcija (povlačenje naglaska)</h3>

        <p>
          Pomicanje naglaska na prethodni slog, prema početku riječi (ali u širem smislu i prema početku govorne riječi) naziva se <b>retrakcija</b> ili povlačenje. Pomiču se silazni naglasci prema početku riječi. U povijesti jezika od tronaglasnoga sustava (<i>̏, ̑, ῀</i>) preko dvonaglasnoga (<i>̏, ̑</i>) nastajao je četveronaglasni sustav (<i>̏, ̑, ˋ, ´</i>), i to tako da su se silazni naglasci pomicali prema početku riječi. Tako su do 14./15. st. nastala dva nova (novoštokavska) naglaska: na mjestu prednaglasnoga kratkog sloga <b>kratkouzlazni</b> (<i>vodȁ &gt; vòda</i>) na mjestu prednaglasnoga dugog sloga <b>dugouzlazni</b> (<i>vīnȍ &gt; víno</i>). Time su iz tih govora nestale prednaglasne dužine, a nastale su nove, zanaglasne, nakon pomicanja dugosilaznoga naglaska (<i>onȏ &gt; ònō</i>).
        </p>

        <div className="primjer-box">
          <p>vodȁ → vòda</p>
          <p>vīnȍ → víno</p>
          <p>onȏ → ònō</p>
        </div>

        <h3>Metatonija i metataksa</h3>

<p>
  Promjena tona naziva se <b>metatonija</b>, a premještanje naglaska <b>metataksa</b>.
</p>

<p>
  Promjena tona naziva se metatonija i danas ju nalazimo u primjerima kada silazni metatonira u uzlazni na središnjem slogu: <i>poljoprȉvreda &gt; poljoprìvreda</i>, što je česta praksa u normativnim priručnicima. Premještanje naglaska iste vrste sa sloga na slog naziva se metataksa. Metatonije su se odvijale prema ovim obrascima:
</p>

<div className="primjer-box">
  <p>nogȁ → nòga</p>
  <p>rūkȁ → rúka</p>
  <p>junȃk → jùnāk</p>
  <p>žēnȃ → žénā</p>
</div>

<p>
  Kratkouzlazni naglasak nastaje pomicanjem na kratki slog, a dugouzlazni pomicanjem na dugi slog.
</p>

      </div>

      {/* KVIZ CTA - SAMO ZA PRIJAVLJENE */}
      <div className="kviz-cta">
        <h3>🧠 Provjeri svoje znanje</h3>
        <p>Nakon lekcije pokreni kratki kviz i provjeri koliko dobro razumiješ naglasne sustave.</p>
        {isLoggedIn ? (
          <Link href="/kviz5" className="start-quiz-btn">
            Pokreni kviz
          </Link>
        ) : (
          <button className="start-quiz-btn disabled" disabled>
            Pokreni kviz
          </button>
        )}
        <br />
        <br />
        <i>Napomena: za pristup kvizu potrebno je biti prijavljen u svoj korisnički račun.</i>
      </div>

    </main>
  );
}