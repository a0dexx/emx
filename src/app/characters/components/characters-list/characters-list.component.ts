import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Character, CharacterResponse, PaginationInfo } from '../../interfaces/character.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CharactersService } from '../../services/characters.service';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit, AfterViewInit {
  constructor(private charactersService: CharactersService) {}

  characters$!: any;
  pageInfo$!: Observable<PaginationInfo>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Character>();
  displayedColumns: string[] = ['id', 'name', 'species'];

  characters: Character[] = [];

  pageInfo!: number;
  loading$!: Observable<boolean>;

  ngOnInit() {

    this.getAllCharacters();
    this.characters$.subscribe((value: any) => {
      this.dataSource.data = value;
    });
    this.pageInfo$.subscribe((value: any) => {
      this.pageInfo = value.count as number;
      console.log('what is value of page info', value)
    });

    this.loading$ = this.charactersService.loading$;
  }

  getAllCharacters() {
    this.characters$ = this.charactersService.getCharacters();
    this.pageInfo$ = this.charactersService.getInfo();
  }

  onPageChange($event: PageEvent) {
    console.log('what is event', $event);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe((value: any) => {
      console.log('what is value of page', value);
      this.charactersService.getCharacters(value.pageIndex + 1);

    });
  }
}
