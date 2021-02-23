const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let addingEmployeeType = null;
let manager = null;
const employees = [];

const writeFileAsync = util.promisify(fs.writeFile);

const promptManager = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is the team manager's name?"
    },
    {
      type: "input",
      name: "managerId",
      message: "What is your id?"
    },
    {
      type: "input",
      name: "managerEmail",
      message: "What is your email address?"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your office number?"
    }
  ]);
}

const promptEngineer = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the engineer's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email address?"
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's github username?"
    }
  ]);
}

const promptIntern = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the intern's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email address?"
    },
    {
      type: "input",
      name: "school",
      message: "What school does the intern attend?"
    }
  ]);
}

const promptEmployeeType = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "selectedEmployeeType",
      message: "What type of employee would you like to add?",
      choices: [ "Engineer", "Intern" ]
    }
  ]);
}

const promptEmployee = (type) => {
  if (type === "Engineer") {
    return promptEngineer()
  } else if (type === "Intern") {
    return promptIntern()
  }
}

const promptAddMore = () => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another employee?"
    }
  ]);
}

const employeeEntryFlow = () => {
  addingEmployeeType = null;
  return promptEmployeeType()
    .then((answer) => {
      addingEmployeeType = answer.selectedEmployeeType;
      return promptEmployee(answer.selectedEmployeeType);
    })
    .then((answers) => {
      let employee;
      if (addingEmployeeType === "Engineer") {
        employee = new Engineer(answers.name, answers.id, answers.email, answers.github)
      } else if (addingEmployeeType === "Intern") {
        employee = new Intern(answers.name, answers.id, answers.email, answers.school)
      }
      employees.push(employee);
    })
    .then(() => promptAddMore())
    .then((answer) => {
      if (answer.continue) {
        return employeeEntryFlow();
      }
    });
}

const generateHTML = (answers) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Team Profile</title>

<style>

    h1 { text-align: center; color: white; }

    .jumbotron { background-color: red; }

    #team-cards { border: 1px solid; box-shadow: 3px 5px #888888; }

    p { color: black;}

</style>

  </head>
  <body>

  <header>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1>My Team</h1>
    </div>
    </div>
  </header>

  <main>
    <div id="team-cards" class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">${answers.managerName}</div>
        <div class="card-body bg-light">
                <p>ID: ${answers.managerId}</p>
                <p>Email: ${answers.managerEmail}</p>
                <p>Office Number: ${answers.officeNumber}</p>
        </div>
    </div>
  </main>

  </body>
  </html>`;
}

promptManager()
  .then((managerAnswers) => {
      manager = new Manager(
          managerAnswers.managerName,
          managerAnswers.managerId,
          managerAnswers.managerEmail,
          managerAnswers.officeNumber
      )
  })
  .then(() => employeeEntryFlow())
  .then(() => {
    console.log("manager", manager);
    console.log("employees", employees);
    // const html = generateHTML(answers);

    // return writeFileAsync("index.html", html);
  })
  .then(() => {
    console.log("Successfully wrote to index.html");
  })
  .catch((err) => {
    console.log(err);
  });
