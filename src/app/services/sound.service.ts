import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Sound{
  artist: String[]
  title: String
  album: String
  release_date: Date
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private http: HttpClient) { }

  async fetchAllSounds(): Promise<Sound[]> {
    return this.http.get<Sound[]>("assets/db.json")
            .toPromise()
  }

}
