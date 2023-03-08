import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreContestVerifierComponent } from './pre-contest-verifier.component';

describe('PreContestVerifierComponent', () => {
  let component: PreContestVerifierComponent;
  let fixture: ComponentFixture<PreContestVerifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreContestVerifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreContestVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
