import { Company } from "@prisma/client";

export interface ICompanyMethods {
  create(
    name: string,
    cnpj: string,
    email: string,
    image: any,
    phone: string,
    description: string,
    travelerId: number
  ): Promise<Company>;
  listAll(): Promise<Company[]>;
  findById(id: number): Promise<Company>;
  update(
    id: number,
    name: string,
    cnpj: string,
    email: string,
    image: string,
    phone: string,
    description: string
  ): Promise<Company>;
  delete(id: number): Promise<Company>;
}
