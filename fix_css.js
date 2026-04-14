const fs = require('fs');

let css = fs.readFileSync('frontend/src/styles/index.css', 'utf8');

css = css.replace("body {\r\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n  font-family: 'Outfit', 'Inter', sans-serif;\r\n  background-color: var(--bg-primary);\r\n  color: var(--text-primary);\r\n  transition: background-color 0.3s ease, color 0.3s ease;\r\n}", "body {\r\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\r\n  background-color: var(--bg-primary);\r\n  color: var(--text-primary);\r\n  transition: background-color 0.3s ease, color 0.3s ease;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n  font-family: 'Outfit', 'Inter', sans-serif;\r\n}");

css = css.replace("body {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: 'Outfit', 'Inter', sans-serif;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  transition: background-color 0.3s ease, color 0.3s ease;\n}", "body {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  transition: background-color 0.3s ease, color 0.3s ease;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: 'Outfit', 'Inter', sans-serif;\n}");

fs.writeFileSync('frontend/src/styles/index.css', css);
console.log("Fixed CSS");
