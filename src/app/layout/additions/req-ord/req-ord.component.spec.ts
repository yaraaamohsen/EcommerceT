import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqOrdComponent } from './req-ord.component';

describe('ReqOrdComponent', () => {
  let component: ReqOrdComponent;
  let fixture: ComponentFixture<ReqOrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqOrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReqOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
