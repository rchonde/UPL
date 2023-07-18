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
  selector: "app-reverification",
  templateUrl: "reverification.component.html",
  styleUrls : ["reverification.component.css"]
})
export class ReverificationComponent implements OnInit {

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
  first:any=0;
  rows:any=0;
  TemplateList:any;
  ReverificationForm: UntypedFormGroup;
  InwardForm: UntypedFormGroup;  
  submitted = false;
  _DeptList:any;
  Reset = false;
  sMsg: string = '';
  // FS2: string = '';
  // FS1: string = '';
  // FS3: string = '';
  // FS4: string = '';
  // FS5: string = '';
  // FS6: string = '';
  // FS7: string = '';
  // FS8: string = '';
  // FS9: string = '';
  // FS10: string = '';
  // FS11: string = '';
  // FS12: string = '';
  // FS13: string = '';
  // FS14: string = '';
  // FS15: string = '';
  // FS16: string = '';
  // FS17: string = '';
  // FS18: string = '';
  // FS19: string = '';

  _FileNo:any=""; 
  _PageNo:number=1;
  FilePath:any="../assets/1.pdf";
  isDisabled = false;
   
// _Replacestr:any="D:/WW/14-Jully-2020/UI/src/assets";
FULLFIRMNAME:any;
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
    this.ReverificationForm = this.formBuilder.group({
      FileNo: ['', Validators.required],
      Division: [0, Validators.required],      
      CompanyID: [0, Validators.required],
      DocID: [0, Validators.required],
      SACKCODE: ['', Validators.required],
      Viewer:1,
       
      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') ,
      PageCount:0,
        
      Status:[''],
      Remark:[''],
      
      Status1:[''],
      Remark1:[''],
      Status2:[''],
      Remark2:[''],
      Status3:[''],
      Remark3:[''],
      Status4:[''],
      Remark4:[''],

      Status5:[''],
      Remark5:[''],
      Status6:[''],
      Remark6:[''],
      Status7:[''],
      Remark7:[''],
      Status8:[''],
      Remark8:[''],
      Status9:[''],
      Remark9:[''],
      Status10:[''],
      Remark10:[''],
      Status11:[''],
      Remark11:[''],
      Status12:[''],
      Remark12:[''],

      Status13:[''],
      Remark13:[''],
      Status14:[''],
      Remark14:[''],
      Status15:[''],
      Remark15:[''],

      Status16:[''],
      Remark16:[''],
      Status17:[''],
      Remark17:[''],
      Status18:[''],
      Remark18:[''],

      Status19:[''],
      Remark19:[''],
      Accept:[''],
      FS1:[''],
      FS2:[''],
      FS3:[''],
      FS4:[''],
      FS5:[''],
      FS6:[''],      
      FS7:[''],
      FS8:[''],
      FS9:[''],
      FS10:[''],
      FS11:[''],
      FS12:[''],
      FS13:[''],
      FS14:[''],
      FS15:[''],
      FS16:[''],
      FS17:[''],
      FS18:[''],
      FS19:[''],
    });

    this.InwardForm = this.formBuilder.group({
      FileNo: ['', Validators.required],
      CompanyID: ["0", Validators.required],
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
      FULLFIRMNAME :['', Validators.required],
      CartonNo :['', Validators.required],
      PODNO :['', Validators.required],

      User_Token: localStorage.getItem('User_Token') ,
      CreatedBy: localStorage.getItem('UserID') , 
      
    });
    
    this._PageNo=1;
    //console.log("IndexListPending");
    this.GetIndexListPending(0);
    this.geDoctypeList();
    this.ReverificationForm.controls['CompanyID'].setValue("0");
    this.isReadonly = false;  

    this.isDisabled = false;
  }

  
  geDoctypeList() {
    
    //const apiUrl=this._global.baseAPIUrl+'BranchMapping/GetList?user_Token=123123'
    const apiUrl = this._global.baseAPIUrl + 'DocTypeMapping/GetDocTypeDetailsUserWise?ID=' + localStorage.getItem('UserID') + '&user_Token='+this.ReverificationForm.get('User_Token').value
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
      this._DeptList = data;
      this.ReverificationForm.controls['DocID'].setValue(0);
    //  console.log("_DeptList",this._DeptList);

      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    });
  }

  
  get f() { return this.ReverificationForm.controls; }
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

    // getBranchList() {

    // const apiUrl=this._global.baseAPIUrl+'BranchMaster/GetBranchList?user_Token='+ this.DataEntryForm.get('User_Token').value;
    // this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
    // this._BranchList = data;
    // this.DataEntryForm.controls['BranchID'].setValue(0);

    // //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    // });

    // }

    GetIndexListPending(CompanyID:number) {     
     

      const apiUrl = this._global.baseAPIUrl + 'Inward/GetHoldCases?CompanyID='+CompanyID+ '&user_Token='+ localStorage.getItem('User_Token');
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
      this._IndexPendingList = data;
      this._FilteredList = data;

      this.prepareTableData(this._FilteredList, this._IndexPendingList);
   //  console.log("IndexListPending",data);
        //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
      });
    }
    
    ViewFile(filename:any)
    {
      filename = this.ReverificationForm.get('FileNo').value +'_'+ filename;
     // alert (this.DataEntryForm.get('FileNo').value);
        var _Fpath =  "../assets/"+ filename;  
       this.FilePath =""; //_Fpath;

        this.GetFullFile(filename);
    }
   

    GetNextFile()
    {

    let  __FileNo = this.ReverificationForm.controls['FileNo'].value;
    let  __TempID = this.ReverificationForm.controls['TemplateID'].value;

    const apiUrl=this._global.baseAPIUrl+'DataEntry/GetNextFile?id='+__TempID+'&FileNo='+__FileNo+'&user_Token='+ localStorage.getItem('User_Token');

    //const apiUrl=this._global.baseAPIUrl+'DataEntry/GetNextFile?id'+  + '' FileNo='+ __FileNo + '&user_Token=123123'
    this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {
    //this._TagDetailsList = data;
    //  console.log("Next Record",data);
    // this._ColNameList = data;

    if (data !="")
    {
       // this.onEdit(data);
    }
    else
    {
      this.toastr.show(
        '<div class="alert-text"</div> <span class="alert-title" data-notify="title">Success!</span> <span data-notify="message"> No record Found </span></div>',
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


    }

    });
    //this.FileTaggingForm.controls['DocID'].setValue(0);
    }
 

    OnReset()
    {
    this.Reset = true;
    this.ReverificationForm.reset();
    
    this.isReadonly = false;
    this.ResetFields();

    
    
    }

ResetFields()
{

  this.ReverificationForm.patchValue({
           
    Remark1:"",
    Remark2:"",
    Remark3:"",
    Remark4:"",
    Remark5:"",
    Remark6:"",
    Remark7:"",
    Remark8:"",
    Remark9:"",
    Remark10:"",
    Remark11:"",
    Remark12:"",
    Remark13:"",
    Remark14:"",
    Remark15:"",
    Remark16:"",
    Remark17:"",
    Remark18:"",
    Remark19:"",
    Status:0,
    Status1:0,
    Status2:0,
    Status3:0,
    Status4:0,
    Status5:0,
    Status6:0,
    Status7:0,
    Status8:0,
    Status9:0,
    Status10:0,
    Status11:0,
    Status12:0,
    Status13:0,
    Status14:0,
    Status15:0,
    Status16:0,
    Status17:0,
    Status18:0,
    Status19:0,
    SACKCODE:"",
  })

}
  
    validateFields() {
      let isValidDateFormat = true;
      let textFieldRequiredValidation = true;
      let NumericFieldValidation = true;
      let textFieldLetterValidation = true;

      this._ColNameList.forEach((el, index) => {
        if(el.FieldType === '3') { // Date Format check
          if(!this.checkDateFormat(this.ReverificationForm.get('_ColNameList').value[el.DisplayName])) {
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
          if(this.ReverificationForm.get('_ColNameList').value[el.DisplayName] === '') {
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
          if(!(/^[a-z][a-z\s]*$/.test(this.ReverificationForm.get('_ColNameList').value[el.DisplayName]))) {
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
            if(isNaN(this.ReverificationForm.get('_ColNameList').value[el.DisplayName])) {
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

  this.ReverificationForm.patchValue({
    Accept: 'Hold',
     
  });

    const that = this;
    const apiUrl = this._global.baseAPIUrl + 'DataEntry/Create';
    this._onlineExamService.postData(this.ReverificationForm.value,apiUrl)
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
    that.GetIndexListPending(0);
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
  

onApporve() { 


  this.submitted = true;

  if (this.ReverificationForm.get('SACKCODE').value =="")
  {
           this.showmessage("Please Enter SACK CODE");
            return false;
  }
 
  this.ReverificationForm.patchValue({
    Accept: 'Created',
     
  });



  const that = this;
  const apiUrl = this._global.baseAPIUrl + 'DataEntry/Create';
  this._onlineExamService.postData(this.ReverificationForm.value,apiUrl)
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
  that.GetIndexListPending(0);
  //this.OnReset();      
  });
  // }

  }
  

  onReject() { 


    this.submitted = true;
  
    // if (this.ReverificationForm.get('SACKCODE').value =="")
    // {
    //          this.showmessage("Please Enter SACK CODE");
    //           return false;
    // }
   
    this.ReverificationForm.patchValue({
      Accept: 'Reject',
       
    });
  
  
  
    const that = this;
    const apiUrl = this._global.baseAPIUrl + 'DataEntry/Create';
    this._onlineExamService.postData(this.ReverificationForm.value,apiUrl)
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
    that.GetIndexListPending(0);
    //this.OnReset();      
    });
    // }
  
    }


//;

Editinward(template: TemplateRef<any>, row: any) {
  var that = this;
 // console.log("row----",row);
 /// this.FilePath = row.FilePath;
  
 this.InwardForm.patchValue({
    FileNo: row.FileNo,
    Division:row.Division,
    Company:row.Company,
    SenderName:row.SenderName,
    Location:row.Location,
    Territorycode:row.Territorycode,
    TerrName:row.TerrName,
    Region:row.Region,
    Zone:row.Zone,
    State:row.State,
    MobileNo:row.MobileNo,
    EmailID:row.EmailID,
    FULLFIRMNAME:row.FULLFIRMNAME,
    PODNO:row.PODNO,
    CartonNo:row.CartonNo,
    SACKCODE:row.SACKCODE,

  })
  
this.modalRef = this.modalService.show(template); 
this.GetVerificationData(row.FileNo);
   
}

    AddIndexing(template: TemplateRef<any>, row: any) {
      var that = this;
     // console.log("row----",row);
     /// this.FilePath = row.FilePath;
      this.ReverificationForm.patchValue({
        FileNo: row.FileNo,        
        Remark1:"",
        Remark2:"",
        Remark3:"",
        Remark4:"",
        Remark5:"",
        Remark6:"",
        Remark7:"",
        Remark8:"",
        Remark9:"",
        Remark10:"",
        Remark11:"",
        Remark12:"",
        Remark13:"",
        Remark14:"",
        Remark15:"",
        Remark16:"",
        Remark17:"",
        Remark18:"",
        Remark19:"",
        Status:0,
        Status1:0,
        Status2:0,
        Status3:0,
        Status4:0,
        Status5:0,
        Status6:0,
        Status7:0,
        Status8:0,
        Status9:0,
        Status10:0,
        Status11:0,
        Status12:0,
        Status13:0,
        Status14:0,
        Status15:0,
        Status16:0,
        Status17:0,
        Status18:0,
        Status19:0,
        SACKCODE:"",
        Remark:"",
      })

     this.FULLFIRMNAME= row.FULLFIRMNAME;
     // this.FilePath = row.FilePath;
      this._TotalPages = row.PageCount;   
      this._PageNo=1;

     /// console.log('FilePath', row.FilePath);
     // console.log('form', this.AddBranchForm);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
     
     // console.log('form', this.AddBranchForm);
      //this.itemRows = Array.from(Array(Math.ceil(this.adresseList.length/2)).keys())
    this.modalRef = this.modalService.show(template);
    
      //this.GetFullFile(row.FileNo);
     this.GetVerificationData(row.FileNo);
  }

      GetFullFile(FileNo:any) {

      //  console.log("Doc", doc);
       /// this.FilePath = doc.RelPath;
        //console.log("Row**",doc);
        const apiUrl = this._global.baseAPIUrl + 'SearchFileStatus/GetFullFile?ID='+localStorage.getItem('UserID')+'&&_fileName='+ FileNo +'&user_Token='+localStorage.getItem('User_Token');
        this._onlineExamService.getDataById(apiUrl).subscribe(res => {
          if (res) {
    
         // console.log("res",res);
            this.FilePath = res;
            window.open(res, '_blank');
             /// saveAs(res, row.ACC + '.pdf');
    
          }
        });
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
        if (key == "FileNo" ||  key == "FULLFIRMNAME" ||  key == "Territorycode") {
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
        return true;
  
    } 
  
    GetVerificationData(filename:any)
    {
      const apiUrl = this._global.baseAPIUrl + 'DataEntry/GetFileInfo?FileNo='+filename+ '&user_Token='+ localStorage.getItem('User_Token');
      this._onlineExamService.getAllData(apiUrl).subscribe((data: {}) => {     
      //this._IndexPendingList = data;
     var _that = data;
     if(Array.isArray(data)) {
      data.forEach((element, index) => {
        const statusControl: any = 'Status' + (index + 1);
        const remarkControl: any = 'Remark' + (index + 1);
        const FStatus: any = 'FS' + (index + 1);
        this.ReverificationForm.controls[statusControl].setValue(data[index].Status);
        this.ReverificationForm.controls[remarkControl].setValue(data[index].Remark);
        this.ReverificationForm.controls[FStatus].setValue(data[index].FileUploadStatus);
       // this.FS[1] = data[index].FileUploadStatus;
      });
    }
   //  console.log(data);

      // this.DataEntryForm.patchValue({
        
       

      //   :data,
      //   Remark2:"",
      //   Remark3:"",
      //   Remark4:"",
      //   Remark5:"",
      //   Remark6:"",
      //   Remark7:"",
      //   Remark8:"",
      //   Remark9:"",
      //   Remark10:"",
      //   Remark11:"",
      //   Remark12:"",
      //   Remark13:"",
      //   Remark14:"",
      //   Remark15:"",
      //   Remark16:"",
      //   Remark17:"",
      //   Remark18:"",
      //   Remark19:"",
      //   Status:0,
      //   Status1:0,
      //   Status2:0,
      //   Status3:0,
      //   Status4:0,
      //   Status5:0,
      //   Status6:0,
      //   Status7:0,
      //   Status8:0,
      //   Status9:0,
      //   Status10:0,
      //   Status11:0,
      //   Status12:0,
      //   Status13:0,
      //   Status14:0,
      //   Status15:0,
      //   Status16:0,
      //   Status17:0,
      //   Status18:0,
      //   Status19:0,
      // })
       
      });


    }
    
    selectedEntries = [];
    allSelected = false;

    // selectRow(e, fileNo) {
    //   if(e.target.checked) {
    //     this.selectedEntries.push(fileNo);
    //   } else {
    //     this.selectedEntries.splice(this.selectedEntries.indexOf(fileNo), 1);
    //   }

    //   // check if all rows are individually selected
    //   if(this._FilteredList.length === this.selectedEntries.length) {
    //     setTimeout(() => {
    //       this.allSelected = true;
    //     }, 100);
    //   } else {
    //     setTimeout(() => {
    //       this.allSelected = false;
    //     }, 100);
    //   }
    //   console.log(this.selectedEntries);
    //  }

    // selectAll(e) {
    //   console.log('All files selected');
    //   if(e.target.checked) {
    //     this._FilteredList.forEach(element => {
    //       this.selectedEntries.push(element.FileNo);
    //     });
    //   } else {
    //     this.selectedEntries = [];
    //   }
    //   console.log(this.selectedEntries);

    // }

    selectedRows = [];
    
    //selectedRowsForMetadata = [];
    selectRow(e, row) {
      this.selectAllRows = false;
      e.originalEvent.stopPropagation();
      if (e.checked) {
        this.selectedRows.push(row.FileNo);
       // this.selectedRowsForMetadata.push(row.fileNo);
      } else {
        this.selectAllRows = false;
        var index = this.selectedRows.indexOf(row.FileNo);
        this.selectedRows.splice(index, 1);
      //  var indexMetadata = this.selectedRowsForMetadata.indexOf(row.FileNo);
       // this.selectedRowsForMetadata.splice(indexMetadata, 1);
      }
    }

    selectAllRows = false;
    selectAllRow(e) {
        console.log("E-",e);

      this.selectedRows = [];
      //this.selectedRowsForMetadata = [];
      if (e.checked) {
        this.selectAllRows = true;
        this.formattedData.forEach((el, index) => {
          //  this.selectedRows.push(el.AccNo +"_" + el.DocID);
          if(index >= this.first && index < this.first + this.rows) {
            this.selectedRows.push(el.FileNo);
          //  this.selectedRowsForMetadata.push(el.FileNo);
            el.selected = true;
          }
        })
      } else {
        this.selectAllRows = false;
        this.selectedRows = [];
        this.formattedData.filter(el => el.selected).forEach(element => {
          element.selected = false;
        });
    }
  }

    onSendMail()
    {
  
      let _CSVData= "";
      for (let j = 0; j < this.selectedRows.length; j++) {          
        _CSVData += this.selectedRows[j] + ',';
        // headerArray.push(headers[j]);  
       // console.log("CSV Data", _CSVData);
      }
     console.log( _CSVData);
      const apiUrl = this._global.baseAPIUrl + 'Inward/SendMailHoldCases?FileNo='+ _CSVData +'&user_Token='+localStorage.getItem('User_Token');
      this._onlineExamService.getDataById(apiUrl).subscribe(res => {
        if (res) {
  
       // console.log("res",res);
          this.FilePath = res;
           /// saveAs(res, row.ACC + '.pdf');
  
        }
      });
  
  
    }

  
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


        formattedData: any = [];
        headerList: any;
        immutableFormattedData: any;
        loading: boolean = true;
        prepareTableData(tableData, headerList) {
          let formattedData = [];
          let tableHeader: any = [
            { field: 'srNo', header: "SR NO", index: 1 },
             { field: 'FileNo', header: 'FileNo', index: 2 },
             { field: 'FULLFIRMNAME', header: 'FULLFIRMNAME', index: 3 },
             { field: 'CompanyName', header: 'CompanyName', index: 3 },
             { field: 'SenderName', header: 'SenderName', index: 3 },
                { field: 'Territorycode', header: 'Territorycode', index: 3 },
          //  { field: 'department', header: 'Department', index: 4 },
          //  { field: 'docType', header: 'Doc Type', index: 5 },
            { field: 'Status', header: 'Status', index: 6 },
            { field: 'InwardDate', header: 'InwardDate', index: 3 },
            // { field: 'filePath', header: 'File Path', index: 3 },
          ];
          // headerList.forEach((el, index) => {
          //   tableHeader.push({
          //     field: 'metadata-' + parseInt(index+1), header: el.DisplayName, index: parseInt(5+index)
          //   })
          // })
      //    console.log("tableData",tableData);
          tableData.forEach((el, index) => {
            formattedData.push({
              'srNo': parseInt(index + 1),
              'FileNo': el.FileNo,                  
               'FULLFIRMNAME': el.FULLFIRMNAME,
               'CompanyName': el.CompanyName,
               'SAPCODE': el.SACKCODE,
               'Territorycode': el.Territorycode,         
              "Status": el.FileStatus,
              "InwardDate": el.Dateofreceiving,
              "PageCount": el.PageCount,

              "Division": el.Division,
              "SenderName": el.SenderName,
              "Company": el.Company,
              "Location": el.Location,
              "TerrName": el.TerrName,
              "Zone": el.Zone,
              "State": el.State,
              "MobileNo": el.MobileNo,
              "EmailID": el.EmailID,

              "PODNO": el.PODNO,
              "CartonNo": el.CartonNo,
              "SACKCODE": el.SACKCODE,
              "RemarkSAP": el.RemarkSAP,
              "Region": el.Region,
               
    //     'filePath': el.FilePath
            //  'DocID': el.DocID,
              // 'profileImg': el.PhotoPath
            });
            // headerList.forEach((el1, i) => {
            //   formattedData[index]['metadata-' + parseInt(i + 1)] = el['Ref'+ parseInt(i+1)]
            // });
          });
          this.headerList = tableHeader;
          this.immutableFormattedData = JSON.parse(JSON.stringify(formattedData));
          this.formattedData = formattedData;
          this.loading = false;
          

       //   console.log(this.formattedData);

        }
    
        searchTable($event) {
          // console.log($event.target.value);
      
          let val = $event.target.value;
          if(val == '') {
            this.formattedData = this.immutableFormattedData;
          } else {
            let filteredArr = [];
            const strArr = val.split(',');
            this.formattedData = this.immutableFormattedData.filter(function (d) {
              for (var key in d) {
                strArr.forEach(el => {
                  if (d[key] && el!== '' && (d[key]+ '').toLowerCase().indexOf(el.toLowerCase()) !== -1) {
                    if (filteredArr.filter(el => el.srNo === d.srNo).length === 0) {
                      filteredArr.push(d);
                    }
                  }
                });
              }
            });
            this.formattedData = filteredArr;
          }
        }

        paginate(e) {
          this.first = e.first;
          this.rows = e.rows;
        } 

        

}
