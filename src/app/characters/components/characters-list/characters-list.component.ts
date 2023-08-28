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
  displayedColumns: string[] = ['id', 'name', 'species','status'];

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
    });

    this.loading$ = this.charactersService.loading$;

    console.log('what is this.characters', this.characters)
  }

  getAllCharacters() {
    this.characters$ = this.charactersService.getCharacters();
    this.pageInfo$ = this.charactersService.getInfo();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe((value: any) => {
      this.charactersService.getCharacters(value.pageIndex + 1);
    });
  }
}
