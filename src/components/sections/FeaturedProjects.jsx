import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";
import ProjectModal from "../cards/ProjectModal";
import { EastRounded } from "@mui/icons-material";

// Show the 3 most recent projects (first 3 in the array, which are newest by date)
const featuredProjects = projects.slice(0, 3);

/* ─── Styled Components ─── */

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 24px 80px;
  position: relative;
  z-index: 1;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const TitleGroup = styled.div``;

const Eyebrow = styled.div`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 6px;
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.15;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ViewAllBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid ${({ theme }) => theme.primary + "66"};
  border-radius: 24px;
  padding: 8px 20px;
  transition: all 0.25s ease;
  white-space: nowrap;
  align-self: center;
  &:hover {
    background: ${({ theme }) => theme.primary + "18"};
    border-color: ${({ theme }) => theme.primary};
    transform: translateX(3px);
  }
`;

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  justify-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

/* Make ProjectCard fill its grid cell */
const CardWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BottomCTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const CTALabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 32px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  color: white;
  box-shadow: 0 4px 20px rgba(133, 76, 230, 0.35);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(133, 76, 230, 0.5);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(133, 76, 230, 0.35),
    transparent
  );
  margin-bottom: -10px;
`;

/* ─── Component ─── */

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.12, ease: "easeOut" },
  }),
};

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewAll = (e) => {
    e.preventDefault();
    const el = document.getElementById("Projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Divider />
      <Section>
        <Inner>
          <Header>
            <TitleGroup>
              <Eyebrow>Portfolio Highlights</Eyebrow>
              <Title>Featured Projects</Title>
            </TitleGroup>
            <ViewAllBtn href="#Projects" onClick={handleViewAll}>
              View All Projects
              <EastRounded style={{ fontSize: 17 }} />
            </ViewAllBtn>
          </Header>

          <CardGrid>
            {featuredProjects.map((project, i) => (
              <CardWrapper
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <ProjectCard
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              </CardWrapper>
            ))}
          </CardGrid>

          <BottomCTA>
            <CTALabel>Want to see more of my work?</CTALabel>
            <CTAButton href="#Projects" onClick={handleViewAll}>
              Browse All Projects
              <EastRounded style={{ fontSize: 17 }} />
            </CTAButton>
          </BottomCTA>
        </Inner>
      </Section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default FeaturedProjects;
