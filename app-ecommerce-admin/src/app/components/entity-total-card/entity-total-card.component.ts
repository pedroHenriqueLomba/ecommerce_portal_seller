import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TotalCard } from './entity-total-card.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-total-card',
  standalone: true,
  imports: [],
  templateUrl: './entity-total-card.component.html',
  styleUrl: './entity-total-card.component.css',
})
export class EntityTotalCardComponent {
  constructor(private router: Router) {}

  @Input() data: TotalCard = {
    title: '',
    total: 0,
    icon: '',
  };

  changeView(path: string) {
    this.router.navigate([path]);
  }

}
