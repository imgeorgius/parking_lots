import { Lot } from "@/generated/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LotsSlice = {
  acceptedLots: Lot[];
  rejectedLots: Lot[];
  offset: number;
};

const initialState: LotsSlice = {
  acceptedLots: [],
  rejectedLots: [],
  offset: 0,
};

const lotsSlice = createSlice({
  name: "lots",
  initialState,
  reducers: {
    addAcceptedLot(state, action: PayloadAction<Lot>) {
      const newLot = action.payload;

      const updatedLots = state.acceptedLots;
      updatedLots.unshift(newLot);

      state.acceptedLots = updatedLots;
    },

    addRejectedLot(state, action: PayloadAction<Lot>) {
      const newLot = action.payload;

      const updatedLots = state.rejectedLots;
      updatedLots.unshift(newLot);

      state.rejectedLots = updatedLots;
    },

    removeAcceptedLot(state, action: PayloadAction<string>) {
      const lotId = action.payload;

      let updatedLots = state.acceptedLots;
      updatedLots = updatedLots.filter(({ id }) => id !== lotId);

      state.acceptedLots = updatedLots;
    },

    removeRejectedLot(state, action: PayloadAction<string>) {
      const lotId = action.payload;

      let updatedLots = state.rejectedLots;
      updatedLots = updatedLots.filter(({ id }) => id !== lotId);

      state.rejectedLots = updatedLots;
    },

    setOffset(state, action: PayloadAction<number>) {
      const newOffset = action.payload;
      state.offset = newOffset;
    },
  },
});

export default lotsSlice.reducer;

export const {
  addAcceptedLot,
  addRejectedLot,
  removeAcceptedLot,
  removeRejectedLot,
  setOffset,
} = lotsSlice.actions;
