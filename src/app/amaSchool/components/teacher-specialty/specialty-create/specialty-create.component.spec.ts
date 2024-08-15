import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyCreateComponent } from './specialty-create.component';

describe('SpecialtyCreateComponent', () => {
  let component: SpecialtyCreateComponent;
  let fixture: ComponentFixture<SpecialtyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtyCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialtyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
