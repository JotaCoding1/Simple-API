import api from "./api";
import type { Instrument, InstrumentPayload } from "../models/instrument";

export async function getAllInstruments(): Promise<Instrument[]> {
  const response = await api("/instruments");
  return (await response.json()) as Instrument[];
}

export async function createInstrument(payload: InstrumentPayload): Promise<Instrument> {
  const response = await api("/instruments", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return (await response.json()) as Instrument;
}

export async function updateInstrument(id: string, payload: InstrumentPayload): Promise<Instrument> {
  const response = await api(`/instruments/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return (await response.json()) as Instrument;
}

export async function deleteInstrument(id: string): Promise<void> {
  await api(`/instruments/${id}`, {
    method: "DELETE",
  });
}
