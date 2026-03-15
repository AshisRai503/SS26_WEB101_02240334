# Practical 1: TikTok

## Overview
The goal of this practical is to create a simplifed version of Tiktok using Next.js, React Hook Form and TailwindCSS. The replicated web page should have a functioning sidebar, a vudeo feed layout, dedicated profile and upload sections and an operational login and signup forms


## Instructions Followed

### Part 1: Getting Started

#### Project Initialization
```bash
npx create-next-app@latest
```
Configuration choices:
- TypeScript: No (using JSX)
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: Yes
- App Router: Yes
- Default import alias: No

#### Project Structure Created
```
src/
├── app/
│   ├── profile/
│   │   └── page.jsx
│   ├── upload/
│   │   └── page.jsx
│   ├── following/
│   │   └── page.js
│   ├── explore/
│   │   └── page.js
│   ├── live/
│   │   └── page.js
│   ├── login/
│   │   └── page.jsx
│   ├── signup/
│   │   └── page.jsx
│   └── layout.js
├── components/
│   ├── layout/
│   │   └── MainLayout.jsx
│   └── ui/
│       ├── VideoFeed.js
│       └── VideoCard.jsx
└── lib/
```

### Part 2: Creating the Web Layout

#### 1. Sidebar Navigation Implementation
Created a fixed sidebar with navigation links using React Icons:
- For You (Home)
- Following
- Explore
- Suggested Accounts
- LIVE
- Login button


#### 2. Video Feed Components
Implemented:
- `VideoCard.jsx`: Reusable component for displaying individual videos with interaction buttons (like, comment, share)
- `VideoFeed.js`: Container component that maps through dummy data to display multiple videos

#### 3. Additional Pages Created
- Following page
- Explore page with trending hashtags
- LIVE page with stream listings
- Upload page with form fields
- Profile page with user information

#### 4. Authentication Forms
Installed and implemented React Hook Form for validation:
- Login page with email/password validation



- Signup page with:
  - Username validation (min 3 characters, alphanumeric+underscores)
  - Email validation (pattern matching)
  - Password validation (min 8 characters, complexity requirements)
  - Confirm password validation
  - Terms agreement checkbox
