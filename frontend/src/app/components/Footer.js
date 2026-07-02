export default function Footer() {
  return (
    <footer className="footer">
      <div className="footersadrzaj">
        <div className="footerlijevo">
          <img src="/assets/images/knjiga1.png" alt="KSTR" />
          <img src="/assets/images/knjiga2.png" alt="KSTR" />
          <a href="https://ec.europa.eu/regional_policy/home_en" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/eunext.jpg" alt="EU" className="footer-logo" />
          </a>
          <a href="https://ffpu.unipu.hr/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/ffpulogo.png" alt="FFPU" className="footer-logo" />
          </a>
        </div>

        <div className="footerdesno">
        </div>
      </div>

      <div className="footerispod">©2025 Sva prava pridržana.</div>
    </footer>
  )
}