"use client";

import Image from "next/image";

export default function NaglasciUporabaPage() {
  return (
    <main className="bodyslusam">
      

      <div className="naslovna">
        <div className="content-container uporaba">
          
          <h1 className="glavni-naslov">Naglasci u uporabi</h1>

          <div className="slika-uporaba">
            <Image
              src="/assets/images/uporaba.png"
              alt="Naslovna slika stranice naglasci u uporabi"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="uporaba-intro">
        <h2>Naslov</h2>
        <p>
          Placeholder
        </p>
      </div>

    </main>
  );
}