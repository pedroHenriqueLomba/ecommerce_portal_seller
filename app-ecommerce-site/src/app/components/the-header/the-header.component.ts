import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AutenticatorService } from '../../helpers/autenticator/autenticator.service';

@Component({
  selector: 'app-the-header',
  templateUrl: './the-header.component.html',
  styleUrl: './the-header.component.css',
})
export class TheHeaderComponent {
  public costumerName?: String;
  public searchForm!: FormGroup;

  constructor(
    private autenticatorService: AutenticatorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  public isAutenticatedUser(): Boolean {
    const costumerName = this.autenticatorService.getCostumerName();
    if (costumerName) {
      this.costumerName = costumerName;
      return true;
    }
    return false;
  }

  exit() {
    this.autenticatorService.logout();
  }

  searchProduct() {
    const searchedValue = this.searchForm.get('search')?.value;
  }
}
