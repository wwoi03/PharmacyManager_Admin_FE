import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { CreateStaffRequest } from '../../../models/requests/staff/create-staff-request';
import { StaffService } from '../../../services/staff/staff.service';

@Component({
  selector: 'ngx-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.scss']
})
export class StaffCreateComponent implements OnInit {
  currentTheme: string;
  themeSubscription: any;
  createStaffRequest: CreateStaffRequest;

  constructor(
    private staffService: StaffService,
    private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
      this.staffService = staffService;
    });
  }
  
  ngOnInit(): void {
    this.createStaffRequest = new CreateStaffRequest();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  onRoleChange(role: string, isChecked: boolean) {
    if (isChecked) {
      this.createStaffRequest.roles.push(role);
    } else {
      const index = this.createStaffRequest.roles.indexOf(role);
      if (index > -1) {
        this.createStaffRequest.roles.splice(index, 1);
      }
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.createStaffRequest.image = reader.result as string;
      };
    }
  }

  createStaff() {
    console.log(this.createStaffRequest);

    this.staffService.create(this.createStaffRequest).subscribe(res => {
      alert(res.toString());
    })
  }
}
