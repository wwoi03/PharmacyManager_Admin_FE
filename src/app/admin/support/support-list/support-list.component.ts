import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ListSupportResponse } from '../../../models/responses/support/list-support-response';
import { SupportService } from '../../../services/support/support.service';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { Toast } from '../../../helpers/toast';
import { SupportDeleteComponent } from '../support-delete/support-delete.component';

@Component({
  selector: 'ngx-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit{
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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      name:{
        title: 'Tên hỗ trợ',
        type: 'string',
      },
      description:{
        title: 'Mô tả hỗ trợ',
        type: 'string',
      },
      codeSupport:{
        title: 'Mã hỗ trợ',
        type:'string',
      },
    }
  };

  source: LocalDataSource;
  listSupport: ListSupportResponse[]=[];

  constructor(private supportService: SupportService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  loadSupportData(){
    this.supportService.getSupports().subscribe((data: ResponseApi<ListSupportResponse[]>)=>{
      if(data.code === 200){
      this.listSupport = data.obj;

      this.source.load(this.listSupport);
    }
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.loadSupportData();
  }

  onCreate(): void {
    this.router.navigate(['/admin/support/support-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/support/support-edit', event.data.id]);
  }
  
  onDelete(event): void {
    const support: ListSupportResponse = event.data;
    
    this.dialogService
      .open(SupportDeleteComponent, {
        context: {
          support: support
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadSupportData();
        }
      });
  }

  onViewDetails(event): void{
    this.router.navigate(['/admin/support/support-details', event.data.id]);
  }
}
