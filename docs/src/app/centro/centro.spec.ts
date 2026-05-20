import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Centro } from './centro';

describe('Centro', () => {
  let component: Centro;
  let fixture: ComponentFixture<Centro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Centro],
    }).compileComponents();

    fixture = TestBed.createComponent(Centro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
