import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubPlayersComponent } from './club-players.component';

describe('ClubPlayersComponent', () => {
  let component: ClubPlayersComponent;
  let fixture: ComponentFixture<ClubPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
