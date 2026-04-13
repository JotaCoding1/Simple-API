import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import type { Instrument } from "../models/instrument";
import { deleteInstrument, getAllInstruments } from "../services/instrumentService";

interface StorageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StorageModal: React.FC<StorageModalProps> = ({ isOpen, onClose }) => {
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingInstrumentId, setDeletingInstrumentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchInstrumentos();
    }
  }, [isOpen]);

  const fetchInstrumentos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllInstruments();
      setInstrumentos(data);
    } catch {
      setError("Erro ao carregar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este instrumento?")) {
      return;
    }

    setDeletingInstrumentId(id);
    setError(null);

    try {
      await deleteInstrument(id);
      setInstrumentos((prev) => prev.filter((instrumento) => instrumento.id !== id));
    } catch {
      setError("Erro ao excluir instrumento. Tente novamente.");
    } finally {
      setDeletingInstrumentId(null);
    }
  };

  const formatType = (type: string) =>
    type
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 sm:p-6">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all active:scale-95"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-(--text-main-color) mb-2">Instrumentos</h2>
        <p className="text-(--text-main-color) opacity-70 text-sm mb-6">Acesse seu ambiente interno para continuar.</p>

         <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--button-main-color)"></div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700 text-center">
              {error}
            </div>
          )}

          {!loading && instrumentos.length === 0 && !error && (
            <div className="text-center text-(--text-main-color) opacity-70 py-8">
              <p>Nenhum instrumento registrado ainda.</p>
            </div>
          )}

          {!loading && instrumentos.length > 0 && (
            <div className="space-y-4">
              <p className="font-semibold text-(--text-main-color)">
                Instrumentos Registrados ({instrumentos.length})
              </p>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {instrumentos.map((instrumento) => (
                  <div
                    key={instrumento.id}
                    className="rounded-lg bg-(--card-main-color) p-4 border border-(--button-main-color)/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-(--text-main-color)">{instrumento.name}</p>
                        <p className="text-sm text-(--text-main-color) opacity-80">Tipo: {formatType(instrumento.type)}</p>
                        <p className="text-sm text-(--text-main-color) opacity-80">Marca: {instrumento.brand}</p>
                        <p className="text-sm text-(--text-main-color) opacity-80">Modelo: {instrumento.model}</p>
                        <p className="text-sm text-(--text-main-color) opacity-80">Preco: {formatPrice(instrumento.price)}</p>
                        <p className="text-sm text-(--text-main-color) opacity-80">Estoque: {instrumento.stock}</p>
                        <p className="text-xs text-(--button-main-color) mt-1">ID: {instrumento.id}</p>
                        <button
                          onClick={() => handleDelete(instrumento.id)}
                          disabled={deletingInstrumentId === instrumento.id}
                          className="mt-3 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                        >
                          {deletingInstrumentId === instrumento.id ? "Excluindo..." : "Excluir"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-(--text-main-color) hover:bg-gray-300 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={fetchInstrumentos}
            disabled={loading}
            className="rounded-lg bg-(--button-main-color) px-6 py-2 font-semibold text-white hover:bg-(--hover-main-color) transition-colors disabled:opacity-50"
          >
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StorageModal;