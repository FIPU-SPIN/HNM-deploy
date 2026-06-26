"use client";

import Image from "next/image";

export default function ZanaglasnaPage() {
  return (
    <main className="bodyslusam">
      

      <div className="naslovna">
        <div className="content-container duzina">
          
          <h1 className="glavni-naslov">Naglasci i zanaglasna dužina</h1>

          <div className="slika-duzina">
            <Image className = "gl slike cloud"
              src="/assets/images/zanaglasna.png"
              alt="Naslovna slika stranice naglasci i zanaglasna dužina"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="duzina-intro">
        <h2>Naslov</h2>
        <p>
          Placeholder
        </p>
      </div>

    </main>
  );
}