import {createSlice} from '@reduxjs/toolkit';

const EmployeeStateFactory = () => ({
  employees: [],
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: EmployeeStateFactory(),
  reducers: {
    setEmployees(state, {payload}) {
      state.employees = payload;
    },
    addEmployee(state, {payload}) {
      state.employees.push(payload);
    },
    deleteEmployee(state, {payload}) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== payload
      );
    },
    updateEmployee(state, {payload}) {
      const {id, updatedData} = payload;
      const employeeIndex = state.employees.findIndex(
        (employee) => employee.id == id
      );

      if (employeeIndex !== -1) {
        state.employees[employeeIndex] = {
          ...state.employees[employeeIndex],
          ...updatedData,
        };
      }
    },
  },
});

export const {setEmployees, addEmployee, deleteEmployee, updateEmployee} =
  employeeSlice.actions;

export default employeeSlice.reducer;
