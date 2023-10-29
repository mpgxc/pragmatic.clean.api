import { Entity, EntityId, entityFactory } from 'common/helpers';

type CreateOrderItemInput = {
  quantity: number;
  productName: string;
  discount?: number;
  pictureUrl?: string;
  unitPrice: number;
  productId: EntityId;
};

export type OrderItem = Entity<{
  quantity: number;
  productName: string;
  discount: number;
  pictureUrl: string;
  unitPrice: number;
  productId: EntityId;
}>;

export const createOrderItem = ({
  productName,
  quantity,
  unitPrice,
  productId,
  discount = 0,
  pictureUrl = '',
}: CreateOrderItemInput): OrderItem => {
  if (quantity <= 0) {
    throw new Error('Cannot add item with quantity less than 1');
  }

  if (unitPrice <= 0) {
    throw new Error('Cannot add item with unit price less than 1');
  }

  if (unitPrice * quantity <= discount) {
    throw new Error('Cannot add item with discount greater than total price');
  }

  return entityFactory<OrderItem>({
    discount,
    pictureUrl,
    productId,
    productName,
    quantity,
    unitPrice,
  });
};

const setNewDiscount = (orderItem: OrderItem, discount: number): OrderItem => {
  if (discount < 0) {
    throw new Error('Discount cannot be less than 0');
  }

  if (discount > orderItem.unitPrice * orderItem.quantity) {
    throw new Error('Discount cannot be greater than total price');
  }

  return {
    ...orderItem,
    discount,
  };
};

const AddQuantity = (orderItem: OrderItem, quantity: number) => {
  if (quantity <= 0) {
    throw new Error('Cannot add item with quantity less than 1');
  }

  return {
    ...orderItem,
    quantity: orderItem.quantity + quantity,
  };
};

export const OrdemItemMethods = {
  AddQuantity,
  setNewDiscount,
};
