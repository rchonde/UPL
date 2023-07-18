import { Routes } from "@angular/router";
import { StatusComponent } from "./status/status.component";
import { LogsComponent } from "./logs/logs.component";
 
import { TagReportComponent } from "./TagReport/TagReport.component";
import { FilestatusComponent } from "./Filestatus/Filestatus.component";
 
export const reportRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "status",
        component: StatusComponent
      },    
      {
        path: "logs",
        component: LogsComponent
      },
      {
        path: "Filestatus",
        component: FilestatusComponent
      },   
      {
        path: "DocumentStatus",
        component: TagReportComponent
      },    
      
    ]

  }
];
