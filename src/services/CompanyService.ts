import { ICompanyMethods } from "../@types/Company";
import { Company } from "@prisma/client";
import { prisma } from "../prisma/utils/client";
import { TravelerService } from "./TravelerService";

import fs from "fs";
import path from "path";

class CompanyService implements ICompanyMethods {
  async create(
    name: string,
    cnpj: string,
    email: string,
    image: any,
    phone: string,
    description: string,
    travelerId: number
  ): Promise<Company> {
    if (!travelerId) {
      throw new Error("the travelerId not informed");
    }

    const existingCompanyEmail = await this.findByEmail(email);

    if (existingCompanyEmail) {
      throw new Error("Existing company email!");
    }

    const company = await prisma.company.create({
      data: {
        name,
        cnpj,
        email,
        image,
        phone,
        description,
      },
    });

    if (company) {
      const travelerService = new TravelerService();
      await travelerService.transformToBusiness(travelerId, company.id);
    }

    return company;
  }

  async listAll(): Promise<Company[]> {
    const companyList = await prisma.company.findMany();
    return companyList;
  }

  async findById(id: number): Promise<Company> {
    const company = await prisma.company.findFirst({
      where: { id: id },
    });

    if (!company) {
      throw new Error("Company not found!");
    }

    return company;
  }

  async findByEmail(email: string): Promise<Company> {
    const company = await prisma.company.findFirst({
      where: { email: email },
    });

    return company;
  }

  async update(
    id: number,
    name?: string,
    cnpj?: string,
    email?: string,
    image?: string,
    phone?: string,
    description?: string
  ): Promise<Company> {
    const company = await this.findById(id);

    if (!company) {
      throw new Error("Company not found!");
    }

    const companyUpdated = await prisma.company.update({
      where: { id },
      data: {
        name,
        cnpj,
        email,
        image,
        phone,
        description,
      },
    });

    if (company.image !== companyUpdated.image) {
      const imagePath = path.resolve(__dirname, "../../", company.image);
      fs.unlinkSync(imagePath);
    }

    return companyUpdated;
  }

  async delete(id: number): Promise<Company> {
    const company = await this.findById(id);

    if (!company) {
      throw new Error("Company not found!");
    }

    const imagePath = path.resolve(__dirname, "../../", company.image);

    if (company.image) {
      fs.unlinkSync(imagePath);
    }

    const companyDeleted = await prisma.company.delete({
      where: { id: id },
    });

    return companyDeleted;
  }
}

export { CompanyService };
