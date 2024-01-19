import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStatisticsComponent } from './club-statistics.component';

describe('ClubStatisticsComponent', () => {
  let component: ClubStatisticsComponent;
  let fixture: ComponentFixture<ClubStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
