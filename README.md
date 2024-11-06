# Every.io BOARD challenge

This project is a small challenge from [Every.io](https://www.every.io/) to create a Trello-style task management board with three columns:

- To Do;
- In Progress;
- Done.

Users can add tasks to the "To Do" column and move them between columns as they progress.

### Getting Started

To run this project locally, follow these steps:
1) Run the following command to install all necessary dependencies: `pnpm install`
2) Start the development server with: `pnpm dev`

### Key improvements from the [original challenge repo](https://github.com/every-io/engineer-interview):

- **React 18 & Vite Migration:** Updated the project to React 18 and migrated from CRA to Vite, as recommended by the React team, for faster builds and a smoother development experience
- **Code Quality:** Integrated ESLint and Prettier to maintain code quality and consistency
- **Drag-and-Drop Functionality:** Added intuitive drag-and-drop support for moving tasks between columns
- **UI Enhancements:** Modified the [original design](https://www.figma.com/proto/kd49ArXbBt0vi1kBSLkmC1/Code-Challenge?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1) for a cleaner, more modern interface
- **Unit Testing with Vitest:** Added unit tests using Vitest to enhance maintainability and reliability

Each of these choices reflects a production-oriented mindset to ensure smooth deployment and a positive experience for end users.