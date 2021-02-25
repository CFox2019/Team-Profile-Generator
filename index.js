// requirements
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// variables
let addingEmployeeType = null;
let manager = null;
const employees = [];

const writeFileAsync = util.promisify(fs.writeFile);

// Initial questions for team manager to answer
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

// questions for entering 'Engineer' information
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

// questions for entering 'Intern' information
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

// prompt for asking the manager what employee type they would like to enter information for
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

// prompt for choosing between 'Engineer' or 'Intern'
const promptEmployee = (type) => {
  if (type === "Engineer") {
    return promptEngineer()
  } else if (type === "Intern") {
    return promptIntern()
  }
}

// prompt for asking the manager if they have more employees to add
const promptAddMore = () => {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Would you like to add another employee?"
    }
  ]);
}

// function that creates the flow for adding the employee type or adding an additional employee
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

// generates the HTML file for the prompted quuestions answers and adds the answers to individual cards (file also includes styles)
const generateHTML = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Team Profile</title>

<style>

    header {
      text-align: center;
      color: white;
    }

    .jumbotron {
      background-color: red;
    }

    #team-cards {
      margin: 10px;
      width: 350px;
      border: 1px solid;
      box-shadow: 3px 5px #888888;
      flex-wrap: wrap;
    }

    p {
      color: black;
    }

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
    <div class="container">
      <div class="row justify-content-center">
        ${appendManager()}

        ${appendEmployees()}
      </div>
    </div>
  </main>

      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"></script>
  </body>
  </html>`;
}

const appendManager = () => {
  return `
  <div id="team-cards" class="card text-white mb-3" style="max-width: 18rem;">
      <div class="card-header bg-primary">
      <h1>${manager.getName()}</h1>
      <h3>${manager.getRole()}</h3>
      </div>
      <div class="card-body bg-light">
              <p>ID: ${manager.getId()}</p>
              <p>Email: ${manager.getEmail()}</p>
              <p>Office Number: ${manager.getOfficeNumber()}</p>
      </div>
  </div>
  `
}

const appendEmployees = () => {
  let htmlString = ""
  employees.forEach((employee) => {
    htmlString += `
    <div id="team-cards" class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">
        <h1>${employee.getName()}</h1>
        <h3>${employee.getRole()}
        </div>
        <div class="card-body bg-light">
                <p>ID: ${employee.getId()}</p>
                <p>Email: ${employee.getEmail()}</p>
                ${employee.getRole() === "Engineer" ? "<p>GitHub: " + employee.getGithub() + "</p>" : ""}
                ${employee.getRole() === "Intern" ? "<p>School: " + employee.getSchool() + "</p>" : ""}
        </div>
    </div>
    `
  })

  console.log('html string', htmlString);
  return htmlString;
}

// answers for the manager's questions
promptManager()
  .then((managerAnswers) => {
      manager = new Manager(
          managerAnswers.managerName,
          managerAnswers.managerId,
          managerAnswers.managerEmail,
          managerAnswers.officeNumber
      )
  })
  // function that creates the flow of questions for the manager
  .then(() => employeeEntryFlow())
  .then(() => {
    console.log("manager", manager);
    console.log("employees", employees);
    const html = generateHTML();
    return writeFileAsync("index.html", html);
  })
  .then(() => {
    console.log("Successfully wrote to index.html");
  })
  .catch((err) => {
    console.log(err);
  });
