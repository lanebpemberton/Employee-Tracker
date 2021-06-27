class Department {
    constructor(id, designation)
    {
        this.id = id;
        this.designation = designation;
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

    }

    async createDepartment()
    {
        //create department in mysql

        //the result of that function will set this object's id
    }

    async deleteDepartment()
    {
        //delete department in mysql

    }

    async updateDepartment()
    {
        //update department in mysql
    }

    async viewAllDepartments()
    {
        //view all departments in mysql

    }
}

class Role extends Department {
    constructor(id, title, salary, department_id)
    {
        //initialize department
        super(department_id);
        //initialize role
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
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
    constructor(id, first_name, last_name, role_id, manager_id)
    {
        //initialize role
        super(role_id);
        //initializse employee
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
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