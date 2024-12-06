export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string[];
  githubStars: number;
  githubUrl: string;
  websiteUrl: string;
  tags: string[];
  lastUpdate: string;
  license: string;
}

export const tools: Tool[] = [
  {
    id: "1",
    name: "React Developer Tools",
    description: "Official React debugging tools that helps inspect the React component hierarchy, view and edit props and state, and identify performance problems.",
    category: ["Frontend", "Debugging"],
    githubStars: 15234,
    githubUrl: "https://github.com/facebook/react-devtools",
    websiteUrl: "https://react.dev",
    tags: ["react", "debugging", "browser-extension"],
    lastUpdate: "2024-01-15",
    license: "MIT"
  },
  {
    id: "2",
    name: "Redux DevTools",
    description: "DevTools for Redux with hot reloading, action replay, and customizable UI for state management debugging.",
    category: ["Frontend", "State Management"],
    githubStars: 12543,
    githubUrl: "https://github.com/reduxjs/redux-devtools",
    websiteUrl: "https://redux.js.org",
    tags: ["redux", "debugging", "state-management"],
    lastUpdate: "2024-02-01",
    license: "MIT"
  },
  {
    id: "3",
    name: "Vue DevTools",
    description: "Browser DevTools extension for debugging Vue.js applications with time-travel debugging and state management.",
    category: ["Frontend", "Debugging"],
    githubStars: 9876,
    githubUrl: "https://github.com/vuejs/devtools",
    websiteUrl: "https://vuejs.org",
    tags: ["vue", "debugging", "browser-extension"],
    lastUpdate: "2024-01-20",
    license: "MIT"
  },
  {
    id: "4",
    name: "Chrome DevTools",
    description: "Built-in developer tools in Chrome browser for web development debugging and performance analysis.",
    category: ["Browser Tools", "Debugging"],
    githubStars: 28765,
    githubUrl: "https://github.com/ChromeDevTools/devtools-frontend",
    websiteUrl: "https://developers.google.com/web/tools/chrome-devtools",
    tags: ["chrome", "debugging", "performance"],
    lastUpdate: "2024-02-10",
    license: "BSD"
  },
  {
    id: "5",
    name: "VS Code",
    description: "Lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js.",
    category: ["IDE", "Code Editor"],
    githubStars: 154321,
    githubUrl: "https://github.com/microsoft/vscode",
    websiteUrl: "https://code.visualstudio.com",
    tags: ["editor", "microsoft", "extensions"],
    lastUpdate: "2024-02-15",
    license: "MIT"
  },
  {
    id: "6",
    name: "Postman",
    description: "API platform for building, testing and documenting APIs. Complete API development environment.",
    category: ["API", "Testing"],
    githubStars: 32145,
    githubUrl: "https://github.com/postmanlabs",
    websiteUrl: "https://www.postman.com",
    tags: ["api", "testing", "documentation"],
    lastUpdate: "2024-02-05",
    license: "Proprietary"
  },
  {
    id: "7",
    name: "Docker",
    description: "Platform for developing, shipping, and running applications in containers.",
    category: ["DevOps", "Containerization"],
    githubStars: 76543,
    githubUrl: "https://github.com/docker",
    websiteUrl: "https://www.docker.com",
    tags: ["containers", "devops", "virtualization"],
    lastUpdate: "2024-02-12",
    license: "Apache-2.0"
  },
  {
    id: "8",
    name: "Git",
    description: "Distributed version control system for tracking changes in source code during software development.",
    category: ["Version Control"],
    githubStars: 45678,
    githubUrl: "https://github.com/git/git",
    websiteUrl: "https://git-scm.com",
    tags: ["version-control", "collaboration", "cli"],
    lastUpdate: "2024-01-30",
    license: "GPL-2.0"
  },
  {
    id: "9",
    name: "npm",
    description: "Package manager for JavaScript and the world's largest software registry.",
    category: ["Package Manager"],
    githubStars: 21543,
    githubUrl: "https://github.com/npm/cli",
    websiteUrl: "https://www.npmjs.com",
    tags: ["javascript", "package-manager", "node"],
    lastUpdate: "2024-02-08",
    license: "Artistic-2.0"
  },
  {
    id: "10",
    name: "Jest",
    description: "Delightful JavaScript testing framework with a focus on simplicity.",
    category: ["Testing", "Frontend"],
    githubStars: 43210,
    githubUrl: "https://github.com/facebook/jest",
    websiteUrl: "https://jestjs.io",
    tags: ["testing", "javascript", "react"],
    lastUpdate: "2024-02-03",
    license: "MIT"
  },
  {
    id: "11",
    name: "ESLint",
    description: "Pluggable linting utility for JavaScript and JSX. Find and fix problems in your code.",
    category: ["Linting", "Code Quality"],
    githubStars: 23456,
    githubUrl: "https://github.com/eslint/eslint",
    websiteUrl: "https://eslint.org",
    tags: ["linting", "javascript", "code-quality"],
    lastUpdate: "2024-02-07",
    license: "MIT"
  },
  {
    id: "12",
    name: "Prettier",
    description: "Opinionated code formatter that supports many languages and integrates with most editors.",
    category: ["Code Quality", "Formatting"],
    githubStars: 45678,
    githubUrl: "https://github.com/prettier/prettier",
    websiteUrl: "https://prettier.io",
    tags: ["formatting", "code-quality", "multi-language"],
    lastUpdate: "2024-01-25",
    license: "MIT"
  },
  {
    id: "13",
    name: "GitHub Desktop",
    description: "GUI application that simplifies your development workflow with Git and GitHub.",
    category: ["Version Control", "GUI"],
    githubStars: 18765,
    githubUrl: "https://github.com/desktop/desktop",
    websiteUrl: "https://desktop.github.com",
    tags: ["git", "github", "gui"],
    lastUpdate: "2024-02-11",
    license: "MIT"
  },
  {
    id: "14",
    name: "Webpack",
    description: "Static module bundler for modern JavaScript applications.",
    category: ["Build Tools", "Frontend"],
    githubStars: 62345,
    githubUrl: "https://github.com/webpack/webpack",
    websiteUrl: "https://webpack.js.org",
    tags: ["bundler", "javascript", "build-tool"],
    lastUpdate: "2024-02-09",
    license: "MIT"
  },
  {
    id: "15",
    name: "Vite",
    description: "Next generation frontend tooling. Fast development server and build tool.",
    category: ["Build Tools", "Frontend"],
    githubStars: 58932,
    githubUrl: "https://github.com/vitejs/vite",
    websiteUrl: "https://vitejs.dev",
    tags: ["bundler", "javascript", "build-tool"],
    lastUpdate: "2024-02-14",
    license: "MIT"
  },
  {
    id: "16",
    name: "Lighthouse",
    description: "Automated tool for improving the quality of web pages.",
    category: ["Performance", "Testing"],
    githubStars: 25678,
    githubUrl: "https://github.com/GoogleChrome/lighthouse",
    websiteUrl: "https://developers.google.com/web/tools/lighthouse",
    tags: ["performance", "seo", "accessibility"],
    lastUpdate: "2024-02-02",
    license: "Apache-2.0"
  },
  {
    id: "17",
    name: "Insomnia",
    description: "Cross-platform REST and GraphQL API client with plugin support.",
    category: ["API", "Testing"],
    githubStars: 29876,
    githubUrl: "https://github.com/Kong/insomnia",
    websiteUrl: "https://insomnia.rest",
    tags: ["api", "testing", "graphql"],
    lastUpdate: "2024-02-06",
    license: "MIT"
  },
  {
    id: "18",
    name: "TypeScript",
    description: "Typed superset of JavaScript that compiles to plain JavaScript.",
    category: ["Programming Language", "Frontend"],
    githubStars: 89765,
    githubUrl: "https://github.com/microsoft/TypeScript",
    websiteUrl: "https://www.typescriptlang.org",
    tags: ["typescript", "javascript", "microsoft"],
    lastUpdate: "2024-02-13",
    license: "Apache-2.0"
  },
  {
    id: "19",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write better code.",
    category: ["AI", "Code Assistant"],
    githubStars: 45678,
    githubUrl: "https://github.com/features/copilot",
    websiteUrl: "https://copilot.github.com",
    tags: ["ai", "productivity", "coding-assistant"],
    lastUpdate: "2024-02-04",
    license: "Proprietary"
  },
  {
    id: "20",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development.",
    category: ["CSS", "Frontend"],
    githubStars: 72345,
    githubUrl: "https://github.com/tailwindlabs/tailwindcss",
    websiteUrl: "https://tailwindcss.com",
    tags: ["css", "framework", "utility-first"],
    lastUpdate: "2024-02-16",
    license: "MIT"
  }
];


export const ANIMATION_SETTINGS = {
  STAGGER_DELAY: 0.1,
  CARD_ANIMATION: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
};

export const CATEGORY_COLORS = {
  'Frontend': 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300',
  'Backend': 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-700 dark:text-green-300',
  'DevOps': 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-700 dark:text-orange-300',
  'Testing': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300',
  'API': 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300',
  'IDE': 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 dark:text-emerald-300',
  'Code Editor': 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-700 dark:text-violet-300',
  'Package Manager': 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-700 dark:text-amber-300',
  'Version Control': 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-700 dark:text-rose-300',
  'Build Tools': 'bg-gradient-to-r from-lime-500/20 to-green-500/20 text-lime-700 dark:text-lime-300',
} as const;

export const DEFAULT_COLOR = 'bg-gradient-to-r from-gray-500/20 to-gray-700/20 text-gray-700 dark:text-gray-300';

export const PAGINATION_SETTINGS = {
  ITEMS_PER_PAGE: 9,
  MAX_PAGES_TO_SHOW: 5,
};

export const SEARCH_SETTINGS = {
  DEBOUNCE_MS: 300,
  MIN_QUERY_LENGTH: 2,
};

export const VIEW_SETTINGS = {
  GRID: 'grid',
  LIST: 'list',
} as const;