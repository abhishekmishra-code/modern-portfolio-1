# modern-portfolio-1

A modern, interactive portfolio website for Abhishek Mishra built with Tailwind CSS and enhanced with Matter.js physics animations. Features responsive design, dark/light theme toggle, and a clean showcase of projects and skills.

## Features

- **Interactive Canvas Background** - Dynamic Matter.js physics animation with floating polygons and circles
- **Dark/Light Theme Toggle** - Persistent theme switching with localStorage support
- **About Modal** - Interactive popup showcasing technologies and developer information
- **Project Showcase** - Responsive project gallery with hover effects and technology tags
- **Testimonial Carousel** - Swiper.js integration for client testimonials
- **Contact Form** - Dedicated success page for form submissions
- **Responsive Design** - Mobile-first approach with Tailwind CSS utility classes

## Tech Stack

- **HTML5** - Semantic markup structure
- **Tailwind CSS v4.1.4** - Utility-first CSS framework
- **Matter.js** - 2D physics engine for interactive animations
- **Swiper.js** - Touch-enabled carousel for testimonials
- **Prettier** - Code formatting with Tailwind CSS plugin

## Installation

1. Clone the repository:

```bash
git clone https://github.com/abhishekmishra-code/modern-portfolio-1.git
cd modern-portfolio-1
```

2. Install dependencies:

```bash
npm install
```

3. Build the CSS:

```bash
npm start
```

This generates `src/output.css` from `src/input.css` using the Tailwind CLI.

## Usage

Start the development server to watch for CSS changes:

```bash
npm start
```

Open `index.html` in your browser to view the portfolio. The Matter.js canvas will automatically initialize with interactive physics elements.

## Configuration

The project uses Tailwind CSS v4 with custom configurations in `src/input.css`:

- Custom CSS variables for theme colors (`--text`, `--background`)
- Custom easing function `--ease-jump` for animations
- Dark mode variant support via `@custom-variant`
- Base layer styles for consistent theming

Theme preferences are stored in `localStorage` under the `theme` key.

## Project Structure

```text
modern-portfolio-1/
├── index.html           # Main portfolio page
├── script.js            # Theme toggle and UI interactions
├── matter.js            # Matter.js physics animation setup
├── pages/
│   └── success.html     # Contact form success page
├── src/
│   ├── input.css        # Tailwind CSS source
│   └── output.css       # Generated CSS (gitignored)
├── assets/
│   └── images/          # Project screenshots and profile images
├── package.json         # Dependencies and scripts
└── .gitignore           # Ignored files configuration
```

## Contributing

Contributions are welcome! Please ensure you:

1. Run `npm start` to build CSS before committing changes
2. Follow the existing code style (Prettier is configured)
3. Test responsive layouts across different screen sizes
4. Verify Matter.js animations work correctly after changes
