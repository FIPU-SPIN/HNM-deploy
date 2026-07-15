"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function InventarPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const currentAudioRef = useRef(null);

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

  const playZvukIzZnaka = (znak) => {
    const mapa = {
      "ȁ": "z1_ks",
      "ȃ": "z2_ds",
      "à": "z4_ku",
      "á": "z3_du",
      "ã": "z7_ak",
      "ā": "z5_znd",
      "ă": "z6_znk",
      "a̍": "z9_ud",
    };
    const soundName = mapa[znak];
    if (soundName) {
      playSound(soundName);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleZnakClick = (e) => {
      const target = e.currentTarget;
      const zvuk = target.getAttribute("data-zvuk");
      if (zvuk) {
        playSound(zvuk);
      } else {
        const znak = target.textContent.trim();
        playZvukIzZnaka(znak);
      }
    };

    const handleGumbClick = (e) => {
      const target = e.currentTarget;
      const zvuk = target.getAttribute("data-zvuk");
      if (zvuk) {
        playSound(zvuk);
      }
    };

    const zvukLinkovi = document.querySelectorAll(".zvuk-link");
    zvukLinkovi.forEach((el) => {
      el.removeEventListener("click", handleZnakClick);
      el.addEventListener("click", handleZnakClick);
      el.style.cursor = "pointer";
    });

    const zvukGumbi = document.querySelectorAll(".zvuk-gumb");
    zvukGumbi.forEach((gumb) => {
      gumb.removeEventListener("click", handleGumbClick);
      gumb.addEventListener("click", handleGumbClick);
    });

    return () => {
      zvukLinkovi.forEach((el) => {
        el.removeEventListener("click", handleZnakClick);
      });
      zvukGumbi.forEach((gumb) => {
        gumb.removeEventListener("click", handleGumbClick);
      });
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
    };
  }, []);

  return (
    <main className="bodydruga">

      {/* NASLOVNI DIO */}
      <div className="naslovna-rijec">
        <div className="content-container rijec">
          <h1 className="glavni-naslov">Inventar</h1>
          <div className="slika-rijec">
            <Image
              src="/assets/images/mjesto.png"
              alt="Naslovna slika stranice inventar"
              width={1000}
              height={800}
              priority
            />
          </div>
          <p className="uvodna-definicija">
  Naglasak je isticanje jednoga sloga u odnosu na druge slogove unutar riječi.
  <br />
  Naglasak je istodobni ostvaraj jačine (siline, intenziteta), trajanja (kvantitete) i tona (tonske visine).
</p>
        </div>
      </div>

      <div className="inventar-sadrzaj">
        <div className="inventar-intro">
          <p>
            U hrvatskome standardnom jeziku 4 su naglaska. Naglasci u visinskome sustavu mogu biti dugi ili kratki, silazni ili uzlazni.
            Iza naglaska može biti i zanaglasna dužina. U izgovoru se zanaglasna dužina sve više reducira ili nestaje, ostvaruju je
            samo oni koji je i inače imaju u svome polaznom idiomu (nešto više u južnoj regiji nego istočnoj).
          </p>
          <p className="napomena-za-zvuk">
            <strong>📢 Poslušajte kako zvuče u riječima klikom na naglašeni vokal.</strong>
          </p>
        </div>

        <div className="inventar-tablica">
          <h3>Visinski naglasni sustav</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th colSpan={2}>Naglašeni slog</th>
                <th colSpan={2}>Nenaglašeni slogovi</th>
              </tr>
              <tr>
                <th>Naglasci</th>
                <th>Kratki</th>
                <th>Dugi</th>
                <th>Kratki</th>
                <th>Zanaglasni dugi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="naglasak-tip">Silazni</td>
                <td className="zvuk-link" data-zvuk="z1_ks">ȁ</td>
                <td className="zvuk-link" data-zvuk="z2_ds">ȃ</td>
                <td className="zvuk-link" data-zvuk="z6_znk">ă</td>
                <td className="zvuk-link" data-zvuk="z5_znd">ā</td>
              </tr>
              <tr>
                <td className="naglasak-tip">Uzlazni</td>
                <td className="zvuk-link" data-zvuk="z4_ku">à</td>
                <td className="zvuk-link" data-zvuk="z3_du">á</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <p className="tablica-napomena"><em>🔊 Klikom na označene znakove (ȁ, ȃ, à, á, ā, ă) čujete izgovor</em></p>
        </div>

        <div className="primjeri-rijeci">
          <h3>Primjeri u riječima</h3>
          <div className="primjeri-grid">
            <div className="primjer-kartica"><span className="naglasak-znak zvuk-link" data-zvuk="z1_ks">ȁ</span><span className="naglasak-ime">kratkosilazni</span><div className="rijeci">mȁčka, kȉša</div><button className="zvuk-gumb" data-zvuk="z1_ks">🔊</button></div>
            <div className="primjer-kartica"><span className="naglasak-znak zvuk-link" data-zvuk="z2_ds">ȃ</span><span className="naglasak-ime">dugosilazni</span><div className="rijeci">mȃjka, sȗnce</div><button className="zvuk-gumb" data-zvuk="z2_ds">🔊</button></div>
            <div className="primjer-kartica"><span className="naglasak-znak zvuk-link" data-zvuk="z3_du">á</span><span className="naglasak-ime">dugouzlazni</span><div className="rijeci">máčak, tráva</div><button className="zvuk-gumb" data-zvuk="z3_du">🔊</button></div>
            <div className="primjer-kartica"><span className="naglasak-znak zvuk-link" data-zvuk="z4_ku">à</span><span className="naglasak-ime">kratkouzlazni</span><div className="rijeci">màgla, ròsa</div><button className="zvuk-gumb" data-zvuk="z4_ku">🔊</button></div>
            <div className="primjer-kartica"><span className="naglasak-znak zvuk-link" data-zvuk="z5_znd">ā</span><span className="naglasak-ime">zanaglasna dužina</span><div className="rijeci">mòrnār, mjȅsēc</div><button className="zvuk-gumb" data-zvuk="z5_znd">🔊</button></div>
            <div className="primjer-kartica"><span className="naglasak-znak zvuk-link" data-zvuk="z6_znk">ă</span><span className="naglasak-ime">kračina</span><div className="rijeci">măndărínă / mandarína</div><button className="zvuk-gumb" data-zvuk="z6_znk">🔊</button></div>
          </div>
        </div>

        <div className="ostali-prozodemi">
          <h2>Ostali prozodemi</h2>
          <p>Osim prozodema koji pripadaju propisanome standardnom naglasnom sustavu postoje i prozodemi koji su specifični za neke dijalekte i gradske govore. Specifičan naglasak koji se pojavljuje u govorima svih triju hrvatskih narječja, a nije dio standarda jest <strong>akut (ã)</strong>.</p>
          <p>Razlika je između standardnoga jezika i dijalekata i u tome što se u nekim dijalektima pojavljuje <strong>prednaglasna dužina (ā)</strong>.</p>
          <p>U mnogim govorima koji imaju jednonaglasni ili dvonaglasni udarni sustav pojavljuje se <strong>udarni (dinamički) naglasak</strong>. Bilježi se ravnom, okomitom crtom, znakom za silinu (a̍).</p>

          <div className="prozodemi-tablica">
            <h3>Pregled ostalih prozodema</h3>
            <table>
              <thead>
                <tr><th>Prozodem</th><th>Znak</th><th>Primjeri</th><th>Zvuk</th></tr>
              </thead>
              <tbody>
                <tr><td>akut</td><td className="zvuk-link" data-zvuk="z7_ak">ã</td><td>mũl, sũša, balũn, odãvna</td><td><button className="zvuk-gumb mali" data-zvuk="z7_ak">🔊</button></td></tr>
                <tr><td>prednaglasna dužina</td><td className="zvuk-link" data-zvuk="z8_pnd">ā</td><td>trāvȁ, nēćȕ, vojnīcȉ, glāvẽ, priblīžȋ</td><td><button className="zvuk-gumb mali" data-zvuk="z8_pnd">🔊</button></td></tr>
                <tr><td>udarni naglasak</td><td className="zvuk-link" data-zvuk="z9_ud">a̍</td><td>ki̍ša, su̍nce, tra̍va, ro̍sa</td><td><button className="zvuk-gumb mali" data-zvuk="z9_ud">🔊</button></td></tr>
              </tbody>
            </table>
          </div>
          <p className="napomena-za-zvuk"><em>🔊 Klikom na znakove ili gumbe čujete primjere</em></p>
        </div>

        <div className="biljezenje-naglasaka">
          <h2>Bilježenje naglasaka na računalu</h2>
          <p>Želite li i Vi bilježiti naglaske pišući na računalu, u Word dokumentu odaberite "Umetanje", zatim "Simbol" te ih potražite među fontovima. Uobičajeni fontovi, kao što su Times New Roman ili Arial, imaju samoglasnike sa znakovima za naglaske, no nemaju, primjerice, slogotvorni r s kratkouzlaznim naglaskom ili sa zanaglasnom dužinom.</p>
          <p>U dijalektološkim se transkripcijama najčešće upotrebljava font <strong>ZRCola</strong>, koji se može besplatno preuzeti na mrežnoj stranici znanstvenoistraživačkoga centra Slovenske akademije znanosti i umjetnosti u Ljubljani.</p>

          <div className="zrcola-slika-container">
            <Image src="/assets/images/Picture2.png" alt="ZRCola font naslovnica" width={600} height={400} className="zrcola-slika" />
            <p className="slika-napomena"></p>
          </div>

          <div className="link-container">
            <a href="https://zrcola.zrc-sazu.si/" target="_blank" rel="noopener noreferrer" className="zrcola-link-button">🔗 ZRCola</a>
          </div>
          <p>Font je razvio Peter Weiss. U njemu se nalaze i naglasni znakovi koji nedostaju u uobičajenim fontovima.</p>
        </div>

        <div className="ipa-tablica">
          <div className="ipa-znakovlje">
            <h2>Međunarodno fonetsko znakovlje (IPA)</h2>
            <p>Mnogo je načina bilježenja naglasaka, no u našem je jezikoslovlju uvriježeno tradicionalno znakovlje, a uz njega se u znanstvenim radovima javlja i znakovlje Međunarodne fonetske organizacije (IPA), u kojemu se odvojeno prikazuju trajanje i ton. Trajanje može biti kratko (a) ili dugo (a:), a ton uzlazan (ă) ili silazan (â).</p>
          </div>
          <h3>Usporedba znakovlja</h3>
          <table>
            <thead><tr><th>Prozodem</th><th>Tradicionalno znakovlje</th><th>IPA znakovlje</th></tr></thead>
            <tbody>
              <tr><td>kratkosilazni naglasak</td><td>kȉša</td><td>kîša</td></tr>
              <tr><td>kratkouzlazni naglasak</td><td>ròsa</td><td>rŏsa</td></tr>
              <tr><td>dugosilazni naglasak</td><td>sȗnce</td><td>sû:nce</td></tr>
              <tr><td>dugouzlazni naglasak</td><td>tráva</td><td>tră:va</td></tr>
              <tr><td>zanaglasna dužina</td><td>mjȅsēc</td><td>mjêse:c</td></tr>
            </tbody>
          </table>
        </div>

        <div className="fonetska-analiza">
          <h2>Fonetska analiza naglasaka</h2>
          <p>Naglasak riječi sastoji se od triju sastavnica: jačine, trajanja i tona. Jačina je najvažnija osobina naglaska u značenju istaknutosti. Za ostvaraj silaznoga naglaska dovoljan je jedan slog. Uzlazni se pak naglasci ostvaruju u dva sloga: prvi je slog malo veće jačine, a visoki ton prostire se i na zanaglasni slog.</p>
          <p>S obzirom na jačinu slogovi mogu biti naglašeni ili nenaglašeni, s obzirom na trajanje mogu biti dugi ili kratki, a s obzirom na visinu naglasci mogu biti uzlazni ili silazni.</p>

          <div className="praat-sekcija">
            <p className="napomena-za-zvuk">
              <strong>📢 Poslušajte izgovor riječi: kiša, sunce, trava, rosa i promotrite sliku.</strong>
              <br />
              <button className="zvuk-gumb praat-zvuk-gumb" data-zvuk="1-2-1" onClick={() => playSound("1-2-1")}>🔊 Poslušaj izgovor</button>
            </p>
            <div className="praat-slike-container">
              <Image src="/assets/images/svacetrinaglaska.png" alt="Akustički prikaz naglasaka u programu Praat" width={800} height={500} className="praat-slika" />
              <p className="slika-napomena"></p>
              <div className="praat-link-container">
                <a href="https://www.fon.hum.uva.nl/praat/" target="_blank" rel="noopener noreferrer" className="praat-link-button">🔗 Praat - program za fonetsku analizu</a>
              </div>
            </div>

            <p className="praat-opis">Slika prikazuje tijek tona, tijek intenziteta i trajanje vokala u riječima kiša, sunce, trava i rosa. Prve dvije riječi izgovorene su sa silaznim naglaskom, a druge dvije s uzlaznim naglaskom na prvom slogu; prva i zadnja izgovorene su s kratkim naglašenim vokalom, a druga i treća s dugim. Riječi je izgovorila spikerica čiji je osnovni ton oko 170 Hz, a pripada rasponu tona koji nazivamo altom. Okomitim crtama obilježeni su početak i kraj naglašenoga i zanaglasnoga sloga u riječima.</p>
          </div>
        </div>

        <div className="mjesta-provjera">
          <h2>Mjesta za provjeru naglasnih podataka</h2>
          <ul className="link-lista">
            <li><a href="https://hjp.znanje.hr/" target="_blank" rel="noopener noreferrer">🔗 Hrvatski jezični portal (HJP)</a></li>
            <li><a href="https://www.rjecnici.hr/" target="_blank" rel="noopener noreferrer">🔗 Veliki rječnik hrvatskoga standardnog jezika (VRH)</a></li>
            <li><a href="https://rjecnik.hr/" target="_blank" rel="noopener noreferrer">🔗 Školski rječnik hrvatskoga jezika</a></li>
            <li><a href="http://ihjj.hr/mreznik/" target="_blank" rel="noopener noreferrer">🔗 Mrežnik - Institut za hrvatski jezik i jezikoslovlje</a></li>
          </ul>
        </div>
      </div>

      {/* KVIZ CTA */}
      <div className="kviz-cta">
        <h3>🧠 Provjeri svoje znanje</h3>
        <p>
          Nakon lekcije pokreni kratki kviz i provjeri koliko dobro razumiješ naglasne sustave.
        </p>
        {isLoggedIn ? (
          <Link href="/kviz4" className="start-quiz-btn">
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