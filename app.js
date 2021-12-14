//import inquirer package to gather command line information
const inquirer = require('inquirer');
//import mysql helper classes
const dbClasses = require('./models/dbClasses');
//import console table
const cTable = require('console.table');
//import connection
const mysqlConnection = require('./config/connection');
//setup global connection variable
let connection = null;

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
                "View all roles",
                "Create role",
                "View all departments",
                "Create department",
                "Update department",
                "Delete department",
            ]
        }
    ]);
    //evaluate answers
    if(answers.cmsOptions.toUpperCase() === "VIEW ALL EMPLOYEES")
    {
        viewEmployees();
    }else if(answers.cmsOptions.toUpperCase() === "CREATE EMPLOYEE")
    {
        createEmployee();
    }else if(answers.cmsOptions.toUpperCase() === "VIEW ALL ROLES")
    {
        viewRoles();
    }else if(answers.cmsOptions.toUpperCase() === "CREATE ROLE")
    {
        createRole();
    }else if(answers.cmsOptions.toUpperCase() === "VIEW ALL DEPARTMENTS")
    {
        viewDepartments();
    }else if(answers.cmsOptions.toUpperCase() === "CREATE DEPARTMENT")
    {
        createDepartment();
    }else if(answers.cmsOptions.toUpperCase() === "DELETE DEPARTMENT")
    {
        deleteDepartment();
    }else if(answers.cmsOptions.toUpperCase() === "UPDATE DEPARTMENT")
    {
        updateDepartment();
    }
}

//EMPLOYEES
async function viewEmployees()
{
    //get instance of employee
    let employee = new dbClasses.Employee(null,null,null,null,null,connection);
    //get array of employees
    let employees = await employee.viewAllEmployees();
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
    //present questions to user
    let answers = await inquirer.prompt(questions);
    //create instance of employee
    let employee = new dbClasses.Employee(null,answers.firstName,answers.lastName,null,null,connection);
    //use instane of employee to create new employee record
    await employee.createEmployee();
    //redisplay main cms options after printing contents
    displayCMSOptions();
}

//ROLES
async function viewRoles()
{
    //get instance of roles
    let role = new dbClasses.Role(null,null,null,null,connection)
    //get roles array
    let roles = await role.viewAllRoles();
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
    //present questions to user
    let answers = await inquirer.prompt(questions);
    //create instance of role
    let role = new dbClasses.Role(null,answers.title,answers.salary,null,connection);
    //use instance of employee to create new employee record
    await role.createRole();
    console.log("Role created successfully!");
    //redisplay main cms options after displaying all departments
    displayCMSOptions();
}

//DEPARTMENTS
async function viewDepartments()
{
    //create instance of department
    const department = new dbClasses.Department(null,null,connection);
    //get departments array
    let departments = await department.viewAllDepartments();
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
    let department = new dbClasses.Department(null,answers.designation,connection);
    //use instance of employee to create new employee record
    department.createDepartment();
    //tell the user department was created successfully
    console.log(`Department '${answers.designation}' created successfully!`);
    //point the user back to main options
    displayCMSOptions();
}

async function deleteDepartment()
{
    let department = new dbClasses.Department(null,null,connection);
    //get departments to list
    let departments = await department.viewAllDepartments();
    //setup questions to show user
    let chooseDepartmentQuestion = [
        {
            name:"department",
            type: "list",
            message: "Choose a department to delete",
            choices: departments
        }
    ]; 
    //get answer from user
    let departmentAnswer = await inquirer.prompt(chooseDepartmentQuestion);
    //get whole object of chosen answer from initial list
    let departmentSelected = departments.filter(returnIDFromArray,departmentAnswer.department)[0];
    //write result to delete department
    await department.deleteDepartment(departmentSelected.id);
    console.log(`Department '${departmentSelected.name}' deleted successfully!`);
    //take user back to main menu
    displayCMSOptions();
}

async function updateDepartment()
{
    let department = new dbClasses.Department(null,null,connection);
    //get departments to list
    let departments = await department.viewAllDepartments();
    //setup questions to show user
    let chooseDepartmentQuestion = [
        {
            name:"department",
            type: "list",
            message: "Choose a department to update",
            choices: departments
        }
    ];
    //get answer from user
    let departmentAnswer = await inquirer.prompt(chooseDepartmentQuestion);
    //get whole object of chosen answer from initial list
    let departmentSelected = departments.filter(returnIDFromArray,departmentAnswer.department)[0];
    //ask user to rename department
    let updatedDepartmentQuestion = [
        {
            name:"updatedDepartment",
            type:"input",
            message:`Enter a new name for the department: '${departmentAnswer.department}'`
        }
    ]
    //present question to user
    let updateDepartmentAnswer = await inquirer.prompt(updatedDepartmentQuestion);
    //write result to update department
    await department.updateDepartment(updateDepartmentAnswer.updatedDepartment,departmentSelected.id);
    console.log(`Department '${departmentSelected.name}' updated successfully!`);
    //take user back to main menu
    displayCMSOptions();
}

function returnIDFromArray(arrayValue)
{
    if(arrayValue.name == this)
    {
        return true
    }
    return false;
}

//on start setup connection and display the main options
async function startApp()
{
    connection = await mysqlConnection.setup();
    displayCMSOptions();
}

startApp();

