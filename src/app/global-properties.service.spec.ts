import { TestBed } from '@angular/core/testing';

import { GlobalPropertiesService } from './global-properties.service';

describe('GlobalPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalPropertiesService = TestBed.get(GlobalPropertiesService);
    expect(service).toBeTruthy();
  });
});
