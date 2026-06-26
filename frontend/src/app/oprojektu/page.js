import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import '../style.css'; 

export default function OProjektuGlavnaPage() {
  return (
    <div className="page-hub">
      <div className="content-container">
        <h1 className="glavni-naslov center-text">O projektu</h1>
        
        {/* Ispravljena putanja do slike! */}
        <div className="slika-hub-container">
          <Image 
            src="/assets/images/oprojektu.jpg" 
            alt="Naslovna slika projekta"
            width={800} 
            height={400} 
            className="slika-hub"
            priority 
          />
        </div>

        <p className="tekst-odlomak center-text">Odaberite što želite saznati:</p>
        
        <div className="botuni-container">
          <Link href="/oprojektu/oprojektu-opis" className="botun-op">
            Opis projekta
          </Link>
          <Link href="/oprojektu/oprojektu-rez" className="botun-rez">
            Rezultati projekta
          </Link>
          <Link href="/oprojektu/oprojektu-ostranici" className="botun-app">
            O mrežnoj stranici i aplikacijama
          </Link>
        </div>
      </div>
    </div>
  );
}