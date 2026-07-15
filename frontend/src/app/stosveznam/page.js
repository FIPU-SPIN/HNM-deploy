/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function StoSveZnamPage() {
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
    
    const audio = new Audio(`/assets/fix_sounds/${soundName}.WAV`);
    
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

      {/* NASLOVNA */}
      <div className="naslovna">
        <div className="content-container stosveznam">
          <h1 className="glavni-naslov">Što sve znam</h1>
          <div className="slika-stosveznam">
            <Image
              src="/assets/images/stosveznam.jpg"
              alt="Naslovna slika stranice sto sve znam"
              width={1000}
              height={800}
              priority
            />
          </div>
        </div>
      </div>

      {/* UVOD */}
      <div className="stosveznam-intro">

        <p className="primjer">
          Ovo je mjesto za identificiranje svoga naglasnog sustava te za provjeru
          osnovnih znanja o naglascima i naglasnoj normi, o naglasnim sustavima,
          varijetetima i pravilima u hrvatskome jeziku. Pojašnjenja i vježbe podijeljeni
          su u nekoliko cjelina i tema: Koji je Vaš naglasni sustav?; Naglasni inventar;
          Distribucijska pravila; Govorna riječ s klitikama; Naglasak u paradigmi.
          Nakon ove razine spremni ste za uvježbavanje percepcije i produkcije naglasaka.
        </p>

        <h3>Jezična biografija govornika</h3>

        <p>
          Hrvatski jezik obuhvaća mjesne govore, gradske govore i hrvatski standardni jezik.
          Svaki govornik hrvatskoga jezika usvaja materinski jezik kojemu je temelj u mjesnom
          govoru, a ovisno o mjestu rođenja i izloženosti standardu temelj mu je i u gradskom
          govoru te inačici razgovornoga standardnog jezika. Polaskom u školu uči se standardni
          jezik koji je namijenjen formalnim komunikacijskim situacijama. Sve to zajedno čini
          govornikovu jezičnu biografiju.
        </p>

        <p>
          Standardni se jezik temelji na štokavskome narječju i četveronaglasnome sustavu,
          sustavu s 4 naglaska. Kajkavski i čakavski govori te staroštokavski govori razlikuju
          se brojem naglasaka od standardnoga jezika pa su naglasne razlike više izražene od
          standarda ako dolazite iz sjeverne regije (centar Zagreb) ili zapadne regije (centar
          Rijeka). I unutar štokavskoga područja možemo uočiti brojne razlike ako ste iz istočne
          regije (centar Osijek) ili južne regije (centar Split) jer su dijalekti unutar narječja
          specifični po svojim fonološkim i prozodijskim značajkama.
        </p>

        {/* SLIKA */}
        <div className="slika-placeholder">
          <Image
            src="/assets/images/ikona.png"
            alt="Ilustracija naglasnog sustava"
            width={800}
            height={400}
            className="slika-primjer"
          />
          <p className="slika-napomena">
            <em>Slika 01 - Prikaz naglasnog sustava</em>
          </p>
        </div>

        {/* GRADOVI - KAO SURADNICI */}
        <div className="primjer-box">
          <p>Regionalne razlike mogu se uočiti u gradovima poput:</p>
          <div className="gradovi-container">
            <div className="grad-kartica" onClick={() => playSound("Zagreb")}>
              <span className="grad-ime">Zagreb</span>
              <span className="grad-zvuk-ikona">🔊</span>
            </div>
            <div className="grad-kartica" onClick={() => playSound("Rijeka")}>
              <span className="grad-ime">Rijeka</span>
              <span className="grad-zvuk-ikona">🔊</span>
            </div>
            <div className="grad-kartica" onClick={() => playSound("Osijek")}>
              <span className="grad-ime">Osijek</span>
              <span className="grad-zvuk-ikona">🔊</span>
            </div>
            <div className="grad-kartica" onClick={() => playSound("Split")}>
              <span className="grad-ime">Split</span>
              <span className="grad-zvuk-ikona">🔊</span>
            </div>
          </div>
          <p className="grad-napomena">🔊 Kliknite na grad za izgovor</p>
        </div>

        <h3>Visinski naglasni sustav</h3>

        <p>
          Hrvatski standardni jezik opisuje se kao jezik s visinskim naglasnim sustavom
          (tonsko-dinamičkim, melodijskim, engl. pitch-accent language) u kojemu su četiri
          različita naglaska: kratkosilazni, dugosilazni, kratkouzlazni i dugouzlazni te
          zanaglasna dužina i kračina. Takav četveronaglasni sustav ostvaruje se u mnogim
          hrvatskim mjesnim govorima, osobito u Slavoniji (primjerice u Osijeku, Vinkovcima,
          Vukovaru, Slavonskom Brodu, Požegi, Bjelovaru) i Dalmaciji (primjerice u Zadru,
          Šibeniku, Splitu, Metkoviću, Dubrovniku). Visinskim četveronaglasnim sustavima
          govori se i izvan Hrvatske, npr. govori srpskoga ili bosanskoga jezika. Visinski
          naglasni sustav imaju i ne(novo)štokavski govori koji imaju akut, a to su neki
          čakavski, kajkavski i staroštokavski govori.
        </p>

        <h3>Udarni naglasni sustav</h3>

        <p>
          Osim visinskoga naglasnog sustava u hrvatskom jeziku (su)postoji i udarni
          (dinamički) naglasni sustav, a naglasak koji se u njemu ostvaruje nazivamo
          udarnim (jačinskim, ekspiratornim, dinamičkim, engl. stress-accent). U udarnom
          sustavu relevantno je samo mjesto naglaska u riječi. Udarni naglasak najsličniji
          je kratkosilaznom naglasku iz visinskoga sustava. Udarni naglasni sustav veže se
          ponajviše za gradske govore (primjerice u Zagrebu, Varaždinu, Karlovcu, Rijeci,
          Puli, posebice mlađih govornika), no obilježjem je i nekih kajkavskih i čakavskih
          dijalektnih govora (primjerice govor Brovinja u Istri, neki donjosutlanski i
          međimurski govori, neki govori u Gorskom kotaru i sl.).
        </p>

        <p>
          U udarnome naglasnom sustavu mjesto naglaska često je drukčije nego u visinskome
          naglasnom sustavu, pa je mjesto naglaska najjači znak i najjednostavnije obilježje
          po kojem ga prepoznajemo. Ni visinski ni udarni naglasni sustav nisu dvije
          jednostavne i jedinstvene kategorije, već unutar njih postoje brojne varijante
          izgovora (npr. visinski naglasni sustav u Slavoniji i Dalmaciji nije jednak,
          iako su govori novoštokavski).
        </p>

        <div className="primjer-box">
          <p>Ključna razlika:</p>
          <p className="primjer">visinski = ton + duljina • udarni = pozicija naglaska</p>
        </div>

        <h3>Prepoznavanje govora</h3>

        <p>
          Kod govornika koji ostvaruju visinski četveronaglasni sustav i djelomice zanaglasnu
          dužinu gotovo uvijek možemo prepoznati da imaju slavonsko ili dalmatinsko porijeklo
          (govori osječke makroregije, primjerice govor Osijeka, Vinkovaca, Vukovara, Požege,
          Slavonskoga Broda, ili splitske makroregije, primjerice Zadra, Šibenika, Splita,
          Dubrovnika).
        </p>

        <p>
          Kod govornika koji ostvaruju udarni naglasni sustav teško je jednoznačno odrediti
          geografsko porijeklo samo na primjeru nekoliko riječi ili rečenica jer su udarni
          naglasci zagrebačke i riječke makroregije, tj. Zagreba, Varaždina, Karlovca, Rijeke
          ili Pule vrlo slični pa se uvriježilo nazivati takav govor "zagrebački".
        </p>

        <p>
          Širi fonetski ili jezični kontekst može pomoći u identifikaciji porijekla pa se
          govornici mogu identificirati po izgovoru samoglasnika (zatvorenijem ili otvorenijem
          od onoga koji percipiramo kao neutralni standardni), po izgovoru suglasnika
          (primjerice mediteranski l, izrazito labijalizirani ili izrazito umekšani frikativi
          i afrikate č, ž, š, dž, umekšani ć i đ), a ponekad i po intonaciji.
        </p>

      </div>

      {/* KVIZ CTA */}
      <div className="kviz-cta">
        <h3>🧠 Provjeri svoje znanje</h3>
        <p>
          Nakon lekcije pokreni kratki kviz i provjeri koliko dobro razumiješ naglasne sustave.
        </p>
        {isLoggedIn ? (
          <Link href="/kviz1" className="start-quiz-btn">
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