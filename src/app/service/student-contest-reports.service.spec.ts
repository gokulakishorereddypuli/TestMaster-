import { TestBed } from '@angular/core/testing';

import { StudentContestReportsService } from './student-contest-reports.service';

describe('StudentContestReportsService', () => {
  let service: StudentContestReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentContestReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
