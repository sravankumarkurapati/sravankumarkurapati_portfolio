import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";
import ProjectModal from "../cards/ProjectModal";

/* ─── Styled Components ─── */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0 16px;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
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

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
  }
  @media (max-width: 768px) {
    padding: 6px 10px;
    border-radius: 4px;
  }
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary + "20"};
    color: ${theme.primary};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 28px;
  flex-wrap: wrap;
`;

/* ─── Placeholder for empty tabs ─── */

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 60px 20px;
  border: 2px dashed ${({ theme }) => theme.primary + "44"};
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
`;

const EmptyTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.6;
`;

/* ─── Component ─── */

const TABS = [
  { label: "ALL", value: "all" },
  { label: "Backend", value: "backend" },
  { label: "Full Stack", value: "full stack" },
  { label: "AI / ML", value: "ai/ml" },
];

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Listen for tab pre-selection dispatched by the Navbar dropdown
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) setToggle(e.detail);
    };
    window.addEventListener("setProjectTab", handler);
    return () => window.removeEventListener("setProjectTab", handler);
  }, []);

  const filtered =
    toggle === "all"
      ? projects
      : projects.filter((p) => p.category === toggle);

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "20px" }}>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>

        <ToggleButtonGroup>
          {TABS.map((tab, i) => (
            <React.Fragment key={tab.value}>
              {i > 0 && <Divider />}
              <ToggleButton
                active={toggle === tab.value}
                onClick={() => setToggle(tab.value)}
              >
                {tab.label}
              </ToggleButton>
            </React.Fragment>
          ))}
        </ToggleButtonGroup>

        <CardContainer>
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
              />
            ))
          ) : (
            <EmptyState>
              {/* TODO: Add AI/ML projects to the projects array in constants.js
                  with category: "ai/ml" to populate this tab */}
              <EmptyIcon>🤖</EmptyIcon>
              <EmptyTitle>AI / ML Projects Coming Soon</EmptyTitle>
              <EmptyText>
                AI/ML projects will appear here once added to the portfolio.
                <br />
                Check back later for GenAI, LLM, and RAG pipeline projects.
              </EmptyText>
            </EmptyState>
          )}
        </CardContainer>
      </Wrapper>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Container>
  );
};

export default Projects;
