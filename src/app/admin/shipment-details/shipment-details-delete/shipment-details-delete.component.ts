import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ShipmentDetailsService } from '../../../services/shipment-details/shipment-details.service';
import { Toast } from '../../../helpers/toast';
import { ListShipmentDetailsResponse } from '../../../models/responses/shipment-details/list-shipment-details-response';
import { UtilMoney } from '../../../helpers/util-money';

@Component({
  selector: 'ngx-shipment-details-delete',
  templateUrl: './shipment-details-delete.component.html',
  styleUrls: ['./shipment-details-delete.component.scss']
})
export class ShipmentDetailsDeleteComponent {
  listShipmentDetailsResponse: ListShipmentDetailsResponse;

  constructor(
    protected ref: NbDialogRef<ShipmentDetailsDeleteComponent>,
    private shipmentDetailsService: ShipmentDetailsService,
    private toast: Toast,
    private utilMoney: UtilMoney,
  ) {}

  // Create
  deleteShipmentDetails() {
    // Create
    this.shipmentDetailsService.delete(this.listShipmentDetailsResponse.shipmentDetailsId).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
          this.ref.close(true);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.message);
        } else if (res.code === 500) {
          this.toast.dangerToast("Lỗi hệ thống", res.message);
        }
      },
    )
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }

   // get money
   getMoney(amount: number): string {
    return this.utilMoney.formatCurrency(amount);
  }
}
