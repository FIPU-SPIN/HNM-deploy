import React from 'react';
import '../../style.css'; 

export default function RezultatiPage() {
  return (
    <div className="page-rezultati">
      <div className="content-container">
        <h1 className="glavni-naslov">Rezultati projekta</h1>

        <h2 className="podnaslov">Izlaganja na znanstvenim skupovima</h2>
        <div className="rad-citat">
          Martinović, Blaženka. 2025. “O neutralnosti standardnoga jezika”. (Dis)kontinuitet(i) u nacionalnoj filologiji: Međunarodni znanstveni skup povodom 150. godina kroatistike na Sveučilištu u Zagrebu. Knjižica sažetaka / Gligorić, Igor Marko; Kuštović, Tanja; Nikolić, Davor et al. (ur.). Zagreb: Filozofski fakultet Sveučilišta u Zagrebu - FF press, 72-73.
        </div>
        <div className="rad-citat">
          Vlašić Duić, Jelena. 2025. “Spikerski govor na Hrvatskoj radioteleviziji”. Istraživanja govora: Dvanaesti znanstveni skup s međunarodnim sudjelovanjem. Zagreb, 4. - 6. prosinca 2025.
        </div>

        <h2 className="podnaslov">Objavljeni znanstveni radovi</h2>
        <div className="rad-citat">
          Martinović, Blaženka. 2025. “O suvremenoj naglasnoj normi hrvatskoga jezika”. Filologija : časopis Razreda za filološke znanosti Hrvatske akademije znanosti i umjetnosti, 84, 159-185., DOI: 10.21857/mnlqgcpney
        </div>
      </div>
    </div>
  );
}