import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bundle } from '../shared/models/bundle.model';

@Injectable()
export class BundleService {

  constructor(private http: HttpClient) { }

  getBundles(): Observable<Bundle[]> {
    return this.http.get<Bundle[]>('/api/bundles');
  }

  countBundles(): Observable<number> {
    return this.http.get<number>('/api/bundles/count');
  }

  addBundle(bundle: Bundle): Observable<Bundle> {
    return this.http.post<Bundle>('/api/bundle', bundle);
  }

  getBundle(bundle: Bundle): Observable<Bundle> {
    return this.http.get<Bundle>(`/api/bundle/${bundle._id}`);
  }

  editBundle(bundle: Bundle): Observable<any> {
    return this.http.put(`/api/bundle/${bundle._id}`, bundle, { responseType: 'text' });
  }

  deleteBundle(bundle: Bundle): Observable<any> {
    return this.http.delete(`/api/bundle/${bundle._id}`, { responseType: 'text' });
  }

  deactivateBundle(bundle: Bundle): Observable<any> {
    return this.http.put(`/api/bundle/deactivate/${bundle._id}`, bundle, { responseType: 'text' });
  }

}
