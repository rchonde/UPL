import { OnlineExamServiceService } from "../../Services/online-exam-service.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
//import { NgxPrintModule } from "ngx-print";
import { ModalModule } from 'ngx-bootstrap/modal';

import { RouterModule } from "@angular/router";
import { DepartmentRoutes } from "./process.routing";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataEntryComponent } from './data-entry/data-entry.component';

 
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { InwardComponent } from './inward/inward.component';
import { ValidateComponent } from './validate/validate.component';
import { ReverificationComponent } from './reverification/reverification.component';
import { TeritorymasterComponent } from './Teritorymaster/Teritorymaster.component';
import { ApporvalComponent } from './Apporval/Apporval.component';
 
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';




//import { DataviewComponent } from './dataview/dataview.component';

@NgModule({
  declarations: [DataEntryComponent,InwardComponent,ValidateComponent,ApporvalComponent,TeritorymasterComponent,ReverificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
   // NgxPrintModule,
    CheckboxModule,
    TableModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ProcessModule {}
