import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddBoardComponent } from './modal-add-board.component';

describe('ModalAddBoardComponent', () => {
  let component: ModalAddBoardComponent;
  let fixture: ComponentFixture<ModalAddBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
