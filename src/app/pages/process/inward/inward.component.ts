import { Globalconstants } from "../../../Helper/globalconstants";
import { OnlineExamServiceService } from "../../../Services/online-exam-service.service";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl, UntypedFormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import swal from "sweetalert2";
import { Location } from '@angular/common';
// import { Listboxclass } from '../../../Helper/Listboxclass';
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}
@Component({
  selector: "app-inward",
  templateUrl: "inward.component.html",
  styleUrls : ["inward.component.css"]
})
export class InwardComponent implements OnInit {

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
  TemplateList:any;
  InwardForm: UntypedFormGroup;
  submitted = false;
  TempField:any;
  Reset = false;
  sMsg: string = '';
  _TempID: any =0;
  _FileNo:any="";
  _PageNo:number=1;
  FilePath:any="../DMSInfo/assets/1.pdf";
  _Replacestr:any="C:/Inetpub/vhosts/dms.conceptlab.in/httpdocs/DMSInfo";
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
    private location: Location
  ){}
  ngOnInit(){
  
    document.body.classList.add('data-entry');
    this.InwardForm = this.formBuilder.group({
      FileNo: ['', Validators.required],
      CompanyID: [0, Validators.required],
      SenderName:['', Validators.required],
      Location:['', Validators.required],
      Territorycode:['', Validators.required],
      TerrName:['', Validators.required],
      Region:['', Validators.required],
      Zone:['', Validators.required],
      State:['', Validators.required],
      MobileNo:['', Validators.required],
      EmailID:['', Validators.required],     
      Division: [0, Validators.required],   
      PODNO: ['', Validators.required],   
      CartonNo: ['', Validators.required],   
      FULLFIRMNAME: ['', Validators.required], 
      Courier: ['', Validators.required],      
      prospectNo: ['', Validators.required],
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,     
      
    });    
    this.isReadonly = false;   
  }
  
  get f() { return this.InwardForm.controls; }
  get t() { return this.f.tickets as UntypedFormArray; }


    // getBranchList() {

    // const apiUrl=this._global.baseAPIUrl+'BranchMaster/GetBranchList?user_Token='+ this.InwardForm.get('User_Token').value;
    // this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
    // this._BranchList = data;
    // this.InwardForm.controls['BranchID'].setValue(0);

    // //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    // });

    // }
    
     

    ongetTerritorycode() {

    let  Territorycode = this.InwardForm.controls['Territorycode'].value;
     // let  __TempID = this.InwardForm.controls['TemplateID'].value;  
      const apiUrl=this._global.baseAPIUrl+'Inward/GetTerritorycode?FileNo='+Territorycode+'&user_Token='+ localStorage.getItem('User_Token')+'&CompanyID='+ this.InwardForm.controls['CompanyID'].value;
  
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
              
    //    this.FilePath = data[0].FilePath;
    
        //  this.FilePath = data[0].BranchID;
        //this.FilePath = data[0].DEPTID;
      //  this.InwardForm.controls['DeptID'].setValue(data[0].DeptID);
        this.InwardForm.controls['TerrName'].setValue(data[0].TerrName);
        this.InwardForm.controls['Location'].setValue(data[0].Location);
        this.InwardForm.controls['Region'].setValue(data[0].Region);
        this.InwardForm.controls['Zone'].setValue(data[0].Zone);
        this.InwardForm.controls['State'].setValue(data[0].State);
        this.InwardForm.controls['Division'].setValue(data[0].Division);
        //console.log("FilePath", data[0].FilePath);

        //this.FilePath = data[0].FilePath;
        this._TotalPages = data[0].PageCount;   
        this._PageNo=1;
  
       
     //   console.log("BranchID", data[0].BranchID);
       // console.log("DEPTID", data[0].DeptID);

      });
  
      }

    GetNextFile()
    {
      //FileNo: localStorage.getItem('FileNo'),
    //  TemplateID:localStorage.getItem('TemplateID')  
    let  __FileNo = localStorage.getItem('FileNo');
    let  __TempID = this.InwardForm.controls['TemplateID'].value;

    const apiUrl=this._global.baseAPIUrl+'DataEntry/GetNextFile?id='+__TempID+'&FileNo='+__FileNo+'&user_Token='+ localStorage.getItem('User_Token');

    //const apiUrl=this._global.baseAPIUrl+'DataEntry/GetNextFile?id'+  + '' FileNo='+ __FileNo + '&user_Token=123123'
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
    //this._TagDetailsList = data;
    //  console.log("Next Record",data);
    // this._ColNameList = data;
    this.TempField = data[0].DisplayName;
   
   

    // }

    });
    //this.FileTaggingForm.controls['DocID'].setValue(0);
    }
    

    OnReset()
    {
    // this.Reset = true;
    // this.InwardForm.reset();   
    this.InwardForm.controls['FileNo'].setValue('');
    //this.InwardForm.controls['MobileNo'].setValue('');
   // this.InwardForm.controls['EmailID'].setValue('');
    this.InwardForm.controls['FULLFIRMNAME'].setValue('');
     
  }
  
  OnResetPOD()
  {
  this.Reset = true;
  this.InwardForm.reset();   
   
}

  validateFields() {
    let isValidDateFormat = true;
    let textFieldRequiredValidation = true;
    let NumericFieldValidation = true;
    let textFieldLetterValidation = true;

    this._ColNameList.forEach((el, index) => {
      if(el.FieldType === '3') { // Date Format check
        if(!this.checkDateFormat(this.InwardForm.get('_ColNameList').value[el.DisplayName])) {
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
        if(this.InwardForm.get('_ColNameList').value[el.DisplayName] === '') {
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
        if(!(/^[a-z][a-z\s]*$/.test(this.InwardForm.get('_ColNameList').value[el.DisplayName]))) {
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
          if(isNaN(this.InwardForm.get('_ColNameList').value[el.DisplayName])) {
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
    
    if(!this.validation()) {
      return;
    }

   // console.log('Form', this.InwardForm);
    // var submit_data = this.InwardForm.value
    // submit_data.FieldValues = []
    // var obj = {}

    // Object.keys(this.InwardForm.get('_ColNameList').value).forEach(key => {      
    // obj[key] = this.InwardForm.get('_ColNameList').value[key]

    // })

    // Object.keys(this.InwardForm.get('_ColNameList').value).forEach(key => {  
    //   if(this.InwardForm.get('_ColNameList').value[key] instanceof Date) {
    //     const dateObj = this.InwardForm.get('_ColNameList').value[key];
    //     const dd = dateObj.getDate() > 9 ? '' + dateObj.getDate() : '0' + dateObj.getDate();
    //     const mm = dateObj.getMonth() + 1 > 9 ? '' + parseInt(dateObj.getMonth() + 1) : '0' + parseInt(dateObj.getMonth() + 1);
    //     const yyyy = dateObj.getFullYear();
    //     obj[key] = dd + '-' + mm + '-' + yyyy;
    //     this.InwardForm.get('_ColNameList').value[key] = dd + '-' + mm + '-' + yyyy;
    //   } else {   
    //     obj[key] = this.InwardForm.get('_ColNameList').value[key]
    //   }
    // })



    // submit_data.FieldValues.push(obj)
    // //console.log('Form Value', submit_data);
    // this.InwardForm.patchValue({
    // currentPage: this._PageNo ,
    
    // PageCount:this._TotalPages,
    // User_Token: localStorage.getItem('User_Token') ,
    // CreatedBy: localStorage.getItem('UserID') ,
    // di:submit_data,   
    // FVals:submit_data.FieldValues,         
    // });

    // submit_data._ColNameList.forEach(obj_elm => {
    //   submit_data.FieldValues.push(obj_elm)
    // });
    //console.log('Form Value', submit_data);

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
    this.GetIndexListPending(0);   
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

        if (this.InwardForm.get('SenderName').value =="" )
        {
                 this.showmessage("Please Enter SenderName");
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

        if (this.InwardForm.get('FULLFIRMNAME').value =="" )
        {
                 this.showmessage("Please Enter FULL FIRM NAME");
                  return false;
        }
        if (this.InwardForm.get('CartonNo').value =="" )
        {
                 this.showmessage("Please Enter CartonNo");
                  return false;
        }
        if (this.InwardForm.get('PODNO').value =="" )
        {
                 this.showmessage("Please Enter PODNO");
                  return false;
        }
        if (this.InwardForm.get('FileNo').value =="" )
        {
                 this.showmessage("Please Enter File No");
                  return false;
        }   
        if (this.InwardForm.get('prospectNo').value =="" )
        {
                 this.showmessage("Please Enter prospect No");
                  return false;
        }   
        
        
        return true;
      } 
 
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
   // console.log($event.target.value);

    let val = $event.target.value;
    this._FilteredList = this._IndexPendingList.filter(function (d) {
   //   console.log(d);
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

  backToPrevious() {
    this.location.back();
  }

  GetIndexListPending(CompanyID:number) {     
     

    const apiUrl = this._global.baseAPIUrl + 'Inward/GetPODDetails?podno='+this.InwardForm.controls['PODNO'].value+ '&user_Token='+ localStorage.getItem('User_Token');
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
    this._IndexPendingList = data;
    this._FilteredList = data
 //  console.log("IndexListPending",data);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }


  onPackPOD() {
    this.submitted = true;
    
    if(!this.validation()) {
      return;
    }
         
    const apiUrl = this._global.baseAPIUrl + 'Inward/PackPOD';
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
    this.OnResetPOD();   
    //this.GetIndexListPending(0);   
    });
    // }

    }
}
