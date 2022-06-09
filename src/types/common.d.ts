// 接口返回值
declare interface ResponseData<T = unknown> {
  code: string;
  data: T;
  message: string;
}

// 分页请求
declare interface PaginationReq {
  page: number;
  size: number;
}

// 分页返回值
declare interface PaginationRes<T = unknown> {
  records: T;
  total: number;
}
