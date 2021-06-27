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
}

async function viewEmployees()
{
    //get employees array
    let employees = dbClasses.Employee().viewEmployees();
    //use console table to print contents of employees
    console.table(employees);
}

async function createEmployee()
{

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
