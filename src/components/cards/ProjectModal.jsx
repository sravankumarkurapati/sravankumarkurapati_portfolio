import React, { useEffect } from "react";
import styled from "styled-components";
import { CloseRounded, GitHub, OpenInNew } from "@mui/icons-material";
import {
  SiPython, SiTensorflow, SiFastapi, SiStreamlit, SiDocker,
  SiAmazonaws, SiReact, SiNodedotjs, SiMongodb,
  SiSpringboot, SiAngular, SiJavascript, SiTypescript,
  SiGooglecolab, SiStripe, SiBootstrap, SiGit, SiMysql,
  SiPostgresql, SiOracle, SiJira, SiRedis, SiGraphql,
  SiNginx, SiGithubactions, SiAmazondynamodb, SiAmazons3,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

const TECH_ICONS = {
  "Python": SiPython,
  "TensorFlow": SiTensorflow,
  "Keras": SiTensorflow,
  "FastAPI": SiFastapi,
  "Streamlit": SiStreamlit,
  "Docker": SiDocker,
  "AWS EC2": SiAmazonaws,
  "AWS": FaAws,
  "AWS DynamoDB": SiAmazondynamodb,
  "AWS S3": SiAmazons3,
  "AWS CloudFront": FaAws,
  "Nginx": SiNginx,
  "GitHub Actions": SiGithubactions,
  "React": SiReact,
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  "MongoDB": SiMongodb,
  "Spring Boot": SiSpringboot,
  "Angular": SiAngular,
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "Google Colab": SiGooglecolab,
  "Stripe Payment": SiStripe,
  "Bootstrap": SiBootstrap,
  "Git": SiGit,
  "MySQL": SiMysql,
  "PostgreSQL": SiPostgresql,
  "Oracle": SiOracle,
  "Jira": SiJira,
  "Redis": SiRedis,
  "GraphQL": SiGraphql,
  "Java": FaJava,
};

/* ─── Styled Components ─── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* padding-top accounts for the 80px sticky navbar so the modal card never slides behind it */
  padding: 100px 20px 20px;
  overflow-y: auto;
`;

const ModalCard = styled.div`
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), rgba(133, 76, 230, 0.15) 0px 0px 40px;
  width: 100%;
  max-width: 760px;
  position: relative;
  /* Scrolling is handled by the overlay; the card grows naturally */
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  transition: background 0.2s ease;
  z-index: 10;
  &:hover {
    background: rgba(133, 76, 230, 0.3);
  }
`;

const Body = styled.div`
  padding: 60px 32px 32px;
  @media (max-width: 600px) {
    padding: 16px 20px 24px;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + "88"};
  border-radius: 20px;
  padding: 3px 12px;
  margin-bottom: 10px;
`;

const ProjectTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 6px;
  line-height: 1.3;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const DateText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: contain;
  background: #0d0d1a;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
  margin-top: 22px;
`;

const DescriptionText = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_primary + "cc"};
  margin: 0;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + "cc"};
  background: rgba(133, 76, 230, 0.12);
  border: 1px solid ${({ theme }) => theme.primary + "44"};
  border-radius: 8px;
  padding: 6px 12px;
  svg { flex-shrink: 0; }
`;

/* ─── Architecture diagram ─── */

const ArchFlow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding: 16px 14px;
  background: rgba(10, 10, 24, 0.6);
  border: 1px solid rgba(133, 76, 230, 0.2);
  border-radius: 14px;
`;

const ArchStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex: 1;
  min-width: 0;
`;

const ArchIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ color }) => color + "18"};
  border: 1.5px solid ${({ color }) => color + "66"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 0 8px ${({ color }) => color + "33"};
`;

const ArchLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  white-space: nowrap;
`;

const ArchSublabel = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.3;
  padding: 0 2px;
`;

const ArchConnector = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 2px;
`;

/* ─── Complex layered architecture ─── */

const ComplexArch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 4px;
  padding: 16px;
  background: rgba(10,10,24,0.7);
  border: 1px solid rgba(133,76,230,0.2);
  border-radius: 14px;
`;

const ComplexLayer = styled.div`
  border: ${({ container }) => container ? "1.5px dashed rgba(133,76,230,0.35)" : "none"};
  border-radius: 10px;
  padding: ${({ container }) => container ? "8px 10px 10px" : "0"};
  position: relative;
`;

const ComplexLayerLabel = styled.div`
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #854ce6;
  margin-bottom: 8px;
`;

const ComplexItems = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const ComplexItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 10px 6px;
  border-radius: 8px;
  background: ${({ color }) => color + "15"};
  border: 1.5px solid ${({ highlight, color }) => highlight ? color : color + "55"};
  flex: 1;
  min-width: 70px;
  max-width: 130px;
  box-shadow: ${({ highlight, color }) => highlight ? `0 0 12px ${color}44` : "none"};
`;

const ComplexItemIcon = styled.div`
  font-size: 16px;
  line-height: 1;
`;

const ComplexItemLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  line-height: 1.3;
`;

const ComplexItemSub = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.2;
`;

const ComplexVArrow = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 0;
  svg { display: block; }
`;

const DisclaimerText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 16px 0 0;
  opacity: 0.7;
  font-style: italic;
`;

/* ─── YouTube slot ─── */

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 4px;
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.primary + "55"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(133, 76, 230, 0.05);
  margin-top: 4px;
`;

const VideoPlaceholderIcon = styled.div`
  font-size: 40px;
`;

const VideoPlaceholderText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  padding: 0 20px;
`;

/* ─── Action buttons ─── */

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background: ${theme.primary};
    color: #fff;
    border: none;
    &:hover { opacity: 0.85; transform: translateY(-2px); }
  `
      : `
    background: transparent;
    color: ${theme.primary};
    border: 1.5px solid ${theme.primary};
    &:hover { background: ${theme.primary + "18"}; transform: translateY(-2px); }
  `}
`;

const DisabledBtn = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  border: 1.5px solid ${({ theme }) => theme.text_secondary + "55"};
  cursor: not-allowed;
  opacity: 0.6;
`;

/* ─── Helpers ─── */

const extractYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

/* ─── Component ─── */

const ProjectModal = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  const youtubeId = extractYouTubeId(project.youtube);
  const hasGithub = project.github && project.github !== "#";
  const hasWebapp = project.webapp && project.webapp !== "#";

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalCard>
        <CloseBtn onClick={onClose} aria-label="Close modal">
          <CloseRounded style={{ fontSize: 20 }} />
        </CloseBtn>

        <Body>
          <CategoryBadge>{capitalize(project.category)}</CategoryBadge>
          <ProjectTitle>{project.title}</ProjectTitle>
          <DateText>{project.date}</DateText>

          <ProjectImage src={project.image} alt={project.title} />

          {/* ── Description ── */}
          <SectionLabel>About This Project</SectionLabel>
          <DescriptionText>{project.description}</DescriptionText>

          {/* ── Tech Stack ── */}
          {project.tags && project.tags.length > 0 && (
            <>
              <SectionLabel>Tech Stack</SectionLabel>
              <TagRow>
                {project.tags.map((tag, i) => {
                  const Icon = TECH_ICONS[tag];
                  return (
                    <Tag key={i}>
                      {Icon && <Icon size={15} />}
                      {tag}
                    </Tag>
                  );
                })}
              </TagRow>
            </>
          )}

          {/* ── Architecture Diagram ── */}
          {project.architecture && project.architecture.length > 0 && (
            <>
              <SectionLabel>Architecture Flow</SectionLabel>
              <ArchFlow>
                {project.architecture.map((step, i) => (
                  <React.Fragment key={i}>
                    <ArchStep>
                      <ArchIconBox color={step.color}>{step.icon}</ArchIconBox>
                      <ArchLabel>{step.label}</ArchLabel>
                      {step.sublabel && <ArchSublabel>{step.sublabel}</ArchSublabel>}
                    </ArchStep>
                    {i < project.architecture.length - 1 && (
                      <ArchConnector>
                        <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                          <line x1="0" y1="5" x2="19" y2="5" stroke="#854ce6" strokeWidth="1.5" strokeDasharray="2.5 2"/>
                          <polyline points="15,1 23,5 15,9" stroke="#854ce6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </ArchConnector>
                    )}
                  </React.Fragment>
                ))}
              </ArchFlow>
            </>
          )}

          {/* ── Complex Architecture ── */}
          {project.architectureComplex && project.architectureComplex.length > 0 && (
            <>
              <SectionLabel>Architecture</SectionLabel>
              <ComplexArch>
                {project.architectureComplex.map((layer, li) => (
                  <React.Fragment key={layer.id}>
                    <ComplexLayer container={layer.container}>
                      {layer.label && <ComplexLayerLabel>{layer.label}</ComplexLayerLabel>}
                      <ComplexItems>
                        {layer.items.map((item, ii) => (
                          <ComplexItem key={ii} color={item.color || "#854ce6"} highlight={item.highlight}>
                            <ComplexItemIcon>{item.icon}</ComplexItemIcon>
                            <ComplexItemLabel>{item.label}</ComplexItemLabel>
                            {item.sublabel && <ComplexItemSub>{item.sublabel}</ComplexItemSub>}
                          </ComplexItem>
                        ))}
                      </ComplexItems>
                    </ComplexLayer>
                    {li < project.architectureComplex.length - 1 && (
                      <ComplexVArrow>
                        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                          <line x1="6" y1="0" x2="6" y2="11" stroke="#854ce6" strokeWidth="1.5" strokeDasharray="2.5 2"/>
                          <polyline points="2,8 6,14 10,8" stroke="#854ce6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </ComplexVArrow>
                    )}
                  </React.Fragment>
                ))}
              </ComplexArch>
              {project.disclaimer && <DisclaimerText>⚠️ {project.disclaimer}</DisclaimerText>}
            </>
          )}

          {/* ── Demo Video ── */}
          <SectionLabel>Demo Video</SectionLabel>
          {youtubeId ? (
            <VideoContainer>
              <VideoIframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          ) : (
            <VideoPlaceholder>
              {/* TODO: Add YouTube URL for this project in constants.js (project.youtube field) */}
              <VideoPlaceholderIcon>▶️</VideoPlaceholderIcon>
              <VideoPlaceholderText>
                Demo video coming soon — check back later
              </VideoPlaceholderText>
            </VideoPlaceholder>
          )}

          {/* ── Action Buttons ── */}
          <ButtonRow>
            {hasGithub ? (
              <ActionBtn
                href={project.github}
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                <GitHub style={{ fontSize: 18 }} />
                View Code
              </ActionBtn>
            ) : (
              <DisabledBtn title="Repository is private or not available">
                <GitHub style={{ fontSize: 18 }} />
                Private Repo
              </DisabledBtn>
            )}

            {hasWebapp ? (
              <ActionBtn
                href={project.webapp}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                <OpenInNew style={{ fontSize: 18 }} />
                View Live App ↗
              </ActionBtn>
            ) : (
              <DisabledBtn title="No live application available">
                <OpenInNew style={{ fontSize: 18 }} />
                Not Deployed
              </DisabledBtn>
            )}
          </ButtonRow>
        </Body>
      </ModalCard>
    </Overlay>
  );
};

export default ProjectModal;
