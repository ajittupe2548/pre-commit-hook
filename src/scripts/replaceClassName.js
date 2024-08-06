const fs = require("fs");
const path = require("path");
const classMapping = require('../../mapping');

// Function to replace classes based on the mapping
function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    // Regex to match getThemeClasses with a string literal argument
    const regexGetThemeClasses =
        /getThemeClasses\s*\(\s*`([^`]*)`\s*\)|getThemeClasses\s*\(\s*'([^']*)'\s*\)|getThemeClasses\s*\(\s*"([^"]*)"\s*\)/g;

    // Regex to match class names with or without quotes
    const regexClassNames =
        /(?:className\s*=\s*|['"`;])(\bcolor-\w+\b)(?=[\s'";`])/g;

    // Replace getThemeClasses(`neutral-100`), getThemeClasses(`neutral-100`), etc.
    content = content.replace(regexGetThemeClasses, (match, p1, p2, p3) => {
        const className = p1 || p2 || p3;
        return `getThemeClasses(\`${classMapping[className] || className}\`)`;
    });

    // Replace standalone color-red, 'neutral-100', "neutral-100", etc.
    content = content.replace(regexClassNames, (match, className) => {
        return match.replace(className, classMapping[className] || className);
    });

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated: ${filePath}`);
}

// Get the list of files from lint-staged
const files = process.argv.slice(2);

// Process each file
files.forEach((filePath) => {
    const absolutePath = path.resolve(filePath);
    replaceInFile(absolutePath);
});
