import { Routes } from "@angular/router";
// import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
// import { FileStorageComponent } from './file-storage/file-storage.component';
// import { ContentSearchComponent } from './Content-Search/Content-Search.component';
// import { BulkDownlaodComponent } from './BulkDownlaod/BulkDownlaod.component';
// import { SearchComponent } from './Search/Search.component';
// import { DeleteFilesComponent } from './DeleteFiles/DeleteFiles.component';


import { QuicksearchComponent } from './Quicksearch/Quicksearch.component';

//DataUploadComponent
 
export const searchRoutes: Routes = [
  {
    path: "",
    children: [      
      {
        path: "Quicksearch",
       component: QuicksearchComponent
      }      
            
    ]
  }
];
