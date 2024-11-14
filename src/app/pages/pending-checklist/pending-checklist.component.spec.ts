import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingChecklistComponent } from './pending-checklist.component';

describe('PendingChecklistComponent', () => {
  let component: PendingChecklistComponent;
  let fixture: ComponentFixture<PendingChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingChecklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
