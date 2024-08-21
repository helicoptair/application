import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '@services/app.service';
import { Router, RouterModule } from '@angular/router';
import { BidiModule } from '@angular/cdk/bidi';
import { Settings, SettingsService } from '@services/settings.service';
import { User, UserToken } from '../../../pages/register/User';
import { LocalStorageUtils } from '../../../utils/localStorage';
import { AuthService } from '@services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule,
    FlexLayoutModule,
    TranslateModule,
    BidiModule
  ],
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent implements OnInit {
  public settings: Settings;
  LocalStorage = new LocalStorageUtils();
  public user: UserToken;
  constructor(public appService: AppService, public settingsService: SettingsService, public authService: AuthService, public router: Router, public snackBar: MatSnackBar) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.usuarioLogado();
  }

  usuarioLogado() {
    this.user = this.LocalStorage.obterUsuarioSession();
    console.log("USER: " + this.user);
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
