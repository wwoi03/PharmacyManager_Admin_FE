import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ListSupportResponse } from '../../../models/responses/support/list-support-response';
import { SupportService } from '../../../services/support/support.service';
import { DialogComponent } from '../../disease/dialog/dialog.component';

@Component({
  selector: 'ngx-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit{

  @ViewChild('dialog', { static: true }) dialog: TemplateRef<any>;
  
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete:true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      create: false,
      position: 'left',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      position: 'left',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
      position: 'left',
      onDeleteConfirm: this.open.bind(this),
    },
    columns: {
      name:{
        title: 'Tên hỗ trợ',
        type: 'string',
      },
      description:{
        title: 'Mô tả',
        type: 'string',
      },
      codeSupport:{
        title: 'Mã hỗ trợ',
        type:'string',
      }
    },
  };

  source: LocalDataSource;
  listSupport: ListSupportResponse[] = [];
  dialogService: NbDialogService;

  constructor(private supportService: SupportService, 
    private router: Router){
    this.source = new LocalDataSource();
  }

  loadSupportData(){
    this.supportService.getSupport().subscribe((data: ListSupportResponse[])=>{
      this.listSupport = data;
      this.source.load(this.listSupport);
    });
  }

  ngOnInit(){
    this.loadSupportData();
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'addRecord':
        this.addRecord(event.data);
        break;
    }
  }

  public addRecord(formData: any) {
    this.router.navigate(['/admin/dashboard']);
  }

  onCreate(event): void {
    this.router.navigate(['/admin/support/support-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/support/support-edit', event.data.id]);
  }
  
  onDeleteConfirm(event): void {
    this.dialogService.open(this.dialog, {
      context: 'Bạn có chắc muốn xóa bệnh này không?',
    }).onClose.subscribe(confirmed => {
      if (confirmed) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    });
  }

  onRowSelect(event): void{
    this.router.navigate(['/admin/support/support-details', event.data.id]);
  }

  open(): void {
    this.dialogService.open(DialogComponent, {
      context: {
        title: 'Bạn có chắc chắn muốn xóa?',
      },
    });
  }
}
