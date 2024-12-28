import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  currentStep: number = 2;
  code: string[] = new Array(6).fill('');
  private typingTimeout: any;
  signUpForm!: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  formData = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    phone: '',
  };

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.initializeForms();
  }

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
    if (step <= this.currentStep || this.canProceed()) {
      this.currentStep = step;
      this.successMessage = '';
    }
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.signUpForm.get('name')?.valid ?? false;
      case 2:
        return (
          (this.signUpForm.get('email')?.valid ?? false) &&
          this.authService.isEmailValid(this.signUpForm.get('email')?.value) &&
          [0, 1, 2, 3, 4, 5].every(i => {
            const codeValue = this.signUpForm.get(`code${i}`)?.value;
            return codeValue !== null && codeValue.toString().trim() !== '';
          })
        );
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
  

  // Function to validate fields and handle success message
  validateField() {
    clearTimeout(this.typingTimeout);
  
    this.typingTimeout = setTimeout(() => {

      // Step 1 validations
      if (this.currentStep === 1 && this.signUpForm.get('name')?.value.trim() !== '') {
        
        this.successMessage = 'Excelente! Ahora puedes seguir al segundo paso.';
        setTimeout(() => {
          this.currentStep = 2;
        }, 3000);
  
        // Step 2 validations
 
      } else if (this.currentStep === 2) {
        this.successMessage = '¡Excelente! Ya estás en el paso 2.';
        
        // Email valid and regex email valid validation
        if (this.signUpForm.get('email')?.valid && this.authService.isEmailValid(this.signUpForm.get('email')?.value)) {
          
          // Join code controllers
          const code = [
            this.signUpForm.get('code0')?.value,
            this.signUpForm.get('code1')?.value,
            this.signUpForm.get('code2')?.value,
            this.signUpForm.get('code3')?.value,
            this.signUpForm.get('code4')?.value,
            this.signUpForm.get('code5')?.value,
          ].join('');
  
          // Check if all code fields are filled
          const allCodeFilled = [0, 1, 2, 3, 4, 5].every(i => {
            const codeValue = this.signUpForm.get(`code${i}`)?.value;
            return codeValue !== null && codeValue.toString().trim() !== '';
          });
  
          
          // Validation of the code that arrives in the email
          if (allCodeFilled && code !== '123456') {
            this.errorMessage = 'El código de verificación es incorrecto';
          
          } else if (allCodeFilled && code === '123456') {
            this.successMessage = '¡Excelente! El código es correcto. Vamos al paso 3.';
            setTimeout(() => {
              this.currentStep = 3;
            }, 3000);
          
          } else {
            this.errorMessage = '';
          }
        }
      } else if (
        this.currentStep == 3 &&
        this.signUpForm.get('password')?.valid &&
        this.signUpForm.get('confirmPassword')?.valid &&
        this.signUpForm.get('password')?.value ===
          this.signUpForm.get('confirmPassword')?.value
      ) {
        this.successMessage = 'Excelente! Ahora vamos al cuarto paso.';
        setTimeout(() => {
          this.currentStep = 4;
        }, 5000);
      } else {
        this.successMessage = '';
      }
    }, 1400); // 1400 ms = 1.4 seconds
  }
  

  calculateLineWidth(): number {
    const totalSteps = 4;
    const stepWidth = document.querySelector('.steps')?.clientWidth || 0;
    const lineWidth = (stepWidth / totalSteps) * (this.currentStep - 1);
    return lineWidth;
  }

  onSubmit() {
    console.log('signUpForm data:', this.formData);
    alert('Formulario enviado');
  }
}
