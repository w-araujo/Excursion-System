import { ITravelerMethods } from "../@types/Traveler";
import { Traveler } from "@prisma/client";
import { prisma } from "../prisma/utils/client";
import { hashed, comparePassword } from "../utils/password";
import { tokenGenerator } from "../utils/jwt";

class TravelerService implements ITravelerMethods {
  async create(
    name: string,
    email: string,
    cpf: string,
    password: string,
    phone: string,
    birthdate: Date,
    addressId: number,
    companyId: number
  ): Promise<Traveler> {
    const findTravelerEmail = await this.findByEmail(email);
    const findTravelerCPF = await this.findByCPF(cpf);

    if (findTravelerEmail) {
      throw new Error("E-mail already registered");
    }

    if (findTravelerCPF) {
      throw new Error("CPF already registered");
    }

    const birthdateWithTime = new Date(birthdate);
    birthdateWithTime.setHours(0, 0, 0, 0);

    const encrypted = await hashed(password);
    const traveler = await prisma.traveler.create({
      data: {
        name,
        email,
        cpf,
        password: encrypted,
        phone,
        birthdate: birthdateWithTime,
        addressId,
        companyId,
      },
    });

    delete traveler.password;

    return traveler;
  }

  async login(email: string, password: string) {
    const traveler = await this.findByEmail(email);

    const isTrue = await comparePassword(password, traveler.password);

    if (!isTrue) {
      throw new Error("Incorrect email/password combination");
    }
    delete traveler.password;

    const token = tokenGenerator(traveler);
    return { token, traveler };
  }

  async listAll(): Promise<Traveler[]> {
    const travelerList = await prisma.traveler.findMany({
      include: {
        address: true,
        company: true,
      },
    });
    return travelerList;
  }

  async findById(id: number): Promise<Traveler> {
    const traveler = await prisma.traveler.findFirst({
      where: { id: id },
      include: {
        address: true,
        company: true,
      },
    });

    if (!traveler) {
      throw new Error("Traveler not found!");
    }

    return traveler;
  }

  async findByEmail(email: string): Promise<Traveler> {
    const traveler = await prisma.traveler.findFirst({
      where: { email: email },
    });

    return traveler;
  }

  async findByCPF(cpf: string): Promise<Traveler> {
    const traveler = await prisma.traveler.findFirst({
      where: { cpf: cpf },
    });

    return traveler;
  }

  async transformToBusiness(id: number, companyId: number): Promise<Traveler> {
    const traveler = await this.findById(id);

    if (!traveler) {
      throw new Error("Traveler not found!");
    }

    const travelerUpdated = await prisma.traveler.update({
      where: { id },
      data: {
        companyId,
        role: "BUSSINESS",
      },
    });

    return travelerUpdated;
  }

  async update(
    id: number,
    name?: string,
    email?: string,
    cpf?: string,
    password?: string,
    phone?: string,
    birthdate?: Date,
    addressId?: number,
    companyId?: number
  ): Promise<Traveler> {
    const traveler = await this.findById(id);

    if (!traveler) {
      throw new Error("Traveler not found!");
    }

    const travelerUpdated = await prisma.traveler.update({
      where: { id },
      data: {
        name,
        email,
        cpf,
        password,
        phone,
        birthdate,
        addressId,
        companyId,
      },
    });

    return travelerUpdated;
  }

  async delete(id: number): Promise<Traveler> {
    const traveler = await this.findById(id);

    if (!traveler) {
      throw new Error("Traveler not found!");
    }

    const travelerDeleted = await prisma.traveler.delete({
      where: { id: id },
    });

    return travelerDeleted;
  }
}

export { TravelerService };
