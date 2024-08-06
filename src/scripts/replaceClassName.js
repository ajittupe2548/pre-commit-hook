const fs = require("fs");
const path = require("path");

// Function to replace `getThemeClasses(`neutral-100`)` with `getThemeClasses(`neutral-100`)`
function replaceInFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const updatedContent = content.replace(
        /getThemeClasses\s*\(\s*`color-red`\s*\)/g,
        "getThemeClasses(`neutral-100`)"
    );

    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, "utf8");
        console.log(`Updated: ${filePath}`);
    }
}

// Get the list of files from lint-staged
const files = process.argv.slice(2);

// Process each file
files.forEach((filePath) => {
    const absolutePath = path.resolve(filePath);
    replaceInFile(absolutePath);
});
