import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Toast {
  constructor(private toastrService: NbToastrService) {}

  config: NbToastrConfig;

  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";

  types: NbComponentStatus[] = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
  ];

  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];

  public dangerToast(title: string, body: string) {
    this.showToast('danger', title, body);
  }

  public successToast(title: string, body: string) {
    this.showToast('success', title, body);
  }

  public warningToast(title: string, body: string) {
    this.showToast('warning', title, body);
  }

  public customerToast(code: number, body: string) {
    if (code === 200) {
      this.successToast("Thành công", body);
    } else {
      this.dangerToast("Thất bại", body);
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : "";

    this.toastrService.show(body, `${titleContent}`, config);
  }
}
