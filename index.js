const inquirer = require("inquirer");

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your project?",
            name: "Title",
        },
    ]);
}

function generateReadMe(response) {
    return `# ${response.Title}`;
}

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

async function init() {
    try {
        const response = await promptUser();
        const README = generateReadMe(response);
        await writeFileAsync("README.md", README);
        console.log("success!");
    } catch (err) {
        console.log(err);
    }
}

init();
