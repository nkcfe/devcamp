export interface ProductType {
  category: string;
  createdAt?: Date;
  description: string;
  detail: string;
  image: string;
  name: string;
  price: number;
  productId: string;
}

export interface ItemType {
  productId: string;
  quantity: number;
}

export interface CartItemType {
  cartId: string;
  cartItemId: string;
  createdAt: Date;
  productId: string;
  quantity: number;
  product: ProductType[];
}

export interface OrderProductType {
  cartId: string;
  cartItemId: string;
  createdAt: Date;
  productId: string;
  quantity: number;
  product: ProductType;
}

export interface UserType {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface UserCouponType {
  couponId: string;
  code: string;
  discount: number;
  type: string;
  createdAt: string;
  expiredAt: string;
}

export interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: '카드' | '가상계좌' | '계좌이체';
  paymentKey: string;
  orderId: string;
}
