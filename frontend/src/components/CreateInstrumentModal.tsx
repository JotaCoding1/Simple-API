import { useMemo, useState } from "react";
import type { SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { emptyInstrumentPayload, instrumentTypes, } from "../models/instrument";
import type { InstrumentPayload } from "../models/instrument";
import { createInstrument } from "../services/instrumentService";

interface CreateInstrumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormState = { ...emptyInstrumentPayload };

const CreateInstrumentModal: React.FC<CreateInstrumentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<InstrumentPayload>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isDisabled = useMemo(() => {
    return (
      isSubmitting ||
      formData.name.trim().length === 0 ||
      formData.brand.trim().length === 0 ||
      formData.model.trim().length === 0
    );
  }, [formData, isSubmitting]);

  const resetState = () => {
    setFormData(initialFormState);
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const payload: InstrumentPayload = {
        ...formData,
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        model: formData.model.trim(),
      };

      await createInstrument(payload);
      setSuccessMessage("Instrumento cadastrado com sucesso.");
      setFormData(initialFormState);
    } catch {
      setError("Nao foi possivel cadastrar o instrumento. Verifique os dados e tente novamente.");
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
          aria-label="Fechar cadastro"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-2 text-3xl font-bold text-(--text-main-color)">Cadastrar instrumento</h2>
        <p className="mb-6 text-sm text-(--text-main-color) opacity-70">Preencha os campos para adicionar um novo item ao estoque.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
              Nome
              <input
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                placeholder="Ex.: Violao"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
              Tipo
              <select
                value={formData.type}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, type: event.target.value as InstrumentPayload["type"] }))
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
                onChange={(event) => setFormData((prev) => ({ ...prev, brand: event.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                placeholder="Ex.: Yamaha"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
              Modelo
              <input
                value={formData.model}
                onChange={(event) => setFormData((prev) => ({ ...prev, model: event.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal text-(--text-main-color) outline-none transition-colors focus:border-(--button-main-color)"
                placeholder="Ex.: C40"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-(--text-main-color)">
              Preco
              <input
                type="number"
                min="0"
                placeholder="Ex.: 500"
                step="0.01"
                onChange={(event) => setFormData((prev) => ({ ...prev, price: Number(event.target.value) }))}
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
                placeholder="Ex.: 4"
                onChange={(event) => setFormData((prev) => ({ ...prev, stock: Number(event.target.value) }))}
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
              disabled={isDisabled}
              className="rounded-lg bg-(--button-main-color) px-6 py-2 font-semibold text-white transition-colors hover:bg-(--hover-main-color) disabled:opacity-50"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateInstrumentModal;
