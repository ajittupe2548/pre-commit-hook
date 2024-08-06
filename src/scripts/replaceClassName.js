const fs = require("fs");
const path = require("path");

// Function to replace 'ajit' with 'tupe' in className attributes
function replaceInFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const updatedContent = content.replace(
        /className\s*=\s*["']([^"']*)ajit([^"']*)["']/g,
        'className="$1tupe$2"'
    );

    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, "utf8");
        console.log(`Updated: ${filePath}`);
    }
}

// Get the list of files from lint-staged
const files = process.argv.slice(2);
console.log(`*****Output is :  => files:`, files)

// Process each file
files.forEach((filePath) => {
    const absolutePath = path.resolve(filePath);
    replaceInFile(absolutePath);
});
