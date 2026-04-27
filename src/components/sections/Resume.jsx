import React, { useState } from "react";
import styled from "styled-components";
import { FileDownloadRounded } from "@mui/icons-material";
import { Bio } from "../../data/constants";

/*
 * Resume preview uses Google Drive embed.
 * Drive share links in Bio.resume / Bio.resumeAIML are auto-converted to embed URLs.
 *
 * TODO: Update these dates when you update your resumes
 */
const LAST_UPDATED_FULLSTACK = "March 2026";
const LAST_UPDATED_AIML = "March 2026";

const TABS = [
  {
    key: "fullstack",
    label: "Java / Full Stack",
    shareUrl: Bio.resume,
    lastUpdated: LAST_UPDATED_FULLSTACK,
    previewLabel: "Sravan Kumar Kurapati — Java & Full Stack Resume",
  },
  {
    key: "aiml",
    label: "AI / ML",
    shareUrl: Bio.resumeAIML,
    lastUpdated: LAST_UPDATED_AIML,
    previewLabel: "Sravan Kumar Kurapati — AI / ML Resume",
  },
];

// Converts a Google Drive share link to a direct embed URL
const getDriveEmbedUrl = (shareUrl) => {
  if (!shareUrl) return null;
  const match = shareUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
};

// Converts to a direct download link
const getDriveDownloadUrl = (shareUrl) => {
  if (!shareUrl) return shareUrl;
  const match = shareUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match
    ? `https://drive.google.com/uc?export=download&id=${match[1]}`
    : shareUrl;
};

/* ─── Styled Components ─── */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 16px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 860px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TabRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 6px;
`;

const TabBtn = styled.button`
  padding: 9px 28px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.25s ease-in-out;
  ${({ active }) =>
    active
      ? `
    background: linear-gradient(225deg, hsla(271,100%,50%,1) 0%, hsla(294,100%,50%,1) 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(133, 76, 230, 0.4);
  `
      : `
    background: transparent;
    color: #b1b2b3;
  `}
  &:hover {
    ${({ active }) => !active && `color: white;`}
  }
`;

const PreviewCard = styled.div`
  width: 100%;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PreviewToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 10px;
`;

const PreviewLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const DownloadBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  color: white;
  box-shadow: 0 4px 16px rgba(133, 76, 230, 0.4);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(133, 76, 230, 0.55);
  }
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  height: 780px;
  border: none;
  display: block;
  background: #fff;
  @media (max-width: 768px) {
    height: 500px;
  }
  @media (max-width: 480px) {
    height: 380px;
  }
`;

const LastUpdated = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary + "99"};
  text-align: center;
  margin-top: 10px;
`;

/* ─── Component ─── */

const Resume = () => {
  const [activeTab, setActiveTab] = useState("fullstack");
  const tab = TABS.find((t) => t.key === activeTab);
  const embedUrl = getDriveEmbedUrl(tab.shareUrl);
  const downloadUrl = getDriveDownloadUrl(tab.shareUrl);

  return (
    <Container id="Resume">
      <Wrapper>
        <Title>Resume</Title>
        <Desc>Choose a version to preview or download</Desc>

        <TabRow>
          {TABS.map((t) => (
            <TabBtn
              key={t.key}
              active={activeTab === t.key}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </TabBtn>
          ))}
        </TabRow>

        <PreviewCard>
          <PreviewToolbar>
            <PreviewLabel>{tab.previewLabel}</PreviewLabel>
            <DownloadBtn href={downloadUrl} target="_blank" rel="noreferrer">
              <FileDownloadRounded style={{ fontSize: 18 }} />
              Download Resume
            </DownloadBtn>
          </PreviewToolbar>

          <PreviewFrame
            key={activeTab}
            src={embedUrl}
            title={tab.previewLabel}
            allow="autoplay"
          />
        </PreviewCard>

        {/* TODO: Update LAST_UPDATED constants at the top of this file */}
        <LastUpdated>Last updated: {tab.lastUpdated}</LastUpdated>
      </Wrapper>
    </Container>
  );
};

export default Resume;
