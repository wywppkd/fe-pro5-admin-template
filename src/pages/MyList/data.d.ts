/** 我的列表接口入参 */
export type MyListParamsType = {
  pageSize?: number | undefined;
  current?: number | undefined;
  pageNum?: number | undefined;
};

/** 我的列表接口出参 */
export type MyListType = {
  uid: number;
  name: string;
  age: number;
};
