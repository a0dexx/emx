import { fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { CharactersService } from './characters.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Character, CharacterResponse } from '../interfaces/character.interface';
import {  of } from 'rxjs';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve character information', () => {
    const dummyResponse: CharacterResponse = {
      info: { count: 1, pages: 1, next: '', prev: '' },
      results: [],
    };

    spyOn(service['http'], 'get').and.returnValue(of(dummyResponse));

    service.getAllCharacterInfo(1).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    expect(service['http'].get).toHaveBeenCalledWith(`${service.BASE_URL}/?page=1`);
  });


  it('should retrieve pagination info', () => {
    const dummyResponse: CharacterResponse = {
      info: { count: 1, pages: 1, next: '', prev: '' },
      results: [],
    };

    spyOn(service['http'], 'get').and.returnValue(of(dummyResponse));

    service.getInfo().subscribe((response) => {
      expect(response).toEqual(dummyResponse.info);
    });

    expect(service['http'].get).toHaveBeenCalledWith(`${service.BASE_URL}/?page=1`);
  });


  it('should retrieve characters', fakeAsync(() => {
    const dummyCharacters: Character[] = [
      {
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
      },
      {
        id: 2,
        name: 'Character 2',
        url: 'url 2',
        created: 'created 2',
        status: 'Alive',
        species: 'Species 2',
        type: 'Type 2',
        gender: 'Female',
        origin: { name: 'Origin 2', url: 'origin-url-2' },
        location: { name: 'Location 1', url: 'location-url-1' },
        image: 'image-url-2',
        episode: ['episode 1', 'episode 2'],

      }
    ];

    const httpGetSpy = spyOn(service['http'], 'get').and.returnValue(of({ info: {}, results: dummyCharacters }));

    let response: Character[] = [];
    service.getCharacters(1).subscribe((data) => {
      response = data;
    });
    tick(500); // Simulate the passage of time
    expect(httpGetSpy).toHaveBeenCalledWith(`${service.BASE_URL}/?page=1`);
    expect(response).toEqual(dummyCharacters);
  }));

  it('should retrieve a character by ID', () => {
    const dummyCharacter: Character = {
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

    spyOn(service['http'], 'get').and.returnValue(of(dummyCharacter));

    service.getCharacterById('1').subscribe((response) => {
      expect(response).toEqual(dummyCharacter);
    });

    expect(service['http'].get).toHaveBeenCalledWith(`${service.BASE_URL}/1`);
  });



});
