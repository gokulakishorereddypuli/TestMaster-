import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerfiticationComponentComponent } from './cerfitication-component.component';

describe('CerfiticationComponentComponent', () => {
  let component: CerfiticationComponentComponent;
  let fixture: ComponentFixture<CerfiticationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerfiticationComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerfiticationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
