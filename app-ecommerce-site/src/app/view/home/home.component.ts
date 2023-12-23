import { ProductLoaderComponent } from '../../components/product-loader/product-loader.component';
import { BannerComponent } from './../../components/banner/banner.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, ProductLoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
