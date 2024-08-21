import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Property } from '@models/app.models';
import { Reservas } from '@models/reservas';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '@services/app.service';
import { VoosService } from '@services/voos.service';
import { GetInTouchComponent } from '@shared-components/get-in-touch/get-in-touch.component';
import { StatusReservaPipe } from '../../../theme/pipes/statusReserva.pipe';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-minhas-reservas',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    TranslateModule,
    GetInTouchComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    DatePipe,
    PipesModule
  ],
  templateUrl: './minhas-reservas.component.html',
  styleUrl: './minhas-reservas.component.scss',
})
export class MinhasReservasComponent implements OnInit {
  displayedColumns: string[] = ['data_voo', 'categoria_voo', 'quantidade_pax', 'tempo_de_voo', 'valor_pago', 'charge_status', 'forma_pagamento', 'actions'];
  dataSource: MatTableDataSource<Reservas>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public appService: AppService, public voosService: VoosService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.obterReservas();
  }

  obterReservas(){
    this.voosService.obterMinhasReservas().subscribe(res => {
      this.initDataSource(res);
    });
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource<Reservas>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(reserva: Reservas) {
    const index: number = this.dataSource.data.indexOf(reserva);
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE') ?? '';
      let dialogRef = this.appService.openConfirmDialog('', message);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.dataSource.data.splice(index, 1);
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }

  public applyFilter(ev: EventTarget) {
    let filterValue = (ev as HTMLInputElement).value;
    console.log("FILTRO: " + filterValue);
    this.dataSource.filter = filterValue?.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelarVoo(reservaId: string){
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE') ?? '';
      let dialogRef = this.appService.openConfirmDialog('Confirmação', 'Você tem certeza que deseja cancelar seu passeio? O valor pago pela reserva será reembolsado.');
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.voosService.cancelarVoo(reservaId).subscribe(
            success => { 
              this.snackBar.open('Cancelamento realizado!', 'x', { panelClass: 'success', verticalPosition: 'top', duration: 1000 });
              setTimeout(() => {
                this.obterReservas();
                // window.location.reload();
              }, 500);
            },
            error => {
              this.snackBar.open(error.error.errors[0], 'x', { panelClass: 'success', verticalPosition: 'top', duration: 2000 });
            });
        }
      });
  }

}
