import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListComponent } from './characters-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  let dattaSource: jasmine.SpyObj<MatTableDataSource<any>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersListComponent],
      imports: [HttpClientTestingModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule],
      providers: [MatTableDataSource],
    });
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
