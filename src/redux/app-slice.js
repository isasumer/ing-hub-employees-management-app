import {createSlice} from '@reduxjs/toolkit';
import {employeeReducers} from './slices/employeeReducers';

const appSlice = createSlice({
  name: 'app',
  initialState: AppStateFactory(),
  reducers: {
    ...employeeReducers,
  },
});

export const {setEmployees, addEmployee, deleteEmployee, updateEmployee} =
  appSlice.actions;

export default appSlice.reducer;

function AppStateFactory() {
  return {
    isLoading: false,
    isError: false,
    errorMessage: '',
  };
}
