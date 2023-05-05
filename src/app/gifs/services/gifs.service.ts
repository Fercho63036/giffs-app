import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
/*
  providedIn: 'root' => Hacen que este servicio esté totalmente disponible a lo largo de toda la aplicación y todos los módulos que inyecten este servicio.
*/

export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'Gy1GEO3Dz6NBqwdJLj0AwCAWreRXneQx';
  private serviceUrl:   string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ){ }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }

  // Buscar los valores del tag que la persona esta indicando
  searchTag( tag: string ):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('apikey', this.apiKey )
      .set('limit', 10 )
      .set('q', tag )

    this.http.get(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        console.log(resp);

      });

  }
}
