const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const Employee = require("./lib/Employee");

const employee = new Employee();


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?"
      },
      {
        type: "input",
        name: "school",
        message: "What school do you attend?"
      },
      {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "number",
        message: "What is your office number?"
      }
    ]);
  }

  function generateHTML(answers) {
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

    p { color: black;}

</style>

  </head>
  <body>

    <div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1>My Team</h1>
    </div>
    </div>

    <div class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">${answers.name}</div>
        <div class="card-body bg-light">
                <p>ID: ${answers.id}</p>
                <p>Email: ${answers.email}</p>
        </div>
    </div>
    <div class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">${answers.name}</div>
        <div class="card-body bg-light">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    <div class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">${answers.name}</div>
        <div class="card-body bg-light">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    <div class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">${answers.name}</div>
        <div class="card-body bg-light">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    <div class="card text-white mb-3" style="max-width: 18rem;">
        <div class="card-header bg-primary">${answers.name}</div>
        <div class="card-body bg-light">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>

  </body>
  </html>`;
  }

  promptUser()
    .then(function(answers) {
      const html = generateHTML(answers);

      return writeFileAsync("index.html", html);
    })
    .then(function() {
      console.log("Successfully wrote to index.html");
    })
    .catch(function(err) {
      console.log(err);
    });
