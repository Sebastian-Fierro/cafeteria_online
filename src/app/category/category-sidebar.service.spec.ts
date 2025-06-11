import { TestBed } from '@angular/core/testing';

import { CategorySidebarService } from './category-sidebar.service';

describe('CategorySidebarService', () => {
  let service: CategorySidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorySidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
