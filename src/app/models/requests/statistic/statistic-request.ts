export enum StatisticStatus {
    week = 1,
    month = 2,
    year =3,
  }

export const StatisticDescriptions: { [key in StatisticStatus]: string } = {
[StatisticStatus.week]: "Tuần",
[StatisticStatus.month]: "Tháng",
[StatisticStatus.year]: "Năm",
};

export class StatisticRequest {
  dateTime: string; // Sử dụng string để lưu trữ giá trị ngày tháng dưới dạng ISO string
  timeType: string;
}

