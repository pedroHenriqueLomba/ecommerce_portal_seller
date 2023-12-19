import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-list.component.html',
  styleUrl: './general-list.component.css',
})
export class GeneralListComponent {}
