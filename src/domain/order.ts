import { Aggregate, Entity, EntityId, entityFactory } from 'common/helpers';
import { randomUUID } from 'node:crypto';

export enum OrderStatus {
  'Pending',
  'Confirmed',
  'Delivered',
  'Cancelled',
  'Finished',
}

enum PaymentStatus {
  'Pending',
  'Processing',
  'Authorized',
  'Completed',
  'Failed',
}

enum PaymentMethod {
  'CreditCard',
  'DebitCard',
  'Cash',
  'Other',
}

type CreateOrderInput = {
  customerId: EntityId;
};

type Payment = {
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
};

type OrderAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

type Product = {
  name: string;
  price: number;
  availability: boolean;
};

export type Order = Aggregate<{
  orderNumber: string;
  address: OrderAddress;
  status: OrderStatus;
  items: OrderItem[];
  payment: Payment;
  customerId: EntityId;
}>;

export type OrderItem = Entity<{
  quantity: number;
  unitPrice: number;
  product: Product;
}>;

export const createOrder = ({ customerId }: CreateOrderInput): Order =>
  entityFactory<Order>({
    items: [],
    payment: {} as Payment,
    address: {} as OrderAddress,
    status: OrderStatus.Pending,
    orderNumber: randomUUID(),
    customerId,
  });

export const addOrderItem = (order: Order, orderItem: OrderItem): Order => ({
  ...order,
  items: [...order.items, orderItem],
});

export const addOrderItems = (
  order: Order,
  orderItems: OrderItem[],
): Order => ({
  ...order,
  items: [...order.items, ...orderItems],
});

export const removeOrderItem = (order: Order, orderItem: OrderItem): Order => ({
  ...order,
  items: order.items.filter(({ id }) => id !== orderItem.id),
});

export const setAddress = (order: Order, address: OrderAddress): Order => ({
  ...order,
  address,
});

export const setPaymentMethod = (
  order: Order,
  paymentMethod: PaymentMethod,
): Order => ({
  ...order,
  payment: {
    ...order.payment,
    paymentMethod,
  },
});
