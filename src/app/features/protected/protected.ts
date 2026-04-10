import { Component, inject } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-protected',
  imports: [],
  templateUrl: './protected.html',
  styleUrl: './protected.scss',
})
export class Protected {
/* recuperamos el store */
  authStore = inject(AuthStore);
  http = inject(HttpClient);

  constructor() {
    /* Hacemos la llamada al nuevo endpoint */
    this.http.get('http://127.0.0.1:8000/holi').subscribe((data: any) => {
      console.log('datos recibidos desde back', data);
    });
  }
}
