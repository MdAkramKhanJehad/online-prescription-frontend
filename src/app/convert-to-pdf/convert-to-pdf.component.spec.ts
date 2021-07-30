import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToPdfComponent } from './convert-to-pdf.component';

describe('ConvertToPdfComponent', () => {
  let component: ConvertToPdfComponent;
  let fixture: ComponentFixture<ConvertToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertToPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
