# BASuite – React & Next.js Component Library

![npm](https://img.shields.io/npm/v/basuite)
![license](https://img.shields.io/npm/l/basuite)
![build](https://img.shields.io/github/actions/workflow/status/BasitAyaz/BASuite/ci.yml?branch=main)
[![GitHub](https://img.shields.io/badge/GitHub-BasitAyaz/BASuite-blue?logo=github)](https://github.com/BasitAyaz/BASuite)

**BASuite** is a developer-first React and Next.js component suite, blending the power of [Tailwind CSS](https://tailwindcss.com/) with the elegance of [Ant Design](https://ant.design/). Build modern, scalable, and beautiful UIs with reusable components, API utilities, and advanced formatting tools.

---

## 🚀 Features

- **Prebuilt reusable components** for React and Next.js
- **Styled with TailwindCSS + Ant Design**
- **API utilities powered by Axios**
- **Date/time handling via Day.js**
- **Input formatting with React Number Format**
- **Excel export with xlsx**
- **Lightweight, tree-shakable, and TypeScript-ready**
- **Easy integration with modern frontend frameworks**

---

## 📦 Installation

```bash
npm install basuite
```

**Peer dependencies required:**
- `react` (>=18.2.0 or >=19.0.0)
- `react-dom` (>=18.2.0 or >=19.0.0)
- `antd` (^5.27.1)
- `@ant-design/icons` (>=5)
- `tailwindcss` (>=2.0.0)
- `axios` (^1.7.7)
- `dayjs` (^1.11.13)
- `react-number-format` (^5.4.0)
- `xlsx` (^0.18.5)

---

## ⚙️ PostCSS Configuration

To ensure BASuite components are styled correctly, add the following to your `postcss.config.mjs`:

```js
// postcss.config.mjs
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/basuite/**/*.{js,ts,jsx,tsx}", // 👈 add this line
  ],
};
```

This configuration enables Tailwind CSS to scan BASuite components for class names and generate the necessary styles.

## 💡 Why BASuite?

- **Modern UI Kit:** Built for React and Next.js projects.
- **Design System:** Combines Ant Design’s elegance with Tailwind’s flexibility.
- **Reusable Components:** Accelerate development with ready-to-use UI elements.
- **SEO Optimized:** Designed for high performance and discoverability.
- **TypeScript Support:** Full typings for safer, scalable codebases.
- **Active Development:** Maintained by [Basit Ahmed](https://github.com/BasitAyaz).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please [open an issue](https://github.com/BasitAyaz/BASuite/issues) first to discuss what you would like to change.

---

## 📄 License

MIT © [Basit Ahmed](https://github.com/BasitAyaz)

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/basuite)
- [GitHub Repository](https://github.com/BasitAyaz/BASuite)
- [Documentation](https://ba-suite-docs.vercel.app/) 

---

## 🏷️ Keywords

React, Next.js, component library, UI library, reusable components, Ant Design, TailwindCSS, Axios, Day.js, React Number Format, TypeScript, Rollup, design system, UI kit, frontend, scalable, modern, developer-first
