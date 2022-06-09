// 产品相关接口
import request from '@/utils/request';

// 查询产品列表
export const getProductList = (params: any) =>
  request.get('/portal/list', {
    params: params,
  });

interface PlaceOrderReqType {
  quantity: number;
  price: number;
  id: string;
  feeRate: number;
}

/**
 * 下单
 * @param params
 */
export const placeOrder = (params: PlaceOrderReqType) =>
  request.post(`/portal/order`, { data: params });

interface UpdateOrderReqType {
  // 订单ID
  orderId: string;
  // 状态(0.未支付 1.进行中 2已结算 3未成交已取消)
  status: number;
}

/**
 * 更新订单状态
 * @param params
 */
export const updateOrder = (params: UpdateOrderReqType) =>
  request.post(`/portal/updateOrder`, { data: params });

interface ProductDetailType {
  singleQuantity: number;
  remark: string;
  type: string;
  token: string;
  modifyTime: string;
  size: number;
  createTime: string;
  name: string;
  riskRemark: string;
  callPrice: number;
  id: number;
  expirationDate: number;
  status: number;
}

/**
 * 获取产品详情
 * @param id 产品ID
 */
export const getProductDetail = (
  id: string,
): Promise<ResponseData<ProductDetailType>> =>
  request.get(`/portal/product/detail/${id}`);

export interface ProductHistoryTransactionRecordType {
  profitData: { [k: number]: number };
  name: string;
  id: number;
  type: string;
  tradeList: { quantity: number; tradeTime: string; price: number }[];
  token: string;
}

/**
 * 获取产品详情
 * @param id 产品ID
 * @param price 现货价格
 */
export const getProductHistoryTransactionRecord = (
  id: string,
  price: number,
): Promise<ResponseData<ProductHistoryTransactionRecordType>> =>
  request.get(`/portal/historyDetail/${id}/${price}`);

export interface UserOrderListReqType extends PaginationReq {
  // 状态(0.未支付 1.进行中 2已结算 3未成交已取消)
  status: number;
}

export interface UserOrderListType {
  id: number;
  name: string;
  // 开仓价格
  openPrice: number;
  // 订单币种
  orderCoin: string;
  // 订单id
  orderId: number;
  // 下单数量
  number: number;
  size: number;
  // 类型,可用值:COVER_CALLS,COVER_Puts
  type: string;
  // 产品描述
  remark: string;
}

/**
 * 获取用户订单列表
 * @param params UserOrderListReqType
 */
export const getUserOrderList = (
  params: UserOrderListReqType,
): Promise<ResponseData<PaginationRes<UserOrderListType[]>>> =>
  request.post(`/portal/user/userOrderList`, { data: params });
