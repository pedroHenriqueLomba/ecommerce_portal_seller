import { Component } from '@angular/core';
import { AutenticatorService } from '../../helpers/autenticator/autenticator.service';

@Component({
  selector: 'app-the-header',
  templateUrl: './the-header.component.html',
  styleUrl: './the-header.component.css',
})
export class TheHeaderComponent {
  public isAutenticated: Boolean = false;
  public costumerName?: String;

  constructor(private autenticatorService: AutenticatorService) {
    const costumerName = this.autenticatorService.getCostumerName();
    if (costumerName) {
      this.costumerName = costumerName;
      this.isAutenticated = true;
    }
  }
}
