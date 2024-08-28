import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatCardModule,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
