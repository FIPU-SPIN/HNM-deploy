"use client";

import Image from "next/image";

export default function GlagoliPage() {
  return (
    <main className="bodyslusam">

      <div className="naslovna">
        <div className="content-container glagoli">
          
          <h1 className="glavni-naslov">Glagoli u mreži</h1>

          <div className="slika-glagoli">
            <Image
              src="/assets/images/glagoli.jpg"
              alt="Naslovna slika stranice glagoli u mreži"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="glagoli-intro u-izradi">
        <h2>U izradi</h2>
        <p>
          Ova stranica je trenutno u izradi. Vraćamo se uskoro s novim sadržajem!
        </p>
      </div>

    </main>
  );
}