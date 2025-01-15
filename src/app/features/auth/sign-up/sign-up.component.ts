import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationTypeError } from '../../../core/enum/validations.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  currentStep: number = 1;
  code: string[] = new Array(6).fill('');
  private typingTimeout: any;
  signUpForm!: FormGroup;

  // Messages alerts
  successMessage: string = '';
  errorMessage: string = '';

  // Forms
  formData = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    phone: '',
  };

  ValidationType = ValidationTypeError;
  viewPassword: boolean = false;

  constructor(public authService: AuthService, private fb: FormBuilder) {
    this.initializeForms();
  }

  // This function is used to initialize the drivers
  initializeForms() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      code0: ['', Validators.required],
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
      code5: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  findStep(step: any) {
    // if (step <= this.currentStep || this.canProceed()) {
    this.currentStep = step;
    this.successMessage = '';
    // }
  }

  // This function is used to validate access to each of the steps
  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return (
          (this.signUpForm.get('email')?.valid ?? false) &&
          this.authService.isEmailValid(this.signUpForm.get('email')?.value) &&
          [0, 1, 2, 3, 4, 5].every((i) => {
            const codeValue = this.signUpForm.get(`code${i}`)?.value;
            return codeValue !== null && codeValue.toString().trim() !== '';
          })
        );
      case 2:
        return this.signUpForm.get('name')?.valid ?? false;
      case 3:
        return (
          (this.signUpForm.get('password')?.valid ?? false) &&
          (this.signUpForm.get('confirmPassword')?.valid ?? false) &&
          this.signUpForm.get('password')?.value ===
            this.signUpForm.get('confirmPassword')?.value
        );
      default:
        return true;
    }
  }

  validateStep(step: number) {
    switch (step) {
      case 1:
        const emailControl = this.signUpForm.get('email');
        const isEmailValid =
          emailControl?.valid &&
          this.authService.isEmailValid(emailControl.value);

        if (isEmailValid) {
          let allCodeFilled = true;

          for (let i = 0; i < this.code.length; i++) {
            const codeField = this.signUpForm.get(`code${i}`);
            const value = codeField?.value?.trim();

            if (!value) {
              allCodeFilled = false;
              break;
            }

            // If the current field has a value, move focus to the next
            if (value.length === 1 && i < 5) {
              const nextInput = document.getElementById(
                `code${i + 1}`
              ) as HTMLInputElement;
              nextInput?.focus();
            }
          }

          // Combine all the values ​​of the entered code
          const code = Array.from(
            { length: 6 },
            (_, i) => this.signUpForm.get(`code${i}`)?.value || ''
          ).join('');

          if (allCodeFilled && code !== '123456') {
            this.errorMessage = 'El código de verificación es incorrecto';
            this.successMessage = '';
          } else if (allCodeFilled && code === '123456') {
            this.successMessage =
              '¡Excelente! El código es correcto. Vamos al paso 2.';
            this.errorMessage = '';
            setTimeout(() => (this.currentStep = 2), 3000);
          } else {
            this.errorMessage = '';
          }
        }
        break;
      case 2:
        if (this.signUpForm.get('name')?.value.trim() !== '') {
          this.successMessage = '¡Excelente! Ya estás en el paso 2.';
          setTimeout(() => {
            this.currentStep = 3;
          }, 3000);
        }
        break;
      case 3:
        if (
          this.signUpForm.get('password')?.valid &&
          this.signUpForm.get('password')?.value?.trim() &&
          this.signUpForm.get('confirmPassword')?.valid &&
          this.signUpForm.get('confirmPassword')?.value?.trim() &&
          this.signUpForm.get('password')?.value?.trim() ==
            this.signUpForm.get('confirmPassword')?.value?.trim()
        ) {
          this.successMessage =
            'Excelente! Has finalizado el formulario de registro.';
        } else {
          this.successMessage = '';
        }
    }
  }

  isTouchedAndInvalidInput(
    controlName: string,
    validationType: ValidationTypeError
  ): boolean {
    const control = this.signUpForm.get(controlName);

    if (!control) return false;

    switch (validationType) {
      case ValidationTypeError.Required:
        return control.hasError('required');
      case ValidationTypeError.TouchedAndInvalid:
        return control.touched && control.invalid;
      case ValidationTypeError.InvalidEmail: 
        return control.hasError('email');
      default:
        return false;
    }
  }

  // We use this function to calculate the progress of the registration steps.
  calculateLineWidth(): number {
    const totalSteps = 3;
    const stepWidth =
      document.querySelector('.steps-indicator')?.clientWidth || 0;
    const lineHTML$ = document.querySelector('.line-progress') as HTMLElement;
    let lineWidth = (stepWidth / totalSteps) * (this.currentStep - 1);

    switch (this.currentStep) {
      case 1:
        lineWidth = 0;
        if (lineHTML$) {
          lineHTML$.style.left = '0';
        }
        break;
      case 2:
        lineWidth = stepWidth / 2;
        break;
      case 3:
        lineWidth = stepWidth;
        if (lineHTML$) {
          lineHTML$.style.left = '0';
        }
        break;
      default:
        if (lineHTML$) {
          lineHTML$.style.left = '';
        }
        break;
    }

    return lineWidth;
  }

  togglePassword(e: any) {
    e.stopPropagation();
    this.viewPassword = !this.viewPassword;
  }

  onSubmit() {
    console.log('signUpForm data:', this.formData);
    alert('Formulario enviado');
  }
}
