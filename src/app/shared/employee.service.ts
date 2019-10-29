import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public formData: Employee;

  constructor(private afs: AngularFirestore) { }

  getEmployees() : Observable<any> {
    return this.afs.collection('employees').snapshotChanges();
  }
}
