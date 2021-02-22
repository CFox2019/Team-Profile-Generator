const inquirer = require("inquirer");
const Employee = require("./lib/Employee");

const employee = new Employee();


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
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">

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
