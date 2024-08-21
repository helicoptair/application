import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { GetInTouchComponent } from '@shared-components/get-in-touch/get-in-touch.component';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Settings, SettingsService } from '@services/settings.service';
import { MatDividerModule } from '@angular/material/divider';
import { ArtigosService } from '@services/artigos.service';
import { Artigos } from '@models/artigos';
import { environment } from '../../../environments/environment';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    GetInTouchComponent,
    MatDividerModule,
    RouterModule,
    NgClass,
    MatCardModule
  ],
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit{
  public viewType: string = "grid";
  public viewColChanged: number = 0;
  public fullWidthPage: boolean = true;
  public column: number = 4; 
  public settings: Settings;
  public artigos: Artigos[];
  public loading: boolean = true;
  imagens: string = environment.imagensUrl;

  constructor(public settingsService: SettingsService, public artigosService: ArtigosService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.obterArtigos();
  }

  obterArtigos() {
    this.artigosService.obterArtigos().subscribe(data => {
      if (data.length != 0) {
        this.loading = false;
        this.artigos = data;
      } else {
        this.artigos = [];
      }

    })
  }
}
