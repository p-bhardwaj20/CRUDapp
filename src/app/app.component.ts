import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'thrombinoscope';

  displayedColumns: string[] = ['employeeName', 'team', 'date', 'skill', 'experience', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService, private toast: NgToastService) {

  }

  ngOnInit(): void {
      this.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllEmployees();
      }
    })
  }

  getAllEmployees(){
    this.api.getEmployee()
    .subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: ()=> {
        this.toast.success({detail: "Error!!", summary:"Error while deleting the record",duration:5000})
      }
    })
  }

  editEmployee(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllEmployees();
      }
    })
  }

  deleteEmployee(id:number){
    this.api.deleteEmployee(id)
    .subscribe({
      next: (res)=>{
        this.toast.warning({detail: "Employee deleted!!", summary:"Record deleted successfully",duration:5000})
        this.getAllEmployees();
      },
      error: (err)=>{
        this.toast.error({detail: "Error!!", summary:"Error while deleting the record",duration:5000})
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
