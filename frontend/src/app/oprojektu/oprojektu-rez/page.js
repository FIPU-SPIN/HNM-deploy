import React from 'react';
import '../../style.css'; 

export default function RezultatiPage() {
  return (
    <div className="page-rezultati">
      <div className="content-container">
        <h1 className="glavni-naslov">Rezultati projekta</h1>

        <h2 className="podnaslov">Izlaganja na znanstvenim skupovima</h2>
        
        <div className="rad-citat">
          Martinović, Blaženka. 2026. "Opis i popis analoškoga pomicanje naglasaka prema početku riječi", Jezik od konceptualizacije do primjene – 40. međunarodni znanstveni skup Hrvatskoga društva za primijenjenu lingvistiku, Pula, 25. – 27. lipnja 2026.
        </div>
        <div className="rad-citat">
          Pletikos Olof, Elenmari. 2026. "Varijabilnost hrvatskih naglasaka: što čuje čovjek, a što stroj". Jezik od konceptualizacije do primjene – 40. međunarodni znanstveni skup Hrvatskoga društva za primijenjenu lingvistiku, Pula, 25. – 27. lipnja 2026.
        </div>
        <div className="rad-citat">
          Vlašić Duić, Jelena. 2026. "Govorna interpretacija poezije Poetski tren Gordane Kovačić". Jezik od konceptualizacije do primjene – 40. međunarodni znanstveni skup Hrvatskoga društva za primijenjenu lingvistiku, Pula, 25. – 27. lipnja 2026.
        </div>
        <div className="rad-citat">
          Ljubešić, Nikola. 2026. "Reaping the Fruits of the AI Revolution for Language Research in a Scientifically Responsible Way". Jezik od konceptualizacije do primjene – 40. međunarodni znanstveni skup Hrvatskoga društva za primijenjenu lingvistiku, Pula, 25. – 27. lipnja 2026.
        </div>
        <div className="rad-citat">
          Porupski, Ivan i sur. 2026. "CLASSLA-Express 3.0: radionice o upotrebi CLARIN.SI resursa u jezičnim istraživanjima: Govorni i mrežni korpusi u istraživanju jezične varijacije". Jezik od konceptualizacije do primjene – 40. međunarodni znanstveni skup Hrvatskoga društva za primijenjenu lingvistiku, pretkonferencijsko zbivanje, Pula, 24. lipnja 2026.
        </div>
        <div className="rad-citat">
          Martinović, Blaženka; Jurišić, Nikolina. 2026. "Hrvatski i engleski izgovor od učionice do mrežne aplikacije". 22. dani Mate Demarina, međunarodni znanstveni skup Tradicija i suvremenost u odgoju i obrazovanju – bezvremenski susret, Pula, 23. i 24. travnja 2026.
        </div>
        <div className="rad-citat">
          Martinović, Blaženka. 2025. "O neutralnosti standardnoga jezika". (Dis)kontinuitet(i) u nacionalnoj filologiji: Međunarodni znanstveni skup povodom 150. godina kroatistike na Sveučilištu u Zagrebu. Knjižica sažetaka / Gligorić, Igor Marko; Kuštović, Tanja; Nikolić, Davor et al. (ur.). Zagreb: Filozofski fakultet Sveučilišta u Zagrebu - FF press, 72-73.
        </div>
        <div className="rad-citat">
          Vlašić Duić, Jelena. 2025. "Spikerski govor na Hrvatskoj radioteleviziji". Istraživanja govora: Dvanaesti znanstveni skup s međunarodnim sudjelovanjem. Zagreb, 4. - 6. prosinca 2025.
        </div>

        <h2 className="podnaslov">Objavljeni znanstveni radovi</h2>
        <div className="rad-citat">
          Martinović, Blaženka. 2025. "O suvremenoj naglasnoj normi hrvatskoga jezika". Filologija : časopis Razreda za filološke znanosti Hrvatske akademije znanosti i umjetnosti, 84, 159-185., DOI: 10.21857/mnlqgcpney
        </div>

        <div className="projekt-link-container">
          <a 
            href="https://www.unipu.hr/npoo/projekti/hnm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="projekt-link-button"
          >
            🔗 Službena stranica projekta
          </a>
        </div>
      </div>
    </div>
  );
}