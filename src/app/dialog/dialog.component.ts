import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  skillsList = ["Coding", "Illustrations", "Customer Service"];
  employeeForm !: FormGroup;
  actionBtn : string = "Save"

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DialogComponent>, private toast: NgToastService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      team: ['', Validators.required],
      date: ['', Validators.required],
      skill: ['', Validators.required],
      experience: ['', Validators.required],
      comment: ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['team'].setValue(this.editData.team);
      this.employeeForm.controls['date'].setValue(this.editData.date);
      this.employeeForm.controls['skill'].setValue(this.editData.skill);
      this.employeeForm.controls['experience'].setValue(this.editData.experience);
      this.employeeForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addEmployee(){
   if(!this.editData){
    if(this.employeeForm.valid){
      this.api.postEmployee(this.employeeForm.value)
      .subscribe({
        next: (res)=>{
          this.toast.success({detail: "Employee added!!", summary:"Record added successfully",duration:5000})
          this.employeeForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          this.toast.error({detail: "Error!!", summary:"Error while adding the record",duration:5000})
        }
      })
    }
   }else{
     this.updateProduct()
   }
  }

  updateProduct(){
    this.api.putEmployee(this.employeeForm.value,this.editData.id)
    .subscribe({
      next: (res)=>{
        this.toast.info({detail: "Employee Info updated", summary:"Record updated successfully",duration:5000})
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error: ()=> {
        this.toast.error({detail: "Error!!", summary:"Error while updating the record",duration:5000})
      }
    })
  }

}
