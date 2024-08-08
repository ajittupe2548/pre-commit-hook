const fs = require('fs');
const path = require('path');
const classMapping = require('./classMapping'); // Adjust the path as needed

// Function to replace classes based on the mapping
function replaceInFile(filePath) {
    //  Reads the file at the given filePath synchronously and stores it as a string
    let content = fs.readFileSync(filePath, 'utf8');

    // regular expression to match getThemeClassesfunction calls with template literals, single quotes, or double quotes. Thegflag enables global matching, and thesflag allows the dot.` to match newlines.
    const regexGetThemeClasses = /getThemeClasses\s*\(\s*(`[^`]*`)\s*\)/gs;

    // Replace classes within getThemeClasses i.e. get instances of getThemeClasses(``) classes contains first matching group from above regex
    content = content.replace(regexGetThemeClasses, (match, classes) => {
        // Replace each class within the template literal i.e. replace color-red with color-neutral-100
        const updatedClasses = classes.replace(/\b(color-\w+|bg-\w+|border-color-\w+)\b/g, (className) => {
            return classMapping[className.trim()] || className.trim();
        });

        return match.replace(classes, updatedClasses);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
}

// Get the list of files from lint-staged
// Gets the list of files from lint-staged, starting from the third argument because first two arguments are node and this script itself.
const files = process.argv.slice(2);

// Process each file
files.forEach(filePath => {
    // path.resolve convert relative paths to absolute. e.g. /src/script => d:/hook/src/script
    const absolutePath = path.resolve(filePath);
    replaceInFile(absolutePath);
});
