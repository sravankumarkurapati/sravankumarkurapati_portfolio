import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import emailjs from "@emailjs/browser";

/*
 * EMAILJS SETUP (5 minutes):
 * 1. Go to https://emailjs.com — create a free account
 * 2. Add Email Service (Gmail) → copy Service ID
 * 3. Create Email Template → copy Template ID
 *    Template variables used: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 * 4. Account → API Keys → copy Public Key
 * 5. Replace the 3 constants below with your values
 */

// TODO: Replace with your actual EmailJS credentials
const SERVICE_ID = "service_xzskogg";   // TODO: from emailjs.com → Email Services
const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID"; // TODO: from emailjs.com → Email Templates
const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";   // TODO: from emailjs.com → Account → API Keys

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

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  font-family: inherit;
  transition: border 0.2s ease;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  font-family: inherit;
  resize: vertical;
  transition: border 0.2s ease;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

/* ─── Spinner ─── */

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  display: inline-block;
`;

const ContactButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.75 : 1)};
  transition: opacity 0.2s ease, transform 0.2s ease;
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

/* ─── Toast ─── */

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Toast = styled.div`
  margin-top: 12px;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  animation: ${slideIn} 0.3s ease;
  color: #fff;
  background: ${({ type }) =>
    type === "success"
      ? "linear-gradient(135deg, #1a7a4a, #22a06b)"
      : "linear-gradient(135deg, #8b1a1a, #c0392b)"};
  border: 1px solid
    ${({ type }) => (type === "success" ? "#22a06b88" : "#c0392b88")};
`;

/* ─── Component ─── */

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: "success" | "error", msg: string }

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setLoading(false);
          showToast("success", "Message sent! I'll get back to you soon.");
          form.current.reset();
        },
        (error) => {
          setLoading(false);
          showToast(
            "error",
            "Something went wrong. Please try again or email me directly."
          );
          console.error("EmailJS error:", error);
        }
      );
  };

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>

          <ContactInput
            placeholder="Your Name"
            name="from_name"
            required
          />
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            type="email"
            required
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
            required
          />
          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={5}
            required
          />

          <ContactButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </ContactButton>

          {toast && <Toast type={toast.type}>{toast.msg}</Toast>}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
