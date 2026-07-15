/* eslint-disable */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DistribucijskaPravilaPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <main className="bodydruga">

      {/* NASLOVNI DIO */}
      <div className="naslovna-rijec">
        <div className="content-container distribucijska">

          <h1 className="glavni-naslov">
            Distribucijska pravila
          </h1>

          <div className="slika-distribucijska">
            <Image
              src="/assets/images/distribucijska_pravila.png"
              alt="Naslovna slika stranice distribucijska pravila"
              width={1000}
              height={800}
              priority
            />
          </div>

          <p className="uvodna-definicija">
            <i>
              Distribucijska ili raspodjelna pravila određuju raspored naglasaka unutar govorne riječi.
            </i>
          </p>

        </div>
      </div>

      {/* GLAVNI SADRŽAJ */}
      <div className="distribucijska-sadrzaj">

        {/* UVOD */}
        <div className="distribucijska-intro">
          <p>
            Tri su osnovna pravila raspodjele ili distribucije prozodema u standardnom jeziku:
          </p>
        </div>

        {/* TRI PRAVILA */}
        <div className="pravila-grid">

          <div className="pravilo-kartica">
            <span className="pravilo-broj">I.</span>
            <h3>Jednosložne riječi</h3>
            <p>
              Jednosložne riječi mogu imati samo silazne naglaske (<i>pȁs, pȗž</i>).
            </p>
          </div>

          <div className="pravilo-kartica">
            <span className="pravilo-broj">II.</span>
            <h3>Višesložne riječi</h3>
            <p>
              Višesložne riječi mogu imati bilo koji od četiriju naglasaka na prvom slogu
              (<i>kȉša, ròsa, sȗnce, tráva</i>), na središnjem slogu dolaze uzlazni naglasci
              (<i>slobòda, mandarína</i>), a na zadnjem slogu najčešće nema naglaska.
              U određenim slučajevima mogu se javiti dublete, silazni naglasci i na
              središnjem slogu (<i>poljoprȉvreda, jugozȃpad</i>) i na zadnjem slogu
              (<i>vijadȕkt, rokokȏ</i>).
            </p>
          </div>

          <div className="pravilo-kartica">
            <span className="pravilo-broj">III.</span>
            <h3>Dužina iza naglaska</h3>
            <p>
              Dužina se ostvaruje iza naglaska i pripada ili osnovi riječi
              (<i>kàpūt, dȍdīr, kȁjkāvka, ȕ grād</i>), ili sufiksima / sufiksalnim morfemima
              (<i>mȍmčād, rȁdōst</i>), ili nastavcima / gramatičkim morfemima
              (<i>bez sèstrē, sa sèstrōm, bez sestárā, jȃkōga, plȇšēmo</i>).
            </p>
          </div>

        </div>

        {/* RASPODJELNA PRAVILA */}
        <div className="distribucijska-blok">
          <h2>Raspodjelna pravila</h2>
          <p>
            Uzmemo li u obzir, dakle, polifunkcionalnost standardnoga jezika raspodjelna pravila glase ovako:
            uzlazni naglasci mogu biti na bilo kojem slogu osim zadnjem, a silazni naglasci mogu biti na svim slogovima riječi.
          </p>
          <p>
            Prvo pravilo proizlazi iz činjenice da su za ostvarenje uzlaznih naglasaka potrebna dva sloga,
            tj. da se visoki ton mora zadržati na zanaglasnom slogu kako bismo ostvarili kratkouzlazni ili
            dugouzlazni naglasak.
          </p>
        </div>

        {/* DRUGO PRAVILO */}
        <div className="distribucijska-blok">
          <h2>Silazni naglasci izvan početnoga sloga</h2>
          <p>
            Drugo pravilo u mnogim se priručnicima navodi restriktivno te se kaže da silazni naglasci mogu biti
            samo na prvom slogu. Uzus i norma pokazuju da silazni naglasci na nepočetnim slogovima nisu iznimka
            ili pogreška, već činjenica koja se sustavno pojavljuje u hrvatskom (standardnom) jeziku
            (<i>u vlastitim imenima, u posuđenicama, u nekim gramatičkim i tvorbenim oblicima</i>) te nema razloga
            imati pravilo koje opovrgava tu činjenicu.
          </p>
          <p>
            U standardnojezičnom izgovoru silazni se naglasci ostvaruju uglavnom na prvom slogu višesložnih riječi
            (<i>kȉša, jȁbuka, sȗnce, nȃgrada</i>). Pojavljivanje silaznih naglasaka izvan početnoga sloga u neutralnom
            standardnojezičnom varijetetu najčešće je u (višesložnim) posuđenicama (<i>dijamȁnt, dirigȅnt, dijalȅkt,
            tornȃdo, akvȃrij</i>), u složenicama (<i>poljoprȉvreda, brodovlȃsnīk</i>), u vlastitim imenima (<i>Marȉja, Voltȇr</i>),
            u čitanju kratica (<i>HNS – haenȅs, SAD – esadȇ</i>), uzvicima (<i>ijujȕ</i>), u V jd. imenica (<i>Amerikȃnko</i>) i
            G mn. imenica (<i>podȃtākā, rečȅnīcā, zelȅnīlā</i>) te u govornoj riječi s prednaglasnicom
            (<i>na sȗncu, u kȕći</i>).
          </p>
        </div>

        {/* VARIJETETI */}
        <div className="distribucijska-blok">
          <h2>Visoki i niski varijetet</h2>
          <p>
            U visokom varijetetu, pogledamo li u suvremene priručnike, nije jednoznačno određeno kada je silazni ton
            izvan početnoga sloga dopušten. U ponekim rječnicima (<i>u Školskom rječniku Instituta za hrvatski jezik i
            jezikoslovlje ili Velikom rječniku hrvatskoga standardnog jezika Školske knjige</i>) na leksičkoj se razini
            ne dopušta iznimka od strogo zacrtanih raspodjelnih pravila (<i>poljoprìvreda, brodòvlāsnīk</i>), a u ponekim
            se gramatikama (<i>npr. u Tvorbi riječi S. Babića</i>) dopušta (<i>poljoprȉvreda, brodovlȃsnīk</i>).
          </p>
          <p>
            Ono što je zajedničko svima jest da se iznimke odnose prije svega na govornu riječ
            (<i>uzimajući u obzir i broj slogova: nȁ vlāk, ali: na vlȁkovima</i>).
          </p>
          <p>
            Pojavljivanje silaznoga naglaska na nepočetnom slogu specifično je za niski varijetet
            (<i>pogledaj, ne vidim i sl.</i>). Takvi naglasni ostvaraji kod glagola još uvijek nisu opisani
            kao značajka razgovornoga stila standardnoga jezika, no u drugim slučajevima (<i>npr. studȅnt, dramatȕrg</i>) silazni je naglasak izvan početnoga sloga zabilježen kao razgovorni
            u suvremenim gramatikama jer se javlja i u visinkome naglasnom sustavu koji je u temelju
            standardnoga jezika (<i>npr. Hrvatska gramatika E. Barić i skupine autora</i>).
          </p>
        </div>

        {/* UDARNI NAGLASAK */}
        <div className="distribucijska-blok">
          <h2>Udarni naglasak i akut</h2>
          <p>
            Govornici koji često ostvaruju silazne naglaske na nepočetnom slogu, osobito u glagolima,
            najčešće su govornici koji govore udarnim naglasnim sustavom pa se svi njihovi naglasci
            mogu tumačiti kao udarni naglasci.
          </p>
          <p>
            Budući da je najsličniji kratkosilaznome, udarni naglasak često i bilježimo jednako kao
            kratkosilazni, ali govornici iz udarnoga sustava na mjestu dugouzlaznoga naglaska ponekad
            ostvaruju i dugi naglašeni slog koji je teško interpretirati.
          </p>
          <p>
            Percipira se kao udarni, kao udarni dugi ili kao ravan, a ponekad se, zbog očekivanja
            dugouzlaznoga, i percipira kao dugouzlazni.
          </p>

          <div className="napomena-akut">
            <strong>Akut</strong> je specifičan uzlazni naglasak koji se pojavljuje u dijalektima
            (<i>i nije dio standardnoga jezika</i>) i koji se može ostvariti na jednom slogu
            (<i>jã, mũl, žãl</i>) pa i na posljednjem slogu riječi
            (<i>vapõr, bidũn, papĩr</i>).
          </div>
        </div>

      </div>

      {/* KVIZ CTA - SAMO ZA PRIJAVLJENE */}
      <div className="kviz-cta">
        <h3>🧠 Provjeri svoje znanje</h3>
        <p>Nakon lekcije pokreni kratki kviz i provjeri koliko dobro razumiješ distribucijska pravila.</p>
        {isLoggedIn ? (
          <Link href="/kviz3" className="start-quiz-btn">
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