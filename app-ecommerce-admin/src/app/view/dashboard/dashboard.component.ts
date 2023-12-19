import { DashboardService } from './dashboard.service';
import { EntityTotalCardComponent } from './../../components/entity-total-card/entity-total-card.component';
import { Component, OnInit } from '@angular/core';
import Dashboard from './dashboard.entity';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EntityTotalCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private service: DashboardService) {}

  public dashboard: Dashboard = {
    totalProducts: 0,
    totalOrders: 0,
    totalCostumers: 0,
  }

  ngOnInit(): void {
    this.service.getDashboardData().subscribe((data) => {
      this.dashboard = data;
    });
  }
}
