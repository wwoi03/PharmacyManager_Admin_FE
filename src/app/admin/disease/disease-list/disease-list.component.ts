import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { listDiseaseResponse } from '../../../models/responses/disease/list-disease-response';
import { DiseaseService } from '../../../services/disease/disease.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { Toast } from '../../../helpers/toast';
import { DiseaseDeleteComponent } from '../disease-delete/disease-delete.component';

@Component({
  selector: 'ngx-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements OnInit {

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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      name:{
        title: 'Tên triệu chứng',
        type: 'string',
      },
      description:{
        title: 'Mô tả',
        type: 'string',
      },
      codeOrder:{
        title: 'Mã triệu chứng',
        type:'string',
      }
    }
    };

  source: LocalDataSource;
  listDisease: listDiseaseResponse[] = [] ;
  

  constructor(private diseaseService: DiseaseService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  loadDiseaseData(){
    this.diseaseService.getDiseases().subscribe((data: ResponseApi<listDiseaseResponse[]>)=>{
      if(data.code === 200){
      this.listDisease = data.obj;
      this.source.load(this.listDisease);
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.loadDiseaseData();
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
    this.router.navigate(['/admin/disease/disease-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/disease/disease-edit', event.data.id]);
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
    this.router.navigate(['/admin/disease/disease-details', event.data.id]);
  }

  onDelete(event): void {
    const disease: listDiseaseResponse = event.data;
    
    this.dialogService
      .open(DiseaseDeleteComponent, {
        context: {
          disease: disease
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadDiseaseData();
        }
      });
  }
  
}
