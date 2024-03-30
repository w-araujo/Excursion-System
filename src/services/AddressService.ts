import { IAddressMethods } from "../@types/Address";
import { Address } from "@prisma/client";
import { prisma } from "../prisma/utils/client";

class AddressService implements IAddressMethods {
  async create(
    street: string,
    city: string,
    state: string,
    country: string,
    number: string,
    zipCode: string
  ): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        street,
        city,
        state,
        country,
        number,
        zipCode,
      },
    });

    return address;
  }

  async listAll(): Promise<Address[]> {
    const AddressList = await prisma.address.findMany();
    return AddressList;
  }

  async findById(id: number): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: { id: id },
    });

    if (!address) {
      throw new Error("Address not found!");
    }

    return address;
  }

  async update(
    id: number,
    street: string,
    city: string,
    state: string,
    country: string,
    number: string,
    zipCode: string
  ): Promise<Address> {
    const address = await this.findById(id);

    if (!address) {
      throw new Error("Address not found!");
    }

    const addressUpdated = await prisma.address.update({
      where: { id },
      data: {
        street,
        city,
        state,
        country,
        number,
        zipCode,
      },
    });

    return addressUpdated;
  }

  async delete(id: number): Promise<Address> {
    const address = await this.findById(id);

    if (!address) {
      throw new Error("Address not found!");
    }

    const addressDeleted = await prisma.address.delete({
      where: { id: id },
    });

    return addressDeleted;
  }
}

export { AddressService };
