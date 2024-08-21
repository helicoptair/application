import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogDetailComponent } from "./detail/blog-detail.component";

export const routes: Routes = [
    { path: '', component: BlogComponent, pathMatch: 'full' },
    // { path: ':id', component: BlogDetailComponent },
    { path: ':url_artigo', component: BlogDetailComponent }
];