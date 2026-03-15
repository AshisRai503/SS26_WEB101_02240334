# Practical 1 - Tiktok Clone

# Introduction

The goal of this practical is to create a simplifed version of Tiktok using Next.js, React Hook Form and TailwindCSS. The replicated web page should have a functioning sidebar, a vudeo feed layout, dedicated profile and upload sections and an operational login and signup forms.

# Project Structure

# Instruction

## Part 1 - Getting Started

### Step 1: Navigate to your project
Open your terminal and navigate to your Github repost

### Step 2: Create a New Next.js Project

``` npx create-next-app@latest ```

Configuration options:

    TypeScript: No

    ESLint: Yes

    Tailwind CSS: Yes

    src/ directory: Yes

    App Router: Yes

    Custom import alias: No

### Step 3: Clean Up the Default Project

Navigate to src/app and replace contents of page.js with a basic component. Clean up globals.css to retain only Tailwind imports.

``` 
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p src/app/profile
mkdir -p src/app/upload
mkdir -p src/app/login
mkdir -p src/app/signup
mkdir -p src/app/following
mkdir -p src/app/explore
mkdir -p src/app/live 

```