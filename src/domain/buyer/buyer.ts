import { Aggregate, entityFactory } from 'common/helpers';

type BuyerInput = {
  name: string;
  // TODO: add more fields
};

export type Buyer = Aggregate<{
  name: string;
  // TODO: add more fields
}>;

export const createBuyer = ({ name }: BuyerInput): Buyer =>
  entityFactory<Buyer>({ name });
