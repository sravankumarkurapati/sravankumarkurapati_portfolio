# Portfolio - Claude Code Context

## Project Overview
Personal portfolio for **Sravan Kumar Kurapati** — Full Stack Developer · Backend Engineer · AI/ML Engineer.
Built with React, Three.js, Framer Motion, and Styled Components. Single-page app.

## Brand Positioning (triple expertise)
1. **Backend Engineer** — Java, Spring Boot, microservices, enterprise systems
2. **Full Stack Developer** — React, Node.js, REST APIs, cloud deployment
3. **AI/ML Engineer** — GenAI, LLMs, RAG pipelines, prompt engineering (skills/projects TODO)

## Tech Stack
- **React 18** with React Router DOM 6
- **Styled Components** (CSS-in-JS with `ThemeProvider`)
- **MUI (Material UI) 5** with Emotion, MUI Icons
- **Three.js** + React Three Fiber + Drei (Stars, Earth canvas components)
- **Framer Motion** for scroll/entry animations
- **React Tilt** for card hover effects
- **Typewriter Effect** for Hero section role text
- **EmailJS (`@emailjs/browser`)** for contact form (already installed)
- **react-vertical-timeline-component** for Experience/Education sections

## Commands
```bash
npm start       # Dev server at http://localhost:3000
npm run build   # Production build to /build
npm test        # Run tests
```

## Project Structure
```
src/
├── components/
│   ├── Navbar.jsx                  # Sticky, glassmorphism on scroll, Projects dropdown
│   ├── HeroBgAnimation/            # SVG particle background animation
│   ├── canvas/
│   │   ├── Stars.jsx               # Three.js starfield (5000 points)
│   │   └── Earth.jsx               # 3D Earth GLTF model with OrbitControls
│   ├── cards/
│   │   ├── ExperienceCard.jsx      # Uses actual logo images from src/images/
│   │   ├── EducationCard.jsx       # Uses actual logo images from src/images/
│   │   ├── ProjectCard.jsx         # Tags, GitHub/Demo buttons, "Details" → opens modal
│   │   └── ProjectModal.jsx        # Full project detail modal with YouTube slot
│   └── sections/
│       ├── Hero.jsx                # Typewriter, profile image, bg animations
│       ├── Skills.jsx              # 4 groups: Backend, Frontend, AI/ML, DevOps/Cloud
│       ├── Experience.jsx          # Vertical timeline
│       ├── Education.jsx           # Vertical timeline + Earth canvas
│       ├── Projects.jsx            # Filter tabs: All/Backend/Full Stack/AI/ML + modal
│       ├── Resume.jsx              # Download + Open in New Tab (PDF from public/resume/)
│       ├── Contact.jsx             # EmailJS form with spinner + toast notifications
│       └── Footer.jsx              # Nav links + LinkedIn/GitHub icons
├── data/
│   └── constants.js               # ALL portfolio content — edit this for any content changes
├── images/
│   ├── HeroImage.jpg
│   ├── nu_student_temps_logo.jpg   # Used automatically in NU experience/education cards
│   └── TCS_NewLogo_Final_RGB.jpg   # Used automatically in TCS experience card
├── utils/
│   ├── Themes.js                   # Dark/light theme tokens
│   └── motion.js                   # Framer Motion animation variants
├── App.js                          # Section order: Hero→Skills→Experience→Projects→Education→Resume→Contact→Footer
└── index.css                       # Global styles, Poppins font, scrollbar
public/
├── planet/                         # 3D Earth GLTF assets — do not move or rename
└── resume/
    ├── PLACE_RESUME_HERE.txt       # Setup instructions
    └── Sravan_Kurapati_Resume.pdf  # TODO: Add this file
```

## Content Data (`src/data/constants.js`)
**Always edit this file for content changes — never hardcode in components.**

Key exports:
- `Bio` — name, roles (incl. "AI/ML Engineer"), description, github, resume link, linkedin
- `skills` — 5 raw categories (remapped to 4 visual groups in Skills.jsx)
- `experiences` — 3 entries: NU Senior TA, NU TA, TCS Senior SWE
- `education` — 2 entries: Northeastern MS (4.0 GPA), BVRIT BTech
- `projects` — 4 entries; each has `category`, `tags`, `youtube` (null until filled)
- `projectCategories` — `["all", "backend", "full stack", "ai/ml"]`

### Project categories
| Project | category |
|---------|----------|
| CyberSentinel | `"backend"` |
| Flavor Fusion | `"full stack"` |
| Student Recruitment | `"full stack"` |
| Enterprise Collections TCS | `"backend"` |

## Navbar Behavior
- Links: About · Experience · Projects (dropdown) · Skills · Resume · Contact
- **Projects dropdown** dispatches `window.CustomEvent("setProjectTab", { detail: tab })` — Projects section listens and pre-selects the tab
- **Glassmorphism**: kicks in after 80px scroll (`backdrop-filter: blur(12px)`)
- **Active section**: scroll listener checks `offsetTop` of each section ID
- **Mobile**: hamburger with slide-in drawer including sub-links for project tabs

## Theme & Styling
- **Dark theme active** (defined in `src/utils/Themes.js`)
- Background: `#090917` | Primary accent: `#854CE6` | Text: `#F2F3F4`
- Card background: `#171721` | Secondary text: `#b1b2b3`
- Font: Poppins | Breakpoints: 960px, 768px, 640px, 500px

## EmailJS Setup (Contact form)
Edit the 3 constants at the top of `src/components/sections/Contact.jsx`:
```js
const SERVICE_ID  = "YOUR_EMAILJS_SERVICE_ID";
const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
const PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY";
```
Template variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

## Resume Setup
Place PDF at `public/resume/Sravan_Kurapati_Resume.pdf` — buttons work automatically.
Update `LAST_UPDATED` constant in `src/components/sections/Resume.jsx`.

## Logo Images
`ExperienceCard.jsx` and `EducationCard.jsx` auto-resolve logos by company/school name:
- Contains "Northeastern" → uses `src/images/nu_student_temps_logo.jpg`
- Contains "Tata" or "TCS" → uses `src/images/TCS_NewLogo_Final_RGB.jpg`
- Other → falls back to base64 SVG placeholder in constants.js
