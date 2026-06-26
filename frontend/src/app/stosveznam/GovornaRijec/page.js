/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GovornaRijecPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main className="bodydruga">

      <div className="naslovna">
        <div className="content-container rijec">
          
          <h1 className="glavni-naslov">Govorna riječ</h1>

          <div className="slika-rijec">
            <Image
              src="/assets/images/Govorna_riječ.png"
              alt="Naslovna slika stranice govorna riječ"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="rijec-intro">
        
        <h2>Govorna riječ</h2>

        <p>
          Govornu riječ čini niz slogova od kojih je jedan naglašen. Nazivamo je još
          ortoepska, prozodijska, fonetska riječ ili naglasna cjelina. Jezične riječi
          su one koje u pismu odvajamo bjelinama, a zovu se još i pisane, pravopisne
          ili ortografske riječi.
        </p>

        <p>
          Govorna je riječ najčešće trosložna, a jezična riječ dvosložna. Govorna je
          riječ u prosjeku oko 40 % veća od jezične jer se sastoji od jedne ili više
          jezičnih riječi.
        </p>

        <div className="primjer-box">
          <p>
            Govorne riječi razdvajamo okomicom, a više jezičnih riječi povezujemo lukom:
          </p>
          <p className="primjer">I‿o‿kȉši‿mu‿je | govorio.</p>
        </div>

        <p>
          Odnos može biti i drukčiji: jedna se jezična riječ može izgovarati kao dvije
          govorne riječi, npr. u superlativima (<i>nȃjsrètnijī</i>) ili složenicama
          (<i>àutocȅsta</i>).
        </p>

        <h3>Naglasnice i nenaglasnice</h3>

        <p>
          Jezične riječi koje imaju svoj naglasak zovu se <b>naglasnice</b>, a one koje
          nemaju <b>nenaglasnice (klitike)</b>.
        </p>

        <p>Nenaglasnice mogu biti:</p>

        <ul>
          <li><b>prednaglasnice (proklitike)</b> – dolaze ispred naglašene riječi</li>
          <li><b>zanaglasnice (enklitike)</b> – dolaze iza naglašene riječi</li>
        </ul>

        <h3>Prednaglasnice</h3>

        <ul>
          <li>prijedlozi: bez, do, iz, na, pod, u, za...</li>
          <li>veznici: i, a, ali, jer, ako...</li>
          <li>čestice: ne, ni, pa...</li>
        </ul>

        <h3>Zanaglasnice</h3>

        <ul>
          <li>zamjeničke: me, te, ga, je, nas...</li>
          <li>glagolske: sam, si, je, ćemo, će...</li>
          <li>čestica: li</li>
        </ul>

        <h3>Primjeri u rečenici</h3>

        <div className="primjer-box">
          <p>Doći će | umjesto | nje.</p>
          <p>Doći će | umjesto nje.</p>

          <p>Rekao je | da će | doći.</p>
          <p>Rekao je | da će doći.</p>

          <p>Dat će | ako | bude | imao.</p>
          <p>Dat će | ako bude | imao.</p>
        </div>

        <h3>Prokliza i enkliza</h3>

        <p>
          U govornoj riječi naglasak se može pomaknuti na prednaglasnicu – ta se pojava
          naziva <b>prokliza</b> (npr. <i>nȁ mōre</i>, <i>ȕ grād</i>).
        </p>

        <p>
          Suprotno tome, kod <b>enklize</b> naglasak ostaje na naglašenoj riječi.
        </p>

        <p>
          Danas pomicanje naglaska nije obvezno i često je regionalno obilježeno.
        </p>      

      <div className="slika-blok">
        <Image
          src="/assets/images/diskovi.png"  
          alt="Prikaz pomicanja naglaska"
          width={900}
          height={600}
        />
      </div>

      <div className="citat-blok">
        <p>Ni mi, ni vi nećemo u grad.</p>
        <p>Skoči preko zida u vrt.</p>
        <p>Pazi da ne prođeš preko šume.</p>
        <p>Bez muke nema nauke.</p>
        <span className="citat-izvor">(Ivšić i Kravar, 1955)</span>
      </div>

      <h3>Pomicanje naglaska na prednaglasnicu</h3>

      <p>
        Naglasak se na prednaglasnicu pomiče dvojako: <b>neoslabljeno</b>, kojim se
        ostvaruje kratkosilazni naglasak (<i>ȕ grād, ȉznad grāda, nȁ mōre</i>) ili
        <b> oslabljeno</b>, kojim se ostvaruje kratkouzlazni naglasak (<i>ù kući,
        izà kućē, nè znām</i>).
      </p>

      <p>
        Pomicanje naglaska znači da prednaglasnica postaje dio naglasne cjeline.
      </p>

      <div className="primjer-box">
        <p><b>Neoslabljeno (preskakanje):</b> prȅko grāda</p>
        <p><b>Oslabljeno (prenošenje):</b> pokràj kućē</p>
      </div>

      <p>
        Neoslabljeno pomicanje naziva se i <b>preskakanje naglaska</b>, a oslabljeno
        <b> prenošenje naglaska</b>.
      </p>

      <p>
        Iznimno se može ostvariti i zanaglasna dužina:
      </p>

      <div className="primjer-box">
        <p>prȅdā me, ȕzā te, ȕzā se, pȍdā nj</p>
        <p>zá me, ná te, ná se, pȏ nj, zȃ nj</p>
      </div>

      <p>
        Te su govorne riječi ustaljene i pokazuju da su ti oblici nekada bili
        naglašeni.
      </p>

      <h3>Povijesna uvjetovanost</h3>

      <p>
        Ostvaraj silaznog ili uzlaznog tona na prednaglasnici povijesno je uvjetovan.
        Naglasak se neoslabljeno pomiče s riječi koje imaju izvorni silazni naglasak,
        a oslabljeno s riječi kod kojih je nastao naknadno.
      </p>

      <h3>Stanje u suvremenom jeziku</h3>

      <p>
        Danas je pomicanje naglaska obvezno kod negacije <b>ne</b> i u izrazu
        <i>sa mnom</i>.
      </p>

      <p>
        U ostalim slučajevima ovisi o regiji – češće je u južnim govorima nego u
        istočnima.
      </p>

      <p>
        U standardu se češće pojavljuje uz zamjenice nego uz druge vrste riječi te
        češće uz prijedloge nego uz veznike.
      </p>

        </div>

      {/* KVIZ CTA - SAMO ZA PRIJAVLJENE */}
      <div className="kviz-cta">
        <h3>🧠 Provjeri svoje znanje</h3>
        <p>Nakon lekcije pokreni kratki kviz i provjeri koliko dobro razumiješ naglasne sustave.</p>
        {isLoggedIn ? (
          <Link href="/kviz2" className="start-quiz-btn">
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