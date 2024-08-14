import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyUpdateComponent } from './specialty-update.component';

describe('SpecialtyUpdateComponent', () => {
  let component: SpecialtyUpdateComponent;
  let fixture: ComponentFixture<SpecialtyUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtyUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialtyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
