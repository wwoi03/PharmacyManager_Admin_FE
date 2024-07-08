import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ListSymptomResponse } from '../../../models/responses/symptom/list-symptom-response';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { DialogComponent } from '../../disease/dialog/dialog.component';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { Toast } from '../../../helpers/toast';

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
  dialogService: NbDialogService;

  constructor(private symptomService: SymptomService, 
    private router: Router,
    private toast: Toast){
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
    this.router.navigate(['/admin/symptom/symptom-details', event.data.id]);
  }

  open(): void {
    this.dialogService.open(DialogComponent, {
      context: {
        title: 'Bạn có chắc chắn muốn xóa?',
      },
    });
  }
}
