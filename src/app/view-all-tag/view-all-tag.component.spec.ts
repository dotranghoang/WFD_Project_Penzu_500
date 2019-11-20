import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTagComponent } from './view-all-tag.component';

describe('ViewAllTagComponent', () => {
  let component: ViewAllTagComponent;
  let fixture: ComponentFixture<ViewAllTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
