import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubGamesComponent } from './club-games.component';

describe('ClubGamesComponent', () => {
  let component: ClubGamesComponent;
  let fixture: ComponentFixture<ClubGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
