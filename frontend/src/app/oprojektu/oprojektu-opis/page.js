import React from 'react';
import Image from 'next/image';
import '../../style.css'; 

export default function OProjektuOpisPage() {
  return (
    <div className="page-op">
      <div className="content-container">
        <h1 className="glavni-naslov">O projektu</h1>
        
        <h2 className="podnaslov">KRATAK OPIS PROJEKTA:</h2>
        <p className="tekst-odlomak">
          Projekt Hrvatski naglasci na mreži (HNM) okuplja interdisciplinarni tim stručnjaka iz kroatistike, fonetike, računarstva, elektrotehnike i informatike. Usmjeren je na razvoj inovativnih digitalnih alata za učenje i poučavanje hrvatskih standardnih naglasaka. Ciljevi su projekta: mrežne aplikacije za uvježbavanje i testiranje percepcije i produkcije hrvatskih naglasaka (standardnojezičnih i udarnoga te regiolekata), zatim nadogradnja aplikacije automatskim anotiranjem mjesta naglasak te na koncu izrada ozvučenoga repozitorija glagola kao temelja budućega mrežnoga ozvučenog rječnika. Alati za uvježbavanje percepcije i produkcije naglasaka omogućuju stjecanje vještina koje su nužne za služenje ozvučenim rječnikom te su, stoga, preduvjet ozvučivanju hrvatske leksičke građe, smještene u komunikacijski kontekst i ovjerene govornim korpusima. Istraživački dio obuhvaća prikupljanje i akustičku obradu govornoga korpusa (arhetipski spikerski izgovor i regiolekti) te definiranje arhetipskih izgovora naglasaka, nakon akustičkih analiza (tona i trajanja). Zatim slijedi analiza korpusa glagola, svrstavanje u naglasne tipove i podtipove, analiza hiperkorekcija (na temelju korpusa parlamentaraca) i automatskih anotacija mjesta naglasaka. Tim Fakulteta informatike u Puli, zajedno s vanjskim suradnicima s Instituta u Ljubljani, razvija mrežne aplikacije, implementira akustičke analize, obrađuje izgovor naglasaka i digitalnu infrastrukturu (cloud rješenja, primjena velikih jezičnih modela i govornih transformera). Projekt će omogućiti razvoj novih obrazovnih alata, mrežnih izvora za hrvatski jezik te znanstveni doprinos hrvatskoj akcentologiji, fonetici i metodici poučavanja hrvatskih naglasaka. Također, pridonijet će digitalnoj tranziciji i povećanju međunarodne vidljivosti Sveučilišta Jurja Dobrile u Puli.
        </p>

        <h2 className="podnaslov">CILJEVI projekta:</h2>
        <p className="tekst-odlomak">
          Svrha je projekta omogućiti uspješno testiranje percepcije i produkcije naglasaka, s obzirom na varijabilnost usvojenoga naglasnog sustava govornika (i onih koji su iz područja s visinskim naglasnim sustavom i onih koji su iz područja s udarnim naglasnim sustavom) te izraditi ozvučeni repozitorij glagola. Na temelju dosadašnjih istraživanja i poučavanja hrvatskoga naglasnog sustava ovim se projektom planira metodološki razraditi poučavanje naglasaka hrvatskoga jezika u digitalnom okruženju. Pojedinačni ciljevi odnose se na sljedeće: doprinijeti otvorenoj znanosti objavom rezultata istraživanja te izradom ozvučenoga repozitorija i alata; razviti digitalne alate za automatsko prepoznavanje hrvatskih naglasaka (standardnojezičnih i udarnoga) i automatsko anotiranje mjesta naglasaka; popularizirati znanost izradom aplikacija namijenjenih učenju i poučavanju naglasne norme, tj. percepcije i produkcije; unaprijediti studije kroatistike i fonetike te svih studija kojima je standardni govor strukom; jačati interdisciplinarnost znanstvenoga rada, konkretno kroatistike, fonetike, računarstva i informatike; i na koncu uspostaviti suradnju s drugim znanstvenim institucijama u okviru projekta, s ciljem implementacije velikih jezičnih modela te govornih transformera za analizu i obradu govora, fonetskih i sociofonetskih istraživanja.
        </p>

        <h2 className="podnaslov">VODITELJ I SURADNICI NA PROJEKTU:</h2>
        <div className="tim-lista">
          <p><strong>Prof. dr. sc. Blaženka Martinović</strong>, voditeljica (Odsjek za kroatistiku, Filozofski fakultet Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Doc. dr. sc. Mieta Bobanović Dasko</strong> (Fakultet informatike Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Nikolina Jurišić</strong>, doktorandica (Odsjek za anglistiku, Filozofski fakultet Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Ratomir Karlović</strong>, mag. inf. (Fakultet informatike Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Dario Kukuljan</strong>, predavač, stručni suradnik (Sveučilišni računski i informacijski centar)</p>
          <p><strong>Doc. dr. sc. Ivan Lorencin</strong> (Fakultet informatike Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Mia Rovis</strong>, univ. mag. inf. (Fakultet informatike Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Marijela Miličević</strong>, mag. educ. inf. (Fakultet informatike Sveučilišta Jurja Dobrile u Puli)</p>
          <p><strong>Doc. dr. sc. Nikola Tanković</strong> (Fakultet informatike Sveučilišta Jurja Dobrile u Puli)</p>
        </div>

        <h3 className="podnaslov-vanjski">Vanjski suradnici:</h3>
        <div className="tim-lista">
          <p><strong>Doc. dr. sc. Nikola Ljubešić</strong> (Centar znanja CLASSLA / Knowledge centre for South Slavic languages i Institut "Jožef Stefan" / Department of Knowledge Technologies, Jožef Stefan Institute, Ljubljana, Slovenija)</p>
          <p><strong>Red. prof. Mihaela Matešić</strong> (Odsjek za kroatistiku, Filozofski fakultet Sveučilišta u Rijeci)</p>
          <p><strong>Izv. prof. Elenmari Pletikos Olof</strong> (Odsjek za fonetiku, Filozofski fakultet Sveučilišta u Zagrebu)</p>
          <p><strong>Ivan Porupski</strong> (Centar znanja CLASSLA / Knowledge centre for South Slavic languages i Institut "Jožef Stefan" / Department of Knowledge Technologies, Jožef Stefan Institute, Ljubljana, Slovenija)</p>
          <p><strong>Red. prof. Jelena Vlašić Duić</strong> (Odsjek za fonetiku, Filozofski fakultet Sveučilišta u Zagrebu)</p>
        </div>

<div className="tim-slika-container">
  <Image
    src="/assets/images/tim.jpg"
    alt="Tim projekta Hrvatski naglasci na mreži"
    width={600}
    height={400}
    className="tim-slika"
    priority
  />
</div>

      </div>
    </div>
  );
}