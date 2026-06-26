"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Burger from "./Burger";
import { User, LogOut } from "lucide-react";

export default function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setDropdownOpen] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  checkAuth();

  window.addEventListener("storage", checkAuth);
  window.addEventListener("authChange", checkAuth);

  return () => {
    window.removeEventListener("storage", checkAuth);
    window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(dropdownName);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  return (
    <nav className="main-nav">
      <div className="nav-row">
        <span className="navnaslov">
          <Link href="/">Hrvatski naglasci na mreži</Link>
        </span>

        <Burger 
          isOpen={menuOpen} 
          onClick={() => setMenuOpen(!menuOpen)} 
        />

        <ul
          className={`nav-linkovi ${menuOpen ? "active" : ""}`}
          onClick={(e) => {
            if (e.target.tagName === "A") {
              setMenuOpen(false);
              setDropdownOpen(null);
            }
          }}
        >

          {/* O PROJEKTU */}
          <li className="dropdown">
            <div className="dropdown-header">
              <Link href="/oprojektu" className="dropdown-trigger">
                O projektu
              </Link>

              <span
                className={`arrow ${openDropdown === "oprojektu" ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown("oprojektu");
                }}
              >
                ▾
              </span>
            </div>

            <ul className={`dropdown-menu ${openDropdown === "oprojektu" ? "open" : ""}`}>
              <li><Link href="/oprojektu/oprojektu-opis">Opis projekta</Link></li>
              <li><Link href="/oprojektu/oprojektu-rez">Rezultati projekta</Link></li>
              <li><Link href="/oprojektu/oprojektu-ostranici">O mrežnim stranicama i aplikaciji</Link></li>
            </ul>
          </li>

          {/* ŠTO SVE ZNAM */}
          <li className="dropdown">
            <div className="dropdown-header">
              <Link href="/stosveznam" className="dropdown-trigger">
                Što sve znam?
              </Link>

              <span
                className={`arrow ${openDropdown === "stosveznam" ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown("stosveznam");
                }}
              >
                ▾
              </span>
            </div>

            <ul className={`dropdown-menu ${openDropdown === "stosveznam" ? "open" : ""}`}>
              <li><Link href="/stosveznam/GovornaRijec">Govorna riječ</Link></li>
              <li><Link href="/stosveznam/Inventar">Inventar</Link></li>
              <li><Link href="/stosveznam/Distribucijska">Distribucijska pravila</Link></li>
              <li><Link href="/stosveznam/NaglasciUParadigmi">Naglasci u paradigmi</Link></li>
            </ul>
          </li>

          {/* SLUŠAM */}
          <li className="dropdown">
            <div className="dropdown-header">
              <Link href="/slusam" className="dropdown-trigger">
                Slušam
              </Link>

              <span
                className={`arrow ${openDropdown === "slusam" ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown("slusam");
                }}
              >
                ▾
              </span>
            </div>

            <ul className={`dropdown-menu ${openDropdown === "slusam" ? "open" : ""}`}>
              <li><Link href="/slusam/MjestoTonTrajanje">Mjesto, ton i trajanje</Link></li>
              <li><Link href="/slusam/Zanaglasna">Naglasci i zanaglasna dužina</Link></li>  
              <li><Link href="/slusam/NaglasciUporaba">Naglasci u uporabi</Link></li>
            </ul>
          </li>

          {/* IZGOVARAM */}
          <li className="dropdown">
            <div className="dropdown-header">
              <Link href="/izgovaram" className="dropdown-trigger">
                Izgovaram
              </Link>

              <span
                className={`arrow ${openDropdown === "izgovaram" ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown("izgovaram");
                }}
              >
                ▾
              </span>
            </div>

            <ul className={`dropdown-menu ${openDropdown === "izgovaram" ? "open" : ""}`}>
              <li><Link href="/izgovaram/placeholder1">placeholder</Link></li>
            </ul>
          </li>

          {/* SVA 4 PONAVLJAM */}
          <li className="dropdown">
            <div className="dropdown-header">
              <Link href="/sva4ponavljam" className="dropdown-trigger">
                Sva 4 ponavljam
              </Link>

              <span
                className={`arrow ${openDropdown === "sva4ponavljam" ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown("sva4ponavljam");
                }}
              >
                ▾
              </span>
            </div>

            <ul className={`dropdown-menu ${openDropdown === "sva4ponavljam" ? "open" : ""}`}>
              <li><Link href="/sva4ponavljam/placeholder1">placeholder</Link></li>
            </ul>
          </li>

          {/* GLAGOLI U MREZI */}
          <li className="dropdown">
            <div className="dropdown-header">
              <Link href="/glagoli-u-mrezi" className="dropdown-trigger">
                Glagoli u mreži
              </Link>

              <span
                className={`arrow ${openDropdown === "glagoli-u-mrezi" ? "open" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown("glagoli-u-mrezi");
                }}
              >
                ▾
              </span>
            </div>

            <ul className={`dropdown-menu ${openDropdown === "glagoli-u-mrezi" ? "open" : ""}`}>
              <li><Link href="/glagoli-u-mrezi/placeholder1">placeholder</Link></li>
            </ul>
          </li>


          {/* LOGIN/REG/LOGOUT */}
          
          <li className="nav-login-icon">
            {isLoggedIn === null ? null : (
              isLoggedIn ? (
                <button onClick={handleLogout} title="Odjava">
                  <LogOut size={22} className="logout-icon"/>
                </button>
              ) : (
                <Link href="/login">
                  <User size={22} />
                </Link>
              )
            )}
          </li>

        </ul>

      </div>

      {menuOpen && (
        <div className="nav-overlay active" onClick={() => setMenuOpen(false)} />
      )}

    </nav>
  );
}