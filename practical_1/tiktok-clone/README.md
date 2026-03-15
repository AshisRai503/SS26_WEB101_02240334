# Practical 1 - Tiktok Clone

# Introduction

The goal of this practical is to create a simplifed version of Tiktok using Next.js, React Hook Form and TailwindCSS. The replicated web page should have a functioning sidebar, a vudeo feed layout, dedicated profile and upload sections and an operational login and signup forms.

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

### Step 5: Create Basic Layout Components

Create src/components/layout/MainLayout.jsx with sidebar navigation links.

### Step 6: Update layout.js in the App Directory

Modify src/app/layout.js to use your custom layout.
### Step 7: Create Basic Pages for Navigation

Create the following files:
src/app/profile/page.jsx
src/app/upload/page.jsx

### Step 8: Start the Development Server

``` npm run dev ```

Visit http://localhost:3000

## Part 2 - Creating the Web Layout and Main Interface

Objectives:
Sidebar navigation
Main content area
Basic video feed layout
Placeholder video components

### Step 1: Install Additional Dependencies

``` npm install react-icons ```

### Step 2: Update Layout Structure

Update src/components/layout/MainLayout.jsx to match TikTok's sidebar layout with icons and navigation links.

### Step 3: Create Video Card Component

Create src/components/ui/VideoCard.jsx with like, comment, and share buttons.

#### Step 4: Create VideoFeed Component

Create src/components/ui/VideoFeed.jsx with dummy post data.

### Step 5: Update the Home Page

Modify src/app/page.js to include the VideoFeed component.

### Step 6: Create Following Page

Create src/app/following/page.jsx for the following feed.

### Step 7: Create Explore Page

Create src/app/explore/page.jsx with trending hashtags and popular videos.

### Step 8: Create Live Page

Create src/app/live/page.jsx with live stream grid.

### Step 9: Update Upload Page

Update src/app/upload/page.jsx with video upload form and options.

### Step 10: Update Profile Page

Update src/app/profile/page.jsx with user info, stats, and video grid.

### Step 11: Test Your Application

Ensure all pages and navigation work as intended.

### Part 3 - Creating Login and Registration Forms

Objectives:

    Login and signup pages

    Form validation

    Navigation links

    Understand form concepts

    Key Concepts

    React Hook Form

        register: Register inputs in the form

        handleSubmit: Handle form submission

        watch: Observe form values

        errors: Contains validation errors

    Form Validation

        required: Make fields mandatory

        pattern: Validate against regex

        minLength: Ensure minimum length

        validate: Custom validation functions

    Form Submission

        Handle loading states

        Send data to API

        Display success/error messages

    Loading States

        Prevent multiple submissions

        Provide visual feedback

    Form Error Handling

        Display validation messages under inputs

        Show field-specific errors

### Step 1: Install React Hook Form

``` npm install react-hook-form ```

### Step 2: Create Login Page

Create src/app/login/page.jsx with:
Email and password fields   
Required field validation
Email format validation
Forgot password link
Link to signup page

### Step 3: Create Signup Page

Create src/app/signup/page.jsx with:
Username field (min 3 chars, alphanumeric + underscore)
Email field (valid format)
Password field (min 8 chars, uppercase, lowercase, number, special char)
Confirm password field (must match)
Terms and conditions checkbox (required)
Link to login page

### Step 4: Update MainLayout Component

Update src/components/layout/MainLayout.jsx:
Add Login link in the sidebar
Update the Login button to link to the login page

### Step 5: Test Form Validation

Test the following scenarios: 
Submit empty forms
Invalid email formats
Short passwords
Non-matching passwords
Unchecked termsSuccessful
submission with valid data