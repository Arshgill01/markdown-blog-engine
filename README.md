# Markdown Blog Engine

A lightweight, modern React blog application that renders markdown posts with a clean, responsive design. Features dark/light theme switching and static page routing for an optimal reading experience.

## Features

- 📝 **Markdown Support** - Write posts in markdown and render them beautifully
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable reading
- 🎨 **Responsive Design** - Optimized for all screen sizes
- 🚀 **Fast & Lightweight** - Bundled markdown posts for instant loading
- 🔗 **Routing** - Clean URLs with React Router
- 📱 **Static Pages** - Built-in About, Contact, and Privacy pages

## Tech Stack

- **React 18** - UI framework
- **React Router** - Navigation and routing
- **React Markdown** - Markdown rendering
- **Tailwind CSS** - Utility-first styling
- **FontAwesome** - Icons
- **Create React App** - Build tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd markdown-blog-engine
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start` or `npm run dev`
Runs the app in development mode with hot reloading.

### `npm run build`
Builds the app for production to the `build` folder with optimized performance.

### `npm test`
Launches the test runner in interactive watch mode.

## Project Structure

```
markdown-blog-engine/
├── public/
│   ├── posts.json          # Blog post metadata
│   └── posts/              # Markdown files
│       ├── first-title.md
│       ├── second-title.md
│       └── assets/         # Post images/media
├── src/
│   ├── Components/         # React components
│   │   ├── PostCard.js
│   │   ├── PostList.js
│   │   ├── SinglePost.js
│   │   └── StaticPage.js
│   ├── Context/
│   │   └── ThemeContext.js # Dark/light theme management
│   ├── Hooks/
│   │   └── usePosts.js     # Custom hook for fetching posts
│   ├── App.js              # Main app with routing
│   └── index.js
└── package.json
```

## Adding New Posts

1. Create a new markdown file in `public/posts/`:
```markdown
# Your Post Title

Your content here...
```

2. Add post metadata to `public/posts.json`:
```json
{
  "title": "Your Post Title",
  "date": "DD/MM/YY",
  "slug": "your-post-slug"
}
```

3. The post will automatically appear on the homepage.

## Customization

- **Theme Colors**: Modify CSS variables in `src/App.css`
- **Styling**: Update Tailwind classes or module CSS files
- **Static Pages**: Edit routes in `src/App.js`
- **Post Layout**: Customize components in `src/Components/`

## Deployment

Build the production bundle:
```bash
npm run build
```

Deploy the `build` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## License

This project is open source and available under the MIT License.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
