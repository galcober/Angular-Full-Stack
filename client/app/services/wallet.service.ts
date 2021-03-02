import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Wallet } from '../shared/models/wallet.model';

@Injectable()
export class WalletService {

  constructor(private http: HttpClient) { }

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('/api/wallets');
  }

  countWallets(): Observable<number> {
    return this.http.get<number>('/api/wallets/count');
  }

  addWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>('/api/wallet', wallet);
  }

  getWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.get<Wallet>('/api/wallet/${wallet._id}');
  }

  getWalletByUserId(id_user: string): Observable<Wallet> {
    return this.http.get<Wallet>(`/api/wallet/user/${id_user}`);
  }

  /*editCat(cat: Cat): Observable<any> {
    return this.http.put(`/api/cat/${cat._id}`, cat, { responseType: 'text' });
  }

  deleteCat(cat: Cat): Observable<any> {
    return this.http.delete(`/api/cat/${cat._id}`, { responseType: 'text' });
  }*/

}
