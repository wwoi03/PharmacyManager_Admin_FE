import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ListSymptomResponse } from '../../../models/responses/symptom/list-symptom-response';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { Toast } from '../../../helpers/toast';
import { SymptomDeleteComponent } from '../symptom-delete/symptom-delete.component';

@Component({
  selector: 'ngx-symptom-list',
  templateUrl: './symptom-list.component.html',
  styleUrls: ['./symptom-list.component.scss']
})
export class SymptomListComponent implements OnInit{

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
      codeSymptom:{
        title: 'Mã triệu chứng',
        type:'string',
      }
    },
  };

  source: LocalDataSource;
  listSymptom: ListSymptomResponse[] = [];
  

  constructor(private symptomService: SymptomService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  loadSymptomData(){
    this.symptomService.getSymptom().subscribe((data: ResponseApi<ListSymptomResponse[]>)=>{
      if(data.code === 200){
        this.listSymptom = data.obj;
        this.source.load(this.listSymptom);
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }

  ngOnInit(){
    this.loadSymptomData();
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
    this.router.navigate(['/admin/symptom/symptom-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/symptom/symptom-edit', event.data.id]);
  }
  

  onRowSelect(event): void{
    this.router.navigate(['/admin/symptom/symptom-details', event.data.id]);
  }

  onDelete(event): void {
    const symptom: ListSymptomResponse = event.data;
    
    this.dialogService
      .open(SymptomDeleteComponent, {
        context: {
          symptom: symptom
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.loadSymptomData();
        }
      });
  }

  
}
