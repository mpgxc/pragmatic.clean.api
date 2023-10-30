import { Aggregate, EntityId, Optional, entityFactory } from 'common/helpers';
import { randomUUID } from 'crypto';
import { OrderAddress } from './address';
import { OrdemItemMethods, OrderItem } from './ordem-item';

enum OrderStatus {
  Submitted = 'Submitted',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Cancelled = 'Cancelled',
  Finished = 'Finished',
}

type CreateOrderInput = {
  buyerId: EntityId;
  paymentMethodId: EntityId;
  description: Optional<string>;
};

type OrderStatusFollowUp = {
  status: OrderStatus;
  description: Optional<string>;
  date: Date;
};

export type Order = Aggregate<{
  orderNumber: string;
  orderDate: Date;
  description: Optional<string>;
  address: OrderAddress;
  status: OrderStatus;
  statusFollowUp: OrderStatusFollowUp[];
  items: OrderItem[];
  buyerId: EntityId;
  paymentMethodId: EntityId;
}>;

export const createOrder = ({
  buyerId,
  paymentMethodId,
  description = '',
}: CreateOrderInput): Order =>
  entityFactory<Order>({
    buyerId,
    paymentMethodId,
    items: [],
    description,
    orderDate: new Date(),
    address: {} as OrderAddress,
    status: OrderStatus.Submitted,
    orderNumber: randomUUID(),
    statusFollowUp: [
      {
        status: OrderStatus.Submitted,
        description: 'Order <Submitted>',
        date: new Date(),
      },
    ],
  });

export const addOrderItem = (o: Order, orderItem: OrderItem): Order => {
  let existingOrderItem = o.items.find(
    ({ productId }) => productId === orderItem.productId,
  );

  if (existingOrderItem) {
    if (existingOrderItem.quantity < orderItem.quantity) {
      existingOrderItem = OrdemItemMethods.setNewDiscount(
        existingOrderItem,
        orderItem.discount,
      );
    }

    existingOrderItem = OrdemItemMethods.AddQuantity(
      existingOrderItem,
      orderItem.quantity,
    );
  } else {
    existingOrderItem = orderItem;
  }

  return {
    ...o,
    items: [...o.items, orderItem],
  };
};

/**
 * TODO: Implement validations rules for adding multiple items
 */
const addOrderItems = (o: Order, orderItems: OrderItem[]): Order => ({
  ...o,
  items: [...o.items, ...orderItems],
});

const removeOrderItem = (o: Order, orderItem: OrderItem): Order => ({
  ...o,
  items: o.items.filter(({ id }) => id !== orderItem.id),
});

const setAddress = (o: Order, address: OrderAddress): Order => ({
  ...o,
  address,
});

const calculateTotal = (o: Order): number =>
  o.items.reduce((acc, { unitPrice }) => acc + unitPrice, 0);

/**
 *  Domain methods for Order Status management
 */
const setOrderStatus = (o: Order, status: OrderStatus): Order =>
  ({
    [OrderStatus.Pending]: setOrderStatusToPending,
    [OrderStatus.Confirmed]: setOrderStatusToConfirmed,
    [OrderStatus.Paid]: setOrderStatusToPaid,
    [OrderStatus.Shipped]: setOrderStatusToShipped,
    [OrderStatus.Cancelled]: setOrderStatusToCancelled,
    [OrderStatus.Finished]: setOrderStatusToFinished,
    [OrderStatus.Submitted]: (o: Order) => o,
  })[status](o);

const updateStatus = (o: Order, status: OrderStatus): Order => ({
  ...o,
  status,
  statusFollowUp: [
    ...o.statusFollowUp,
    {
      status,
      date: new Date(),
      description: `Order Status changed from <${o.status}> to <${
        status ?? ''
      }>`,
    },
  ],
});

const setOrderStatusToPending = (o: Order): Order => {
  if (o.status !== OrderStatus.Submitted) {
    throw new Error(`Cannot change status to pending from ${o.status}`);
  }

  // TODO: Added domain events

  return updateStatus(o, OrderStatus.Pending);
};

const setOrderStatusToConfirmed = (o: Order): Order => {
  if (o.status !== OrderStatus.Pending) {
    throw new Error(`Cannot change status to confirmed from ${o.status}`);
  }

  // TODO: Added domain events

  return updateStatus(o, OrderStatus.Confirmed);
};

const setOrderStatusToPaid = (o: Order): Order => {
  if (o.status !== OrderStatus.Confirmed) {
    throw new Error(`Cannot change status to paid from ${o.status}`);
  }

  // TODO: Added domain events

  return updateStatus(o, OrderStatus.Paid);
};

const setOrderStatusToShipped = (o: Order): Order => {
  if (o.status !== OrderStatus.Paid) {
    throw new Error(`Cannot change status to Shipped from ${o.status}`);
  }

  // TODO: Added domain events

  return updateStatus(o, OrderStatus.Shipped);
};

const setOrderStatusToCancelled = (o: Order): Order => {
  if (
    [
      OrderStatus.Paid,
      OrderStatus.Shipped,
      OrderStatus.Confirmed,
      OrderStatus.Cancelled,
      OrderStatus.Finished,
    ].includes(o.status)
  ) {
    throw new Error(`Cannot change status to Cancelled from ${o.status}`);
  }

  // TODO: Added domain events

  return updateStatus(o, OrderStatus.Cancelled);
};

const setOrderStatusToFinished = (o: Order): Order => {
  if (o.status !== OrderStatus.Shipped) {
    throw new Error(`Cannot change status to Finished from ${o.status}`);
  }

  // TODO: Added domain events

  return updateStatus(o, OrderStatus.Finished);
};

/**
 * Domain Public Methods
 */
export const OrderMethods = {
  addOrderItem,
  addOrderItems,
  removeOrderItem,
  setAddress,
  calculateTotal,
  setOrderStatus,
};
