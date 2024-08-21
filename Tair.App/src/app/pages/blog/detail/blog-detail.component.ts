import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { GetInTouchComponent } from '@shared-components/get-in-touch/get-in-touch.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Settings, SettingsService } from '@services/settings.service';
import { MatDividerModule } from '@angular/material/divider';
import { ArtigosService } from '@services/artigos.service';
import { Artigos } from '@models/artigos';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    GetInTouchComponent,
    MatDividerModule,
    MatCardModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit{
  public settings: Settings;
  public artigo: Artigos;
  public html: string;
  private sub: any;
  public loading: boolean = true;
  imagens: string = environment.imagensUrl;

  constructor(public settingsService: SettingsService, public artigosService: ArtigosService, private activatedRoute: ActivatedRoute) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      // this.getArtigoById(params['id']);
      this.getArtigoByUrl(params['url_artigo']);
    });
  }

  public getArtigoById(id: string) {
    this.artigosService.obterArtigoPeloId(id).subscribe(data => {
      this.loading = false;
      this.artigo = data;
      this.html = this.artigo.html;
    });
  }

  public getArtigoByUrl(url: string) {
    this.artigosService.obterArtigoPelaUrl(url).subscribe(data => {
      this.loading = false;
      this.artigo = data;
      this.html = this.artigo.html;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
