import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coffee } from './coffee';

describe('Coffee', () => {
  let component: Coffee;
  let fixture: ComponentFixture<Coffee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coffee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coffee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
