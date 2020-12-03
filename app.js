const mysql = require('mysql2')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Solved19!',
  database: 'employees_db'
});

const inquirer = require('inquirer')

const menu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Welcome to the EMPLOYEE MANAGER. Please select a choice:',
        choices: ['View all employees', 'Add an employee', 'Delete an employee']
      }
    ])
    .then(({ choice }) => {
      switch (choice) {
        case 'View all employees':
          viewEmployees()
          menu()
          break
        case 'Add an employee':
          addEmployee()
          break
      }
    })
    .catch(err => console.log(err))
}

const viewEmployees = () => {
  db.query(`
      SELECT employees.id, employees.firstName, employees.lastName, roles.title, roles.salary, departments.name AS department, CONCAT(manager.firstName, ' ', manager.lastName) AS manager
      FROM employees LEFT JOIN roles ON employees.roleId = roles.id
      LEFT JOIN departments ON roles.departmentId = departments.id
      LEFT JOIN employees manager ON manager.id = employees.managerId
      `, (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
  })
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Please enter the employee's first name"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Please enter the employee's last name"
      },
      {
        type: 'list',
        name: 'department',
        message: "Choose the employee's department",
        choices: ['Sales', 'Engineering', 'Finance', 'Legal']
      },
    ])
    .then(data => {

    })
    .catch(err => console.log(err))
}

//menu()

let managerArr = []

const getManagers = () => {
  db.query('SELECT * FROM employees WHERE managerId IS NULL', (err, managers) => {
    if (err) { console.log(err) }
    managers.forEach(manager => {
      console.log(manager)
    })
  })
}

getManagers()