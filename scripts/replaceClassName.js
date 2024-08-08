const fs = require('fs');
const path = require('path');
const classMapping = require('./classMapping'); // Adjust the path as needed

// Function to replace classes based on the mapping
function replaceInFile(filePath) {
    // Read the file at the given filePath synchronously and store it as a string
    let content = fs.readFileSync(filePath, 'utf8');

    // Regular expression to match getThemeClasses function calls with template literals using backticks. The g flag enables global matching, and the s flag allows the dot.` to match newlines.
    const regexGetThemeClasses = /getThemeClasses\s*\(\s*(`[^`]*`)\s*\)/gs;

    // Replace classes within getThemeClasses i.e. get instances of getThemeClasses(``) classes contains first matching group from above regex
    content = content.replace(regexGetThemeClasses, (match, classes) => {
        // Replace each class within the template literal i.e. replace color-red with color-neutral-100
        const updatedClasses = classes.replace(/\b(color-\w+(-\w+)?|bg-\w+(-\w+)?|border-color-\w+(-\w+)?)\b/g, (className) => {
            return classMapping[className.trim()] || className.trim();
        });

        return match.replace(classes, updatedClasses);
    });

    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
}

function getJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (
            !(
                file.includes('.git') ||
                file.includes('.expo') ||
                file.includes('.github') ||
                file.includes('.idea') ||
                file.includes('.vscode') ||
                file.includes('assets') ||
                file.includes('docs\\out') ||
                file.includes('.next') ||
                file.includes('node_modules') ||
                file.includes('testing-app') ||
                file.includes('_next')
            )
        ) {
            if (stat && stat.isDirectory()) {
                // Recurse into subdirectory
                results = results.concat(getJsFiles(file));
            } else if (
                file.endsWith('.js') ||
                file.endsWith('.mdx') ||
                file.endsWith('.jsx')
            ) {
                // Add .js file to results
                results.push(file);
            }
        }
    });
    return results;
}

// Provide the base directory
const baseDir = path.resolve('src/');

// Get the list of files from lint-staged
// Gets the list of files from lint-staged, starting from the third argument because first two arguments are node and this script itself.
// const files = ['src\\components\\First.js'];
const files = getJsFiles(baseDir);

// Process each file
files.forEach(filePath => {
    // path.resolve convert relative paths to absolute. e.g. /src/script => d:/hook/src/script
    const absolutePath = path.resolve(filePath);
    replaceInFile(absolutePath);
});
