import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatCardModule,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './mission.component.html'
})
export class MissionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
