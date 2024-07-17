// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { LocalDataSource } from 'ng2-smart-table';

// @Component({
//   selector: 'ngx-product-disease-create',
//   templateUrl: './product-disease-create.component.html',
//   styleUrls: ['./product-disease-create.component.scss']
// })
// export class ProductDiseaseCreateComponent implements OnInit, OnDestroy {
//   id: any;
//   listName: string = '';
//   link: number;

//   settings = {
//     mode: 'external',
//     actions: {
//       columnTitle: 'Actions',
//       add: false,
//       edit: false,
//       delete:false,
//     },
//     columns: {
//       name:{
//         title: `Tên ${this.listName}`,
//         type: 'string',
//       },
//       code:{
//         title: `Mã ${this.listName}`,
//         type:'string',
//       }
//     },
//   };

//   source: LocalDataSource;
//   listSymptom: ListSymptomResponse[] = [];
//   listDisease: listDiseaseResponse[]= [];
//   Data: any;
//   private subscription: Subscription;

  

//   diseaseSymptom = new CreateDiseaseSymptomRequest();

//   constructor(
//     protected ref: NbDialogRef<CreateDiseaseSymptomComponent>,
//     private diseaseSymptomService: DiseaseSymptomService,
//     private symptomService: SymptomService,
//     private diseaseService: DiseaseService,
//     private toast: Toast
//   ) {
//     this.source = new LocalDataSource();
//   }

//   ngOnDestroy(): void {
//     if (this.symptomService) {
//       this.subscription.unsubscribe;
//     }
//     else if(this.diseaseService){
//       this.subscription.unsubscribe;
//     }
//   }
//   ngOnInit(): void {
//     if(this.link == 1){
//       this.loadSymptomData();
//     }
//     else if(this.link == 2){
//       this.loadDiseaseData();
//     }
//   }

//   loadSymptomData() {
//     this.subscription = this.symptomService.getSymptom().subscribe((data: ResponseApi<ListSymptomResponse[]>)=>{
//       if(data.code === 200){
//         this.listSymptom = data.obj;
        
//         this.Data = this.listSymptom.map(item => ({
//           id: item.id,
//           name: item.name,
//           code: item.codeSymptom,
//         }));

//         this.source.load(this.Data);
//       }
//     },(error) => {
//       this.toast.warningToast('Lấy thông tin thất bại', error);
//     });
//   }
  
//   loadDiseaseData() {
//     this.subscription = this.diseaseService.getDiseases().subscribe((data: ResponseApi<listDiseaseResponse[]>)=>{
//       if(data.code === 200){
//         this.listDisease = data.obj;

//         this.Data = this.listDisease.map(item => ({
//           id: item.id,
//           name: item.name,
//           code: item.codeDisease,
//         }));

//         this.source.load(this.Data);
//       }
//     },(error) => {
//       this.toast.warningToast('Lấy thông tin thất bại', error);
//     });
//   }

//   // Create
//   create() {
//     this.diseaseSymptomService.getLink(this.link);

//     this.diseaseSymptomService.create(this.diseaseSymptom).subscribe(
//       (res) => {
//         if (res.code === 200) {
//           this.toast.successToast("Thành công", res.message);
//           this.ref.close(true);
//         } else if (res.code >= 400 && res.code < 500) {
//           this.toast.warningToast("Thất bại", res.message);
//         } else if (res.code === 500) {
//           this.toast.dangerToast("Lỗi hệ thống", res.message);
//         }
//       },
//     )
//   }

//   // Hủy
//   cancel() {
//     this.ref.close(false);
//   }

//   onRowSelect(event){
//     if(this.link == 1){
//       this.diseaseSymptom.diseaseId = this.id;
//       this.diseaseSymptom.symptomId = event.data.id;
//     }
//     else if(this.link == 2){
//       this.diseaseSymptom.symptomId = this.id;
//       this.diseaseSymptom.diseaseId = event.data.id;
//     }
    
//   }
// }
