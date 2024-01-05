import { TheFooterComponent } from './components/the-footer/the-footer.component';
import { TheHeaderComponent } from './components/the-header/the-header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, TheHeaderComponent, TheFooterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
