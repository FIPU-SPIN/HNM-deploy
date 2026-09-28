"use client";

import Image from "next/image";

export default function IzgovaramPage() {
  return (
    <main className="bodyslusam">

      <div className="naslovna">
        <div className="content-container izgovaram">
          
          <h1 className="glavni-naslov">Izgovaram</h1>

          <div className="slika-izgovaram">
            <Image
              src="/assets/images/izgovaram.jpg"
              alt="Naslovna slika stranice izgovaram"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="izgovaram-intro u-izradi">
        <h2>U izradi</h2>
        <p>
          Ova stranica je trenutno u izradi. Vraćamo se uskoro s novim sadržajem!
        </p>
      </div>

    </main>
  );
}