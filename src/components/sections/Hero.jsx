import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import { SiLeetcode } from "react-icons/si";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage.jpg";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";

/* ─── Expertise domain data (from existing codebase only) ─── */
const domains = [
  {
    id: "backend",
    icon: "⚙️",
    label: "Backend Engineer",
    color: "#854CE6",        // existing theme.primary purple
    glow: "rgba(133,76,230,0.35)",
    tagline: "Enterprise-scale systems built for performance",
    techs: ["Java", "Spring Boot", "Microservices", "REST APIs", "Oracle"],
    tab: "backend",
  },
  {
    id: "fullstack",
    icon: "🌐",
    label: "Full Stack Developer",
    color: "#13ADC7",        // cyan — already used in HeroBgAnimation SVG
    glow: "rgba(19,173,199,0.30)",
    tagline: "End-to-end web apps from database to UI",
    techs: ["React", "Node.js", "Angular", "MongoDB", "TypeScript"],
    tab: "full stack",
  },
  {
    id: "aiml",
    icon: "🤖",
    label: "AI / ML Engineer",
    color: "#F46737",        // orange — already used in HeroBgAnimation SVG
    glow: "rgba(244,103,55,0.30)",
    tagline: "GenAI · LLMs · RAG pipelines · Agentic AI",
    // TODO: Replace with real AI/ML skills once added to constants.js
    techs: ["GenAI", "LLMs", "RAG", "Prompt Eng.", "Fine-tuning"],
    tab: "ai/ml",
  },
];

/* ─── Top section — unchanged from original ─── */

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 20px 30px 36px;
  z-index: 1;

  @media (max-width: 960px) { padding: 20px 16px 32px; }
  @media (max-width: 640px) { padding: 16px 16px 28px; }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  @media (max-width: 960px) { flex-direction: column; }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  @media (max-width: 640px) { margin-bottom: 10px; }
`;

/* Greeting line above name */
const Greeting = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 17px;
  }
`;

/* "Sravan Kumar" — clean bright white */
const GradientName = styled.div`
  font-size: 52px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -1.5px;
  color: #ffffff;

  @media (max-width: 960px) {
    font-size: 42px;
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 34px;
  }
`;

/* "Kurapati" — gradient fill, no stroke */
const OutlineName = styled.div`
  font-size: 52px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -1.5px;
  background: linear-gradient(90deg, #854ce6 0%, #13adc7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 960px) {
    font-size: 42px;
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 34px;
  }
`;

/* Thin decorative accent line under the name */
const NameUnderline = styled.div`
  width: 48px;
  height: 3px;
  border-radius: 4px;
  background: linear-gradient(90deg, #854ce6, #13adc7);
  margin: 10px 0 16px;
  @media (max-width: 960px) { margin: 10px auto 16px; }
`;

/* Role / typewriter row */
const TextLoop = styled.div`
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 4px;
  @media (max-width: 960px) {
    justify-content: center;
    font-size: 17px;
    flex-wrap: wrap;
  }
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 960px) { font-size: 18px; }
`;

const SubTitle = styled.div`
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.text_primary + 95};
  @media (max-width: 960px) {
    text-align: center;
    font-size: 14px;
    line-height: 26px;
  }
`;

const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 260px;
  text-align: center;
  padding: 12px 0;
  background: linear-gradient(225deg, hsla(271,100%,50%,1) 0%, hsla(294,100%,50%,1) 100%);
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 17px;
  color: white;
  transition: all 0.4s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 20px 20px 60px #1f2634;
  }
  @media (max-width: 640px) {
    padding: 10px 0;
    font-size: 15px;
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
`;

const SocialItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const SocialLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1.5px solid ${({ bordercolor }) => bordercolor + "55" || "rgba(255,255,255,0.2)"};
  color: ${({ iconcolor }) => iconcolor || "#fff"};
  font-size: 19px;
  text-decoration: none;
  transition: all 0.25s ease;
  background: ${({ bordercolor }) => bordercolor + "10" || "rgba(255,255,255,0.04)"};
  &:hover {
    background: ${({ bordercolor }) => bordercolor + "25" || "rgba(255,255,255,0.1)"};
    border-color: ${({ bordercolor }) => bordercolor || "#fff"};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px ${({ bordercolor }) => bordercolor + "44" || "rgba(255,255,255,0.2)"};
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-width: 290px;
  max-height: 290px;
  border: 0;
  border-radius: 0;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
  @media (max-width: 960px) {
    max-width: 230px;
    max-height: 230px;
  }
  @media (max-width: 640px) {
    max-width: 200px;
    max-height: 200px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  @media (max-width: 960px) {
    justify-content: center;
    padding: 0;
  }
`;

/* ─── Expertise cards section ─── */

const DomainsSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px 30px 32px;
  position: relative;
  z-index: 1;
  @media (max-width: 640px) { padding: 6px 16px 24px; }
`;

const DomainsInner = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  gap: 24px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;


const DomainIcon = styled.div`
  font-size: 32px;
  line-height: 1;
`;

const DomainLabel = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${({ color }) => color};
  letter-spacing: 0.01em;
`;

const DomainTagline = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
`;

const TechPill = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ color }) => color};
  background: ${({ color }) => color + "18"};
  border: 1px solid ${({ color }) => color + "55"};
  border-radius: 20px;
  padding: 3px 9px;
  letter-spacing: 0.02em;
`;


/* ─── Card container with float animation via inline style ─── */

const floatVariants = {
  animate: (delay) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  }),
};

const glowVariants = {
  animate: (glow) => ({
    boxShadow: [
      `0 0 18px 2px ${glow}`,
      `0 0 32px 6px ${glow}`,
      `0 0 18px 2px ${glow}`,
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  }),
};

/* ─── Component ─── */

const Hero = () => {
  const handleDomainClick = (tab) => {
    window.dispatchEvent(new CustomEvent("setProjectTab", { detail: tab }));
    const el = document.getElementById("Projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="About">
      {/* ── Original hero layout ── */}
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Greeting>Hello, I'm 👋</Greeting>
                <GradientName>Sravan Kumar</GradientName>
                <OutlineName>Kurapati</OutlineName>
                <NameUnderline />
                <TextLoop>
                  I am a&nbsp;
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>

              <ResumeButton href={Bio.resume} target="_blank">
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>

            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <Img src={HeroImg} alt="Sravan Kumar Kurapati" />
                </Tilt>
                <SocialRow>
                  <SocialItem>
                    <SocialLink
                      href={Bio.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      bordercolor="#6e40c9"
                      iconcolor="#c9d1d9"
                    >
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </SocialLink>
                    <SocialLabel>GitHub</SocialLabel>
                  </SocialItem>

                  <SocialItem>
                    <SocialLink
                      href={Bio.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      bordercolor="#0A66C2"
                      iconcolor="#0A66C2"
                    >
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </SocialLink>
                    <SocialLabel>LinkedIn</SocialLabel>
                  </SocialItem>

                  <SocialItem>
                    <SocialLink
                      href={Bio.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LeetCode"
                      bordercolor="#FFA116"
                      iconcolor="#FFA116"
                    >
                      <SiLeetcode size={19} />
                    </SocialLink>
                    <SocialLabel>LeetCode</SocialLabel>
                  </SocialItem>
                </SocialRow>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>

      {/* ── Triple expertise domain cards ── */}
      <DomainsSection>
        <DomainsInner>
          {domains.map((d, i) => (
            <motion.div
              key={d.id}
              custom={i * 0.15}
              variants={floatVariants}
              animate="animate"
              style={{ flex: 1, minWidth: 0 }}
              /* fade-in on page load — NOT scroll-triggered, so cards are visible immediately */
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.12 }}
            >
              <motion.div
                custom={d.glow}
                variants={glowVariants}
                animate="animate"
                style={{
                  borderRadius: 16,
                  background: "rgba(17,25,40,0.75)",
                  border: `1.5px solid ${d.color}66`,
                  padding: "20px 20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: d.color,
                  transition: { duration: 0.2 },
                }}
                onClick={() => handleDomainClick(d.tab)}
              >
                {/* Corner glow accent */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: d.color + "18",
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />

                <DomainIcon>{d.icon}</DomainIcon>
                <DomainLabel color={d.color}>{d.label}</DomainLabel>
                <DomainTagline>{d.tagline}</DomainTagline>

                <TechRow>
                  {d.techs.map((t) => (
                    <TechPill key={t} color={d.color}>
                      {t}
                    </TechPill>
                  ))}
                </TechRow>

                <div
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: d.color + "cc",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  View projects →
                </div>
              </motion.div>
            </motion.div>
          ))}
        </DomainsInner>
      </DomainsSection>
    </div>
  );
};

export default Hero;
