import {AgGridModule} from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAppComponent } from './ag-grid-app/ag-grid-app.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCellRendererComponent } from './shared/components/image-cell-renderer/imageCellRenderer.component';
import { ToolBarComponent } from './shared/components/toolbar/toolbar.component';
import { SelectHeaderComponent } from './shared/components/select-header/selectHeader.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent,
    AgGridAppComponent,
    ImageCellRendererComponent,
    ToolBarComponent,
    SelectHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents(
      [ToolBarComponent, SelectHeaderComponent]
    )
  ],
  entryComponents: [ImageCellRendererComponent, ToolBarComponent, SelectHeaderComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
