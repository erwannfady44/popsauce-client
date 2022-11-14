import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDataComponent } from './server-data.component';

describe('ServerDataComponent', () => {
  let component: ServerDataComponent;
  let fixture: ComponentFixture<ServerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
