import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { User } from '../register/User';
import { AuthService } from '@services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;
  errors: any[] = [];
  spinner: boolean = false;
  user!: User;

  constructor(public fb: FormBuilder, public router: Router, private authService: AuthService, public snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['']);
    }

    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(64), Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      rememberMe: false
    });
  }

  login() {
    this.spinner = true;

    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.authService.login(this.user).subscribe(
        (success) => {
          this.processarSucesso(success);
        },
        (error) => {
          this.processarFalha(error);
        }
      );
    }
  }

  processarSucesso(response: any) {
    this.snackBar.open('Acessando sua conta!', 'x', { panelClass: 'success', verticalPosition: 'top', duration: 1000 });
    this.errors = [];
    this.authService.LocalStorage.salvarDadosLocaisUsuarioSession(response);
    

    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    
    setTimeout(() => {
      if (returnUrl) this.router.navigate([returnUrl]);
      else this.router.navigate(['/']);

      setTimeout(() => {
        window.location.reload();
      }, 500);

    }, 1000);
    
  }
  
  processarFalha(fail: any) {
    this.spinner = false;
    this.errors = fail.error.errors;
    this.snackBar.open(this.errors[0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }

  

}
