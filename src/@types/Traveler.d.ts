import { Traveler } from "@prisma/client";

export interface ITravelerMethods {
  create(
    name: string,
    email: string,
    cpf: string,
    password: string,
    phone: string,
    birthdate: Date,
    addressId?: number,
    companyId?: number
  ): Promise<Traveler>;
  listAll(): Promise<Traveler[]>;
  findById(id: number): Promise<Traveler>;
  update(
    id: number,
    name: string,
    email: string,
    cpf: string,
    password: string,
    phone: string,
    birthdate: Datetime,
    addressId: number,
    companyId: number
  ): Promise<Traveler>;
  delete(id: number): Promise<Traveler>;
}
