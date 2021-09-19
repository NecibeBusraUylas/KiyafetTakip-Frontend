import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotheAddComponent } from './clothe-add.component';

describe('ClotheAddComponent', () => {
  let component: ClotheAddComponent;
  let fixture: ComponentFixture<ClotheAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClotheAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotheAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
