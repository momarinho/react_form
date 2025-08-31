# React Form Example

A simple React form example built with Vite. It includes features like data fetching, validation, and submission.

## Features

- Form with title, description, and price fields.
- Real-time validation.
- Submission to a mock API.
- Loading state while fetching initial data.
- Success and error messages.
- Refactored into a clean and reusable structure with components and hooks.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

```bash
npm install
```

### Running the application

```bash
npm run dev
```

## Folder Structure

```
/home/mateus/react_form/
├───.gitignore
├───db.json
├───eslint.config.js
├───index.html
├───package-lock.json
├───package.json
├───README.md
├───vite.config.js
├───.git/...
├───node_modules/...
├───public/
│   └───vite.svg
└───src/
    ├───App.css
    ├───App.jsx
    ├───index.css
    ├───main.jsx
    ├───assets/
    │   └───react.svg
    ├───components/
    │   ├───FormInput.jsx
    │   ├───ItemForm.jsx
    │   └───Spinner.jsx
    └───hooks/
        ├───useForm.js
        └───useValidation.js
```

## Technologies Used

- React
- Vite
- JavaScript