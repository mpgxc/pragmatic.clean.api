import { Entity, entityFactory } from 'common/helpers';

enum PaymentMethodCategory {
  'CreditCard',
  'DebitCard',
  'Cash',
  'Other',
}

type PaymentMethodInput = {
  name: string;
  category: PaymentMethodCategory;
  // TODO: add more fields
};

export type PaymentMethod = Entity<{
  name: string;
  category: PaymentMethodCategory;
  // TODO: add more fields
}>;

export const createPaymentMethod = ({
  name,
  category,
}: PaymentMethodInput): PaymentMethod =>
  entityFactory<PaymentMethod>({ name, category });
