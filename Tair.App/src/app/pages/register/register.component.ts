import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@services/auth.service';
import { User } from './User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public hide = true;
  public userTypes = [
    { id: 'individual', name: 'Física' },
    { id: 'company', name: 'Jurídica' }
  ];
  user!: User;
  errors: any[] = [];
  spinner: boolean = false;

  constructor(public fb: FormBuilder, public router: Router, public snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    // this.registerForm = this.fb.group({
    //   userType: ['', Validators.required],
    //   username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    //   email: ['', Validators.compose([Validators.required, emailValidator])],
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required],
    //   receiveNewsletter: false
    // }, { validator: matchingPasswords('password', 'confirmPassword') });

    this.beginForm();
  }

  beginForm() {
    this.registerForm = this.fb.group({
      // recaptcha: [null, Validators.required],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(64)]],
      type: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      line1: ['', Validators.required],
      line2: [''],
      zipcode: ['', Validators.required],
      document: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      foto: ['']
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  public Register(): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.spinner = true;

      this.user = Object.assign(this.registerForm.value);
        console.log(this.user);
        
        this.authService.register(this.user).subscribe(
          success => { 
            this.processarSucesso(success); 
          },
          error => {
            this.processarFalha(error);
          },);
    }
  }

  processarSucesso(response: any) {
    this.snackBar.open('Cadastro realizado, acesse seu email para ativar sua conta!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    this.registerForm.reset();
    this.errors = [];
    
    this.router.navigate(['/']);
  }
  
  processarFalha(fail: any) {
    this.spinner = false;
    this.errors = fail.error.errors;
    this.snackBar.open(this.errors[0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }

}

