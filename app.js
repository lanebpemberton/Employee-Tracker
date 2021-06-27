//import inquirer package to gather command line information
const inquirer = require('inquirer');
//import mysql helper classes
const dbClasses = require('./Assets/dbClasses');
//import console table
const cTable = require('console.table');

/*   
    * Add departments, roles, employees

    * View departments, roles, employees

    * Update employee roles

## Bonus

    * The command-line application should allow users to:

    * Update employee managers

    * View employees by manager

    * Delete departments, roles, and employees

    * View the total utilized budget of a department -- ie the combined salaries of all employees in that department */

async function displayCMSOptions()
{
    let answers = await inquirer.prompt([
        //declaring my list of questions here
        {
            name:"cmsOptions",
            type:"list",
            message: "What would you like to do?",
            choices:
            [
                "View all employees",
                "Create employee",
                "Update employee",
                "Delete employee",
                "View all roles",
                "Create role",
                "Update role",
                "Delete role",
                "View all departments",
                "Create department",
                "Update department",
                "Delete department",
            ]
        }
    ]);

    //evaluate answers
    if(answers.cmsOptions.toUpper() === "VIEW ALL EMPLOYEES")
    {
        viewEmployees();
    }
}

async function viewEmployees()
{
    //get employees array
    let employees = await dbClasses.Employee().viewAllEmployees();
    //use console table to print contents of employees
    console.table(employees);
}

async function createEmployee()
{
    //setup questions as an array of objects
    let questions = [{
        name:"firstName",
        type:"input",
        message: "Employee first name",
    },
    {
        name:"lastName",
        type:"input",
        message: "Employee last name",
    }];
    //get all roles as an array
    let roles = await dbClasses.Role().viewAllRoles();
    //push roles to questions array
    questions.push({
        name:"roles",
        type:"list",
        message: "Assign employee role",
        choices: roles
    })
    let answers = await inquirer.prompt(questions);
    let employee = dbClasses.Employee()
}

async function deleteEmployee()
{

}

async function updateEmployeeName()
{

}

async function updateEmployeeRole()
{
    
}



displayCMSOptions();
