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
        title: 'Tên bệnh',
        type: 'string',
      },
      description:{
        title: 'Mô tả bệnh',
        type: 'string',
      },
      codeDisease:{
        title: 'Mã bệnh',
        type:'string',
      },
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

  //Cắt ngắn đoạn mô tả
  shortenDescription(listDisease: listDiseaseResponse[]) {
    return listDisease.map(item => {
      const words = item.description.split(' ');
      if (words.length > 20) {
        return { ...item, description: words.slice(0, 20).join(' ') + '...' };
      }
      return item;
    });
  }

  loadDiseaseData(){
    this.diseaseService.getDiseases().subscribe((data: ResponseApi<listDiseaseResponse[]>)=>{
      if(data.code === 200){
      
      this.listDisease = data.obj;
      this.shortenDescription(data.obj);

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

  onCreate(): void {
    this.router.navigate(['/admin/disease/disease-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/disease/disease-edit', event.data.id]);
  }
  
  onViewDetails(event): void{
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
