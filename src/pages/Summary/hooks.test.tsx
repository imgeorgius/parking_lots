import { renderHook } from "@testing-library/react";
import { useLotsFiltered } from "./hooks";
import { Filter, Sort } from "@/constants/Lots";
import { Lot } from "@/generated/graphql";

describe("useLotsFiltered hook", () => {
  const lots: Lot[] = [
    {
      id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
      address: "123 Street",
      name: "Lot A",
      size: 30,
      status: "active",
      type: "",
    },
    {
      id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
      address: "456 Avenue",
      name: "Lot B",
      size: 50,
      status: "active",
      type: "",
    },
    {
      id: "15800269-f4ac-4e83-9bfe-e3da470075d0",
      address: "789 Boulevard",
      name: "Lot C",
      size: 15,
      status: "active",
      type: "",
    },
    {
      id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
      address: "101 Road",
      name: "Lot D",
      size: 60,
      status: "active",
      type: "",
    },
  ];

  it("should return all lots when no filter or sort is applied", () => {
    const { result } = renderHook(() => useLotsFiltered(lots));

    expect(result.current).toEqual(lots);
  });

  it("should filter lots by size >= 25 when SIZE_25 filter is applied", () => {
    const { result } = renderHook(() =>
      useLotsFiltered(lots, undefined, Filter.SIZE_25)
    );

    expect(result.current).toEqual([
      {
        id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
        address: "123 Street",
        name: "Lot A",
        size: 30,
        status: "active",
        type: "",
      },
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },

      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
    ]);
  });

  it("should filter lots by size >= 50 when SIZE_50 filter is applied", () => {
    const { result } = renderHook(() =>
      useLotsFiltered(lots, undefined, Filter.SIZE_50)
    );

    expect(result.current).toEqual([
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },
      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
    ]);
  });

  it("should sort lots by name in ascending order when NAME_ASC sort is applied", () => {
    const { result } = renderHook(() => useLotsFiltered(lots, Sort.NAME_ASC));

    expect(result.current).toEqual([
      {
        id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
        address: "123 Street",
        name: "Lot A",
        size: 30,
        status: "active",
        type: "",
      },
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },
      {
        id: "15800269-f4ac-4e83-9bfe-e3da470075d0",
        address: "789 Boulevard",
        name: "Lot C",
        size: 15,
        status: "active",
        type: "",
      },
      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
    ]);
  });

  it("should sort lots by name in descending order when NAME_DESC sort is applied", () => {
    const { result } = renderHook(() => useLotsFiltered(lots, Sort.NAME_DESC));

    expect(result.current).toEqual([
      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
      {
        id: "15800269-f4ac-4e83-9bfe-e3da470075d0",
        address: "789 Boulevard",
        name: "Lot C",
        size: 15,
        status: "active",
        type: "",
      },
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },
      {
        id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
        address: "123 Street",
        name: "Lot A",
        size: 30,
        status: "active",
        type: "",
      },
    ]);
  });

  it("should sort lots by address in ascending order when ADDRESS_ASC sort is applied", () => {
    const { result } = renderHook(() =>
      useLotsFiltered(lots, Sort.ADDRESS_ASC)
    );

    expect(result.current).toEqual([
      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
      {
        id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
        address: "123 Street",
        name: "Lot A",
        size: 30,
        status: "active",
        type: "",
      },
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },
      {
        id: "15800269-f4ac-4e83-9bfe-e3da470075d0",
        address: "789 Boulevard",
        name: "Lot C",
        size: 15,
        status: "active",
        type: "",
      },
    ]);
  });

  it("should sort lots by size in ascending order when SIZE_ASC sort is applied", () => {
    const { result } = renderHook(() => useLotsFiltered(lots, Sort.SIZE_ASC));

    expect(result.current).toEqual([
      {
        id: "15800269-f4ac-4e83-9bfe-e3da470075d0",
        address: "789 Boulevard",
        name: "Lot C",
        size: 15,
        status: "active",
        type: "",
      },
      {
        id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
        address: "123 Street",
        name: "Lot A",
        size: 30,
        status: "active",
        type: "",
      },
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },

      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
    ]);
  });

  it("should sort lots by size in descending order when SIZE_DESC sort is applied", () => {
    const { result } = renderHook(() => useLotsFiltered(lots, Sort.SIZE_DESC));

    expect(result.current).toEqual([
      {
        id: "19d9fb52-d0b3-43b0-8c38-1a4a8b9caa5b",
        address: "101 Road",
        name: "Lot D",
        size: 60,
        status: "active",
        type: "",
      },
      {
        id: "0ef7ff09-b32e-43e6-ab58-95b6c0a39b4a",
        address: "456 Avenue",
        name: "Lot B",
        size: 50,
        status: "active",
        type: "",
      },
      {
        id: "0945f12b-5b44-428d-aec5-df703dfadeb6",
        address: "123 Street",
        name: "Lot A",
        size: 30,
        status: "active",
        type: "",
      },

      {
        id: "15800269-f4ac-4e83-9bfe-e3da470075d0",
        address: "789 Boulevard",
        name: "Lot C",
        size: 15,
        status: "active",
        type: "",
      },
    ]);
  });
});
