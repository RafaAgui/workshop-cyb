import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";

import { AuthStore } from '../../../core/store/auth.store';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
authStore = inject(AuthStore);
}
