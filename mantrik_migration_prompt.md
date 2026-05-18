# Mantrik Labs — Complete Content Migration Prompt

> **PURPOSE:** This is a comprehensive, file-by-file replacement guide for migrating the "Aigocy" HTML template to the **Mantrik Labs** brand.  
> **RULE:** Replace content ONLY. Never modify layout, CSS classes, JS logic, or HTML structure.  
> **SOURCE OF TRUTH:** `content.md` in the project root.

---

## ⚠️ ENCODING FIX (DO FIRST)

Some files were corrupted by a previous PowerShell `Set-Content` that changed encoding. The curly apostrophe `'` (U+2019) was replaced with `�` in these files:
- `about.html` (lines 189, 481, 172, 837, 850, 863, 876)
- `service.html` (lines 534, 547, 560, 573)
- `work.html` (lines 525, 538, 551, 564)
- `contact.html` (lines 281, 294, 307, 320)
- `service-single.html` (lines 360, 373, 386, 399)

**Fix:** Re-save these files as UTF-8 with BOM, or re-read/re-write them with proper UTF-8 encoding before making text replacements.

---

---

## 1. GLOBAL TEXT REPLACEMENTS (Apply to ALL `.html` files including `/components/` and `/archive/`)

These are simple find-and-replace operations. Apply everywhere.

| # | FIND (exact text) | REPLACE WITH |
|---|---|---|
| 1 | `Aigocy` (when used as brand name) | `Mantrik Labs` |
| 2 | `Aigocy's Design Lead` | `Mantrik Labs Design Lead` |
| 3 | `Aigocy 's Design Lead` (note space before apostrophe) | `Mantrik Labs Design Lead` |
| 4 | `Aigocy Empowering` | `Mantrik Labs Empowering` |
| 5 | `© 2026 Aigocy. All Rights Reserved.` | `© 2026 Mantrik Labs. All Rights Reserved.` |
| 6 | `© 2026 Aigocy . All Rights Reserved.` (note space) | `© 2026 Mantrik Labs. All Rights Reserved.` |
| 7 | `Aigocy - AI Agency` (in `<title>` tags) | `Mantrik Labs - AI-First Digital Agency` |
| 8 | `with Aigocy  on social` (note double space) | `with Mantrik Labs on social` |
| 9 | `with Aigocy on social` | `with Mantrik Labs on social` |
| 10 | `Montréal, Canada` | `Boudha, Kathmandu` |
| 11 | `Montréal` (any remaining standalone) | `Kathmandu` |
| 12 | `USA, New York – 1060 Str.` | `Boudha, Kathmandu, Nepal` |
| 13 | `Davies` (when used as a person/brand name) | `Mantrik Labs` |
| 14 | Meta description: `Davies - Personal Portfolio is a sleek and modern HTML template designed for developers, designers, freelancers, and professionals who want to showcase their work online. Fully responsive, SEO-friendly, and easy to customize, it helps you create a strong personal brand and impress potential clients or employers.` | `Mantrik Labs is an AI-first digital agency based in Kathmandu, Nepal. We build intelligent websites, AI-powered tools, and custom digital solutions for businesses worldwide.` |

---

---

## 2. ABOUT SECTION — Text Content Replacements

**Applies to:** `index.html`, `about.html`, `components/about/about.html`, `components/select-work/select-work.html`

### 2.1 Section Heading
**Current:**
```
Human-Centered AI,
Built for Production
```
**Replace with:**
```
AI-First Digital Agency,
Built for Ambitious Businesses
```

### 2.2 Tagline / Trusted Line
**Current:**
```
Trusted by 120+ clients across 4 industries -
shipping AI from idea to production in 8–10 weeks
```
**Replace with:**
```
Trusted by 20+ clients worldwide —
shipping products from idea to production in under 2 weeks
```

### 2.3 Trustpilot Badge
**Current:** `Trustpilot` text with green star SVG  
**Replace with:** Remove the "Trustpilot" label text. Replace with `Clients` or keep the star rating visual but remove the word "Trustpilot" since Mantrik Labs is not listed there.

### 2.4 Counter Number
**Current:** `data-to="120"` (animates to 120+)  
**Replace with:** `data-to="20"` (matches content.md: 20+ happy clients)

### 2.5 Quote Text
**Current:** `Good AI feels obvious—because the hard work is hidden.`  
**Replace with:** `"Best agency we've worked with. Transparent, fast, and the product actually works."` (from content.md testimonial #3)

### 2.6 Quote Attribution
**Current:**
```
Name: Ava Collins
Role: Aigocy's Design Lead
```
**Replace with:**
```
Name: SaaS Startup
Role: Client, USA
```

### 2.7 Mission Text (in `select-work.html` and `about.html`)
**Current:**
```
Based in Montréal, Canada, we build human-centered AI for production. Our mission is to create intelligent systems that empower people and organizations. By uniting research, design, and engineering, we deliver scalable and reliable AI solutions—technology that's practical, trustworthy, and designed to make a meaningful impact in the real world.
```
**Replace with:**
```
Based in Boudha, Kathmandu, Nepal, we build products that work. Our mission is to bridge the gap between technological potential and what businesses actually experience — by building intelligent systems that solve real problems, save real time, and drive real growth.
```

---

---

## 3. HERO SECTION (index.html)

**Applies to:** `index.html`, `components/hero-banner/hero-banner.html`

### 3.1 Eyebrow Badge
**Current:** `AI-Driven Agency`  
**Replace with:** `Digital Transformation Partner`

### 3.2 Main Headline
**Current:**
```
Your AI Sprint Team
on Demand
```
**Replace with:**
```
Building Digital Power for
Ambitious Businesses
```

### 3.3 Supporting Text
**Current:**
```
From discovery to deployment, we plug into your stack to prototype,
validate, and launch AI experiences your users actually love.
```
**Replace with:**
```
We craft intelligent AI Receptionists, smart business automation workflows,
and high-performance apps that drive measurable growth.
```

### 3.4 CTA Buttons
**Current:**
- `Explore Services` → service.html
- `View Pricing Plans` → #pricing

**Replace with:**
- `Start Your Project` → contact.html
- `See Our Work` → work.html

---

---

## 4. SERVICES SECTION (index.html)

**Applies to:** `index.html`, `service.html`, `components/services/`

### 4.1 Section Heading
**Current:**
```
Services
End-to-End
AI Services
```
**Replace with:**
```
Services
What We
Build
```

### 4.2 Section Description
**Current:**
```
We turn ambiguous AI ideas into production features your users trust—combining strategy, design, engineering, and rigorous evaluation.
```
**Replace with:**
```
From AI systems to full-stack apps — end to end.
```

### 4.3 Service Accordion Items
Replace ALL 4 service cards:

**Card 1:**
- Current: `AI Strategy & Mapping` (01)
- Replace title: `AI Receptionist Systems` (01)
- Replace desc: `24/7 AI for voice, WhatsApp, SMS, and web chat. Books appointments, answers FAQs, integrates with CRMs.`
- Replace tags: `Voice calls` / `WhatsApp & SMS` / `CRM integration`

**Card 2:**
- Current: `AI UX & Product Design` (02)
- Replace title: `Workflow Automation` (02)
- Replace desc: `Automate repetitive work: emails, lead follow-ups, and data syncing using n8n and Make.`
- Replace tags: `Email workflows` / `Lead follow-ups` / `Data syncing`

**Card 3:**
- Current: `LLM / Agent Development` (03)
- Replace title: `Web Design & Development` (03)
- Replace desc: `Modern, fast, SEO-optimized web platforms — from landing pages to complex full-stack applications.`
- Replace tags: `React / Next.js` / `E-commerce` / `CMS sites`

**Card 4:**
- Current: `Data Engineering & Pipelines` (04)
- Replace title: `Mobile Apps` (04)
- Replace desc: `High-performance native and cross-platform mobile apps published to App Store and Google Play.`
- Replace tags: `Flutter` / `React Native` / `iOS & Android`

---

---

## 5. FEATURED WORKS SECTION

**Applies to:** `index.html`, `work.html`, `components/featured-works/`

Replace the 4 project cards:

**Project 1:**
- Current: `Support Copilot for SaaS`
- Replace title: `AI Receptionist — Healthcare Clinic`
- Description: `24/7 voice and WhatsApp AI for a clinic in UAE. Handles bookings, FAQs, and after-hours calls.`
- Deliverables: `Voice AI, WhatsApp bot, CRM sync`
- Industry: `Healthcare`

**Project 2:**
- Current: `Underwriting Risk Copilot`
- Replace title: `E-commerce Automation Platform`
- Description: `Full lead-to-invoice automation for an online retailer in UK. Saves 15+ hours per week.`
- Deliverables: `n8n workflows, CRM integration`
- Industry: `E-commerce`

**Project 3:**
- Current: `Clinical Note Summarizer`
- Replace title: `SaaS Web Application`
- Description: `Full-stack React/Next.js dashboard for a SaaS startup in USA.`
- Deliverables: `React, Next.js, Node.js API`
- Industry: `SaaS`

**Project 4:**
- Current: `Catalog Intelligence Engine`
- Replace title: `Mobile Booking App`
- Description: `Flutter-based restaurant and booking app for a hospitality brand.`
- Deliverables: `Flutter, Firebase, push notifications`
- Industry: `Hospitality`

---

---

## 6. PROCESS SECTION

**Applies to:** `index.html`, `service.html`, `components/process/`

Replace 3 process cards:

**Card 1:**
- Current: `Discover & Scope` / `3-7 DAYS`
- Replace: `Discovery Call` / `FREE, 30 MIN`
- Desc: `Understand goals, challenges, and what to build. No commitment.`

**Card 2:**
- Current: `Prototype` / `1-2 WEEKS`
- Replace: `Proposal & Design` / `1-2 WEEKS`
- Desc: `Detailed proposal with scope, timeline, and cost. Design approved before any code.`

**Card 3:**
- Current: `Validate & Evals` / `1 WEEKS`
- Replace: `Build & Launch` / `2-12 WEEKS`
- Desc: `Agile development with weekly updates. Testing, deployment, and 30 days free post-launch support.`

---

---

## 7. BENEFITS SECTION

**Applies to:** `index.html`, `components/benefits/benefits.html`

### 7.1 Section Title
**Current:** `Benefits` / `Why Choose Us`  
**Replace with:** `Why Mantrik Labs` / `Why Choose Us`

### 7.2 Progress Labels
**Current:** `Accuracy`, `Latency`, `Safety`, `Cost`  
**Replace with:** `Speed`, `Transparency`, `Quality`, `Value`

### 7.3 Benefit Box Titles & Descriptions
**Box 1 (top-left):**
- Current: `Outcome over Output` / `We measure what matters...`
- Replace: `We Ship Fast` / `MVPs launched in under 2 weeks. Fast but not rushed. When you're ready to move, we're already ahead.`

**Box 2 (top-right):**
- Current: `Eval-First Reliability` / `From day one, we run offline/online evals...`
- Replace: `No Black Box` / `Updates every 3 days. Live project board access. Direct line to the team building your product.`

**Box 3 (bottom-left):**
- Current: `Secure by Design` / `PII handling, SSO/SAML...`
- Replace: `Business-First` / `Before we build anything, we ask why. We focus on outcomes, not output. If something doesn't earn its place, we tell you honestly.`

**Box 4 (bottom-right):**
- Current: `Design-Led AI Experiences` / `We craft prompts, interfaces...`
- Replace: `We Stick Around` / `Launch day isn't the finish line. We track what's working, fix what isn't, and keep improving your product.`

---

---

## 8. FEATURES SECTION

**Applies to:** `index.html`, `components/features/`

### 8.1 Section Title
**Current:** `Features` / `All Features in One`  
**Replace with:** `What We Offer` / `Full-Service Capabilities`

### 8.2 Feature Items (6 total)
Replace the 6 feature items:

| # | Current Title | Replace Title | Replace Description |
|---|---|---|---|
| 1 | Agent-Powered Workflows | AI Receptionist Systems | 24/7 AI for voice, WhatsApp, SMS, and web chat. Books appointments, answers FAQs, routes inquiries. |
| 2 | Eval-First Quality | Workflow Automation | Eliminate manual work — email sequences, lead follow-ups, invoice generation, data syncing between platforms. |
| 3 | Private Knowledge RAG | Web Design & Development | Full-stack React/Next.js apps, marketing pages, e-commerce stores, and CMS-powered sites. |
| 4 | Human-Centered AI UX | Mobile Apps (iOS & Android) | Native and cross-platform apps using Flutter, React Native, Swift, Kotlin. Full UI/UX included. |
| 5 | Secure by Design | Brand & Design | Logos, color systems, UI/UX design, Figma prototypes, and full design systems with reusable components. |
| 6 | Seamless Integrations | Custom AI Applications | LLM-powered tools, computer vision, document intelligence, custom chatbots, and admin dashboards. |

---

---

## 9. TEAM SECTION

**Applies to:** `index.html`, `about.html`, `components/team/`

Replace all team members:

| # | Current Name | Current Role | New Name | New Role |
|---|---|---|---|---|
| 1 | Ava Collins | Aigocy's Design Lead | Founder & CEO | Strategy, vision, client relationships |
| 2 | Noah Reed | ML/Agent Lead. Builds domain agents | Lead AI Engineer | Voice systems, LLM pipelines, automations |
| 3 | Lucas Hayes | Solutions Architect. Connects AI to your stack | Lead Designer | UI/UX, brand identity, Figma prototypes |
| 4 | Jordan Brooks | Data Engineer. Secure access policies | Lead Developer | React, Next.js, Flutter, Node.js |
| 5 | Erin Park | MLOps Engineer. Productionizes with CI/CD | *(Remove or keep as 4-person team)* | — |

**Section heading:**
- Current: `Team Members` / `The Squad Shipping Your AI`
- Replace: `Our Team` / `The Team Behind Mantrik Labs`

---

---

## 10. STATISTICS SECTION

**Applies to:** `index.html`, `components/statistic/`

### 10.1 Section Heading
**Current:** `Statistic` / `Human-centered AI, built for production`  
**Replace with:** `By the Numbers` / `Building products that work`

### 10.2 Quote Text
**Current:** `We shipped our first copilot in 7 weeks and cut support tickets by 31%. The eval dashboards made every decision obvious.`  
**Replace with:** `Their AI receptionist cut our missed calls to almost zero. Setup was done in 10 days.`

### 10.3 Stat Cards
| Current Label | Current Number | New Label | New Number |
|---|---|---|---|
| OUR GROWTH | 230K | PROJECTS DELIVERED | 50+ |
| UPTIME FOR KEY FLOWS | 95% | CLIENT RETENTION | 95% |
| ON TIME DELIVERY | 99% | MVP DELIVERY | 2 Weeks |

---

---

## 11. AWARDS SECTION

**Applies to:** `index.html`, `about.html`, `components/awards/`

**Replace all 4 award items with Mantrik Labs milestones:**

| # | Current Title | Replace Title | Replace Text | Year |
|---|---|---|---|---|
| 1 | Innovation in AI | First Client Served | AI Receptionist for Healthcare Clinic (UAE) | 2024 |
| 2 | Best AI Product Design | 50+ Projects Milestone | Across AI, automation, web, and mobile | 2025 |
| 3 | Data & AI Excellence | 95% Retention Rate | Long-term partnerships with clients worldwide | 2025 |
| 4 | Innovation in AI | 24/7 AI Systems Live | Serving clients across multiple time zones | 2025 |

---

---

## 12. TESTIMONIALS SECTION

**Applies to:** `index.html`, `about.html`, `components/testimonials/`

Replace all 3 testimonials:

**Testimonial 1:**
- Current: `We shipped our first copilot in 7 weeks...` — Elena Ruiz, Cantos SaaS's VP Product
- Replace: `Their AI receptionist cut our missed calls to almost zero. Setup was done in 10 days.` — Clinic Owner, UAE

**Testimonial 2:**
- Current: `SSO/SAML and RBAC landed smoothly...` — Marcus Tan, VectorPay's CTO
- Replace: `They automated our entire lead follow-up. Saves us 15+ hours a week.` — E-commerce Founder, UK

**Testimonial 3:**
- Current: `The best partner for agentic work...` — David Kim, Northway's Ecommerce Director
- Replace: `Best agency we've worked with. Transparent, fast, and the product actually works.` — SaaS Startup, USA

---

---

## 13. PRICING SECTION

**Applies to:** `index.html`, `service.html`, `components/pricing/`

### 13.1 Section Heading
**Current:**
```
Pricing Plans
From pilot to enterprise
clear scope, transparent costs
annually.
```
**Replace with:**
```
Pricing
Every project is scoped individually.
No public rate card.
Request a free proposal.
```

### 13.2 Starter Plan
- Current name: `Starter Plan` / `For startups`
- Replace: `Standard Projects` / `For most businesses`
- Current price: `$9,900` / `$1,000`
- **Remove specific dollar amounts.** Replace with: `Custom Quote`
- Current description: `Prove value in two weeks with a clickable UX, tech spike, and a clear go/no-go roadmap.`
- Replace: `Landing pages, simple automations, brand identity, and single-platform apps. Delivered in 1–4 weeks.`
- Checklist items:
  - `Free 30-min discovery call`
  - `Written proposal with scope & timeline`
  - `Design approval before development`
  - `30 days free post-launch support`

### 13.3 Enterprise Plan
- Current name: `Enterprise Plan` / `For organisations`
- Replace: `Complex Projects` / `For ambitious businesses`
- Current price: `$19,900` / `$1,700`
- **Remove specific dollar amounts.** Replace with: `Custom Quote`
- Current description: `Compliance-ready delivery for complex orgs—multi-env releases, canaries, and change management.`
- Replace: `Full-stack web/mobile apps, AI systems, multi-platform automation. Delivered in 4–12 weeks.`
- Checklist items:
  - `Everything in Standard`
  - `Agile sprints with weekly updates`
  - `Full testing & QA`
  - `Milestone-based payments available`

### 13.4 Payment info
**Current:** Annual/Monthly toggle  
**Replace:** Remove the toggle or change to: `50% upfront, 50% on completion. Milestone-based for larger projects. Methods: Bank transfer, PayPal, Stripe, cryptocurrency.`

---

---

## 14. FAQ SECTION — Fix All Answers

**Applies to:** `index.html`, `about.html`, `service.html`, `work.html`, `contact.html`, `service-single.html`, `components/faqs/faqs.html`, `components/faqs/faqs--index.html`

### Current state:
All 4 FAQ items have the **SAME wrong answer:**
```
A clear problem statement, success metrics, access to sample data, and a stakeholder who can make decisions. We'll run a kickoff workshop to align scope.
```

### Correct answers (match question to answer):

**Q1: "What's the typical timeline from idea to v1?"**  
**A1:** `Depends on scope. A landing page or simple automation takes 1–2 weeks. A full web or mobile app runs 6–12 weeks. We provide a clear timeline in the proposal before work starts — no guessing.`

**Q2: "What do we need to start?"**  
**A2:** `A clear problem statement, success metrics, and a stakeholder who can make decisions. Book a free 30-minute discovery call — no commitment, no cost. We listen, ask questions, and understand your goals.`

**Q3: "Which models/stack do you use?"**  
**A3:** `We're stack-agnostic. Frontend: React, Next.js, Vue.js, Flutter. Backend: Node.js, Python. AI: OpenAI GPT-4, Anthropic Claude, Google Gemini, LangChain, open-source models. We pick the best tools for each project.`

**Q4: "Are model/API costs included in pricing?"**  
**A4:** `Pricing depends on scope and complexity. Standard payment: 50% upfront, 50% on completion. Milestone-based for larger projects. We accept bank transfers, PayPal, Stripe, and cryptocurrency.`

---

---

## 15. CONTACT SECTION

**Applies to:** `index.html`, `contact.html`, `components/contact/`

### 15.1 Section Heading
**Current:** `Contact` / `Let's Build Intelligent Things`  
**Replace with:** `Contact` / `Let's Build Something`

### 15.2 Contact Details
Already correctly set to:
- Email: hello@mantriklabs.com ✅
- Phone: +977 9764597917 ✅

### 15.3 Contact Page Quick FAQ (contact.html only)
If present, use these Q&A pairs:
- **How quickly do you reply?** Within 2–4 hours.
- **Is the discovery call really free?** Yes. 30 minutes, no commitment.
- **Do you work with international clients?** Yes. Majority of our clients are international.
- **What payment methods do you accept?** Bank transfer, PayPal, Stripe, cryptocurrency.

---

---

## 16. FOOTER

**Applies to:** ALL pages, `components/footer/footer.html`, `components/footer/footer--index-v2.html`

### 16.1 Social Header
**Current:** `Get connected with Aigocy on social`  
**Replace:** `Get connected with Mantrik Labs on social`

### 16.2 Copyright
**Current:** `© 2026 Aigocy. All Rights Reserved.`  
**Replace:** `© 2026 Mantrik Labs. All Rights Reserved.`

### 16.3 Footer Links
Keep: `About | Services | Works | Contact` ✅

---

---

## 17. COMPONENT FILES — Complete List of Changes

These files in `/components/` are template fragments. Apply ALL of the same replacements listed above:

| File | What to fix |
|---|---|
| `components/about/about.html` | Location, quote attribution, heading, Trustpilot, counter |
| `components/select-work/select-work.html` | Location, mission text, quote attribution |
| `components/hero-banner/hero-banner.html` | Hero text, badge, CTAs |
| `components/team/team.html` | Team names, roles |
| `components/team/team--index-v2.html` | Team names, roles |
| `components/footer/footer.html` | Copyright |
| `components/footer/footer--index-v2.html` | Social text, copyright |
| `components/page-title/page-title.html` | "Aigocy" → "Mantrik Labs" |
| `components/faqs/faqs.html` | All 4 FAQ answers |
| `components/faqs/faqs--index.html` | All 4 FAQ answers |
| `components/blog-single/blog-single.html` | "Davies" commenter name |
| `components/contact/contact--contact.html` | "USA, New York" address |
| `components/pricing/` | Pricing section changes |
| `components/process/` | Process card changes |
| `components/benefits/benefits.html` | Benefit titles, descriptions, progress labels |
| `components/features/` | Feature titles, descriptions |
| `components/testimonials/` | All 3 testimonials |
| `components/statistic/` | Stats heading, quote, stat cards |
| `components/awards/` | All 4 awards |
| `components/services/` | Service accordion items |
| `components/featured-works/` | All 4 project cards |

---

---

## 18. ARCHIVE FILES

Apply the same global replacements (Section 1) to all files in `/archive/archived-pages/`:
- `index-v2.html`
- `blog-standard.html`
- `blog-two-columns.html`
- `blog-three-columns.html`

---

---

## EXECUTION ORDER (Recommended)

1. **Fix file encodings** (Section 0) — ensure all files are UTF-8
2. **Global find-and-replace** (Section 1) — brand names, copyright, meta, locations
3. **Section-by-section content** (Sections 2–16) — work through each section
4. **Component files** (Section 17) — apply same changes to component templates
5. **Archive files** (Section 18) — apply global replacements
6. **Verify** — grep for any remaining `Aigocy`, `Davies`, `Montréal`, `Trustpilot`, `kickoff workshop`

---

> **END OF PROMPT**
