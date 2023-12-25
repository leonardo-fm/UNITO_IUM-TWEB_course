import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryLeaguesComponent } from './country-leagues.component';

describe('CountryLeaguesComponent', () => {
  let component: CountryLeaguesComponent;
  let fixture: ComponentFixture<CountryLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryLeaguesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
