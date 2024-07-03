import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { listDiseaseResponse } from '../../../models/responses/disease/list-disease-response';
import { DiseaseService } from '../../../services/disease/disease.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent {
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
      name:{
        title: 'Tên bệnh',
        type: 'string',
      },
      description:{
        title: 'Mô tả',
        type: 'string',
      },
      codeDisease:{
        title: 'Mã bệnh',
        type:'string',
      }
    }
  };

  source: LocalDataSource;
  listDisease: listDiseaseResponse[] = [];

  constructor(private diseaseService: DiseaseService, private router: Router){
    this.source = new LocalDataSource();
  }

  loadDiseaseData(){
    this.diseaseService.getDisease().subscribe((data: listDiseaseResponse[])=>{
      this.listDisease = data;
      this.source.load(this.listDisease);
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
    this.router.navigate(['/admin/dashboard']);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
