"use client";

import Image from "next/image";

export default function SlusamPage() {
  return (
    <main className="bodyslusam">
      

      <div className="naslovna">
        <div className="content-container slusam">
          
          <h1 className="glavni-naslov">Slušam</h1>

          <div className="slika-slusam">
            <Image
              src="/assets/images/slusam.jpg"
              alt="Naslovna slika stranice slušam"
              width={1000}
              height={800}
              priority
            />
          </div>

        </div>
      </div>

      <div className="slusam-intro">
        <h2>Naslov</h2>
        <p>
          Placeholder
        </p>
      </div>

    </main>
  );
}