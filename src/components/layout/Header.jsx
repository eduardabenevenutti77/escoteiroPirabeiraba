import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles/Header.module.css";
import brandLogo from "../../assets/brand-logo.webp";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveSubMenu(null);
  };

  const handleSubMenuHover = (menuName) => {
    setActiveSubMenu(menuName);
  };

  const handleSubMenuLeave = () => {
    setActiveSubMenu(null);
  };

  const handleAnchorClick = (anchor) => (e) => {
    e.preventDefault();
    const element = document.querySelector(anchor);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    closeMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setActiveSubMenu(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLogoContainer}>
          <Link to="/">
            <img
              src={brandLogo}
              alt="Logo do Grupo Escoteiro Pirabeiraba"
              width={50}
              height={"auto"}
            />
            <h1>Grupo Escoteiro Pirabeiraba</h1>
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navItens}>
            <li>
              <a
                href="/#"
                className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""
                  }`}
              >
                Início
              </a>
            </li>
            <li
              className={styles.dropdown}
              onMouseEnter={() => handleSubMenuHover("atividades")}
              onMouseLeave={handleSubMenuLeave}
            >
              <span className={`${styles.navLink} ${styles.hasSubmenu}`}>
                Atividades
                <ChevronDown size={16} className={styles.chevronIcon} />
              </span>
              <ul
                className={`${styles.subMenu} ${activeSubMenu === "atividades" ? styles.subMenuActive : ""
                  }`}
              >
                <li>
                  <a
                    className={styles.navLink}
                    href="#atividades"
                    onClick="/#atividades"
                  >
                    Atividades
                  </a>
                </li>
                <li>
                  <Link className={styles.navLink} to="/eventos">
                    Eventos
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                className={styles.navLink}
                href="/#nossamissao"
                onClick={closeMenu}
              >
                Nossa Missão
              </a>
            </li>
            <li
              className={styles.dropdown}
              onMouseEnter={() => handleSubMenuHover("ramos")}
              onMouseLeave={handleSubMenuLeave}
            >
              <span className={`${styles.navLink} ${styles.hasSubmenu}`}>
                Ramos
                <ChevronDown size={16} className={styles.chevronIcon} />
              </span>
              <ul
                className={`${styles.subMenu} ${activeSubMenu === "ramos" ? styles.subMenuActive : ""
                  }`}
              >
                <li>
                  <Link className={styles.navLink} to="/ramos/lobinho">
                    Ramo Lobinho
                  </Link>
                </li>
                <li>
                  <Link className={styles.navLink} to="/ramos/escoteiro">
                    Ramo Escoteiro
                  </Link>
                </li>
                <li>
                  <Link className={styles.navLink} to="/ramos/senior">
                    Ramo Sênior
                  </Link>
                </li>
                <li>
                  <Link className={styles.navLink} to="/ramos/pioneiro">
                    Ramo Pioneiro
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                className={styles.navLink}
                href="/#contato"
                onClick={closeMenu}
              >
                Contato
              </a>
            </li>
            <li>
              <a
                className={styles.linkButton}
                href="/#contato"
                onClick={closeMenu}
              >
                Fale Conosco
              </a>
            </li>
          </ul>
        </nav>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          type="button"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </header>

      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ""}`}
        onClick={closeMenu}
      ></div>

      <div
        className={`${styles.animatedMenu} ${isMenuOpen ? styles.menuActive : ""}`}
      >
        <div className={styles.headerLogoContainer}>
          <Link to="/" onClick={closeMenu}>
            <img
              src={brandLogo}
              alt="Logo do Grupo Escoteiro Pirabeiraba"
              width={50}
              height={"auto"}
            />
            <h1>Grupo Escoteiro Pirabeiraba</h1>
          </Link>
        </div>

        <nav className={styles.mobileNav}>
          <ul className={styles.navItens}>
            <li>
              <Link to="/" onClick={closeMenu}>
                Início
              </Link>
            </li>
            <li>
              <a href="#atividades" onClick={handleAnchorClick("#atividades")}>
                Atividades
              </a>
            </li>
            <li>
              <a
                href="#nossamissao"
                onClick={handleAnchorClick("#nossamissao")}
              >
                Nossa Missão
              </a>
            </li>
            <li>
              <Link to="/ramos/lobinho" onClick={closeMenu}>
                Ramo Lobinho
              </Link>
            </li>
            <li>
              <Link to="/ramos/escoteiro" onClick={closeMenu}>
                Ramo Escoteiro
              </Link>
            </li>
            <li>
              <Link to="/ramos/senior" onClick={closeMenu}>
                Ramo Sênior
              </Link>
            </li>
            <li>
              <Link to="/ramos/pioneiro" onClick={closeMenu}>
                Ramo Pioneiro
              </Link>
            </li>
            <li>
              <a href="#contato" onClick={handleAnchorClick("#contato")}>
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
