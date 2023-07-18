import { Globalconstants } from "../../../Helper/globalconstants";
import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl, UntypedFormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import swal from "sweetalert2";
// import { Listboxclass } from '../../../Helper/Listboxclass';
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-Teritorymaster",
  templateUrl: "Teritorymaster.component.html",
  styleUrls : ["Teritorymaster.component.css"]
})
export class TeritorymasterComponent implements OnInit {

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  SelectionType = SelectionType;
  modalRef: BsModalRef;
  isReadonly = true;
  _TemplateList :any;
  _DepartmentList : any;
  _BranchList:any;
  _HeaderList:any;
  _ColNameList:any;
  _IndexList:any;
  TempField:any;
  TemplateList:any;
  ValidateForm: UntypedFormGroup;
  InwardForm: UntypedFormGroup;  
  FileUplodForm: UntypedFormGroup;
  submitted = false;
  _DeptList:any;
  Reset = false;
  sMsg: string = '';
  
  _FileNo:any="";
 
 
  _PageNo:number=1;
  FilePath:any="../assets/1.pdf";
   
// _Replacestr:any="D:/WW/14-Jully-2020/UI/src/assets";
  
  _TotalPages:any=0;
  _FileList:any;
  _FilteredList :any; 
  _IndexPendingList:any;
  bsValue = new Date();
  constructor(
    private modalService: BsModalService,
    public toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    private _onlineExamService: OnlineExamServiceService,
    private _global: Globalconstants,
  ){}
  ngOnInit(){
    document.body.classList.add('data-entry');
    this.ValidateForm = this.formBuilder.group({
      
      Division: [0, Validators.required],      
      CompanyID: [0, Validators.required], 
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,
      PageCount:0,
         
    });

 

    this.InwardForm = this.formBuilder.group({
     
      CompanyID: ["0", Validators.required],
      
      Location:['', Validators.required],
      Territorycode:['', Validators.required],
      TerrName:['', Validators.required],
      Region:['', Validators.required],
      Zone:['', Validators.required],
      State:['', Validators.required],
      MobileNo:['', Validators.required],
      EmailID:['', Validators.required],     
      Division: [0, Validators.required],  
      

      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') , 
      
    });
    
    this._PageNo=1;
    //console.log("IndexListPending");
    this.GetTerritorydata(0);
     
    this.ValidateForm.controls['CompanyID'].setValue("0");
    this.isReadonly = false;   
  }

   
  get f() { return this.ValidateForm.controls; }
  get t() { return this.f.tickets as UntypedFormArray; }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}

   

GetTerritorydata(CompanyID:number) {     


const apiUrl = this._global.baseAPIUrl + 'Inward/GetTerritorydata?CompanyID='+CompanyID+ '&user_Token='+ localStorage.getItem('User_Token');
this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
this._IndexPendingList = data;
this._FilteredList = data
//  console.log("IndexListPending",data);
//this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
});
}
    
   

 
 

OnReset()
{
this.Reset = true;
this.ValidateForm.reset();

this.isReadonly = false;
 
}

 
validateFields() {
let isValidDateFormat = true;
let textFieldRequiredValidation = true;
let NumericFieldValidation = true;
let textFieldLetterValidation = true;

this._ColNameList.forEach((el, index) => {
  if(el.FieldType === '3') { // Date Format check
    if(!this.checkDateFormat(this.ValidateForm.get('_ColNameList').value[el.DisplayName])) {
      isValidDateFormat = false;
      this.toastr.show(
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : Please select date in dd-mm-yyyy format</span></div>',
        "",
        {
          timeOut: 5000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify"
        }
      );
    }
  }
  if(el.FieldType === '1' && el.IsMandatory === '1') { // Text field required validation check
    if(this.ValidateForm.get('_ColNameList').value[el.DisplayName] === '') {
      textFieldRequiredValidation = false;
      this.toastr.show(
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : This field is required</span></div>',
        "",
        {
          timeOut: 5000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass: "ngx-toastr alert alert-dismissible alert-danger alert-notify"
        }
      );
    }
  }

  if(el.FieldType === '1') { // Text field letter validation check
    if(!(/^[a-z][a-z\s]*$/.test(this.ValidateForm.get('_ColNameList').value[el.DisplayName]))) {
      textFieldLetterValidation = false;
      this.toastr.show(
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : Only letters are allowed</span></div>',
        "",
        {
          timeOut: 5000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-danger alert-notify"
        }
      );
    }
  }

  if(el.FieldType === '2') { // Numeric field validation check
      if(isNaN(this.ValidateForm.get('_ColNameList').value[el.DisplayName])) {
        NumericFieldValidation = false;
        this.toastr.show(
          '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Error!</span> <span data-notify="message"><b>' + el.DisplayName + '</b> : Please enter numbers only </span></div>',
          "",
          {
            timeOut: 5000,
            closeButton: true,
            enableHtml: true,
            tapToDismiss: false,
            titleClass: "alert-title",
            positionClass: "toast-top-center",
            toastClass:
              "ngx-toastr alert alert-dismissible alert-danger alert-notify"
          }
        );
      }
  }
});
if(isValidDateFormat && textFieldRequiredValidation && NumericFieldValidation && textFieldLetterValidation) {
  return true;
} else {
  return false;
}
}

checkDateFormat(date) {
if(date == 'Invalid Date') {
  return false;
}
return true;
}

onSubmit() {
this.submitted = true;

// if(!this.validateFields()) {
//   return;
// }

// if (this.DataUploadForm.invalid) {

//   alert("Please Fill the Fields");
//   return;
// }\

//  // console.log('Form', this.DataEntryForm);
//   var submit_data = this.DataEntryForm.value
//   submit_data.FieldValues = []
//   var obj = {}
//   Object.keys(this.DataEntryForm.get('_ColNameList').value).forEach(key => {  
//     if(this.DataEntryForm.get('_ColNameList').value[key] instanceof Date) {
//       const dateObj = this.DataEntryForm.get('_ColNameList').value[key];
//       const dd = dateObj.getDate() > 9 ? '' + dateObj.getDate() : '0' + dateObj.getDate();
//       const mm = dateObj.getMonth() + 1 > 9 ? '' + parseInt(dateObj.getMonth() + 1) : '0' + parseInt(dateObj.getMonth() + 1);
//       const yyyy = dateObj.getFullYear();
//       obj[key] = dd + '-' + mm + '-' + yyyy;
//       this.DataEntryForm.get('_ColNameList').value[key] = dd + '-' + mm + '-' + yyyy;
//     } else {   
//       obj[key] = this.DataEntryForm.get('_ColNameList').value[key]
//     }
//   })
//   submit_data.FieldValues.push(obj)
// //  console.log('Form Value', submit_data);
//   this.DataEntryForm.patchValue({
//   currentPage: this._PageNo ,

//   PageCount:this._TotalPages,
//   User_Token: localStorage.getItem('User_Token') ,
//   CreatedBy: localStorage.getItem('UserID') ,
//   di:submit_data,   
//   FVals:submit_data.FieldValues,         
//   });

//   // submit_data._ColNameList.forEach(obj_elm => {
//   //   submit_data.FieldValues.push(obj_elm)
//   // });
//   //console.log('Form Value', submit_data);

this.ValidateForm.patchValue({
Accept: 'Hold',

});

const that = this;
const apiUrl = this._global.baseAPIUrl + 'DataEntry/TerritoryEntry';
this._onlineExamService.postData(this.InwardForm.value,apiUrl)
// .pipe(first())
.subscribe( data => {
    
this.toastr.show(
  '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message"> '+ data +' </span></div>',
  "",
  {
    timeOut: 3000,
    closeButton: true,
    enableHtml: true,
    tapToDismiss: false,
    titleClass: "alert-title",
    positionClass: "toast-top-center",
    toastClass:
      "ngx-toastr alert alert-dismissible alert-success alert-notify"
  }
);



// this.modalRef
this.modalRef.hide();
that.GetTerritorydata(0);
//this.OnReset();      
});
// }

}

hidepopup()
{
// this.modalService.hide;
this.modalRef.hide();
//this.modalRef.hide
}
  

onFileVerification() {
this.submitted = true;   

 

// if (this.FileValidation)
// {  }

const that = this;
const apiUrl = this._global.baseAPIUrl + 'DataEntry/UpdateFileStatus';
this._onlineExamService.postData(this.FileUplodForm.value,apiUrl)
// .pipe(first())
.subscribe( data => {
  
this.toastr.show(
'<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message"> '+ data +' </span></div>',
"",
{
  timeOut: 3000,
  closeButton: true,
  enableHtml: true,
  tapToDismiss: false,
  titleClass: "alert-title",
  positionClass: "toast-top-center",
  toastClass:
    "ngx-toastr alert alert-dismissible alert-success alert-notify"
}
);



// this.modalRef
this.modalRef.hide();
that.GetTerritorydata(0);
//this.OnReset();      
});
// }

}
 
 

Editinward(template: TemplateRef<any>, row: any) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;\

 //console.log(row);
  
 this.InwardForm.patchValue({
     
    Division:row.Division,
    CompanyID:row.CompanyID,   
    Location:row.Location,
    Territorycode:row.Territorycode,
    TerrName:row.TerrName,
    Region:row.Region,
    Zone:row.Zone,
    State:row.State,
    MobileNo:row.TMMOBILENO,
    EmailID:row.TMEMAILID,   
   

  })
  
this.modalRef = this.modalService.show(template); 
//this.GetVerificationData(row.FileNo);
   
}


Delete(row: any)
{


}

AddInward(template: TemplateRef<any>) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;\

 //console.log(row);
  
 this.InwardForm.patchValue({
     
    Division:0,
    CompanyID:0,   
    Location:"",
    Territorycode:"",
    TerrName:"",
    Region:"",
    Zone:"",
    State:"",
    MobileNo:"",
    EmailID:"",   
   

  })
  
this.modalRef = this.modalService.show(template); 
//this.GetVerificationData(row.FileNo);
   
}


AddIndexing(template: TemplateRef<any>, row: any) {
var that = this;
 
 
// console.log('form', this.AddBranchForm);
//this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
this.modalRef = this.modalService.show(template);

// this.GetFullFile(row.FileNo);
 
}
 
 
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
   // console.log($event.target.value);

    let val = $event.target.value;
    this._FilteredList = this._IndexPendingList.filter(function (d) {
    //  console.log(d);
      for (var key in d) {
        if (key == "BranchName" ||  key == "FileNo" ||  key == "TemplateName") {
          if (d[key].toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

  ngOnDestroy() {
    document.body.classList.remove('data-entry')
  }

  onEditData() {
    this.submitted = true;
    
    // if(!this.validation()) {
    //   return;
    // } 
  

    const apiUrl = this._global.baseAPIUrl + 'Inward/Create';
    this._onlineExamService.postData(this.InwardForm.value,apiUrl)
    // .pipe(first())
    .subscribe( data => {
         
      this.toastr.show(
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message"> '+ data +' </span></div>',
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-top-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-success alert-notify"
        }
      );
    this.OnReset();      
    });
    // }

    }

  showmessage(data:any)
  {
  this.toastr.show(
  '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Validation ! </span> <span data-notify="message"> '+ data +' </span></div>',
  "",
  {
  timeOut: 3000,
  closeButton: true,
  enableHtml: true,
  tapToDismiss: false,
  titleClass: "alert-title",
  positionClass: "toast-top-center",
  toastClass:
  "ngx-toastr alert alert-dismissible alert-danger alert-notify"
  }
  );


  }
  
  validation()
  {
      // if (this.FileUPloadForm.get('BranchID').value <=0 )
      // {
      //          this.showmessage("Please Select Branch");
      //           return false;
      // }

      if (this.InwardForm.get('CompanyID').value <=0 )
      {
                this.showmessage("Please Select CompanyID");
                return false;
      }
      if (this.InwardForm.get('Division').value <=0 )
      {
                this.showmessage("Please Select Division");
                return false;
      }

      
      if (this.InwardForm.get('Location').value =="" )
      {
                this.showmessage("Please Enter Location");
                return false;
      }
      if (this.InwardForm.get('Territorycode').value =="" )
      {
                this.showmessage("Please Enter Territorycode");
                return false;
      }
      if (this.InwardForm.get('TerrName').value =="" )
      {
                this.showmessage("Please Enter TerrName");
                return false;
      }
      if (this.InwardForm.get('EmailID').value =="" )
      {
                this.showmessage("Please Enter EmailID");
                return false;
      }
      return true;

  } 
  
  deleteCode(row: any) {

    console.log(row);

    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary",
      })
      .then((result) => {
        if (result.value) {

          this.InwardForm.patchValue({
            Territorycode: row.Territorycode,
          });
        
          const apiUrl = this._global.baseAPIUrl + 'Inward/Delete';
          this._onlineExamService.postData(this.InwardForm.value,apiUrl)     
          .subscribe( data => {
              swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-primary",
              });
              this.GetTerritorydata(0);
            });
        }
      });
  }

  
  ongetTerritorycode() {

    let  Territorycode = this.InwardForm.controls['Territorycode'].value;
     // let  __TempID = this.InwardForm.controls['TemplateID'].value;  
      const apiUrl=this._global.baseAPIUrl+'Inward/GetTerritorycode?FileNo='+Territorycode+'&user_Token='+ localStorage.getItem('User_Token')+'&CompanyID='+ this.InwardForm.controls['CompanyID'].value;
  
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
              
   
        this.InwardForm.controls['TerrName'].setValue(data[0].TerrName);
        this.InwardForm.controls['Location'].setValue(data[0].Location);
        this.InwardForm.controls['Region'].setValue(data[0].Region);
        this.InwardForm.controls['Zone'].setValue(data[0].Zone);
        this.InwardForm.controls['State'].setValue(data[0].State);
        this.InwardForm.controls['Division'].setValue(data[0].Division);
        //console.log("FilePath", data[0].FilePath);
 

      });
  
      }


}
