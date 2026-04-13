export const instrumentTypes = ["CORDA", "SOPRO", "PERCURSSAO", "TECLADO"] as const;

export type InstrumentType = (typeof instrumentTypes)[number];

export interface Instrument {
  id: string;
  name: string;
  type: InstrumentType;
  brand: string;
  model: string;
  price: number;
  stock: number;
}

export interface InstrumentPayload {
  name: string;
  type: InstrumentType;
  brand: string;
  model: string;
  price: number;
  stock: number;
}

export const emptyInstrumentPayload: InstrumentPayload = {
  name: "",
  type: "CORDA",
  brand: "",
  model: "",
  price: 0,
  stock: 0,
};
