import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CharactersComponent, CharactersListComponent, CharacterDetailComponent], // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
  ],
})
export class CharactersModule {}
