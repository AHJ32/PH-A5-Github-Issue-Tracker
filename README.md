# GitHub Issues Tracker

  A GitHub Issues Tracker web app built with vanilla HTML, CSS (Tailwind + DaisyUI), and JavaScript.

  ## 🔗 Live Site
  [GitHub Issues Tracker](#)

  ## 🔑 Demo Credentials
  ```
  Username: admin
  Password: admin123
  ```

  ## ✨ Features
  - Login page with credential validation
  - Browse all GitHub issues in a clean 4-column card layout
  - Filter issues by **All**, **Open**, and **Closed** tabs with active state highlight
  - Green top border for open issues, purple top border for closed issues
  - Loading spinner while data is being fetched
  - Click any card to view full issue details in a modal
  - Search issues by keyword using the navbar search bar
  - Fully responsive for mobile devices

  ## 🛠️ Technology Stack
  - **HTML5**
  - **CSS**: Tailwind CSS + DaisyUI
  - **JavaScript**: Vanilla ES6 Modules

  ## 📡 API Endpoints
  - All Issues: `https://phi-lab-server.vercel.app/api/v1/lab/issues`
  - Single Issue: `https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}`
  - Search: `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}`

  ---

  ## 📚 JavaScript Concepts — My Own Answers

  ### 1️⃣ What is the difference between var, let, and const?

  `var` is the old way of declaring variables in JavaScript. It has function scope, meaning it is accessible anywhere inside the function it was declared in. The tricky part is that `var` is hoisted to the top of its scope, so you can use a `var` variable before its line of declaration (it will just be `undefined`). It can also be re-declared in the same scope without errors, which often caused bugs.

  `let` was introduced in ES6 and has block scope, meaning it only lives inside the `{}` block where it was declared. You cannot use it before its declaration (the "temporal dead zone"), and you cannot re-declare it in the same scope. You can, however, change its value later.

  `const` is also block-scoped like `let`, but once you assign a value to it, you cannot reassign it. Note that for objects and arrays, `const` only prevents reassigning the reference — you can still mutate the contents of the object or array.

  In short: use `const` by default, use `let` when you need to reassign, and avoid `var`.

  ---

  ### 2️⃣ What is the spread operator (...)?

  The spread operator (`...`) lets you "spread out" or expand the elements of an iterable (like an array or object) into a new place.

  For arrays, it copies elements:
  ```js
  const a = [1, 2, 3];
  const b = [...a, 4, 5]; // [1, 2, 3, 4, 5]
  ```

  For objects, it merges properties:
  ```js
  const user = { name: "Alice" };
  const updated = { ...user, age: 25 }; // { name: "Alice", age: 25 }
  ```

  It is useful for making shallow copies, merging arrays or objects, and passing multiple arguments to functions without manually listing them.

  ---

  ### 3️⃣ What is the difference between map(), filter(), and forEach()?

  All three are array methods that loop over elements, but they work differently:

  - **`map()`** creates a new array by transforming each element using a callback. It always returns an array of the same length.
    ```js
    [1, 2, 3].map(n => n * 2); // [2, 4, 6]
    ```

  - **`filter()`** creates a new array containing only the elements for which the callback returns `true`. The resulting array may be shorter.
    ```js
    [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]
    ```

  - **`forEach()`** just runs the callback on each element for side effects (like logging or updating DOM). It does not return anything (returns `undefined`).
    ```js
    [1, 2, 3].forEach(n => console.log(n));
    ```

  Use `map` when you want to transform data, `filter` when you want to select data, and `forEach` when you just want to do something with each item without needing a result.

  ---

  ### 4️⃣ What is an arrow function?

  An arrow function is a shorter syntax for writing functions in JavaScript, introduced in ES6. Instead of writing `function`, you use `=>`:

  ```js
  // Regular function
  function add(a, b) { return a + b; }

  // Arrow function
  const add = (a, b) => a + b;
  ```

  The big differences from regular functions are:
  - Shorter and cleaner syntax
  - No own `this` — arrow functions inherit `this` from the surrounding context, which is very helpful in callbacks and event handlers
  - Cannot be used as constructors (no `new` keyword)

  Arrow functions are especially useful for short callbacks like those passed to `map`, `filter`, and `forEach`.

  ---

  ### 5️⃣ What are template literals?

  Template literals are a way to create strings in JavaScript using backticks (` `) instead of quotes. They have two main powers:

  1. **String interpolation** — you can embed expressions directly in the string using `${}`:
  ```js
  const name = "Alice";
  console.log(`Hello, ${name}!`); // "Hello, Alice!"
  ```

  2. **Multi-line strings** — you can write strings across multiple lines without needing `\n`:
  ```js
  const html = `
    <div>
      <p>Hello</p>
    </div>
  `;
  ```

  Before template literals, we had to concatenate strings with `+` which was messy and error-prone. Template literals make code much more readable and maintainable.

  ---

  ## 📂 Project Structure
  ```
  ├── index.html        # Login page
  ├── main.html         # Main issues tracker page
  ├── js/
  │   ├── config.js     # Credentials and shared utilities
  │   ├── login.js      # Login form logic
  │   ├── api.js        # API fetch helpers
  │   ├── ui.js         # Card and modal rendering
  │   ├── modal.js      # Modal logic
  │   └── main.js       # Main app logic (tabs, search, init)
  ├── assets/           # Images and icons
  └── tailwind.config.js
  ```
  