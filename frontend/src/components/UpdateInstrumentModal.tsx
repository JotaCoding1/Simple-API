import { useEffect, useMemo, useState } from "react";
import type { SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import {
  instrumentTypes,
} from "../models/instrument";
import type { Instrument, InstrumentPayload } from "../models/instrument";
import { getAllInstruments, updateInstrument } from "../services/instrumentService";

interface UpdateInstrumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mapInstrumentToPayload = (instrument: Instrument): InstrumentPayload => ({
  name: instrument.name,
  type: instrument.type,
  brand: instrument.brand,
  model: instrument.model,
  price: instrument.price,
  stock: instrument.stock,
});

const UpdateInstrumentModal: React.FC<UpdateInstrumentModalProps> = ({ isOpen, onClose }) => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState("");
  const [formData, setFormData] = useState<InstrumentPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedInstrument = useMemo(
    () => instruments.find((instrument) => instrument.id === selectedInstrumentId) ?? null,
    [instruments, selectedInstrumentId]
  );

  const resetState = () => {
    setInstruments([]);
    setSelectedInstrumentId("");
    setFormData(null);
    setError(null);
    setSuccessMessage(null);
    setLoading(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const fetchInstruments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllInstruments();
      setInstruments(data);

      if (data.length > 0) {
        setSelectedInstrumentId(data[0].id);
        setFormData(mapInstrumentToPayload(data[0]));
      } else {
        setSelectedInstrumentId("");
        setFormData(null);
      }
    } catch {
      setError("Nao foi possivel carregar os instrumentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchInstruments();
  }, [isOpen]);

  const handleSelectChange = (id: string) => {
    setSelectedInstrumentId(id);
    const targetInstrument = instruments.find((instrument) => instrument.id === id);
    setFormData(targetInstrument ? mapInstrumentToPayload(targetInstrument) : null);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedInstrumentId || !formData) {
      setError("Selecione um instrumento para atualizar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const payload: InstrumentPayload = {
        ...formData,
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        model: formData.model.trim(),
      };

      const updated = await updateInstrument(selectedInstrumentId, payload);
      setInstruments((prev) => prev.map((instrument) => (instrument.id === updated.id ? updated : instrument)));
      setFormData(mapInstrumentToPayload(updated));
      setSuccessMessage("Instrumento atualizado com sucesso.");
    } catch {
      setError("Nao foi possivel atualizar o instrumento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 sm:p-6">
      <div onClick={handleClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 active:scale-95"
          aria-label="Fechar atualizacao"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-2 text-3xl font-bold text-(--text-main-color)">Atualizar instrumento</h2>
        <p className="mb-6 text-sm text-(--text-main-color) opacity-70">Selecione um item existente e altere os campos desejados.</p>

        <div className="mb-4">
          <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
            Instrumento
            <select
              value={selectedInstrumentId}
              onChange={(event) => handleSelectChange(event.target.value)}
              disabled={loading || instruments.length === 0}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {instruments.length === 0 && <option value="">Nenhum instrumento encontrado</option>}
              {instruments.map((instrument) => (
                <option key={instrument.id} value={instrument.id}>
                  {instrument.name} - {instrument.brand}
                </option>
              ))}
            </select>
          </label>
          {selectedInstrument && <p className="mt-2 text-xs text-(--button-main-color)">ID: {selectedInstrument.id}</p>}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-(--button-main-color)" />
          </div>
        )}

        {!loading && formData && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
                Nome
                <input
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => (prev ? { ...prev, name: event.target.value } : prev))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
                Tipo
                <select
                  value={formData.type}
                  onChange={(event) =>
                    setFormData((prev) =>
                      prev ? { ...prev, type: event.target.value as InstrumentPayload["type"] } : prev
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                >
                  {instrumentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
                Marca
                <input
                  value={formData.brand}
                  onChange={(event) => setFormData((prev) => (prev ? { ...prev, brand: event.target.value } : prev))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
                Modelo
                <input
                  value={formData.model}
                  onChange={(event) => setFormData((prev) => (prev ? { ...prev, model: event.target.value } : prev))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
                Preco
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData((prev) => (prev ? { ...prev, price: Number(event.target.value) } : prev))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
                Estoque
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={(event) =>
                    setFormData((prev) => (prev ? { ...prev, stock: Number(event.target.value) } : prev))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                  required
                />
              </label>
            </div>

            {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {successMessage && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{successMessage}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-(--text-main-color) transition-colors hover:bg-gray-300"
              >
                Fechar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-(--button-main-color) px-6 py-2 font-semibold text-white transition-colors hover:bg-(--hover-main-color) disabled:opacity-50"
              >
                {isSubmitting ? "Atualizando..." : "Atualizar"}
              </button>
            </div>
          </form>
        )}

        {!loading && instruments.length === 0 && (
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
            Nao ha instrumentos cadastrados para atualizar.
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default UpdateInstrumentModal;
