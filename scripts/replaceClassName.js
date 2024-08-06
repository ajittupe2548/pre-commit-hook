const fs = require('fs');
const path = require('path');
const classMapping = require('./classMapping'); // Adjust the path as needed

// Function to replace classes based on the mapping
function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to match getThemeClasses with template literals, including multiline
    const regexGetThemeClasses = /getThemeClasses\s*\(\s*(`[^`]*`|'[^']*'|"[^"]*")\s*\)/gs;

    // Replace classes within getThemeClasses
    content = content.replace(regexGetThemeClasses, (match, classes) => {
        // Replace each class within the template literal
        const updatedClasses = classes.replace(/\b(color-\w+|bg-\w+|border-color-\w+)\b/g, (className) => {
            return classMapping[className.trim()] || className.trim();
        });

        return match.replace(classes, updatedClasses);
    });

    // Regex to match class names with or without quotes, including leading/trailing spaces
    const regexClassNames = /(?:className\s*=\s*|['"`;])\s*\b(color-\w+|bg-\w+|border-color-\w+)\b\s*(?=[\s'";`])/g;

    // Replace standalone class names
    content = content.replace(regexClassNames, (match, className) => {
        const trimmedClassName = className.trim();
        const newClassName = classMapping[trimmedClassName] || trimmedClassName;
        return match.replace(trimmedClassName, newClassName);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
}

// Get the list of files from lint-staged
const files = process.argv.slice(2);

// Process each file
files.forEach(filePath => {
    const absolutePath = path.resolve(filePath);
    replaceInFile(absolutePath);
});
