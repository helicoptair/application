import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterNeighborhoodsPipe } from './filter-neighborhoods';
import { FilterStreetsPipe } from './filter-streets.pipe';
import { CategoriaVooPipe } from './categoriaVoo.pipe';
import { StatusReservaPipe } from './statusReserva.pipe';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        FilterByIdPipe,
        FilterNeighborhoodsPipe,
        FilterStreetsPipe,
        CategoriaVooPipe,
        StatusReservaPipe
    ],
    exports: [
        FilterByIdPipe,
        FilterNeighborhoodsPipe,
        FilterStreetsPipe,
        CategoriaVooPipe,
        StatusReservaPipe
    ]
})
export class PipesModule { }
