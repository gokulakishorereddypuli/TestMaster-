import { TestBed } from '@angular/core/testing';

import { PreContestVerifierService } from './pre-contest-verifier.service';

describe('PreContestVerifierService', () => {
  let service: PreContestVerifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreContestVerifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
