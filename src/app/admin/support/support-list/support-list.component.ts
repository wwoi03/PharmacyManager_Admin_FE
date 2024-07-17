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
  searchTerm: string = '';
  sortSelected: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  defaultColumns = ["name" ,"codeSupport"];
  allColumns = [...this.defaultColumns, 'actions'];

  source: LocalDataSource;
  filteredList: ListSupportResponse[] = [] ;
  
  getColumnTitle(column: string): string {
    switch (column) {
      case 'name':
        return 'Tên hỗ trợ';
      case 'codeSupport':
        return 'Mã hỗ trợ';
      case 'actions':
        return 'Quản lý';
      default:
        return '';
    }
  }

  constructor(private supportService: SupportService, 
    private router: Router,
    private toast: Toast,
    private dialogService: NbDialogService,){
    this.source = new LocalDataSource();
  }

  filterList() {
    if (!this.searchTerm) {
      this.loadSupportData();
    } else {
      this.filteredList = this.filteredList.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.codeSupport.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  loadSupportData(){
    this.supportService.getSupport().subscribe((data: ResponseApi<ListSupportResponse[]>)=>{
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
    this.router.navigate(['/admin/support/support-create']);
  }

  onEdit(event): void{
    this.router.navigate(['/admin/support/support-edit', event.id]);
  }
  
  onDelete(event): void {
    const support: ListSupportResponse = event;
    
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
    this.router.navigate(['/admin/support/support-details', event.id]);
  }
}
