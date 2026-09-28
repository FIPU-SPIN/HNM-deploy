"use client";

import Image from "next/image";

export default function MjestoTonTrajanjePage() {
  return (
    <main className="bodyslusam">

      <div className="naslovna">
        <div className="content-container mjesto">
          
          <h1 className="glavni-naslov">Mjesto, ton i trajanje</h1>

          <div className="slika-mjesto">
            <Image
              src="/assets/images/mjesto.png"
              alt="Naslovna slika stranice mjesto, ton i trajanje"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="mjesto-intro u-izradi">
        <h2>U izradi</h2>
        <p>
          Ova stranica je trenutno u izradi. Vraćamo se uskoro s novim sadržajem!
        </p>
      </div>

    </main>
  );
}