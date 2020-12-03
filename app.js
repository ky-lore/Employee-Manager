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
      {
        type: 'input',
        name: 'roleId',
        message: "Please input the employee's role ID"
      },
      {
        type: 'list',
        name: 'empManager',
        message: "Choose the employee's manager (if applicable)",
        choices: [managerArr[0].lastName, managerArr[1].lastName, managerArr[2].lastName, managerArr[3].lastName, 'None']
      }
    ])
    .then(data => {
      let mgrId
      let deptId

      switch(data.department) {
        case 'Sales':
          deptId = 1
          break
        case 'Engineering':
          deptId = 2
          break
        case 'Finance':
          deptId = 3
          break
        case 'Legal':
          deptId = 4
          break
      }

      if(data.empManager !== 'None') {

        for(i = 0; i < managerArr.length; i++) {
          if(managerArr[i].lastName === data.empManager) {
            mgrId = managerArr[i].id
          }
        }

        console.log(`'${ data.firstName }', '${ data.lastName }', ${ data.roleId }, ${ mgrId }`)

        db.query(`INSERT INTO employees (firstName, lastName, roleId, managerId)
                  VALUES ('${data.firstName}', '${data.lastName}', ${data.roleId}, ${mgrId})`)
      }
      
    })
    .catch(err => console.log(err))
}

let managerArr = []

const getManagers = () => {
  db.query('SELECT * FROM employees WHERE managerId IS NULL', (err, managers) => {
    if (err) { console.log(err) }
    managers.forEach(manager => {
      managerArr.push(manager)
    })
  })
}

getManagers()

menu()

