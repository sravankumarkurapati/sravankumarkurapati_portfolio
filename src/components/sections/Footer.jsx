import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { SiLeetcode } from "react-icons/si";

/* ─── Styled Components ─── */

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  position: relative;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
`;

const Nav = styled.ul`
  width: 100%;
  max-width: 900px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  list-style: none;
  padding: 0;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 8px;
`;

const SocialMediaIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.25s ease;
  background: rgba(255, 255, 255, 0.03);
  &:hover {
    color: ${({ hovercolor, theme }) => hovercolor || theme.primary};
    border-color: ${({ hovercolor, theme }) => hovercolor || theme.primary};
    background: ${({ hovercolor, theme }) =>
      (hovercolor || theme.primary) + "18"};
    transform: translateY(-3px);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 0.5rem;
  padding: 10px 22px;
  border: 1px solid rgba(133, 76, 230, 0.2);
  border-radius: 50px;
  background: rgba(133, 76, 230, 0.05);
`;

const PulseDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #854ce6;
  display: inline-block;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const StatText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const StatCount = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Copyright = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

/* ─── Component ─── */

const Footer = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/sravankumarkurapati-portfolio/visits/up")
      .then((r) => r.json())
      .then((d) => { if (d?.count) setCount(d.count.toLocaleString()); })
      .catch(() => {});
  }, []);

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Sravan Kumar Kurapati</Logo>

        <Nav>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Resume">Resume</NavLink>
          <NavLink href="#Contact">Contact</NavLink>
        </Nav>

        <SocialMediaIcons>
          {Bio.linkedin && (
            <SocialMediaIcon
              href={Bio.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              hovercolor="#0A66C2"
            >
              <LinkedIn fontSize="inherit" />
            </SocialMediaIcon>
          )}
          {Bio.github && (
            <SocialMediaIcon
              href={Bio.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              hovercolor="#a371f7"
            >
              <GitHub fontSize="inherit" />
            </SocialMediaIcon>
          )}
          {Bio.leetcode && (
            <SocialMediaIcon
              href={Bio.leetcode}
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              hovercolor="#FFA116"
            >
              <SiLeetcode size={20} />
            </SocialMediaIcon>
          )}
        </SocialMediaIcons>

        <StatsRow>
          <PulseDot />
          <StatText>Total visits</StatText>
          <StatCount>{count ?? "—"}</StatCount>
        </StatsRow>

        <Copyright>
          &copy; {new Date().getFullYear()} Sravan Kumar Kurapati. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
