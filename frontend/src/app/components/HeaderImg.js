import Image from "next/image";

export default function HeaderImg() {
  return (
    <header className="header-slike">
      <a href="#" className="header-slike-link">
        <Image src="/assets/images/kisa2.png" alt="slika 1" fill sizes="(max-width: 480px) 70px, (max-width: 1400px) 15vw, 150px" style={{ objectFit: "cover" }} />
      </a>
      <a href="#" className="header-slike-link">
        <Image src="/assets/images/sunce2.png" alt="slika 2" fill sizes="(max-width: 480px) 70px, (max-width: 1400px) 15vw, 150px" style={{ objectFit: "cover" }} />
      </a>
      <a href="#" className="header-slike-link">
        <Image src="/assets/images/trava2.png" alt="slika 3" fill sizes="(max-width: 480px) 70px, (max-width: 1400px) 15vw, 150px" style={{ objectFit: "cover" }} />
      </a>
      <a href="#" className="header-slike-link">
        <Image src="/assets/images/rosa2.png" alt="slika 4" fill sizes="(max-width: 480px) 70px, (max-width: 1400px) 15vw, 150px" style={{ objectFit: "cover" }} />
      </a>
    </header>
  );
}