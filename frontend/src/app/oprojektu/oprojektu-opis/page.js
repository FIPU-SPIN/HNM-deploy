import React from 'react';
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

      </div>
    </div>
  );
}