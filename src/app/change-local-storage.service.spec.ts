import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './change-local-storage.service';

describe('ChangeLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});
