import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employeeList: Employee[];

  constructor(private empService: EmployeeService,
     private afs: AngularFirestore,
     private toastrService: ToastrService) { }

  ngOnInit() {
    this.empService.getEmployees().subscribe(actionArray => {
      this.employeeList = actionArray.map(item => {
        return {...item.payload.doc.data(), id: item.payload.doc.id};
      })
    })
  }

  editHandler(emp) {
    this.empService.formData = Object.assign({}, emp);
  }

  deleteHandler(id:string) {
    if(confirm("Are you sure to delete this record?")) {
      this.afs.doc('employees/' + id).delete();
      this.toastrService.warning('Deleted Successfully!', 'Emp. Register')
    }
  }

}
