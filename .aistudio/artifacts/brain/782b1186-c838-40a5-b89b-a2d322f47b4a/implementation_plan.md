# Three-Tier Role-Based Access Control & Admin Governance

Implementation plan for establishing three distinct operational roles (**Admin**, **Project Manager**, **Client**), an in-app Account Center with sign-up and authentication, project access isolation, and an Admin Governance Hub with inline quick-edit controls for system tooltips and default guides.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural decisions confirmed during Phase 1:
> 1. **Third User Role**: **Client** — Hotel client role with clean, view-only access to their specific hotel roadmap, tracking progress, milestones, and deliverables without edit controls.
> 2. **PM Authentication & Registration**: **In-app Account Center** — Modal-driven authentication enabling Project Managers to register new accounts (Name, Email, Password/PIN), sign in, and manage their active session with persistent local storage.
> 3. **Admin Configuration Experience**: **Hybrid Admin Hub & Inline Quick-Edit** — Centralized Admin Settings Hub accessible from the top bar for comprehensive oversight of all tooltips and default guides, paired with contextual inline pencil/gear icons next to tooltips and guides when logged in as Admin.

---

## 1. Overview & Core Concept

### What It Does
Transforms the single-tenant roadmap interface into a secure, multi-tier collaborative portal tailored for hotel website rollouts:
- **Admin**: Master supervisor with complete visibility across all projects, power to configure global default guides (links, PDFs, labels), and authority to customize system-wide tooltip guidance texts.
- **Project Manager (PM)**: Operational lead who can create a personal account, manage only their assigned hotel projects, and override project guides (custom links or PDF uploads) without altering global defaults.
- **Client**: Hotel owner or marketing director with dedicated, distraction-free view-only access to their project's milestones, deadlines, and guide resources.

### Target Audience & Persona
- **Platform Administrators & Operations Leads**: Maintain standardized onboarding best practices, update documentation URLs, and fine-tune guidance copy across the organization.
- **D-EDGE Project Managers**: Coordinate day-to-day website deliveries, upload client-specific sitemaps or text documents, and monitor completion timelines for their own portfolio.
- **Hotel Stakeholders & Clients**: Review progress transparently and download guidance materials without risk of unintended layout modifications.

---

## 2. User Experience & Visual Design

### A. Top Navigation & Identity Center
- **Unified Identity Bar**: A refined session status indicator in the top right navigation:
  - Displays user avatar with role badge: `[Admin · All Projects]`, `[Dounia · PM (1 Project)]`, or `[Le Grand Hotel Paris · Client View]`.
  - Action button: `Account Center` (Sign in, Register PM, Switch Persona, or Log Out).
- **Interactive Role & Persona Switcher**: Quick-test dropdown allowing instant role previewing during demonstrations, backed by persistent credentials.

### B. In-App Account Center (Modal Dialog)
- **Sign-In View**:
  - Email and Password/PIN input with instant client-side validation.
  - Quick-login shortcuts for pre-seeded profiles:
    - **Master Admin** (`admin@d-edge.com`)
    - **PM Dounia** (`dounia@d-edge.com` — Le Grand Hotel Paris)
    - **PM Marc** (`marc@d-edge.com` — Resort Alpine & Spa)
    - **Client View** (read-only hotel visitor)
- **Create PM Account View**:
  - Full Name, D-EDGE Work Email, Password / Access PIN.
  - Automatic assignment of initial projects or creation of a new managed project.
  - Instant session establishment with toast notification feedback.

### C. Admin Governance Hub & Inline Quick-Edit Experience
- **Centralized Admin Hub**: Accessible via a prominent `Admin Hub` button in the top bar for Admin users:
  - **Tooltips Manager Tab**: Searchable catalog of all 12+ system tooltips (Sitemap, SEO Questionnaire, Evolution Templates, Texts, Images, Brand Colors & Typo, Staging, Wave 1, Wave 2, DNS Pre-launch, Booking Engine, Server Selection). Admins can edit copy in real time, view previews, and reset to factory defaults.
  - **Default Guides Manager Tab**: Overview of the 4 step guides (Sitemap Guide, Content Collection Guide, Revisions Guide, Go-Live Protocol). Admins can edit default documentation URLs, upload default PDF references, change button labels, or toggle visibility for newly generated projects.
  - **All Projects Directory Tab**: Complete list of all hotels in the database with their assigned PMs, with the ability to reassign PM ownership or create new hotel projects.
- **Inline Quick-Edit Controls**:
  - In Admin mode, every tooltip help icon (`?`) features an adjacent subtle purple pencil button. Clicking it opens a lightweight inline popover allowing instantaneous text editing without navigating away.
  - Guide action buttons display an Admin gear icon allowing fast editing of the global default resource.

### D. Scoped Project Management for PMs
- **Project Dropdown Isolation**:
  - When logged in as a PM, the project selector only lists projects where `pmEmail === currentUser.email`.
  - Other PMs' projects are completely hidden from the dropdown, ensuring focused workspace hygiene.
  - PMs have a `+ New Project` button that automatically sets the creator as the owning PM.
- **Project-Level Guide Customization**:
  - When a PM edits a guide (e.g. changing the Sitemap Guide link or uploading a bespoke PDF), the change is saved strictly into `project.customGuides[guideId]`.
  - A visual badge indicates *"Customized for this hotel (Global default unchanged)"*.
  - A convenient button *"Reset to Admin Default"* allows PMs to revert their project back to global defaults anytime.

### E. Client Read-Only Experience
- All editing controls (deadline pickers, checklist completion toggles, file upload modals, custom label edits) are disabled or replaced with readable text.
- Clean presentation highlighting the milestone calendar, stage completion gauges, and clickable guide resources for review.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Project Scoping & Isolation
- **Approach**: Strict filtering of the project selector based on authenticated user email for PMs, whereas Admins receive an unrestricted selector with a "Show All Projects" indicator.
- **Why**: Protects PM focus and prevents accidental edits to colleagues' roadmaps while preserving instant oversight for the Admin.

### Decision 2: Two-Tier Guides Architecture (Global Defaults vs. Project Overrides)
- **Approach**: Maintain a global `systemGuidesConfig` managed exclusively by Admins. Projects inherit from `systemGuidesConfig` unless explicitly overridden in `project.customGuides`.
- **Why**: Allows Admins to update global best practices (e.g., updating a company-wide Google Drive link or PDF template) and have it automatically propagate to all projects that haven't set a bespoke guide, while PMs retain the freedom to customize on demand.

### Decision 3: Dual Admin Editing (Centralized Hub + Inline Quick Edits)
- **Approach**: Provide both a comprehensive Admin Hub modal and contextual inline hover-edit buttons.
- **Why**: The user specifically requested both options. Inline edit allows quick typo fixes during page browsing, while the Admin Hub provides bulk review and configuration.

### Decision 4: Persistent Local & State Storage
- **Approach**: Persist accounts, session state, customized tooltips, and project guides in `localStorage` with initial seeds and reset capabilities.
- **Why**: Zero external backend dependencies needed, seamless immediate functionality, resilient across browser refreshes, and instant loading.

---

## 4. Technical Architecture & Data Strategy

### System Layout & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                                                      │
│ ┌───────────────┐  ┌────────────────────────────────────┐  ┌──────────────────────────┐ │
│ │ D-EDGE Brand  │  │ Project Selector (Filtered by PM)  │  │ User Identity & Auth Hub │ │
│ │ Wordmark      │  │ • Admin: All Projects              │  │ • Active Role Badge      │ │
│ │               │  │ • PM: Owned Projects Only          │  │ • Admin Hub Button       │ │
│ └───────────────┘  └────────────────────────────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
┌──────────────────┐             ┌──────────────────┐              ┌──────────────────┐
│   ADMIN ROLE     │             │     PM ROLE      │              │   CLIENT ROLE    │
│                  │             │                  │              │                  │
│ • Access All     │             │ • Access Own     │              │ • View Assigned  │
│   Projects       │             │   Projects Only  │              │   Hotel Roadmap  │
│ • Global Default │             │ • Override Own   │              │ • Read Guides &  │
│   Guides Editor  │             │   Guides (Local) │              │   Tooltips       │
│ • Global Tooltip │             │ • Full Timeline  │              │ • View-Only Mode │
│   Text Editor    │             │   Editing        │              │   (No Edits)     │
│ • Inline Pencil  │             │ • In-App Account │              │                  │
│   Icons Enabled  │             │   Center Access  │              │                  │
└──────────────────┘             └──────────────────┘              └──────────────────┘
         │                                 │                                 │
         └─────────────────────────────────┼─────────────────────────────────┘
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ APPLICATION STATE & PERSISTENCE ENGINE                                                  │
│ • currentUser: { id, name, email, role: 'admin' | 'pm' | 'client' }                     │
│ • users: [ { id, name, email, password, role } ] (Persisted in localStorage)            │
│ • globalTooltips: { [tooltipKey]: string } (Customizable by Admin)                      │
│ • globalGuides: { [guideKey]: { name, url, pdfName, pdfData, enabled } }                │
│ • projects: [ { id, name, pmEmail, customGuides: {...}, steps: [...] } ]               │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entities

```typescript
type UserRole = 'admin' | 'pm' | 'client';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

interface TooltipConfig {
  id: string;
  label: string;
  defaultText: string;
  currentText: string;
}

interface GuideConfig {
  id: string;
  name: string;
  section: string;
  buttonLabel: string;
  resourceType: 'link' | 'pdf' | 'none';
  resourceUrl: string;
  pdfAttachmentName: string;
  pdfAttachmentData?: string; // Data URL for uploaded guide PDFs
  enabled: boolean;
}
```

### Interactive Component & State Mapping

1. **Authentication & Session Lifecycle**:
   - `initAuthSystem()`: Loads stored user accounts, sets initial session (defaults to Admin or remembers last user), updates top bar UI.
   - `handlePMRegister(formData)`: Validates unique email, saves new PM to `users` array, triggers immediate sign-in, and filters projects to new PM.
   - `handleLogin(email, password)`: Verifies credentials, updates `currentUser`, and re-renders project list and interface according to role.
   - `switchRole(role, specificUser)`: Updates session, dynamically toggles edit affordances (enables Admin Hub / inline pencils for Admin; enables PM editing & filters projects for PM; locks into view-only for Client).

2. **Admin Tooltip Management**:
   - `openAdminHub('tooltips')`: Displays modal catalog of all tooltips with search and quick edit inputs.
   - `saveTooltipText(tooltipId, newText)`: Updates `globalTooltips[tooltipId]`, saves to `localStorage`, and instantly updates DOM text and `title` attributes.
   - `openInlineTooltipEditor(tooltipId, event)`: Spawns popover next to clicked help icon allowing immediate text editing with "Save" and "Reset Default" actions.

3. **Two-Tier Guides Engine**:
   - `openAdminHub('guides')`: Displays default guides editor allowing Admin to configure global URLs, upload master PDFs, and set labels.
   - `saveDefaultGuide(guideId, guideData)`: Updates `globalGuides[guideId]`, which serves as the default for all projects.
   - `openPMGuideEditor(guideId)`: Accessible by PMs on the current project. Allows editing `project.customGuides[guideId]` (link, PDF upload, enabled state) without touching `globalGuides`.

4. **Project Visibility Filtering**:
   - `getAccessibleProjects()`:
     - If `currentUser.role === 'admin'`: returns all `projects`.
     - If `currentUser.role === 'pm'`: returns `projects.filter(p => p.pmEmail === currentUser.email)`.
     - If `currentUser.role === 'client'`: returns `[currentProject]`.
   - `renderProjectSelector()`: Refreshes top bar dropdown options based on `getAccessibleProjects()`. If the current project is not accessible to the active PM, automatically switches to their first accessible project.
