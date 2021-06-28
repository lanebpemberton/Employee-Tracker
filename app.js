//import inquirer package to gather command line information
const inquirer = require('inquirer');
//import mysql helper classes
const dbClasses = require('./Assets/dbClasses');
//import console table
const cTable = require('console.table');
const { createPromptModule } = require('inquirer');

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
    }else if(answers.cmsOptions.toUpper() === "CREATE EMPLOYEE")
    {
        createEmployee();
    }else if(answers.cmsOptions.toUpper() === "VIEW ALL ROLES")
    {
        viewRoles();
    }else if(answers.cmsOptions.toUpper() === "CREATE ROLE")
    {
        createRole();
    }else if(answers.cmsOptions.toUpper() === "VIEW ALL DEPARTMENTS")
    {
        viewDepartments();
    }else if(answers.cmsOptions.toUpper() === "CREATE DEPARTMENT")
    {
        createDepartment();
    }
}

//EMPLOYEES
async function viewEmployees()
{
    //get employees array
    let employees = await dbClasses.Employee().viewAllEmployees();
    //use console table to print contents of employees
    console.table(employees);
    //redisplay main cms options after displaying all employees
    displayCMSOptions();
}

function roleObjectToRoleString(object)
{
    return object.title;
}

function returnMatchingRoleID(role, roles)
{
    for(let a = 0;a<roles.length;a++)
    {
        if(role === roles[a].title)
        {
            //if role was round return id and finish looping
            return roles[a].id;
        }
    }
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
    //call map function to create array of strings that are role titles
    let roleTitles = roles.map(roleObjectToRoleString);
    console.log(JSON.stringify(roleTitles));
    //push roles to questions array
    questions.push({
        name:"role",
        type:"list",
        message: "Assign employee role",
        choices: roleTitles
    })
    //present questions to user
    let answers = await inquirer.prompt(questions);
    //get role id from answers
    let roleID = returnMatchingRoleID(answers.role,roles);
    //create instance of employee
    let employee = dbClasses.Employee(null,answers.firstName,answers.lastName,roleID);
    //use instane of employee to create new employee record
    employee.createEmployee();
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

//ROLES
async function viewRoles()
{
    //get roles array
    let roles = await dbClasses.Role().viewAllRoles();
    //use console table to print all contents
    console.table(roles);
    //redisplay main cms options after printing contents
    displayCMSOptions();
}

function departmentObjectToDepartmentString(object)
{
    return object.designation;
}

function returnMatchingDepartmentID(designation, departments)
{
    for(let a = 0;a<departments.length;a++)
    {
        if(designation === departments[a].designation)
        {
            //if role was round return id and finish looping
            return departments[a].id;
        }
    }
}

async function createRole()
{
    //setup questions as an array of objects
    let questions = [{
        name:"title",
        type:"input",
        message: "Role title",
    },
    {
        name:"salary",
        type:"input",
        message: "Role salary",
    }];
    //get all departments as an array
    let departments = await dbClasses.Department().viewAllDepartments();
    //call map function to create array of strings that are designations
    let designations = departments.map(departmentObjectToDepartmentString);
    console.log(JSON.stringify(designations));
    //push roles to questions array
    questions.push({
        name:"designation",
        type:"list",
        message: "Assign role to department",
        choices: designations
    })
    //present questions to user
    let answers = await inquirer.prompt(questions);
    //get department id from answers
    let departmentID = returnMatchingDepartmentID(answers.designation,departments);
    //create instance of role
    let role = dbClasses.Role(null,answers.title,answers.salary,departmentID);
    //use instane of employee to create new employee record
    role.createRole();
}

//DEPARTMENTS
async function viewDepartments()
{
    //get departments array
    let departments = await dbClasses.Department().viewAllDepartments();
    //use console table to print contents of departments
    console.table(departments);
    //redisplay main cms options after displaying all departments
    displayCMSOptions();
}

async function createDepartment()
{
    //setup questions as an array of objects
    let questions = [{
        name:"designation",
        type:"input",
        message: "Department name",
    }];
    //present questions to user
    let answers = await inquirer.prompt(questions);
    //create instance of department
    let department = dbClasses.Department(null,answers.designation);
    //use instane of employee to create new employee record
    department.createDepartment();
}

//on start display the main options
displayCMSOptions();
