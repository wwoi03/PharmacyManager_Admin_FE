import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Util {
  convertDateFormat(dateStr: string): string {
    // Tách tháng, ngày và năm từ chuỗi đầu vào
    const [month, day, year] = dateStr.split("/");

    // Tạo chuỗi theo định dạng mới
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  convertISODateFormat(dateStr: string): string {
    // Tách phần ngày tháng từ chuỗi đầu vào
    const [datePart, timePart] = dateStr.split("T");
    const [year, month, day] = datePart.split("-");

    // Tạo chuỗi theo định dạng mới
    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
  }

  formatDateToString(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
