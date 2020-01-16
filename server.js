var mysql = require("mysql");
var inquirer = require("inquirer");
// var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Camellos_15",
    database: "employeeTrack_DB"
});

connection.connect(function (err) {
    if (err) throw err;
console.log("Connected to PORT 3306")
    promptUser();
});


function promptUser() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: "request",
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Remove Role',
                'View All Departments',
            ],           
        }
    ])
    .then(action => {
        switch (action.request) {
        case "View All Employees":
            sendEmployees();
            break;
        
        case "View All Employees By Department":
            sendEmployeebyDept();
            break;
        
        case "View All Employees By Manager":
            sendEmployeebyManager();
            break;
        
        case "Add Employee":
            addEmployee();
            break;

        case "Remove Employee":
            removeEmployee();
            break;

        case "Update Employee Role":
            updateEmployeeRole();
            break;

        case "Update Employee Manager":
            updateEmployeeManager();
            break;

        case "View All Roles":
            sendRoles();
            break;
        
        case "Add Role'":
            addRole();
            break;

        case "Remove Role":
            removeRole();
            break;
                
        case "View All Departments":
            sendDepartments();
            break;
        }
    }) 
}

function newRequest() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'newReq',
                message: "Do you have another request?",
            }
        ])
        .then(data => {
            switch (data.newReq) {
                case true:
                    promptUser()
                case false:
                    console.log("Wish you a nice day");
                    break;
            }
        })
}

function sendEmployees(){
    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.Name FROM employee LEFT JOIN role ON role_id = role.ID LEFT JOIN department ON department_id = department.ID`

    connection.query(query, function (err, results) {
        if(err) throw(err);
        console.table(results);
        newRequest()
    });
}

function sendEmployeebyDept(){
    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.Name FROM employee LEFT JOIN role ON role_id = role.ID LEFT JOIN department ON department_id = department.ID`

    connection.query(query, function (err, results) {
        if(err) throw(err);
        console.table(results);
        newRequest()
    });
}

function sendDepartments() {
    var query = `SELECT * FROM employeeTrack_DB.department`

    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        newRequest();
    });
}


