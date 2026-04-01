import React, { useState, useEffect, useRef } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded, CloseRounded, KeyboardArrowDownRounded } from "@mui/icons-material";

/* ─── Styled Components ─── */

const Nav = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  color: white;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;

  background-color: ${({ scrolled, theme }) =>
    scrolled ? "rgba(9, 9, 23, 0.88)" : theme.bg};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(12px)" : "none")};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 2px 24px rgba(0,0,0,0.35)" : "none"};
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ active, theme }) => (active ? theme.primary : theme.text_primary)};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

/* ─── Dropdown ─── */

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ active, theme }) => (active ? theme.primary : theme.text_primary)};
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(9, 9, 23, 0.97);
  border: 1px solid ${({ theme }) => theme.primary + "44"};
  border-radius: 12px;
  padding: 8px 0;
  min-width: 190px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px 20px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + "22"};
    color: ${({ theme }) => theme.primary};
    padding-left: 26px;
  }
`;

/* ─── Right button area ─── */

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 6px;
  gap: 12px;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

/* ─── Mobile ─── */

const MobileIcon = styled.div`
  height: 100%;
  display: none;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 40px 28px 40px;
  list-style: none;
  background: ${({ theme }) => theme.card_light + "ee"};
  backdrop-filter: blur(12px);
  position: absolute;
  top: 80px;
  right: 0;
  left: 0;
  transition: all 0.35s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-110%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "999" : "-1")};
`;

const MobileSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.primary + "33"};
  margin: 2px 0;
`;

const MobileSubLink = styled.a`
  padding-left: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;
  &::before {
    content: "→ ";
    color: ${({ theme }) => theme.primary};
  }
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

/* ─── Component ─── */

const SECTIONS = ["About", "Experience", "Projects", "Skills", "Resume", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const theme = useTheme();

  // Glassmorphism on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking
      let current = "";
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dispatch custom event so Projects section can pre-select a tab
  const handleProjectTabClick = (tab) => {
    setDropdownOpen(false);
    window.dispatchEvent(new CustomEvent("setProjectTab", { detail: tab }));
    const el = document.getElementById("Projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const closeMobile = () => setIsOpen(false);

  return (
    <Nav scrolled={scrolled}>
      <NavbarContainer>
        <NavLogo to="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          Sravan Kumar Kurapati
        </NavLogo>

        {/* ── Hamburger ── */}
        <MobileIcon onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <CloseRounded style={{ color: "inherit" }} />
          ) : (
            <MenuRounded style={{ color: "inherit" }} />
          )}
        </MobileIcon>

        {/* ── Desktop nav ── */}
        <NavItems>
          <li>
            <NavLink href="#About" active={activeSection === "About"}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink href="#Experience" active={activeSection === "Experience"}>
              Experience
            </NavLink>
          </li>

          {/* Projects dropdown */}
          <li ref={dropdownRef}>
            <DropdownWrapper>
              <DropdownTrigger
                active={activeSection === "Projects"}
                onClick={() => setDropdownOpen((o) => !o)}
              >
                Projects
                <KeyboardArrowDownRounded
                  style={{
                    fontSize: 18,
                    transition: "transform 0.2s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu open={dropdownOpen} theme={theme}>
                <DropdownItem onClick={() => handleProjectTabClick("backend")}>
                  Backend Projects
                </DropdownItem>
                <DropdownItem onClick={() => handleProjectTabClick("full stack")}>
                  Full Stack Projects
                </DropdownItem>
                <DropdownItem onClick={() => handleProjectTabClick("ai/ml")}>
                  AI / ML Projects
                </DropdownItem>
              </DropdownMenu>
            </DropdownWrapper>
          </li>

          <li>
            <NavLink href="#Skills" active={activeSection === "Skills"}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink href="#Resume" active={activeSection === "Resume"}>
              Resume
            </NavLink>
          </li>
          <li>
            <NavLink href="#Contact" active={activeSection === "Contact"}>
              Contact
            </NavLink>
          </li>
        </NavItems>

        {/* ── GitHub button ── */}
        <ButtonContainer>
          <GithubButton href={Bio.github} target="_blank" rel="noreferrer">
            Github Profile
          </GithubButton>
        </ButtonContainer>

        {/* ── Mobile slide-in menu ── */}
        <MobileMenu isOpen={isOpen}>
          <NavLink onClick={closeMobile} href="#About">
            About
          </NavLink>
          <NavLink onClick={closeMobile} href="#Experience">
            Experience
          </NavLink>

          {/* Projects sub-group in mobile */}
          <NavLink
            onClick={closeMobile}
            href="#Projects"
          >
            Projects
          </NavLink>
          <MobileSubLink
            onClick={() => {
              closeMobile();
              handleProjectTabClick("backend");
            }}
          >
            Backend Projects
          </MobileSubLink>
          <MobileSubLink
            onClick={() => {
              closeMobile();
              handleProjectTabClick("full stack");
            }}
          >
            Full Stack Projects
          </MobileSubLink>
          <MobileSubLink
            onClick={() => {
              closeMobile();
              handleProjectTabClick("ai/ml");
            }}
          >
            AI / ML Projects
          </MobileSubLink>

          <MobileSeparator />

          <NavLink onClick={closeMobile} href="#Skills">
            Skills
          </NavLink>
          <NavLink onClick={closeMobile} href="#Resume">
            Resume
          </NavLink>
          <NavLink onClick={closeMobile} href="#Contact">
            Contact
          </NavLink>

          <MobileSeparator />

          <GithubButton
            href={Bio.github}
            target="_blank"
            rel="noreferrer"
            style={{ background: theme.primary, color: theme.text_primary }}
          >
            Github Profile
          </GithubButton>
        </MobileMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
