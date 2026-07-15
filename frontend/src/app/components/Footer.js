export default function Footer() {
  return (
    <footer className="footer">
      <div className="footersadrzaj">
        <div className="footerlijevo">
          <a href="https://accva.uniri.hr/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/knjiga1.png" alt="Naglasci i jezični varijeteti" />
          </a>
          <a href="https://naglasci.ffzg.unizg.hr/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/knjiga2.jpg" alt="Kiša, sunce, trava, rosa" />
          </a>
          <img src="/assets/images/knjiga3.jpg" alt="KSTR" />
        </div>

        <div className="footerdesno">
          <a href="https://ec.europa.eu/regional_policy/home_en" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/eunext.jpg" alt="EU" className="footer-logo" />
          </a>
          <a href="https://ffpu.unipu.hr/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/ffpu.png" alt="FFPU" className="footer-logo" />
          </a>
        </div>
      </div>

      <div className="footerispod">©2026 Sva prava pridržana.</div>
    </footer>
  );
}