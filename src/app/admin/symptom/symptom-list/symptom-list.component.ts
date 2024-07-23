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

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name" ,"codeSymptom"];
  allColumns = [...this.defaultColumns, 'actions'];

  source: LocalDataSource;
  filteredList: ListSymptomResponse[] = [] ;
  
  getColumnTitle(column: string): string {
    switch (column) {
      case 'name':
        return 'Tên triệu chứng';
      case 'codeSymptom':
        return 'Mã triệu chứng';
      case 'actions':
        return 'Quản lý';
      default:
        return '';
    }
  }


  constructor(private symptomService: SymptomService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  filterList() {
    if (!this.searchTerm) {
      this.loadSymptomData();
    } else {
      this.filteredList = this.filteredList.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.codeSymptom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.applySort();
  }

  sortColumn(column: string) {
    if (this.sortSelected === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortSelected = column;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }

  applySort() {
    if (this.sortDirection === 'asc') {
      this.filteredList.sort((a, b) => (a[this.sortSelected] > b[this.sortSelected]) ? 1 : ((b[this.sortSelected] > a[this.sortSelected]) ? -1 : 0));
    } else {
      this.filteredList.sort((a, b) => (a[this.sortSelected] < b[this.sortSelected]) ? 1 : ((b[this.sortSelected] < a[this.sortSelected]) ? -1 : 0));
    }
    this.source.load(this.filteredList);
  }

  loadSymptomData(){
    this.symptomService.getSymptom().subscribe((data: ResponseApi<ListSymptomResponse[]>)=>{
      if(data.code === 200){
        this.filteredList = data.obj;
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }

  ngOnInit(){
    this.filterList();
  }

  onCreate(): void {
    this.router.navigate(['/admin/symptom/symptom-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/symptom/symptom-edit', event.id]);
  }
  

  onViewDetails(event): void{
    this.router.navigate(['/admin/symptom/symptom-details', event.id]);
  }

  onDelete(event): void {
    const symptom: ListSymptomResponse = event;
    
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
