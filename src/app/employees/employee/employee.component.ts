import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(
    public employeeService: EmployeeService,
    private afs: AngularFirestore,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) form.resetForm();
    this.employeeService.formData = {
      id: null,
      fullName: "",
      empCode: "",
      position: "",
      mobile: ""
    };
  }

  submitHandler(form: NgForm) {
    let data = Object.assign({}, form.value);
    let id = data.id;
    delete data.id;
    if (id === null) {
      this.afs.collection("employees").add(data);
      this.toastrService.success(
        "Employee registered successfully!",
        "Emp. Register"
      );
    } else {
      this.afs.doc('employees/'+ id).update(data);
      this.toastrService.info(
        "Details modified successfully!",
        "Emp. Register"
      );
    }
    this.resetForm(form);
  }
}
