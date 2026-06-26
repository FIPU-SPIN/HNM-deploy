import "./style.css";
import HeaderImg from "./components/HeaderImg";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>

        <HeaderImg />
        <MainNav />
        <Breadcrumbs />

        {children}

        <Footer />

      </body>
    </html>
  );
}