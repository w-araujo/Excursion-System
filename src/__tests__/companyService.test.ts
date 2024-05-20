import { CompanyService } from "../services/CompanyService";
import { TravelerService } from "../services/TravelerService";
import { prisma } from "../prisma/utils/client";
import path from "path";
import fs from "fs";

describe("CompanyService", () => {
  let companyService: CompanyService;
  let spyCreate: jest.SpyInstance;
  let spyFindMany: jest.SpyInstance;
  let spyFindFirst: jest.SpyInstance;
  let spyUpdate: jest.SpyInstance;
  let spyDelete: jest.SpyInstance;

  beforeEach(() => {
    companyService = new CompanyService();
    spyCreate = jest.spyOn(prisma.company, "create");
    spyFindMany = jest.spyOn(prisma.company, "findMany");
    spyFindFirst = jest.spyOn(prisma.company, "findFirst");
    spyUpdate = jest.spyOn(prisma.company, "update");
    spyDelete = jest.spyOn(prisma.company, "delete");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new company", async () => {
    const file = {
      name: "test-image.png",
      size: 1234,
      type: "image/png",
      buffer: Buffer.from(""), // Conteúdo vazio do arquivo
    };

    const company = {
      travelerId: 999999,
      name: "Empresa A",
      cnpj: "00000000000000",
      email: "empresa@mail.com",
      image: file,
      phone: "00000000000",
      description: "Empresa voltada para o ramo de viagens...",
    };

    spyCreate.mockReturnValue({
      id: 999999,
      name: "Empresa A",
      cnpj: "00000000000000",
      email: "empresa@mail.com",
      image: "/uploads/company/000000000000-000000000.png",
      phone: "00000000000",
      description: "Empresa voltada para o ramo de viagens...",
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    });

    spyFindFirst.mockReturnValue(null);

    const mockTransformToBusiness = jest
      .spyOn(TravelerService.prototype, "transformToBusiness")
      .mockResolvedValue(null);

    const createCompany = await companyService.create(
      company.name,
      company.cnpj,
      company.email,
      company.image,
      company.phone,
      company.description,
      company.travelerId
    );

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createCompany.id).toEqual(999999);
    expect(createCompany.name).toEqual("Empresa A");
    expect(createCompany.email).toEqual("empresa@mail.com");
    expect(mockTransformToBusiness).toHaveBeenLastCalledWith(
      company.travelerId,
      999999
    );
  });

  it("Should be list all companies", async () => {
    spyFindMany.mockReturnValue([
      {
        id: 9999999,
        name: "Empresa A",
        cnpj: null,
        email: "empresaa@mail.com",
        image: "/uploads/company/000000000000-000000000.png",
        phone: "53999999999",
        description: "Empresa focada no ramo de excursões 1",
        createdAt: "2024-05-09T20:18:36.237Z",
        updatedAt: "2024-05-09T20:18:36.237Z",
      },
      {
        id: 8888888,
        name: "Empresa B",
        cnpj: null,
        email: "empresab@mail.com",
        image: "/uploads/company/000000000000-000000000.png",
        phone: "53999999999",
        description: "Empresa focada no ramo de excursões 2",
        createdAt: "2024-05-09T20:18:36.237Z",
        updatedAt: "2024-05-09T20:18:36.237Z",
      },
    ]);

    const listCompanies = await companyService.listAll();

    expect(spyFindMany).toHaveBeenCalledTimes(1);
    expect(listCompanies.length).toBe(2);
    expect(listCompanies[0].email).toEqual("empresaa@mail.com");
    expect(listCompanies[0].description).toEqual(
      "Empresa focada no ramo de excursões 1"
    );
    expect(listCompanies[1].email).toEqual("empresab@mail.com");
    expect(listCompanies[1].description).toEqual(
      "Empresa focada no ramo de excursões 2"
    );
  });

  it("Should list a unique company by id", async () => {
    spyFindFirst.mockReturnValue({
      id: 8888888,
      name: "Empresa B",
      cnpj: null,
      email: "empresab@mail.com",
      image: "/uploads/company/000000000000-000000000.png",
      phone: "53999999999",
      description: "Empresa focada no ramo de excursões 2",
      createdAt: "2024-05-09T20:18:36.237Z",
      updatedAt: "2024-05-09T20:18:36.237Z",
    });

    const companyById = await companyService.findById(8888888);

    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(companyById.id).toEqual(8888888);
    expect(companyById.name).toEqual("Empresa B");
    expect(companyById.phone).toEqual("53999999999");
  });

  it("Should list a unique company by email", async () => {
    spyFindFirst.mockReturnValue({
      id: 9999999,
      name: "Empresa A",
      cnpj: null,
      email: "empresaa@mail.com",
      image: "/uploads/company/000000000000-000000000.png",
      phone: "53999999999",
      description: "Empresa focada no ramo de excursões 1",
      createdAt: "2024-05-09T20:18:36.237Z",
      updatedAt: "2024-05-09T20:18:36.237Z",
    });

    const companyByEmail =
      await companyService.findByEmail("empresaa@mail.com");

    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(companyByEmail.id).toEqual(9999999);
    expect(companyByEmail.email).toEqual("empresaa@mail.com");
  });

  it("Should update a company by id", async () => {
    spyUpdate.mockReturnValue({
      id: 9999999,
      name: "Empresa XYZ",
      cnpj: null,
      email: "empresaa@mail.com",
      image: "/uploads/company/000000000000-000000000.png",
      phone: "53999999999",
      description: "Empresa focada no ramo de excursões 1",
      createdAt: "2024-05-09T20:18:36.237Z",
      updatedAt: "2024-05-09T20:18:36.237Z",
    });

    const companyUpdated = await companyService.update(9999999, "Empresa XYZ");

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(companyUpdated.id).toEqual(9999999);
    expect(companyUpdated.name).toEqual("Empresa XYZ");
  });

  it("Should delete a company by id", async () => {
    const company = {
      id: 9999999,
      name: "Empresa XYZ",
      cnpj: null,
      email: "empresaa@mail.com",
      image: "/uploads/company/000000000000-000000000.png",
      phone: "53999999999",
      description: "Empresa focada no ramo de excursões 1",
      createdAt: "2024-05-09T20:18:36.237Z",
      updatedAt: "2024-05-09T20:18:36.237Z",
    };

    jest.mock("fs");

    spyDelete.mockReturnValue({ msg: "Company deleted successfully" });

    const unlinkSyncMock = jest
      .spyOn(fs, "unlinkSync")
      .mockImplementation(() => {});

    const companyDeleted = await companyService.delete(company.id);

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(unlinkSyncMock).toHaveBeenCalledWith(
      path.resolve(__dirname, "../../", company.image)
    );
    expect(companyDeleted).toEqual({ msg: "Company deleted successfully" });
  });
});
