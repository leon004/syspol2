import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { InfractionService } from '../../services/infraction.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  infractions: any[] = [];
  selectedUser: any = null;
  selectedInfraction: any = null;

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

  selectInfraction(infraction: any) {
    this.selectedInfraction = { ...infraction };
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

  saveInfraction() {
    if (this.selectedInfraction.id) {
      this.infractionService.updateInfraction(this.selectedInfraction.id, this.selectedInfraction).subscribe(
        () => {
          this.loadInfractions();
          this.selectedInfraction = null;
        },
        error => {
          console.error('Error updating infraction:', error);
        }
      );
    } else {
      this.infractionService.createInfraction(this.selectedInfraction).subscribe(
        () => {
          this.loadInfractions();
          this.selectedInfraction = null;
        },
        error => {
          console.error('Error creating infraction:', error);
        }
      );
    }
  }

  deleteInfraction(infractionId: number) {
    this.infractionService.deleteInfraction(infractionId).subscribe(
      () => {
        this.loadInfractions();
      },
      error => {
        console.error('Error deleting infraction:', error);
      }
    );
  }
}
