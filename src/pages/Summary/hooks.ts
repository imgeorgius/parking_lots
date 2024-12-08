import { Filter, Sort } from "@/constants/Lots";
import { Lot } from "@/generated/graphql";
import { useMemo } from "react";

export const useLotsFiltered = (
  lots: Lot[],
  sort?: string,
  filter?: string
) => {
  return useMemo(() => {
    let lotsToRender = [...lots];

    if (filter) {
      lotsToRender = lotsToRender.filter((lot) => {
        switch (filter) {
          case Filter.SIZE_25:
            return lot.size >= 25;
          case Filter.SIZE_50:
            return lot.size >= 50;
          default:
            return true;
        }
      });
    }

    if (sort) {
      lotsToRender = lotsToRender.sort((a, b) => {
        switch (sort) {
          case Sort.NAME_ASC:
            return a.name.localeCompare(b.name, "kn", { numeric: true });
          case Sort.NAME_DESC:
            return b.name.localeCompare(a.name, "kn", { numeric: true });

          case Sort.ADDRESS_ASC:
            return a.address.localeCompare(b.address, "kn", { numeric: true });
          case Sort.ADDRESS_DESC:
            return b.address.localeCompare(a.address, "kn", { numeric: true });

          case Sort.SIZE_ASC:
            return a.size - b.size;
          case Sort.SIZE_DESC:
            return b.size - a.size;

          default:
            return 0;
        }
      });
    }

    return lotsToRender;
  }, [lots, sort, filter]);
};
