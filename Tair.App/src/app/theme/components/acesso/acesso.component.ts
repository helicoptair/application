import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { BidiModule } from '@angular/cdk/bidi';
import { Settings, SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-acesso',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    FlexLayoutModule,
    TranslateModule,
    BidiModule
  ],
  templateUrl: './acesso.component.html'
})
export class AcessoComponent{
  public settings: Settings;
  
  constructor(public translateService: TranslateService, public settingsService: SettingsService) {this.settings = this.settingsService.settings;}


}