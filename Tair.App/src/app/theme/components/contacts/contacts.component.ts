import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NgClass,
    FlexLayoutModule,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  @Input() dividers: boolean = true;
  @Input() iconSize: string = 'sm';
  @Input() iconColor: string = ''; 
}
