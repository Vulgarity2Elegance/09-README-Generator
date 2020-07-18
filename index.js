const inquirer = require("inquirer");

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "user",
            message: "What is your GitHub username?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
            type: "input",
            name: "Title",
            message: "What is your project's name?",
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of your project.",
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: [
                "MIT",
                "Apache%202.0",
                "GPLv3",
                "BSD%203--Clause",
                "None",
            ],
        },
        {
            type: "input",
            name: "installation",
            message: "What command should be run to install dependencies?",
            default: `npm i`,
        },
        {
            type: "input",
            name: "test",
            message: "What command should be run to run tests?",
            default: `npm run test`,
        },
        {
            type: "input",
            name: "usage",
            message: "What does the user need to know about using the repo?",
        },
        {
            type: "input",
            name: "contribution",
            message:
                "What does the user need to know about contributing to the repo?",
        },
    ]);
}

function generateReadMe(response) {
    return `
# ${response.Title}
![NPM version](https://img.shields.io/badge/npm-6.14.4-green)
![GitHub license](https://img.shields.io/badge/License-${response.license}-blue.svg)

## Description
${response.description} 

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)

## Installation
To install necessary dependencies, run the following command:
~~~
${response.installation}
~~~

## Usage
${response.usage}

## License
This project is licensed under the ${response.license}.

## Contributing
${response.contribution}

## Tests
To run tests, run the following command:
~~~
${response.test}
~~~

## Questions
If you have any questions about the repo, open an issue or contact me directly at ${response.email}.

You can find more of my work at [${response.user}](https://github.com/${response.user}).
`;
}

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

async function init() {
    try {
        const response = await promptUser();
        const README = generateReadMe(response);
        await writeFileAsync("./output/README.md", README);
        console.log("success!");
    } catch (err) {
        console.log(err);
    }
}

init();
