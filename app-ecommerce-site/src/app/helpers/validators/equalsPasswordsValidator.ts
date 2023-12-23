import { AbstractControl, Validators } from '@angular/forms';

export const equalsPasswordValidator = (password: any) => {
  return (control: AbstractControl): Validators => {
    const passwordConfirmation = control.value;
    const passwordValue = password.value;
    if (passwordConfirmation) {
      if (passwordConfirmation !== passwordValue) {
        return { 'As senhas são diferentes': true };
      }
      return false;
    }
    return { 'O campo senha é obrigatório': true };
  };
};
