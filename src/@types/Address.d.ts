import { Address } from "@prisma/client";

export interface IAddressMethods {
  create(
    street: string,
    city: string,
    state: string,
    country: string,
    number: string,
    zipCode: string
  ): Promise<Address>;
  listAll(): Promise<Address[]>;
  findById(id: number): Promise<Address>;
  update(
    id: number,
    street: string,
    city: string,
    state: string,
    country: string,
    number: string,
    zipCode: string
  ): Promise<Address>;
  delete(id: number): Promise<void>;
}
