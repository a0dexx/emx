import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;


  const paramMapMock = new Map<string, string>();
  paramMapMock.set('id', '1'); // Set 'id' value

  const activatedRouteMock = {
    paramMap: of(paramMapMock) as any, // Mock paramMap as an Observable
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [HttpClientTestingModule,MatProgressSpinnerModule],
      providers: [
        // ActivatedRoute,
       // Provide the ActivatedRoute mock
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    });
    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
