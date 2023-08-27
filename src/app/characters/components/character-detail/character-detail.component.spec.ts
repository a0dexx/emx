import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { CharacterDetailComponent } from './character-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardModule } from '@angular/material/card';
import { MatCardHarness, MatCardSection } from '@angular/material/card/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatListHarness, MatListItemHarness } from '@angular/material/list/testing';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let charactersServiceSpy: jasmine.SpyObj<CharactersService>;
  let loader: HarnessLoader;

  const paramMapMock = new Map<string, string>();
  paramMapMock.set('id', '1'); // Set 'id' value

  const mockCharacter: Character = {
    id: 1,
    name: 'Character 1',
    url: 'url 1',
    created: '2017-11-04T20:51:31.373Z',
    status: 'Dead',
    species: 'Species 1',
    type: 'Type 1',
    gender: 'Female',
    origin: { name: 'Origin 1', url: 'origin-url-1' },
    location: { name: 'Location 1', url: 'location-url-1' },
    image: 'image-url-1',
    episode: ['episode 1', 'episode 2'],
  };

  const activatedRouteMock = {
    paramMap: of(paramMapMock) as any, // Mock paramMap as an Observable
  };

  beforeEach(async () => {
    charactersServiceSpy = jasmine.createSpyObj('CharactersService', ['getCharacterById']);

    await TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CharactersService, useValue: charactersServiceSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
    // rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner while loading', async () => {
    component.loading$ = of(true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.spinner-container');
    expect(spinner).toBeTruthy();
  });

  it('should display character details when loaded', fakeAsync(async () => {
    charactersServiceSpy.loading$ = of(true);
    component.character$ = of(mockCharacter);

    charactersServiceSpy.getCharacterById.and.returnValue(of(mockCharacter));
    fixture.detectChanges();

    const cardHarness = await loader.getHarness(MatCardHarness);
    expect(cardHarness).toBeTruthy();

    const cardTitleText = await cardHarness.getTitleText();
    expect(cardTitleText).toBe(mockCharacter.name);

    const cardContentText = await cardHarness.getText();
    expect(cardContentText).toContain('Species:');
    expect(cardContentText).toContain('Gender:');
    expect(cardContentText).toContain('Origin:');
    expect(cardContentText).toContain('Location:');
    expect(cardContentText).toContain('Status:');
    expect(cardContentText).toContain('Created:');

    const listHarness = await cardHarness.getHarness(MatListHarness);
    expect(listHarness).toBeTruthy();

    const listItems = await listHarness.getItems();
    expect(listItems.length).toBe(6);

    for (const property in mockCharacter) {
      if (mockCharacter.hasOwnProperty(property)) {
        const propertyName = property as keyof Character;
        const listItemText = `${propertyName}: ${mockCharacter[propertyName]}`;
        // @ts-ignore
        const listItemHarness = await cardHarness.getHarness(MatListItemHarness.with(listItemText));
        expect(listItemHarness).toBeTruthy();
      }
    }
  }));
});
