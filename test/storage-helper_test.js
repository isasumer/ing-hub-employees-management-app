import {assert} from '@open-wc/testing';

suite('storageHelper', () => {
  setup(() => {
    localStorage.clear();
    // Prevent initializeEmployees from fetching real data
    window.fetch = async () => ({ok: true, json: async () => []});
  });

  test('getEmployees returns empty array when none saved', async () => {
    const m = await import('../src/utils/storageHelper.js?test=1');
    assert.deepEqual(m.getEmployees(), []);
  });

  test('saveEmployees and getEmployees round trip', async () => {
    const m = await import('../src/utils/storageHelper.js?test=2');
    const list = [{id: '1', firstName: 'A'}];
    m.saveEmployees(list);
    assert.deepEqual(m.getEmployees(), list);
  });

  test('addEmployee appends to list', async () => {
    const m = await import('../src/utils/storageHelper.js?test=3');
    m.saveEmployees([]);
    m.addEmployee({id: '2', firstName: 'B'});
    const list = m.getEmployees();
    assert.equal(list.length, 1);
    assert.equal(list[0].id, '2');
  });

  test('updateEmployee replaces by id', async () => {
    const m = await import('../src/utils/storageHelper.js?test=4');
    m.saveEmployees([{id: '3', firstName: 'C'}]);
    m.updateEmployee({id: '3', firstName: 'C2'});
    const emp = m.getEmployeeById('3');
    assert.equal(emp.firstName, 'C2');
  });

  test('deleteEmployee removes by id', async () => {
    const m = await import('../src/utils/storageHelper.js?test=5');
    m.saveEmployees([{id: '4', firstName: 'D'}]);
    m.deleteEmployee('4');
    assert.equal(m.getEmployees().length, 0);
  });

  test('getEmployeeById returns the employee', async () => {
    const m = await import('../src/utils/storageHelper.js?test=6');
    m.saveEmployees([{id: '5', firstName: 'E'}]);
    const emp = m.getEmployeeById('5');
    assert.equal(emp.firstName, 'E');
  });
});


