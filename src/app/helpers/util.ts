export class Util {
    static convertDateFormat(dateStr: string): string {
        // Tách ngày, tháng và năm từ chuỗi đầu vào
        const [day, year, month] = dateStr.split('/');

        // Tạo chuỗi theo định dạng mới
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }
}