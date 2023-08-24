import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
  ) {}

  character$!: Observable<Character>;

  loading$!: Observable<boolean>;
  ngOnInit() {


    this.character$ = this.charactersService.getCharacterById(this.route.snapshot.params['id']);

    this.loading$ = this.charactersService.loading$;

    this.character$.subscribe((value) => {

      console.log('what is value', value);
    } );
  }
}
