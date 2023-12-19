import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private dashboardService: DashboardService
    ) {}
    @Get()
    index() {
        return this.dashboardService.index();
    }
}
