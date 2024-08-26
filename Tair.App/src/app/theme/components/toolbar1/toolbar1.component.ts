import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppService } from '@services/app.service';
import { ContactsComponent } from '../contacts/contacts.component';
import { SocialIconsComponent } from '../social-icons/social-icons.component';
import { CurrencyComponent } from '../currency/currency.component';
import { LangComponent } from '../lang/lang.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LogoComponent } from '@shared-components/logo/logo.component';
import { HorizontalMenuComponent } from '../menu/horizontal-menu/horizontal-menu.component';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageUtils } from '../../../utils/localStorage';
import { AuthService } from '@services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogComponent } from '../blog/blog.component';
import { AcessoComponent } from '../acesso/acesso.component';

@Component({
  selector: 'app-toolbar1',
  standalone: true,
  imports: [
    FlexLayoutModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    TranslateModule,
    ContactsComponent,
    SocialIconsComponent,
    MatSnackBarModule,
    CurrencyComponent,
    BlogComponent,
    AcessoComponent,
    LangComponent,
    UserMenuComponent,
    LogoComponent,
    HorizontalMenuComponent
  ],
  templateUrl: './toolbar1.component.html'
})
export class Toolbar1Component implements OnInit {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public appService: AppService, public router: Router, private authService: AuthService, public snackBar: MatSnackBar) { }

  LocalStorage = new LocalStorageUtils();
  token!: string;
  userLogado: boolean = true;

  ngOnInit() { 
    this.usuarioLogado();
  }

  public sidenavToggle() {
    this.onMenuIconClick.emit();
  }

  usuarioLogado() {
    this.token = this.LocalStorage.obterTokenUsuarioSession();
    
    if(this.token != null){
      this.userLogado = true;
    } else this.userLogado = false;
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Você foi desconectado!', 'x', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });

    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}