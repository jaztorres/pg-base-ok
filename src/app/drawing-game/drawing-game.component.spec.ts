import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingGameComponent } from './drawing-game.component';

describe('DrawingGameComponent', () => {
  let component: DrawingGameComponent;
  let fixture: ComponentFixture<DrawingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
