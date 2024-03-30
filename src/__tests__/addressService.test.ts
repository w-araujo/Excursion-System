import { AddressService } from "../services/AddressService";
import { prisma } from "../prisma/utils/client";

describe("AddressService", () => {
  let addressService: AddressService;
  let spyCreate: jest.SpyInstance;
  let spyFindMany: jest.SpyInstance;
  let spyFindFirst: jest.SpyInstance;
  let spyUpdate: jest.SpyInstance;
  let spyDelete: jest.SpyInstance;

  beforeEach(() => {
    addressService = new AddressService();
    spyCreate = jest.spyOn(prisma.address, "create");
    spyFindMany = jest.spyOn(prisma.address, "findMany");
    spyFindFirst = jest.spyOn(prisma.address, "findFirst");
    spyUpdate = jest.spyOn(prisma.address, "update");
    spyDelete = jest.spyOn(prisma.address, "delete");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new address", async () => {
    const address = {
      street: "Rua X",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      number: "1234",
      zipCode: "00000000",
    };

    spyCreate.mockReturnValue({
      id: 999999,
      street: "Rua X",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      number: "1234",
      zipCode: "00000000",
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    });

    const createAddress = await addressService.create(
      address.street,
      address.city,
      address.state,
      address.country,
      address.number,
      address.zipCode
    );

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createAddress.id).toEqual(999999);
    expect(createAddress.country).toEqual("Brasil");
  });

  it("Should be list all address", async () => {
    spyFindMany.mockReturnValue([
      {
        id: 999999,
        street: "Rua X",
        city: "Porto Alegre",
        state: "RS",
        country: "Brasil",
        number: "1234",
        zipCode: "00000001",
        createdAt: "2024-03-03T04:51:05.499Z",
        updatedAt: "2024-03-03T04:51:05.499Z",
      },
      {
        id: 888888,
        street: "Rua Y",
        city: "Belo Horizonte",
        state: "MG",
        country: "Brasil",
        number: "4321",
        zipCode: "00000002",
        createdAt: "2024-05-03T04:51:05.499Z",
        updatedAt: "2024-05-03T04:51:05.499Z",
      },
    ]);

    const listAddress = await addressService.listAll();

    expect(spyFindMany).toHaveBeenCalledTimes(1);
    expect(listAddress.length).toBe(2);
    expect(listAddress[0].state).toEqual("RS");
    expect(listAddress[1].state).toEqual("MG");
  });

  it("Should list a unique address by id", async () => {
    spyFindFirst.mockReturnValue({
      id: 999999,
      street: "Rua X",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      number: "1234",
      zipCode: "00000001",
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    });

    const addressById = await addressService.findById(999999);

    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(addressById.id).toEqual(999999);
    expect(addressById.number).toEqual("1234");
  });

  it("Should update an address by id", async () => {
    spyUpdate.mockReturnValue({
      id: 999999,
      street: "Rua X",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      number: "1234",
      zipCode: "00000001",
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    });

    const addressUpdated = await addressService.update(
      999999,
      "Rua X",
      "Porto Alegre",
      "RS",
      "Brasil",
      "1234",
      "00000001"
    );

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(addressUpdated.id).toEqual(999999);
    expect(addressUpdated.zipCode).toEqual("00000001");
  });

  it("Should delete an address by id", async () => {
    const address = {
      id: 999999,
      street: "Rua X",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      number: "1234",
      zipCode: "00000001",
      createdAt: "2024-03-03T04:51:05.499Z",
      updatedAt: "2024-03-03T04:51:05.499Z",
    };

    spyDelete.mockReturnValue({ msg: "Address deleted successfully" });

    const addressDeleted = await addressService.delete(address.id);

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(addressDeleted).toEqual({ msg: "Address deleted successfully" });
  });
});
