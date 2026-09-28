"use client";

import Image from "next/image";

export default function Sva4PonavljamPage() {
  return (
    <main className="bodyslusam">

      <div className="naslovna">
        <div className="content-container sva4ponavljam">
          
          <h1 className="glavni-naslov">Sve 4 ponavljam</h1>

          <div className="slika-sva4ponavljam">
            <Image
              src="/assets/images/ponavljam.jpg"
              alt="Naslovna slika stranice sve 4 ponavljam"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="sva4ponavljam-intro u-izradi">
        <h2>U izradi</h2>
        <p>
          Ova stranica je trenutno u izradi. Vraćamo se uskoro s novim sadržajem!
        </p>
      </div>

    </main>
  );
}