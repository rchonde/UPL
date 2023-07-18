import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { OnlineExamServiceService } from 'src/app/Services/online-exam-service.service';
import { Globalconstants } from 'src/app/Helper/globalconstants';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { CommonService } from "src/app/Services/common.service";

var misc: any = {
  sidebar_mini_active: false
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
// export const ROUTES: RouteInfo[] = [
//   {
//     path: "/dashboards",
//     title: "Dashboards",
//     type: "sub",
//     icontype: "ni-shop text-primary",
//     isCollapsed: true,
//     children: [
//       { path: "dashboard", title: "Dashboard", type: "link" },
//       { path: "alternative", title: "Alternative", type: "link" }
//     ]
//   },
//   {
//     path: "/usermanagement",
//     title: "User Management",
//     type: "sub",
//     icontype: "fa fa-users text-orange",
//     isCollapsed: true,
//     children: [
//       { path: "users", title: "Users", type: "link" },
//       { path: "roles", title: "Roles", type: "link" },
//       { path: "addrole", title: "Add Role", type: "link" }
//     ]
//   },
//   {
//     path: "/master",
//     title: "Masters",
//     type: "sub",
//     icontype: "fa fa-certificate text-danger",
//     isCollapsed: true,
//     children: [
//       { path: "department", title: "Department", type: "link" },
//       { path: "template", title: "Template", type: "link" },
//       { path: "document-type", title: "Document Type", type: "link" },
//       { path: "document-type-mapping", title: "Document Type Mapping", type: "link" },
//       { path: "branch", title: "Branch", type: "link" },
//       { path: "branch-mapping", title: "Branch Mapping", type: "link" },
//       { path: "view-custom-form", title: "View Custom Form", type: "link" }
//     ]
//   },
//   {
//     path: "/process",
//     title: "Process",
//     type: "sub",
//     icontype: "fa fa-database text-pink",
//     isCollapsed: true,
//     children: [
//       { path: "data-entry", title: "Data Entry", type: "link" },
//       { path: "tagging", title: "Tagging", type: "link" },
//     ]
//   },
//   {
//     path: "/search",
//     title: "Search",
//     type: "sub",
//     icontype: "fa fa-search text-green",
//     isCollapsed: true,
//     children: [
//       { path: "advance-search", title: "Advance Search", type: "link" },
//       { path: "content-search", title: "Content Search", type: "link" },
//       { path: "file-storage", title: "File Storage", type: "link" },
//     ]
//   },
//   {
//     path: "/report",
//     title: "Reports",
//     type: "sub",
//     icontype: "fa fa-book text-default",
//     isCollapsed: true,
//     children: [
//       { path: "meta-data", title: "Meta Data", type: "link" },
//       { path: "status", title: "Status", type: "link" },
//       { path: "logs", title: "Logs", type: "link" },
//     ]
//   },
//   {
//     path: "/upload",
//     title: "Uploads",
//     type: "sub",
//     icontype: "fas fa-file-upload text-danger",
//     isCollapsed: true,
//     children: [
//       { path: "data-upload", title: "Data Upload", type: "link" },
//       { path: "file-upload", title: "File Upload", type: "link" }
//     ]
//   },
//   {
//     path: "/examples",
//     title: "Examples",
//     type: "sub",
//     icontype: "ni-ungroup text-orange",
//     collapse: "examples",
//     isCollapsed: true,
//     children: [
//       { path: "pricing", title: "Pricing", type: "link" },
//       { path: "login", title: "Login", type: "link" },
//       { path: "register", title: "Register", type: "link" },
//       { path: "lock", title: "Lock", type: "link" },
//       { path: "timeline", title: "Timeline", type: "link" },
//       { path: "profile", title: "Profile", type: "link" }
//     ]
//   },
//   {
//     path: "/components",
//     title: "Components",
//     type: "sub",
//     icontype: "ni-ui-04 text-info",
//     collapse: "components",
//     isCollapsed: true,
//     children: [
//       { path: "buttons", title: "Buttons", type: "link" },
//       { path: "cards", title: "Cards", type: "link" },
//       { path: "grid", title: "Grid", type: "link" },
//       { path: "notifications", title: "Notifications", type: "link" },
//       { path: "icons", title: "Icons", type: "link" },
//       { path: "typography", title: "Typography", type: "link" },
//       {
//         path: "multilevel",
//         isCollapsed: true,
//         title: "Multilevel",
//         type: "sub",
//         collapse: "multilevel",
//         children: [
//           { title: "Third level menu" },
//           { title: "Just another link" },
//           { title: "One last link" }
//         ]
//       }
//     ]
//   },
//   {
//     path: "/forms",
//     title: "Forms",
//     type: "sub",
//     icontype: "ni-single-copy-04 text-pink",
//     collapse: "forms",
//     isCollapsed: true,
//     children: [
//       { path: "elements", title: "Elements", type: "link" },
//       { path: "components", title: "Components", type: "link" },
//       { path: "validation", title: "Validation", type: "link" }
//     ]
//   },
//   {
//     path: "/tables",
//     title: "Tables",
//     type: "sub",
//     icontype: "ni-align-left-2 text-default",
//     collapse: "tables",
//     isCollapsed: true,
//     children: [
//       { path: "tables", title: "Tables", type: "link" },
//       { path: "sortable", title: "Sortable", type: "link" },
//       { path: "ngx-datatable", title: "Ngx Datatable", type: "link" }
//     ]
//   },
//   {
//     path: "/maps",
//     title: "Maps",
//     type: "sub",
//     icontype: "ni-map-big text-primary",
//     collapse: "maps",
//     isCollapsed: true,
//     children: [
//       { path: "google", title: "Google Maps", type: "link" },
//       { path: "vector", title: "Vector Map", type: "link" }
//     ]
//   },
//   {
//     path: "/widgets",
//     title: "Widgets",
//     type: "link",
//     icontype: "ni-archive-2 text-green"
//   },
//   {
//     path: "/charts",
//     title: "Charts",
//     type: "link",
//     icontype: "ni-chart-pie-35 text-info"
//   },
//   {
//     path: "/calendar",
//     title: "Calendar",
//     type: "link",
//     icontype: "ni-calendar-grid-58 text-red"
//   }
// ];

export let ROUTES: RouteInfo[] = []
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  AddRoleForm: UntypedFormGroup;
  
  public routes = []
  _PageList = []
  _RList = []
  get roles() {
    return this.AddRoleForm.get("Roles") as UntypedFormArray;
  }
  constructor(private router: Router, private _auth: AuthenticationService, private formBuilder: UntypedFormBuilder,
    private _onlineExamService: OnlineExamServiceService, private _global: Globalconstants, private _commonService: CommonService) {}

  ngOnInit() {
    this.AddRoleForm = this.formBuilder.group({
      roleName: ["", Validators.required],
      remarks: ["", Validators.required],
      Roles: this.formBuilder.array([]),
    });
    this.getPageList(this._auth.getUserInfo.tid)
    this.minimizeSidebar();
    this.onMouseLeaveSidenav();
    this.getRightList();
    this._onlineExamService.isRoleChanged.subscribe(res => {
      this.AddRoleForm.get("Roles") as UntypedFormArray;
      this.initializeRoutes();
      //console.log("Roles change timestamp: " + res);
    })
  }

  initializeRoutes() {
    this.routes = [];
    this.AddRoleForm.value.Roles.forEach(role => {
      if(role.isChecked || role.subItems.filter(el=> el.isChecked).length > 0) {
        let route = this.getRoute(role.page_name) 
        if(route) {
          role.subItems.forEach(subRoute => {
            if(subRoute.isChecked) {
              let matchedRoute = this.getRoute(subRoute.page_name)
               if(matchedRoute &&  route.children) 
                  route.children.push(matchedRoute);
               
            }
          });
        }
        this.routes.push(route)
      }
    });
   // console.log('Routes',this.routes);
    this.menuItems = this.routes.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }

  getRoute(routeName: string): any {
    let route:any = {}
    switch (routeName) {
      case "Dashboard":{
        route = {
          path: "/dashboards",
          title: "Dashboards",
          type: "sub",
          icontype: "ni-shop text-primary",
          isCollapsed: true,
          children: [
            { path: "dashboard", title: "Dashboard", type: "link" },

          ]
        }
        break;
      }
      // case "Userdashboard":{
      //   route = { path: "Userdashboard", title: "User Dashboard", type: "link" }
      //   break;
      // }
      case "User Management": {
        route = {
          path: "/usermanagement",
          title: "User Management",
          type: "sub",
          icontype: "fa fa-users text-orange",
          isCollapsed: true,
          children: []
        }
        break;
      }
      case "Add User":{
        route = { path: "users", title: "Users", type: "link" }
        break;
      }
      case "Add Role":{
        route = { path: "roles", title: "Roles", type: "link" }
        break;
      }
      case "Change Password":{
        route = { path: "change-password", title: "Change-password", type: "link" }
        break;
      }
      case "Upload":{
        route =   {
          path: "/upload",
          title: "Upload",
          type: "sub",
          icontype: "fas fa-file-upload text-danger",
          isCollapsed: true,
          children: []
        }
      break;
      }
    
      case "File Upload": {
       // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
       route = { path: "file-upload", title: "File Upload", type: "link" }
        break;
      }
   
 
     
     
      case "Process":{
        route = {
          path: "/process",
          title: "Process",
          type: "sub",
          icontype: "fa fa-database text-pink",
          isCollapsed: true,
          children: [
      
            // { path: "Verification", title: "Verification", type: "link" }
            // { path: "Inward", title: "Inward", type: "link" }
          ]
        }
        break;
      }
      case "Verification": {
        // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
        route = { path: "Verification", title: "Verification", type: "link" }
         break;
       }
      
      case "Inward": {
        // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
        route = { path: "Inward", title: "Inward", type: "link" }
         break;
       }
    
       case "Validate": {
        // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
        route = { path: "Validate", title: "Validate", type: "link" }
         break;
       }     

       case "Apporval": {
        // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
        route = { path: "Apporval", title: "Apporval", type: "link" }
         break;
       }  
       case "Reverification": {
        // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
        route = { path: "Reverification", title: "Re Verification", type: "link" }
         break;
       }     

       case "Territorymaster": {
        // route.children.push({ path: "file-upload", title: "File Upload", type: "link" })
        route = { path: "Territorymaster", title: "Territory Master", type: "link" }
         break;
       }     

       
       case "Search":{
        route = {
          path: "/search",
          title: "Search",
          type: "sub",
          icontype: "fa fa-search text-green",
          isCollapsed: true,
          children: [
            // { path: "advance-search", title: "Advanced Search", type: "link" },
            // { path: "content-search", title: "Quick Search", type: "link" },
          ]
        }
        break;
      }
      
      case "Quicksearch":{
        route = { path: "Quicksearch", title: "Quick Search", type: "link" }
        break;
      }
      

      case "Report":{
        route = {
          path: "/report",
          title: "Reports",
          type: "sub",
          icontype: "fa fa-book text-default",
          isCollapsed: true,
          children: []
        }
        break;
      }
      case "Status Report":{
        route = { path: "status", title: "Status", type: "link" }
        break;
      }
      case "Filestatus":{
        route = { path: "Filestatus", title: "File Status", type: "link" }
        break;
      }

      // case "Database Log":{
      //   route = { path: "logs", title: "Logs", type: "link" }
      //   break;
      // }

     
     
      
      default: {route = null}
    }
    return route
  }

  getPageList(TID: number) {
    const apiUrl =
      this._global.baseAPIUrl +
      "Role/GetPageList?ID=" +
      Number(localStorage.getItem('sysRoleID')) +
      "&user_Token=" + localStorage.getItem('User_Token')
      this._onlineExamService.getAllData(apiUrl).subscribe((data: []) => {

        this._PageList = data;
        this._PageList.forEach((item) => {
          if (item.parent_id == 0) {
            item.subItem = [];
            let fg = this.formBuilder.group({
              page_name: [item.page_name],
              isChecked: [item.isChecked],
              subItems: this.formBuilder.array([]),
              id: [item.id],
              parent_id: [item.parent_id],
            });
            this.roles.push(fg);
          }
        });

        this._PageList.forEach((item) => {
          if (item.parent_id && item.parent_id != 0) {
            let found = this.roles.controls.find(
              (ctrl) => ctrl.get("id").value == item.parent_id
            );
            if (found) {
              let fg = this.formBuilder.group({
                page_name: [item.page_name],
                isChecked: [item.isChecked],
                subItems: [[]],
                id: [item.id],
                parent_id: [item.parent_id],
              });
              let subItems = found.get("subItems") as UntypedFormArray;
              subItems.push(fg);
            }
          }
        });
        this.initializeRoutes()
      });
  }

  getRightList() {
    const apiUrl =
      this._global.baseAPIUrl +
      "Role/GetRightList?ID=" +
      Number(localStorage.getItem('sysRoleID')) +
      "&user_Token=" + localStorage.getItem('User_Token')
      this._onlineExamService.getAllData(apiUrl).subscribe((data: []) => {
        this._RList = data;        
        localStorage.setItem('Download',"0") ;  
        localStorage.setItem('Delete',"0") ;  
        localStorage.setItem('Email',"0") ;  
        localStorage.setItem('Link',"0") ;
        localStorage.setItem('Edit',"0") ;  
        this._RList.forEach((item) => {
          if (item.page_right == "Download") {
            //localStorage.getItem('sysRoleID') = 
            localStorage.setItem('Download',item.isChecked) ;          
          }
          if (item.page_right == "Delete") {
            //localStorage.getItem('sysRoleID') = 
            localStorage.setItem('Delete',item.isChecked) ;          
          }
          if (item.page_right == "Link") {
            //localStorage.getItem('sysRoleID') = 
            localStorage.setItem('Link',item.isChecked) ;          
          }
          if (item.page_right == "Email") {
            //localStorage.getItem('sysRoleID') = 
            localStorage.setItem('Email',item.isChecked) ;          
          }
          if (item.page_right == "Edit") {
            //localStorage.getItem('sysRoleID') = 
            localStorage.setItem('Edit',item.isChecked) ;          
          }
        });
        this._commonService.setRightList(this._RList);
      });
  }

  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
   
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {

    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
