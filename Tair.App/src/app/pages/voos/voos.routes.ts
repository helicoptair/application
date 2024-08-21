import { Routes } from "@angular/router";
import { VoosComponent } from "./voos.component";
import { VooComponent } from "./voo/voo.component";
import { MinhasReservasComponent } from "./minhas-reservas/minhas-reservas.component";

export const routes: Routes = [
    { path: '', component: VoosComponent, pathMatch: 'full' },
    { path: 'minhas-reservas', component: MinhasReservasComponent },
    { path: ':url_voo', component: VooComponent }
];