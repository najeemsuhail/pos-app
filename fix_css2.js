const fs = require('fs');

let css = fs.readFileSync('frontend/src/styles/index.css', 'utf8');

css = css.replace(/body \{\s*font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\s*\}/g, "");
css = css.replace(/h1, h2, h3, h4, h5, h6 \{\s*font-family: 'Outfit', 'Inter', sans-serif;\s*background-color: var\(--bg-primary\);\s*color: var\(--text-primary\);\s*transition: background-color 0\.3s ease, color 0\.3s ease;\s*\}/g, "body {\n  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  transition: background-color 0.3s ease, color 0.3s ease;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: 'Outfit', 'Inter', sans-serif;\n}");

fs.writeFileSync('frontend/src/styles/index.css', css);
console.log("Fixed CSS using flexible regex.");
