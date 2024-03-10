export interface ProductType {
  productId: string;
  name: string;
  image: string;
  price: number;
  createdAt: string;
}

export interface ItemType {
  productId: string;
  quantity: number;
}

export interface CartItemType {
  cartId: string;
  cartItemId: string;
  createdAt: string;
  productId: string;
  quantity: number;
  product: ProductType[];
}

export interface UserType {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
