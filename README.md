# 🛍 Navigation Component

A flexible, drag-and-drop-enabled navigation UI component built with **React**, **Next.js**, **Tailwind CSS**, and **@dnd-kit**. This component renders a series of "page pills" that:

* Highlight the active page
* Allow reordering via drag-and-drop (except for locked pages like "Ending")
* Let users insert new pages between any two existing ones
* Provide contextual menu hooks for future actions (e.g. rename, duplicate)

---

## ✨ Features

* ✅ Keyboard and mouse focus support
* ✅ Drag-and-drop reordering using `@dnd-kit`
* ✅ Insert new page between any two others using "+" buttons
* ✅ Prevent inserting pages after a special `Ending` page
* ✅ Context menu placeholder with room for custom actions
* ✅ Modular component structure with reusable prop types

---

## 🧱 Tech Stack

* [React](https://reactjs.org/)
* [Next.js App Router](https://nextjs.org/docs/app)
* [Tailwind CSS](https://tailwindcss.com/)
* [@dnd-kit/core](https://github.com/clauderic/dnd-kit) – Drag and drop logic
* [uuid](https://www.npmjs.com/package/uuid) – Unique page IDs

---

## 🚀 Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/natashapl/fillout-navigation-component.git
   cd fillout-navigation-component
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000) to view it in your browser.


---

## 🛡 Known Constraints

* The `"Ending"` page cannot be dragged or reordered.
* Pages cannot be added after `"Ending"`.
* The context menu (`⋮`) is a placeholder and can be expanded.
