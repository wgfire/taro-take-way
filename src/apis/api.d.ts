interface APIBodyFilterConditionItem {
  field: string;
  operatorType: string;
  value?: string | number;
  category?: string;
}
interface ResponseBody<T> {
  code: number;
  message: string;
  data: T;
}

interface APIBodyFilterItem {
  type: string;
  condition: APIBodyFilterConditionItem[];
}

type APIBodyContext = Record<string, any>;

/** 列表请求参数 */
interface APIBody {
  id?: string;
  options: {
    viewId: string;
    pageIndex: number;
    pageSize: number;
    sortField: string;
    sortOrder: string;
    idField: string;
    controlHandler?: string;
    gridViewId?: string;
    conditionSelectedInfos: {
      field: string;
      values: string[];
    }[];
    options: {
      context: APIBodyContext;
      advancedFilterConditions?: any[]; // TODO: 确定类型
      filters: APIBodyFilterItem[];
      labelConfig?: [];
      titleConfig?: [];
      conditionSelectedInfos?: {
        field: string;
        values: string[];
      }[];
    };
  };
}

// 客户详情标签返回的标签类型 ，需要在前端定义颜色
type TagName = "default" | "primary" | "success" | "warning" | "danger";
