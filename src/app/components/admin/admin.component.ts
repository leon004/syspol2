import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { InfractionService } from '../../services/infraction.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  infractions: any[] = [];
  selectedUser: any = null;

  constructor(private userService: UserService, private infractionService: InfractionService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadInfractions();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadInfractions() {
    this.infractionService.getAllInfractions().subscribe(
      data => {
        this.infractions = data;
      },
      error => {
        console.error('Error fetching infractions:', error);
      }
    );
  }

  selectUser(user: any) {
    this.selectedUser = { ...user };
  }

  saveUser() {
    if (this.selectedUser.id) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = null;
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.userService.createUser(this.selectedUser).subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = null;
        },
        error => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  exportUsersToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const workbook: XLSX.WorkBook = { Sheets: { 'Usuarios': worksheet }, SheetNames: ['Usuarios'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'usuarios');
  }

  exportInfractionsToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.infractions);
    const workbook: XLSX.WorkBook = { Sheets: { 'Infracciones': worksheet }, SheetNames: ['Infracciones'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'infracciones');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
