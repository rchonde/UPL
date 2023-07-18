import { Routes } from "@angular/router";
import { DataEntryComponent } from './data-entry/data-entry.component';
 
 
import { InwardComponent } from './inward/inward.component';
import { ValidateComponent } from './validate/validate.component';
import { ReverificationComponent } from './reverification/reverification.component';
import { ApporvalComponent } from './Apporval/Apporval.component';
import { TeritorymasterComponent } from './Teritorymaster/Teritorymaster.component';



export const DepartmentRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "Verification",
        component: DataEntryComponent
      },
      
      {
        path: "Inward",
        component: InwardComponent
      }
      ,
      {
        path: "Validate",
        component: ValidateComponent
      }
      ,
      {
        path: "Reverification",
        component: ReverificationComponent
      }
      ,
      {
        path: "Apporval",
        component: ApporvalComponent
      },
      {
        path: "Territorymaster",
        component: TeritorymasterComponent
      }
    ]
  }
];
