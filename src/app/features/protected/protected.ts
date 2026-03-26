import { Component, inject } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';


@Component({
  selector: 'app-protected',
  imports: [],
  templateUrl: './protected.html',
  styleUrl: './protected.scss',
})
export class Protected {
/* recuperamos el store */
  authStore = inject(AuthStore);

}
