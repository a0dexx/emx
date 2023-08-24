import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';
import { Observable, switchMap } from 'rxjs';

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
    // let characterId = this.route.snapshot.params['id']// as string;

    // this.character$ = this.charactersService.getCharacterById(characterId );
    this.character$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.charactersService.getCharacterById(params.get('id')  as string);
      }),
    );


    this.loading$ = this.charactersService.loading$;

    this.character$.subscribe((value) => {
      console.log('what is value', value);
    });
  }
}
