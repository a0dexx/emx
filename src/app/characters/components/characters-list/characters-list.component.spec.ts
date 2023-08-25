import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { By } from '@angular/platform-browser';
import { CharactersListComponent } from './characters-list.component';
import { CharactersService } from '../../services/characters.service';
import { of } from 'rxjs';
import { Character, PaginationInfo } from '../../interfaces/character.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DebugElement } from '@angular/core';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;
  let charactersServiceSpy: jasmine.SpyObj<CharactersService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('CharactersService', ['getCharacters', 'getInfo']);

    TestBed.configureTestingModule({
      declarations: [CharactersListComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
        RouterModule,
      ],
      providers: [MatTableDataSource, { provide: CharactersService, useValue: spy }],
    }).compileComponents();

    charactersServiceSpy = TestBed.inject(CharactersService) as jasmine.SpyObj<CharactersService>;
    charactersServiceSpy.getCharacters.and.returnValue(of([]));
    charactersServiceSpy.getInfo.and.returnValue(of({ count: 0 } as PaginationInfo));

    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table with correct columns', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();

    const tableHeaders = table.queryAll(By.css('mat-header-cell'));
    const expectedHeaders = ['ID', 'Name', 'Species', 'Status'];

    tableHeaders.forEach((header, index) => {
      expect(header.nativeElement.textContent.trim()).toBe(expectedHeaders[index]);
    });
  });

  it('should display paginator', fakeAsync(() => {
    charactersServiceSpy.getInfo.and.returnValue(of({ count: 50 } as PaginationInfo));
    fixture.detectChanges();

    tick(2000);
    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    expect(paginator).toBeTruthy();
  }));
});
