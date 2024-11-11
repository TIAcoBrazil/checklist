import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartChecklistComponent } from './start-checklist.component';

describe('StartChecklistComponent', () => {
  let component: StartChecklistComponent;
  let fixture: ComponentFixture<StartChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartChecklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
