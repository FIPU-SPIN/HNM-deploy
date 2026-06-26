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
          U morfoloskim paradigmama naglasak moze biti stalan ili se moze mijenjati.
          Moze se mijenjati ton, trajanje ili mjesto naglaska.
        </p>

        <div className="primjer-box">
          <p><b>Promjenljivi tip:</b> vrijeme - vremena - vremena</p>
          <p><b>Nepromjenljivi tip:</b> ljubav - ljubavi</p>
        </div>

        <p>
          Ako se naglasak mijenja, rijec pripada promjenljivom naglasnom tipu,
          a ako ostaje isti, pripada nepromjenljivom tipu.
        </p>

        <h3>Opceparadigmatske promjene</h3>

        <p>
          U promjenljivim tipovima dogadjaju se predvidljive naglasne promjene koje
          vrijede za velik broj rijeci.
        </p>

        <ul>
          <li>silazni naglasci u V jd. i G mn.</li>
          <li>kracenja u N mn.</li>
          <li>duljenja pred sonantima</li>
        </ul>

        <p>
          Te promjene nazivamo opceparadigmatskima jer slijede odredjena pravila.
        </p>

        <h3>Vrste promjena u paradigmi</h3>

        <p>U paradigmi se moze promijeniti:</p>

        <ul>
          <li>ton</li>
          <li>trajanje</li>
          <li>mjesto</li>
          <li>ili njihove kombinacije</li>
        </ul>

        <p>
          Prema tome se rijeci svrstavaju u razlicite podtipove.
        </p>

        <h3>Hiperkorekcija</h3>

        <p>
          U razgovornom jeziku cesto dolazi do pomicanja naglaska prema pocetku rijeci
          i ondje gdje to nije standardno.
        </p>

        <div className="primjer-box">
          <p>napisati → napisati</p>
          <p>zaustavimo → zaustavimo</p>
        </div>

        <p>
          Ta se pojava naziva <b>hiperkorekcija</b> i smatra se pogreskom u standardu.
        </p>

        <h3>Retrakcija (povlacenje naglaska)</h3>

        <p>
          Pomicanje naglaska prema pocetku rijeci naziva se <b>retrakcija</b>.
        </p>

        <p>
          Povijesno su se silazni naglasci pomicali prema pocetku rijeci, cime je
          nastao cetveronaglasni sustav.
        </p>

        <div className="primjer-box">
          <p>voda → voda</p>
          <p>vino → vino</p>
        </div>

        <p>
          Time su nestale prednaglasne duzine, a pojavile se nove zanaglasne.
        </p>

        <h3>Metatonija i metataksa</h3>

        <p>
          Promjena tona naziva se <b>metatonija</b>, a premjestanje naglaska
          <b> metataksa</b>.
        </p>

        <div className="primjer-box">
          <p>noga → noga</p>
          <p>ruka → ruka</p>
          <p>junak → junak</p>
          <p>zena → zena</p>
        </div>

        <p>
          Kratkouzlazni naglasak nastaje pomicanjem na kratki slog, a dugouzlazni
          pomicanjem na dugi slog.
        </p>

      </div>

      {/* KVIZ CTA - SAMO ZA PRIJAVLJENE */}
      <div className="kviz-cta">
        <h3>🧠 Provjeri svoje znanje</h3>
        <p>Nakon lekcije pokreni kratki kviz i provjeri koliko dobro razumijes naglasne sustave.</p>
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
        <i>Napomena: za pristup kvizu potrebno je biti prijavljen u svoj korisnicki racun.</i>
      </div>

    </main>
  );
}