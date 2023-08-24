import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { Character, CharacterResponse, PaginationInfo } from '../interfaces/character.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  private charactersSubject = new BehaviorSubject<Character[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  readonly BASE_URL = 'https://rickandmortyapi.com/api/character';

  getAllCharacterInfo(page = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.BASE_URL}/?page=${page}`);
    //   .pipe(finalize(() => this.loadingSubject.next(false)));
  }

  getAllCharacters(): Observable<Character[]> {
    return this.getAllCharacterInfo().pipe(map((response) => response.results));

    // tap((res) => console.log('what is res', res)),
    // map((res: Info<any>) => res.results),
    // map((char) => {
    //   console.log('what the cha', char);
    //   return char.map((item: any) => ({
    //     ...item,
    //     origin: item.origin!.name,
    //     location: item.location!.name,
    //   }));
    // }),
  }

  getInfo(): Observable<PaginationInfo> {
    return this.getAllCharacterInfo().pipe(map((res: CharacterResponse) => res.info));
  }

  loadCharacters(page: number) {
    this.loadingSubject.next(true);

    this.getAllCharacterInfo(page)
      .pipe(
        delay(300),
        map((res) => res.results),

        tap(() => this.loadingSubject.next(false)),
      )
      .subscribe((characters) => this.charactersSubject.next(characters));
  }

  getCharacters(page = 1): Observable<Character[]> {
    this.loadCharacters(page);
    return this.charactersSubject.asObservable();
  }

  getCharacterById(id: number): Observable<Character> {
    this.loadingSubject.next(true);
    return this.http.get<Character>(`${this.BASE_URL}/${id}`).pipe(
      delay(300),
      finalize(() => this.loadingSubject.next(false)),
    );
  }
}
