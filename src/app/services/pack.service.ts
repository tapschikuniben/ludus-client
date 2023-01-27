import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pack } from '../models/pack.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class PackService {

    //server host api link
    private baseurl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    getAllPacks() {
        return this.http.get<Pack[]>(this.baseurl + 'packs');
    }

    getPackById(id: any) {
        return this.http.get<Pack>(this.baseurl + 'packs' + '/' + id);
    }

    addPack(pack: Pack) {
        return this.http.post(this.baseurl + 'packs', pack);
    }

    deletePack(id: string) {
        return this.http.delete(this.baseurl + 'packs' + '/' + id);
    }

    updatePack(pack: Pack): Observable<Pack> {
        return this.http.put<Pack>(this.baseurl + 'packs' + '/' + pack._id, pack);
    }

}
