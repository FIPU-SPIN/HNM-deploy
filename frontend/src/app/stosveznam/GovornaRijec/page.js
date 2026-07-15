/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function GovornaRijecPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const currentAudioRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Funkcija za reprodukciju zvuka
  const playSound = (soundName) => {
    if (!soundName) return;
    
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    
    const audio = new Audio(`/assets/fix_sounds/${soundName}.wav`);
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        if (error.name !== 'AbortError') {
          console.error("Greška pri reprodukciji:", error);
        }
      });
    }
    
    currentAudioRef.current = audio;
  };

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
          One jezične riječi koje imaju svoj naglasak zovu se <b>naglasnice</b> (toničke riječi), a koje nemaju svoj naglasak zovu se <b>nenaglasnice</b> (klitike, atoničke riječi). 
          Nenaglasnice mogu stajati ispred naglasnice ili iza nje, pa s obzirom na položaj u odnosu na naglasnicu mogu biti prednaglasnice (proklitike) ili zanaglasnice (enklitike). 
        </p>

        <p>Nenaglasnice mogu biti:</p>

        <ul>
          <li><b>prednaglasnice (proklitike)</b> – dolaze ispred naglašene riječi</li>
          <li><b>zanaglasnice (enklitike)</b> – dolaze iza naglašene riječi</li>
        </ul>

        <p>
          <b>Prednaglasnice</b> se zovu još i <b>prislonjenice</b> ili <b>proklitike</b> i dolaze ispred naglašene riječi, a <b>zanaglasnice</b> se nazivaju i <b>naslonjenice</b> ili <b>enklitike</b> te dolaze iza naglašene riječi. Ispred zanaglasnica izbjegavaju se stanke u govoru. Govornu riječ tako može činiti samo jedna jezična riječ, u tom slučaju naglasnica, ili je mogu činiti dvije ili više jezičnih riječi od kojih je jedna naglasnica. U iskazu (rečenici kao komunikacijskoj jedinici) svaka riječ može biti naglašena ako se želi što istaknuti (Ȉšao je i ȉspod i ȉznad mȍsta.).
        </p>

        <h3>Prednaglasnice</h3>

        <ul>
          <li>prijedlozi: bez, do, iz, na, pod, u, za...</li>
          <li>veznici: i, a, ali, jer, ako...</li>
          <li>čestice: ne, ni, pa...</li>
        </ul>

        <p><b>Prednaglasnice su:</b></p>
        <ul>
          <li><u>svi jednosložni i dvosložni prijedlozi</u> te neki trosložni (npr. jednosložni: bez, do, iz, k/ka, kod, kroz, na, nad, niz, o, od, po, pod(a), pred(a), pri, s(a), spram, u, uz(a), za, zbog; duž, kraj, put, sred, vrh; dvosložni: oko, iza, među, mimo, mjesto, pokraj, prema, preko, više, ispod, ispred, iznad, izvan; trosložni: između, okolo, umjesto)</li>
          <li><u>jednosložni i dvosložni veznici</u> (najčešće a, i, ni, no, koji uza se nemaju nenaglasnice, ali i svi ostali koji u iskazu postaju nenaglasnice, npr. da, kad, pa, te, već, jer, ako, ali)</li>
          <li><u>čestice</u> – negacija ne, ali i ostale jednosložne riječi koje su i veznici (npr. ni, i, da, pa)</li>
        </ul>

        <h3>Zanaglasnice</h3>

        <ul>
          <li>zamjeničke: me, te, ga, je, nas...</li>
          <li>glagolske: sam, si, je, ćemo, će...</li>
          <li>čestica: li</li>
        </ul>

        <p><b>Zanaglasnice su:</b></p>
        <ul>
          <li><u>zamjeničke</u> – nenaglašeni oblici ličnih zamjenica i povratne zamjenice (G me, te, ga, je, nas, vas, ih, se; D mi, ti, mu, joj, nam, vam, im, si; A me, te, ga, nj, ju, je, nju, nas, vas, ih, se)</li>
          <li><u>glagolske</u> – nenaglašeni oblici prezenta pomoćnih glagola biti (sam, si, je, smo, ste, su) i htjeti (ću, ćeš, će, ćemo, ćete, će) te nenaglašeni oblici aorista glagola biti, koji služe za tvorbu pogodbenoga načina / kondicionala (bih, bi, bi, bismo, biste, bi)</li>
          <li><u>čestica</u>: li</li>
        </ul>

        <div className="primjer-box">
          <p>U složenoj rečenici prednaglasnica i zanaglasnica mogu biti ispred naglašene riječi, kao što je u zadnje dvije rečenice "da će"; "ali ne". To mogu biti i zasebne govorne riječi, posebice kada se što ističe, no govor je fluentniji bez stanki.</p>
        </div>

        <h3>Primjeri u rečenici</h3>

        <div className="citat-blok">
          <p>Doći će | umjesto | nje.</p>
          <p>Doći će | umjesto nje.</p>

          <p>Rekao je | da će | doći.</p>
          <p>Rekao je | da će doći.</p>

          <p>Dat će | ako | bude | imao.</p>
          <p>Dat će | ako bude | imao.</p>
        </div>

        {/* ZVUK 1.4.2 */}
        <div className="audio-section">
          <p>Poslušajte rečenice s isticanjem i bez isticanja:</p>
          <button className="zvuk-gumb" onClick={() => playSound("1-4-2")}>🔊 Poslušaj</button>
        </div>

        <h3>Prokliza i enkliza</h3>

        <p>
<p>
  U okviru govorne riječi silazni naglasak naglašene (toničke) riječi može se pomicati na prednaglasnicu (proklitiku), i ta se pojava naziva <b>prokliza</b> (npr. na mȏre {`>`} nȁ mōre, u grȃd {`>`} ȕ grād). Suprotno od proklize je <b>enkliza</b>, tj. postojanje zanaglasnica uz naglašenu riječ i u toj se poziciji ne događa pomicanje naglaska. U južnoj je regiji češće nego u istočnoj, a u zapadnoj i sjevernoj vrlo je ograničeno i rijetko.
</p>        </p>
        <p>
        Nekada je u standardnoj normi bilo obvezno pomicanje silaznih naglasaka. Danas je to zastarjelo i regionalno obojeno.
        </p>

        {/* ZVUK 1.5.3 */}
        <div className="audio-section">
          <p>Poslušajte stariju i današnju normu:</p>
          <button className="zvuk-gumb" onClick={() => playSound("1-5-3")}>🔊 Poslušaj</button>
        </div>

        <div className="slika-blok">
          <Image
            src="/assets/images/diskovi.png"  
            alt="Prikaz pomicanja naglaska"
            width={700}
            height={400}
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
          Ostvaraj silaznoga ili uzlaznoga tona na prednaglasnici povijesno je uvjetovan, naime naglasak se pomiče neoslabljeno s riječi koje silazni naglasak imaju na mjestu praslavenskih iskonskih silaznih naglasaka, a oslabljeno s riječi u kojima je silazni naglasak nastao od akuta.
        </p>

        <h3>Stanje u suvremenom jeziku</h3>

        <p>
          Danas je pomicanje naglaska obvezno kod negacije <b>ne</b> i u izrazu <i>sa mnom</i>.
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