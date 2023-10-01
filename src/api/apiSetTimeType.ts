export interface DateType {
  week_day0: string;
  week_day1: string;
  week_day2: string;
  week_day3: string;
  week_day4: string;
  week_day5: string;
  week_day6: string;
}
export type AllDateListType = DateType[];

export interface TimeType {
  start: string;
  end: string;
}

export type TimeListType = TimeType[];

export interface DataType {
  date: string;
  meal: boolean;
  timeList: TimeListType;
  id: string;
  allDay: boolean;
}
export type AllDataListType = DataType[];
