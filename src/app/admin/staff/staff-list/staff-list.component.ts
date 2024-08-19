import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { ListStaffResponse } from "../../../models/responses/staff/list-staff-response";
import { StaffService } from "../../../services/staff/staff.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { RevokeTokenComponent } from "../revoke-token/revoke-token.component";

@Component({
  selector: "ngx-staff-list",
  templateUrl: "./staff-list.component.html",
  styleUrls: ["./staff-list.component.scss"],
})
export class StaffListComponent {
  settings = {
    mode: "external", // Chế độ external
    actions: {
      columnTitle: "Actions",
      add: true,
      edit: true,
      delete: true,
      // custom: [
      //   { name: 'addRecord', title: '<i class="nb-plus"></i>'},
      // ],
      // position: 'left'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      create: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      fullName: {
        title: "Họ và tên",
        type: "string",
      },
      userName: {
        title: "Tên đăng nhập",
        type: "string",
      },
      phoneNumber: {
        title: "Số điện thoại",
        type: "string",
      },
      gender: {
        title: "Giới tính",
        type: "string",
      },
      email: {
        title: "E-mail",
        type: "string",
      },
      // birthday: {
      //   title: 'Birthday',
      //   type: 'date',
      //   valuePrepareFunction: (date) => {
      //     if (date) {
      //       const raw = new Date(date);
      //       return `${raw.getFullYear()}-${raw.getMonth() + 1}-${raw.getDate()}`;
      //     }
      //     return '';
      //   },
      // },
      // image: {
      //   title: 'Image',
      //   type: 'html',
      //   valuePrepareFunction: (image) => {
      //     return `<img src="${image}" alt="Image" style="height: 50px; width: 50px;" />`;
      //   },
      // },
    },
  };

  source: LocalDataSource;
  listStaff: ListStaffResponse[] = []; // Khởi tạo mảng rỗng cho listStaff

  constructor(
    private staffService: StaffService,
    private router: Router,
    private dialogService: NbDialogService
  ) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.loadStaffData();
  }

  loadStaffData() {
    this.staffService.getStaffs().subscribe((res) => {
      if (res.code === 200) {
        this.listStaff = res.obj;
        this.source.load(this.listStaff);
      }
    });
  }

  onCustomAction(event) {
    switch (event.action) {
      case "addRecord":
        this.addRecord(event.data);
        break;
    }
  }

  public addRecord(formData: any) {
    this.router.navigate(["/admin/dashboard"]);
  }

  onCreate(event): void {
    this.router.navigate(["/admin/staff/staff-create"]);
  }

  onEdit(event): void {
    const staffId: string = event.data.id;
    this.router.navigate(["/admin/staff/staff-edit", staffId]);
  }

  onDelete(event): void {
    
  }
}
