import { NgForm } from "@angular/forms";

export class ValidationNotify {
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  dataForm: NgForm;

  constructor(
    formErrors: { [key: string]: string } = {},
    validationMessages = {},
    dataForm: NgForm
  ) {
    this.formErrors = formErrors;
    this.validationMessages = validationMessages;
    this.dataForm = dataForm;
  }

  public markFormControlsAsTouchedAndDirty(form: NgForm) {
    Object.keys(form.controls).forEach((controlName) => {
      form.controls[controlName].markAsTouched();
      form.controls[controlName].markAsDirty();
    });
  }

  public validateForm(): void {
    this.formErrors = {};
    const form = this.dataForm.form;
    for (const field in form.controls) {
      const control = form.get(field);

      if (control && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  public onInputChange(field: string): void {
    const control = this.dataForm.form.get(field);

    if (control && control.dirty && control.valid) {
      delete this.formErrors[field];
    } else if (
      control &&
      control.invalid &&
      (control.dirty || control.touched)
    ) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] = messages[key];
      }
    }
  }
}
