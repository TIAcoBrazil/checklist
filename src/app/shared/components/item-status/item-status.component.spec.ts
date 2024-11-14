import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatusComponent } from './item-status.component';

describe('ItemStatusComponent', () => {
  let component: ItemStatusComponent;
  let fixture: ComponentFixture<ItemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
