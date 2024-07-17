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

  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name" ,"codeDisease"];
  allColumns = [...this.defaultColumns, 'actions'];

  source: LocalDataSource;
  filteredList: listDiseaseResponse[] = [] ;

  constructor(private diseaseService: DiseaseService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  filterList() {
    if (!this.searchTerm) {
      this.loadDiseaseData();
    } else {
      this.filteredList = this.filteredList.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.codeDisease.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  getColumnTitle(column: string): string {
    switch (column) {
      case 'name':
        return 'Tên loại bệnh';
      case 'codeDisease':
        return 'Mã bệnh';
      case 'actions':
        return 'Quản lý';
      default:
        return '';
    }
  }

  loadDiseaseData(){
    this.diseaseService.getDiseases().subscribe((data: ResponseApi<listDiseaseResponse[]>)=>{
      if(data.code === 200){
      this.filteredList = data.obj;
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });
  }

  ngOnInit(){
    this.filterList();
  }

  onCreate(): void {
    this.router.navigate(['/admin/disease/disease-create']);
  }

  onEdit(row): void{
    this.router.navigate(['/admin/disease/disease-edit', row.id]);
  }
  
  onViewDetails(row): void{
    this.router.navigate(['/admin/disease/disease-details', row.id]);
  }

  onDelete(row): void {
    const disease: listDiseaseResponse = row;
    
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
