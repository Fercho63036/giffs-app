import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})

/*
  providedIn: 'root' => Hacen que este servicio esté totalmente disponible a lo largo de toda la aplicación y todos los módulos que inyecten este servicio.
*/

export class GifsService {
  private _tagsHistory: string[] = [];

  constructor(){}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag( tag: string ){
    this._tagsHistory.unshift( tag );

    console.log(this.tagsHistory);
  }
}
