import React from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";
import { Tilt } from "react-tilt";

/* ─── Build 4 display groups from existing skills data ─── */
const raw = {
  frontend: skills.find((g) => g.title === "Frontend")?.skills || [],
  backend: skills.find((g) => g.title === "Backend & Frameworks")?.skills || [],
  databases: skills.find((g) => g.title === "Databases")?.skills || [],
  enterprise: skills.find((g) => g.title === "Enterprise & Cloud")?.skills || [],
  tools: skills.find((g) => g.title === "Development Tools")?.skills || [],
};

const skillGroups = [
  {
    title: "Backend",
    subtitle: "Java, Spring Boot, databases & server-side frameworks",
    skills: [...raw.backend, ...raw.databases],
  },
  {
    title: "Frontend",
    subtitle: "React, Angular, TypeScript & UI frameworks",
    skills: raw.frontend,
  },
  {
    title: "DevOps & Cloud",
    subtitle: "OpenShift, Kafka, CI/CD, enterprise tools & dev utilities",
    skills: [...raw.enterprise, ...raw.tools],
  },
  {
    // TODO: Add AI/ML skills (e.g. Python, TensorFlow, PyTorch, LangChain, OpenAI, RAG, fine-tuning)
    title: "AI / ML",
    subtitle: "GenAI, LLMs, RAG, prompt engineering & model training",
    skills: [],
    isPlaceholder: true,
  },
];

/* ─── Styled Components ─── */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/* 2×2 grid — all cells stretch to the tallest card in each row */
const SkillsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 20px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

/* Tilt wrapper must fill the grid cell fully */
const TiltWrapper = styled.div`
  height: 100%;
  .tilt {
    height: 100% !important;
  }
`;

const Skill = styled.div`
  height: 100%;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid
    ${({ isPlaceholder, theme }) =>
      isPlaceholder ? theme.primary + "44" : "rgba(255, 255, 255, 0.125)"};
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 18px 20px;
  }
`;

const SkillHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SkillTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 4px;
`;

const SkillSubtitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + "88"};
  line-height: 1.5;
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.primary + "66"};
  border-radius: 2px;
  margin: 12px auto 0;
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  /* flex-grow pushes content to fill the card height equally */
  flex: 1;
  align-content: center;
`;

const SkillItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + "cc"};
  border: 1px solid ${({ theme }) => theme.text_primary + "44"};
  border-radius: 10px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: border-color 0.2s ease, background 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary + "88"};
    background: ${({ theme }) => theme.primary + "10"};
  }
  @media (max-width: 500px) {
    font-size: 13px;
    padding: 6px 10px;
  }
`;

const SkillImage = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

/* ─── Placeholder (AI/ML) ─── */

const PlaceholderBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1.5px dashed ${({ theme }) => theme.primary + "55"};
  border-radius: 12px;
  padding: 32px 16px;
  background: ${({ theme }) => theme.primary + "06"};
`;

const PlaceholderIcon = styled.div`
  font-size: 40px;
`;

const PlaceholderBadge = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + "88"};
  border-radius: 20px;
  padding: 3px 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const PlaceholderText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.7;
  max-width: 280px;
`;

/* ─── Component ─── */

const Skills = () => {
  return (
    <Container id="Skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc style={{ marginBottom: "28px" }}>
          Here are some of my skills on which I have been working on for the past 4 years.
        </Desc>

        <SkillsGrid>
          {skillGroups.map((group, index) => (
            <TiltWrapper key={`skill-group-${index}`}>
              <Tilt style={{ height: "100%" }}>
                <Skill isPlaceholder={group.isPlaceholder}>
                  <SkillHeader>
                    <SkillTitle>{group.title}</SkillTitle>
                    <SkillSubtitle>{group.subtitle}</SkillSubtitle>
                    <Divider />
                  </SkillHeader>

                  {group.isPlaceholder ? (
                    <PlaceholderBox>
                      <PlaceholderIcon>🤖</PlaceholderIcon>
                      <PlaceholderBadge>Coming Soon</PlaceholderBadge>
                      <PlaceholderText>
                        AI/ML skills will be listed here.
                        {/* TODO: Add AI/ML skills to constants.js under a new "AI / ML" category
                            e.g. Python, TensorFlow, PyTorch, LangChain, OpenAI API, Hugging Face,
                            RAG pipelines, fine-tuning, prompt engineering, vector databases */}
                      </PlaceholderText>
                    </PlaceholderBox>
                  ) : (
                    <SkillList>
                      {group.skills.map((item, ix) => (
                        <SkillItem key={`skill-item-${ix}`}>
                          <SkillImage src={item.image} alt={item.name} />
                          {item.name}
                        </SkillItem>
                      ))}
                    </SkillList>
                  )}
                </Skill>
              </Tilt>
            </TiltWrapper>
          ))}
        </SkillsGrid>
      </Wrapper>
    </Container>
  );
};

export default Skills;
