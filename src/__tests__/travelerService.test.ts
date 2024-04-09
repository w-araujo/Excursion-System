import { TravelerService } from "../services/TravelerService";
import { prisma } from "../prisma/utils/client";

describe("AddressService", () => {
  let travelerService: TravelerService;
  let spyCreate: jest.SpyInstance;
  let spyFindMany: jest.SpyInstance;
  let spyFindFirst: jest.SpyInstance;
  let spyUpdate: jest.SpyInstance;
  let spyDelete: jest.SpyInstance;

  beforeEach(() => {
    travelerService = new TravelerService();
    spyCreate = jest.spyOn(prisma.traveler, "create");
    spyFindMany = jest.spyOn(prisma.traveler, "findMany");
    spyFindFirst = jest.spyOn(prisma.traveler, "findFirst");
    spyUpdate = jest.spyOn(prisma.traveler, "update");
    spyDelete = jest.spyOn(prisma.traveler, "delete");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new traveler", async () => {
    const traveler = {
      name: "fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "12345",
      phone: "00000000000",
      birthdate: "2024-03-03T04:51:05.499Z",
      addressId: null,
      companyId: null,
    };

    const birthdateWithTime = new Date(traveler.birthdate);
    birthdateWithTime.setHours(0, 0, 0, 0);

    spyCreate.mockReturnValue({
      id: 999999,
      name: "Fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "#uy&2gfrd213ighjmbN@*1bnmnb",
      phone: "00000000000",
      birthdate: "2000-01-01",
      role: "TRAVELER",
      addressId: null,
      companyId: null,
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    });

    spyFindFirst.mockReturnValue(null);

    const createTraveler = await travelerService.create(
      traveler.name,
      traveler.email,
      traveler.cpf,
      traveler.password,
      traveler.phone,
      birthdateWithTime,
      traveler.addressId,
      traveler.companyId
    );

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createTraveler.id).toEqual(999999);
    expect(createTraveler.name).toEqual("Fulano");
    expect(createTraveler.role).toEqual("TRAVELER");
  });

  it("Should be list all travelers", async () => {
    spyFindMany.mockReturnValue([
      {
        id: 999999,
        name: "Ciclano",
        email: "ciclano@mail.com",
        cpf: "00000000001",
        password: "12345",
        phone: "00000000000",
        birthdate: "2000-01-01T00:00:00.000Z",
        role: "TRAVELER",
        addressId: null,
        companyId: null,
        createdAt: "2024-03-03T04:51:05.499Z",
        updatedAt: "2024-03-03T04:51:05.499Z",
      },
      {
        id: 888888,
        name: "Fulano",
        email: "fulano@mail.com",
        cpf: "00000000001",
        password: "12345",
        phone: "00000000000",
        birthdate: "2023-03-21T00:00:00.000Z",
        role: "TRAVELER",
        addressId: 1,
        companyId: null,
        createdAt: "2024-03-03T04:51:05.499Z",
        updatedAt: "2024-03-03T04:51:05.499Z",
        address: {
          id: 1,
          street: "Nome da Rua",
          city: "Nome da Cidade",
          state: "Nome do Estado",
          country: "Nome do País",
          number: "0000",
          zipCode: "00000000",
          createdAt: "2024-04-02T22:41:15.757Z",
          updatedAt: "2024-04-02T22:41:15.757Z",
        },
      },
    ]);

    const listTraveler = await travelerService.listAll();

    expect(spyFindMany).toHaveBeenCalledTimes(1);
    expect(listTraveler.length).toBe(2);
    expect(listTraveler[0].email).toEqual("ciclano@mail.com");
    expect(listTraveler[1].birthdate).toEqual("2023-03-21T00:00:00.000Z");
  });

  it("Should list a unique traveler by id", async () => {
    spyFindFirst.mockReturnValue({
      id: 888888,
      name: "Fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "12345",
      phone: "00000000000",
      birthdate: "2023-03-21T00:00:00.000Z",
      role: "TRAVELER",
      addressId: 1,
      companyId: null,
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
      address: {
        id: 1,
        street: "Nome da Rua",
        city: "Nome da Cidade",
        state: "Nome do Estado",
        country: "Nome do País",
        number: "0000",
        zipCode: "00000000",
        createdAt: "2024-04-02T22:41:15.757Z",
        updatedAt: "2024-04-02T22:41:15.757Z",
      },
    });

    const travelerById = await travelerService.findById(888888);

    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(travelerById.id).toEqual(888888);
    expect(travelerById.cpf).toEqual("00000000001");
  });

  it("Should list a unique traveler by email", async () => {
    spyFindFirst.mockReturnValue({
      id: 888888,
      name: "Fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "12345",
      phone: "00000000000",
      birthdate: "2023-03-21T00:00:00.000Z",
      role: "TRAVELER",
      addressId: 1,
      companyId: null,
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
      address: {
        id: 1,
        street: "Nome da Rua",
        city: "Nome da Cidade",
        state: "Nome do Estado",
        country: "Nome do País",
        number: "0000",
        zipCode: "00000000",
        createdAt: "2024-04-02T22:41:15.757Z",
        updatedAt: "2024-04-02T22:41:15.757Z",
      },
    });

    const travelerById = await travelerService.findByEmail("fulano@mail.com");

    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(travelerById.id).toEqual(888888);
    expect(travelerById.email).toEqual("fulano@mail.com");
  });

  it("Should list a unique traveler by cpf", async () => {
    spyFindFirst.mockReturnValue({
      id: 888888,
      name: "Fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "12345",
      phone: "00000000000",
      birthdate: "2023-03-21T00:00:00.000Z",
      role: "TRAVELER",
      addressId: 1,
      companyId: null,
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
      address: {
        id: 1,
        street: "Nome da Rua",
        city: "Nome da Cidade",
        state: "Nome do Estado",
        country: "Nome do País",
        number: "0000",
        zipCode: "00000000",
        createdAt: "2024-04-02T22:41:15.757Z",
        updatedAt: "2024-04-02T22:41:15.757Z",
      },
    });

    const travelerById = await travelerService.findByCPF("00000000001");

    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(travelerById.id).toEqual(888888);
    expect(travelerById.cpf).toEqual("00000000001");
  });

  it("Should update a traveler by id", async () => {
    spyUpdate.mockReturnValue({
      id: 999999,
      name: "Fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "12345",
      phone: "00000000000",
      birthdate: "2023-03-21T00:00:00.000Z",
      role: "TRAVELER",
      addressId: null,
      companyId: null,
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    });

    const travelerUpdated = await travelerService.update(999999, "Fulano");

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(travelerUpdated.id).toEqual(999999);
    expect(travelerUpdated.name).toEqual("Fulano");
  });

  it("Should delete a traveler by id", async () => {
    const traveler = {
      id: 999999,
      name: "Fulano",
      email: "fulano@mail.com",
      cpf: "00000000001",
      password: "12345",
      phone: "00000000000",
      birthdate: "2023-03-21T00:00:00.000Z",
      role: "TRAVELER",
      addressId: null,
      companyId: null,
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    };

    spyDelete.mockReturnValue({ msg: "Address deleted successfully" });

    const travelerDeleted = await travelerService.delete(traveler.id);

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(travelerDeleted).toEqual({ msg: "Address deleted successfully" });
  });
});
