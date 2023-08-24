import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AboutComponent} from "./about/about.component";

const routes: Routes = [

    {
        path: "about",
        component: AboutComponent
    },

    { path: 'characters', loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule) },

    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
