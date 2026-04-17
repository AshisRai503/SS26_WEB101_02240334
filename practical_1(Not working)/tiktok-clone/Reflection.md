## Concepts Applied

### 1. Next.js App Router
- **File-based routing**: Created pages by organizing files in the `app` directory (profile/page.jsx, upload/page.jsx, etc.)
- **Layout system**: Implemented a root layout and nested layouts using the App Router architecture
- **Client vs Server Components**: Used 'use client' directive for interactive components

### 2. React Components Architecture
- **Component Composition**: Built reusable components like `VideoCard` that accept props
- **Component Organization**: Separated components into logical folders (layout/, ui/)
- **State Management**: Used useState hook for interactive elements (like button toggling)

### 3. Tailwind CSS Styling
- Utility-first approach for rapid UI development
- Responsive design with flexbox and grid layouts
- Custom styling for TikTok-like interface

### 4. Form Handling with React Hook Form
- **Form registration**: Used `register` function to connect inputs to form state
- **Validation rules**: Implemented required fields, pattern matching, minLength
- **Error handling**: Displayed validation errors under each input
- **Form submission**: Prevented default behavior and handled loading states

### 5. React Icons Integration
- Used Font Awesome icons via react-icons package
- Implemented interactive icon buttons for user actions

### What I Learned

### Key Learning Outcomes

1. **Next.js App Router Benefits**
   - The new App Router provides a more intuitive way to organize routes
   - Layout components persist across navigation, improving performance
   - Understanding the difference between client and server components is crucial

2. **Form Validation Importance**
   - Proper validation prevents incorrect data submission
   - Real-time feedback improves user experience
   - Password confirmation requires custom validation logic

3. **Component Reusability**
   - Creating generic components like VideoCard saves development time
   - Passing data via props makes components flexible
   - Dummy data arrays help test UI before API integration

## Challenges 

1. **Sidebar not appearing**
    - Issue: Sidebar not appearing properly after updating Mainlayout component
      ![Alt text](https://github.com/AshisRai503/WEB101/blob/main/practical_1/tiktok-clone/Images/err2.png?raw=true)
    - Solution:I had forgotten to wrap the children in the MainLayout component. In my src/app/layout.js, I had
      ![Alt text](https://github.com/AshisRai503/WEB101/blob/main/practical_1/tiktok-clone/Images/sol2.png?raw=true)

2. **Syntax Error**
    - Issue: When implementing sidebar navigation, I encountered multiple JSX syntax errors due to incorrect clossing tags and improper nesting.
      ![Alt text](https://github.com/AshisRai503/WEB101/blob/main/practical_1/tiktok-clone/Images/err1.png?raw=true)
    - Solution:I realized that JSX components must return a single parent element wrapped in parentheses, not curly braces.
      ![Alt text](https://github.com/AshisRai503/WEB101/blob/main/practical_1/tiktok-clone/Images/Screenshot%202026-03-15%20234941.png?raw=true)

3. **Like Button Count**
    - The like count wasn't updating properly when toggling the like button.
    - Solution: I understood that the initial likes value from props shouldn't be directly mutated. Instead, I used state to track whether the post was liked and conditionally displayed likes + 1 when liked.





### Conclusion
This practical gave me first hand knowledge of contemporary Next.js and React development. Creating an interface similar to TikTok made it easier to comprehend the structure of real world applications, from form validation to component architecture. The difficulties encountered emphasized the value of meticulous attention to detail and methodical debugging, especially with regard to JSX syntax and validation logic.
