import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';
import { By } from '@angular/platform-browser';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let charactersServiceSpy: jasmine.SpyObj<CharactersService>;

  const paramMapMock = new Map<string, string>();
  paramMapMock.set('id', '1'); // Set 'id' value

  const activatedRouteMock = {
    paramMap: of(paramMapMock) as any, // Mock paramMap as an Observable
  };

  beforeEach(() => {
    charactersServiceSpy = jasmine.createSpyObj('CharactersService', ['getCharacterById']);

    TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CharactersService, useValue: charactersServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should show character details when loaded', fakeAsync(() => {
    const character: Character = {
      id: 1,
      name: 'Character 1',
      url: 'url 1',
      created: 'created 1',
      status: 'Dead',
      species: 'Species 1',
      type: 'Type 1',
      gender: 'Female',
      origin: { name: 'Origin 1', url: 'origin-url-1' },
      location: { name: 'Location 1', url: 'location-url-1' },
      image: 'image-url-1',
      episode: ['episode 1', 'episode 2'],
    };

    charactersServiceSpy.loading$ = of(true);
    charactersServiceSpy.getCharacterById.and.returnValue(of(character));
    fixture.detectChanges();

    fixture.detectChanges();
    const characterContainer = fixture.debugElement.queryAll(By.css('.container'));

    const cardTitle = fixture.debugElement.query(By.css('mat-card-title'));
    expect(cardTitle.nativeElement.textContent).toContain(character.name);

    const cardSubtitleSpecies = fixture.debugElement.query(By.css('mat-card-subtitle:nth-of-type(1)'));
    expect(cardSubtitleSpecies.nativeElement.textContent).toContain(`Species: ${character.species}`);
  }));
});
