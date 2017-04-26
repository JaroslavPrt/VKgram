import { TestBed, inject } from '@angular/core/testing';

import { PhotoStorageService } from './photo-storage.service';

describe('PhotoStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoStorageService]
    });
  });

  it('should ...', inject([PhotoStorageService], (service: PhotoStorageService) => {
    expect(service).toBeTruthy();
  }));
});
