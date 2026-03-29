import React from "react";
import styled from "styled-components";
import { FileDownloadRounded } from "@mui/icons-material";
import { Bio } from "../../data/constants";

/*
 * Resume preview uses Google Drive embed.
 * The drive share link in Bio.resume is automatically converted to an embed URL.
 *
 * TODO: Update this date when you update your resume
 */
const LAST_UPDATED = "March 2026";

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

const embedUrl = getDriveEmbedUrl(Bio.resume);
const downloadUrl = getDriveDownloadUrl(Bio.resume);

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
  margin-bottom: 24px;
  @media (max-width: 768px) {
    font-size: 16px;
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
  return (
    <Container id="Resume">
      <Wrapper>
        <Title>Resume</Title>
        <Desc>My latest resume — preview below or download a copy</Desc>

        <PreviewCard>
          <PreviewToolbar>
            <PreviewLabel>Sravan Kumar Kurapati — Resume</PreviewLabel>
            <DownloadBtn
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FileDownloadRounded style={{ fontSize: 18 }} />
              Download Resume
            </DownloadBtn>
          </PreviewToolbar>

          <PreviewFrame
            src={embedUrl}
            title="Sravan Kumar Kurapati Resume"
            allow="autoplay"
          />
        </PreviewCard>

        {/* TODO: Update LAST_UPDATED constant at the top of this file */}
        <LastUpdated>Last updated: {LAST_UPDATED}</LastUpdated>
      </Wrapper>
    </Container>
  );
};

export default Resume;
