import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridApi } from 'ag-grid-community';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ServicefileService } from './service/servicefile.service';
import { InputcheckboxComponent } from './inputcheckbox/inputcheckbox.component';


@NgModule({
  declarations: [
    AppComponent,
    InputcheckboxComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule
  ],
  providers: [ServicefileService,GridApi],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
