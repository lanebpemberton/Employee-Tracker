const { connect } = require("../config/connection");

class Department {
    constructor(id, designation, connection)
    {
        this.id = id;
        this.designation = designation;
        this.connection = connection;
        this.tableName = "department";
        //soft id evaluation
        if(this.id !== null)
        {
            //check if value needs to be retrieved based on id
            if(this.designation === null)
            {
                this.getDepartment();
            }
        }
    }

    async getDepartment()
    {
        //use id to retireve rest of department values from mysql
        connection.query(
            'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
            }
          );
    }

    async createDepartment()
    {
        //create department in mysql
        const [rows] = await this.connection.execute(`INSERT INTO ${this.tableName} (name) VALUES ('${this.designation}');`);
    }

    async deleteDepartment(id)
    {
        //delete department in mysql
        await this.connection.execute(`DELETE FROM ${this.tableName} WHERE id = '${id}'`)
    }

    async updateDepartment(designation, id)
    {
        //update department in mysql
        let [rows] = await this.connection.execute(`UPDATE ${this.tableName} SET name = '${designation}' WHERE id = '${id}'`);
    }

    async viewAllDepartments()
    {
        //view all departments in mysql
        //use id to retireve rest of department values from mysql
        const [rows, fields] = await this.connection.execute(`SELECT * FROM \`${this.tableName}\``);
        return rows;
    }

    async seedDepartment()
    {
       await this.connection.execute(`CREATE TABLE ${this.tableName} (name VARCHAR(50),id INT AUTO_INCREMENT PRIMARY KEY);`);
    }
}

class Role extends Department {
    constructor(id, title, salary, department_id, connection)
    {
        //initialize department
        super(department_id);
        //initialize role
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
        this.connection = connection;
        //soft id evaluation
        if(this.id !== null)
        {
            //check if value needs to be retrieved based on id
            if(this.title === null || this.salary === null)
            {
                this.getRole();
            }
        }
    }

    async getRole()
    {
        //get role values from mysql based on id

    }

    async createRole()
    {
        //create Role in mysql

        //the result of that function will set this object's id
    }

    async deleteRole()
    {
        //delete Role in mysql

    }

    async updateRole()
    {
        //update Role in mysql
    }

    async viewAllRoles()
    {
        //view all roles in mysql

    }
}

class Employee extends Role {
    constructor(id, first_name, last_name, role_id, manager_id,connection)
    {
        //initialize role
        super(role_id);
        //initializse employee
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.connection = connection;
    }

    async createEmployee()
    {
        //create Employee in mysql

        //the result of that function will set this object's id
    }

    async deleteEmployee()
    {
        //delete Employee in mysql

    }

    async updateEmployee()
    {
        //update Employee in mysql
    }

    async viewAllEmployees()
    {
        //return all employees in mysql

        //return array of objects

    }
}

module.exports = {
    "Department": Department, 
    "Role": Role,
    "Employee": Employee
}