import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, fromEvent, Observable, Subject, takeUntil } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private http: HttpClient) {}

  loading = false;
  dataSource = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['author', 'title', 'published', 'rating'];
  private unsubscribe$ = new Subject<void>();

  searchBooks(searchTerm: string = 'harry potter') {
    const apiUrl = `http://openlibrary.org/search.json?q=${searchTerm}`;
    this.http
      .get(apiUrl)
      .pipe(
        map((data: any) => {
          return data['docs'].map((doc: any) => {
            let book: Book = {
              title: doc.title,
              authorName: doc['author_name'] ? doc['author_name'][0] : 'Unknown Author',
              publishedDate: doc['first_publish_year'],
              rating: doc['ratings_average'] ? doc['ratings_average'].toFixed(2) : 'No Rating',
            };
            return book;
          });
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((data) => {
        this.dataSource.data = data as Book[];
        console.log( 'what is data', data)
        this.loading = false;
      });
  }

  ngAfterViewInit() {

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.searchBooks(this.searchInput.nativeElement.value);
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export interface Book {
  title: string;
  authorName: string[];
  publishedDate?: string;
  rating?: number;
}
