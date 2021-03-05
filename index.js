const fs = require("fs");
const generateMarkdown = require("../Develop/utils/generateMarkdown")
const inquirer = require("inquirer");
var chosenBadge;

const licenseChoices = [ "Apache 2.0 license", "Creative Commons Attribution 4.0", "GNU General Public License v3.0", "MIT"];	

const badges= [
    "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
]

// array of questions for user
const questions = [
    {
        //Project Title 
        type: 'input',
        name: 'projectTitle',
        message: 'What is the name of your project?',
        validate: function(val){
            if (val === "") {
                return "We need a project title before we proceed!";
            } else {
                return true
            }
        }        
      },
      {
        //Input Project Description
        type: 'editor',
        name: 'projectDescription',
        message: 'Provide a detailed project description (use editor for multiple paragraphs).',
        validate: function(answerdesc){
            if (answerdesc === "") {
                return "We need a project description!";
            } else {
                return true
            }
        }
      },
      {
        //Installation Instructions
        type: 'editor',
        name: 'projectInstallation',
        message: 'Provide project installation instructions?'
      },
      {
        //Usage Information
        type: 'editor',
        name: 'projectUsageInfo',
        message: 'Explain to your users how to use your app (Use editor for multiple paragraphs. To include images in your steps, use the folloing --> !["description"]("link/directory") ).'
      },
      {
        //Licensing
        type: 'list',
        name: 'projectLicensing',
        message: 'Which license is your project under?',
        choices: licenseChoices,
      },
      {
        //Contribution Guidelines
        type: 'input',
        name: 'projectContributions',
        message: 'How can a collaborator contribute to your project?',
      },
      {
        //Test Samples
        type: 'editor',
        name: 'projectTests',
        message: 'Want to provide test options? ',
      },
      {
        //GitHub goes wtih the contributing section
        type: 'input',
        name: 'provideGitHub',
        message: 'So contributers can reach you with questions, what is your GitHub username?',
        validate: function(answergit){
            if (answergit === "") {
                return "We need a GitHub username!";
            } else {
                return true
            }
        }
      },
      {
        //Email address
        type: 'input',
        name: 'provideEmail',
        message: 'So contributers can reach you with questions, what is your email address?',
        validate: function(answerEmail){
            if (answerEmail === "") {
                return "We need a GitHub username!";
            } else {
                return true
            }
        }
      }
];

var createREADME = (data) => `
# ${data.projectTitle}
${chosenBadge}

## Description 

${data.projectDescription}

## Table of Contents 

1. [Installation](#installation)
1. [Usage](#usage)
1. [License](#license)
1. [Contributing](#contributing)
1. [Tests](#tests)
1. [Questions](#questions)


## Installation

${data.projectInstallation}

## Usage 

${data.projectUsageInfo}

## License

This project applies the ${data.projectLicensing} license. 

## Contributing

${data.projectContributions}

## Tests

${data.projectTests}

## Questions

For any other questions or concerns, catch me on GitHub using my profile link [GitHub Link](https://github.com/${data.provideGitHub}).
You can also email me at ${data.provideEmail}.
`;

// function to write README file
function writeToFile(fileName, data) {
    chosenBadge = badges[licenseChoices.indexOf(data.projectLicensing)];
    
    console.log(data)

    fs.writeFile(fileName, createREADME(data), (error) =>
    error ? console.error(error) : console.log("success")
    )

};

// function to initialize program
function init() {
    inquirer.prompt(questions)
    .then((response) => {
        if (response.projectContributions === "") {
            response.projectContributions = "No information was provided by the creator"
        };
        if (response.projectTests === "") {
            response.projectTests =  "No information was provided by the creator"
        };
        if (response.projectInstallation === "") {
            response.projectInstallation =  "No information was provided by the creator"
        };
        if (response.projectUsageInfo === "") {
            response.projectUsageInfo = "No information was provided by the creator"
        };
        writeToFile("ReadMETEST.md", response);
    })
}

// function call to initialize program
init();


    //#Table of Contents section is coded in, not part of the user input interface.
