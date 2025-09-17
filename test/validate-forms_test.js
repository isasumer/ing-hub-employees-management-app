import {assert} from '@open-wc/testing';
import {validateForm} from '../src/utils/validate-forms.js';

suite('validateForm', () => {
  test('returns error for invalid email', () => {
    const data = {email: 'bad', phone: '+90 123 456 78 90'};
    const errors = validateForm(data);
    assert.property(errors, 'email');
  });

  test('returns error for invalid phone', () => {
    const data = {email: 'a@b.com', phone: '123'};
    const errors = validateForm(data);
    assert.property(errors, 'phone');
  });

  test('returns no errors for valid input', () => {
    const data = {email: 'test@example.com', phone: '+90 555 444 33 22'};
    const errors = validateForm(data);
    assert.equal(Object.keys(errors).length, 0);
  });
});


