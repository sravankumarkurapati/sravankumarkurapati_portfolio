import React from "react";
import styled from "styled-components";
import { GitHub, OpenInNew, InfoOutlined } from "@mui/icons-material";

/* ─── Styled Components ─── */

const Card = styled.div`
  width: 330px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all 0.35s ease-in-out;
  border: 1px solid transparent;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.5);
    filter: brightness(1.07);
    border-color: ${({ theme }) => theme.primary + "44"};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 16px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.35;
`;

const CategoryBadge = styled.span`
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + "88"};
  border-radius: 20px;
  padding: 3px 8px;
  margin-top: 2px;
  white-space: nowrap;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + "cc"};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.6;
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + "aa"};
  background: rgba(133, 76, 230, 0.1);
  border: 1px solid ${({ theme }) => theme.primary + "33"};
  border-radius: 6px;
  padding: 3px 8px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin: 4px 20px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px 0;
  flex-wrap: wrap;
`;

const IconBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid
    ${({ disabled, theme }) => (disabled ? theme.text_secondary + "44" : theme.primary)};
  color: ${({ disabled, theme }) =>
    disabled ? theme.text_secondary + "66" : theme.primary};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};
  &:hover {
    background: ${({ theme }) => theme.primary + "18"};
  }
`;

const DetailsBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  margin-left: auto;
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

/* ─── Component ─── */

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const ProjectCard = ({ project, onViewDetails }) => {
  const hasGithub = project.github && project.github !== "#";
  const hasWebapp = project.webapp && project.webapp !== "#";

  return (
    <Card>
      <Image src={project.image} alt={project.title} />

      <CardBody>
        <HeaderRow>
          <Title>{project.title}</Title>
          <CategoryBadge>{capitalize(project.category)}</CategoryBadge>
        </HeaderRow>

        <Date>{project.date}</Date>
        <Description>{project.description}</Description>

        {project.tags && project.tags.length > 0 && (
          <Tags>
            {project.tags.slice(0, 4).map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
            {project.tags.length > 4 && (
              <Tag>+{project.tags.length - 4} more</Tag>
            )}
          </Tags>
        )}
      </CardBody>

      <Divider />

      <ButtonRow>
        <IconBtn
          href={hasGithub ? project.github : undefined}
          target={hasGithub ? "_blank" : undefined}
          rel="noreferrer"
          disabled={!hasGithub}
          title={hasGithub ? "View code on GitHub" : "Private repository"}
        >
          <GitHub style={{ fontSize: 15 }} />
          Code
        </IconBtn>

        <IconBtn
          href={hasWebapp ? project.webapp : undefined}
          target={hasWebapp ? "_blank" : undefined}
          rel="noreferrer"
          disabled={!hasWebapp}
          title={hasWebapp ? "Open live demo" : "No live demo available"}
        >
          <OpenInNew style={{ fontSize: 15 }} />
          Demo
        </IconBtn>

        <DetailsBtn onClick={() => onViewDetails(project)}>
          <InfoOutlined style={{ fontSize: 15 }} />
          Details
        </DetailsBtn>
      </ButtonRow>
    </Card>
  );
};

export default ProjectCard;
