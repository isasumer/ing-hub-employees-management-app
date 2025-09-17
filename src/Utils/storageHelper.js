export const getEmployees = () => {
  const employees = localStorage.getItem('employees');
  return employees ? JSON.parse(employees) : [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const addEmployee = (employee) => {
  const employees = getEmployees();
  employees.push(employee);
  saveEmployees(employees);
};

export const updateEmployee = (updatedEmployee) => {
  const employees = getEmployees();
  const index = employees.findIndex(employee => employee.id === updatedEmployee.id);
  employees[index] = updatedEmployee;
  saveEmployees(employees);
};

export const deleteEmployee = (id) => {
  const employees = getEmployees().filter(employee => employee.id !== id);
  saveEmployees(employees);
};

export const getEmployeeById = (id) => {
  const employees = getEmployees();
  return employees.find(employee => employee.id === id);
};

export const initializeEmployees = async () => {
  if (localStorage.getItem('employees') === null) {
    try {
      const response = await fetch('/src/dummy-employees.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const dummyEmployees = await response.json();
      console.log({dummyEmployees})
      saveEmployees(dummyEmployees);
    } catch (error) {
      console.error('Failed to fetch dummy employees:', error);
    }
  }
};

initializeEmployees();
