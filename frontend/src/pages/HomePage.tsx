import { useState } from "react";
import StorageModal from "../components/StorageModal";
import CreateInstrumentModal from "../components/CreateInstrumentModal";
import UpdateInstrumentModal from "../components/UpdateInstrumentModal";


export function Home() {
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-16 pt-5 sm:px-6 lg:px-8" draggable={false}>

      <section className="space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-(--text-main-color)">
            Aula API
            <br />
            Professor <span className="text-amber-600 font-extrabold hover:text-9xl hover:text-red-600   transition-all duration-500">Tiago</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-(--text-main-color) opacity-80">
            -Atividade 1-
          </h2>
        </div>

        <div className="mt-8 rounded-2xl bg-(--card-main-color) p-8 sm:p-12 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--text-main-color)">
            Bem vindo à
            <span className="block text-amber-600 mt-2"> Loja de Instrumentos!</span>
          </h1>
          <h2 className="text-(--text-main-color) text-lg mt-4 opacity-80">A sua loja favorita de items!</h2>
        </div>
      </section>


      <section className="space-y-8">
        <h1 className="text-center font-bold text-2xl sm:text-3xl text-(--text-main-color)">
          O que deseja fazer hoje?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-(--button-main-color) px-6 py-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-(--hover-main-color) hover:scale-105 active:scale-95 shadow-md hover:shadow-lg w-full"
          >
            Cadastrar instrumento
          </button>
          <button
            onClick={() => setIsStorageModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-(--button-main-color) px-6 py-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-(--hover-main-color) hover:scale-105 active:scale-95 shadow-md hover:shadow-lg w-full"
          >
            Ver nosso estoque
          </button>
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-(--button-main-color) px-6 py-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-(--hover-main-color) hover:scale-105 active:scale-95 shadow-md hover:shadow-lg w-full"
          >
            Atualizar instrumento
          </button>
        </div>
      </section>

      <section className="space-y-2 rounded-2xl bg-(--card-main-color)/50 p-8 sm:p-12 text-center max-w-3xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-(--text-main-color)">
          Obrigado por acessar!
        </h2>
        <p className="text-(--text-main-color) text-lg opacity-80">
         :D 
        </p>
        <span className="text-transparent hover:text-red-600 hover:text-7xl transition-all duration-400">VAI MENGÃO</span>
      </section>


      <StorageModal isOpen={isStorageModalOpen} onClose={() => setIsStorageModalOpen(false)} />
      <CreateInstrumentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <UpdateInstrumentModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} />
    </div>
  );
}
