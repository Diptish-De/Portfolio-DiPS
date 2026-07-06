# Portfolio Design Specification & Figma Guide

This document contains a comprehensive breakdown of the portfolio's design system, layout structure, interactive logic, and visual assets to help you build or refine the design in Figma.

---

## 1. Global Design System (Tokens)

Use these exact values in your Figma local styles:

### Colors
* **Primary Accent (Acid Lime):** `#CCFF00` (Used for active buttons, highlights, coordinate text, and plucked strings)
* **Secondary Accent (Cyan):** `#00FFFF` (Used for category tags, subtle details, and secondary metrics)
* **Main Background:** `#0A0A0A` (Deep matte black)
* **Card Background:** `#0F0F0F` or `#0A0A0A` with a dark border
* **Text Primary:** `#FFFFFF` (Pure white)
* **Text Secondary (Silver):** `#C0C0C0` or `#FFFFFF` at `60%` opacity (Muted descriptions, status lines)
* **Border Default:** `#1C1C1C` or `rgba(255, 255, 255, 0.1)`

### Typography
* **Display/Headings:** `Space Grotesk` (Bold / Black, uppercase, tight tracking/letter-spacing)
* **Body/Mono:** `JetBrains Mono` or any clean monospace font (e.g., `SF Mono`, `Fira Code`)
* **Scale:**
  * **Main Title:** `6rem` / `96px` (Hero name)
  * **Section Title:** `3.5rem` / `56px`
  * **Card Title:** `1.5rem` / `24px`
  * **Body Text:** `0.875rem` / `14px` (Monospace, height `1.6`)
  * **Metadata/HUD:** `0.75rem` / `12px`

---

## 2. Section-by-Section Design Specs

### SECTION A: Hero & Interactive Playground
* **Layout:** Full screen (`100vh` / `100vw`), flex centered content.
* **Canvas Backdrop:**
  * Underlaid with a 15-column vertical grid. In Figma, draw 15 vertical lines spanning from the top to the bottom of the screen.
  * *Resting style:* `1px` width, `rgba(255, 255, 255, 0.05)`.
  * *Active style (near cursor):* Curved path (using pen tool or vector warp) bending towards the cursor, colored `#CCFF00` with `2px` width and glow filter (`blur: 16px`, color `#CCFF00`, opacity `30%`).
* **HUD Overlays:**
  * *Top-Left Corner:* `SYSTEM ONLINE :: V 2.0.4` with a small `#CCFF00` dot (`8px` with a `glow` effect).
  * *Bottom-Right Corner:* `COORDS: 24.34.11`, `MEM: 54% T-4`, and a bouncing scroll prompt `SCROLL FOR DATA ▼` in `#CCFF00`.
* **Main Content:**
  * Large centered text: `DIPTISH` on line 1, `DE` on line 2 (Space Grotesk, massive).
  * Subtitle above name: `Full Stack Dev & UI/UX Designer` in `#CCFF00`, small caps.
  * Side-aligned bio: Left-aligned box with a `#CCFF00` left border (`2px`).
  * Action Buttons: Two cybernetic styled buttons (`Start_Sequence` filled in Lime, `View_Protocols` outline style).

---

### SECTION B: About ("LORE")
* **Screenshot Reference:**
  ![About Section](C:/Users/dedip/.gemini/antigravity-ide/brain/34340edb-8e1f-4f37-9a3d-a8f383677fc5/about_section_1783338724652.png)
* **Layout:** Two-column split layout.
  * *Left Column:* Clean text hierarchy ("DIGITAL ALCHEMIST"), core stats layout (Projects: 10+, Stack: Next.js + Tailwind) framed inside a thin border.
  * *Right Column:* Monochromatic profile picture with a neon border offset (`#CCFF00` border box rotated or offset by 4-8px behind the photo).
* **Figma Tip:** Use an inner glow on the profile image frame to give it a futuristic retro CRT monitor screen effect.

---

### SECTION C: Capabilities ("SYSTEM_CAPABILITIES")
* **Screenshot Reference:**
  ![Skills Section](C:/Users/dedip/.gemini/antigravity-ide/brain/34340edb-8e1f-4f37-9a3d-a8f383677fc5/skills_section_1783338740077.png)
* **Layout:** Marquee style horizontal text tracks.
  * Giant background text representing skills (`JAVA`, `C`, `SQL`, `TYPESCRIPT`, `TAILWIND`, `NODE.JS`) moving horizontally.
  * Text is colored `#1C1C1C` (very close to background color) so it feels like a subtle, giant structural layer behind the UI.

---

### SECTION D: Experience ("CHRONICLES / EXPERIENCE_LOG")
* **Screenshot Reference:**
  ![Experience Section](C:/Users/dedip/.gemini/antigravity-ide/brain/34340edb-8e1f-4f37-9a3d-a8f383677fc5/experience_section_1783338749608.png)
* **Layout:** Vertical timeline axis.
  * A single vertical line down the center of the viewport (colored `#CCFF00` or `#1C1C1C`).
  * Alternating content blocks on the left and right sides.
  * Connection points are neon diamonds (`#CCFF00`) centered on the timeline.
  * Cards have a very clean, dark background, sharp corners, and thin `#1C1C1C` borders.

---

### SECTION E: Project Database
* **Screenshot Reference:**
  ![Projects Section](C:/Users/dedip/.gemini/antigravity-ide/brain/34340edb-8e1f-4f37-9a3d-a8f383677fc5/projects_section_1783338770749.png)
* **Layout:** Horizontal sliding grid of project cards.
  * Cards are square/rectangular (`width: 400px`, `height: 288px`).
  * *Default state:* Dark card, white title text, index number in top left corner (e.g. `[01]`), top-right arrow.
  * *Hover state:* Background border changes to `#CCFF00`, title shifts to `#CCFF00`, and arrow moves up-right by `4px`.

---

### SECTION F: Footer / Contact ("TRANSMISSION_OPEN")
* **Screenshot Reference:**
  ![Footer Section](C:/Users/dedip/.gemini/antigravity-ide/brain/34340edb-8e1f-4f37-9a3d-a8f383677fc5/footer_section_1783338789981.png)
* **Layout:** Large centered call to action.
  * Header: "READY TO COLLABORATE?" (outlined display font).
  * CTA Button: Giant, solid neon green pill/rectangle reading `INITIALIZE_COMMS`.
  * Grid links at the bottom listing social handles (`GITHUB`, `LINKEDIN`, `INSTAGRAM`) and contact info (`EMAIL`, `MOODRIP`).

---

## 3. Interaction & Animation Spec for Figma Prototypes

To make your Figma prototype feel as dynamic as the live website, set up these Smart Animate interactions:

1. **Cyber Button Hover:**
   * *Default:* Outline button with sharp borders.
   * *Hover:* Change to a solid fill `#CCFF00` with text changing to black. Add a slide-in overlay effect or a slight glow shadow.
2. **String Plucking (Hero):**
   * Create an interactive component for the string. 
   * *State A (Idle):* Straight vertical line.
   * *State B (Hover):* Curved line pointing towards the right/left. (Set transition to `Smart Animate - Ease Out, 150ms`).
   * *State C (Release):* Curved line pointing slightly the opposite way, decaying back to State A. (Set transition to `Smart Animate - Elastic/Bouncy, 800ms`).
3. **Card Corners:**
   * All cards feature ornamental corner markings (L-shaped borders on the four corners). In Figma, draw these using small vector shapes and set their stroke to `rgba(255, 255, 255, 0.2)`. On hover, transition them to `#CCFF00` with a drop shadow.
