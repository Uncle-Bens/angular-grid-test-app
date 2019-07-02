import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Item } from '../../../models/items.model';
import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should return array of Items', () => {
    const service: DataService = TestBed.get(DataService);
    service.getRowData().subscribe(value => {
      expect(value).toBe(Array<Item>());
    });
  });
});
