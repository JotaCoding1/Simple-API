export function Footer() {
  return (
    <footer className="w-full border-t border-(--button-main-color)/20 bg-(--card-main-color) py-8 px-4 sm:px-6 lg:px-8 text-(--text-main-color)">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
 
          <div className="select-none text-lg sm:text-xl font-bold tracking-tighter cursor-default">
            Joao<span className="text-amber-600">.</span>
          </div>

          <p className="text-sm text-center order-3 md:order-2 opacity-75">
            &copy; {new Date().getFullYear()} Sistema pra aula. Todos direitos são MEUS.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 order-2 md:order-3 text-sm font-medium">
            <li>
              <a href="#" className="transition-all duration-200 hover:text-amber-600 hover:underline underline-offset-4">
                Política de Privacidade? Não temos!
              </a>
            </li>
            <li>
              <a href="#" className="transition-all duration-200 hover:text-amber-600 hover:underline underline-offset-4">
                Termos de Serviço? Todos!
              </a>
            </li>
            <li>
              <a href="#" className="transition-all duration-200 hover:text-amber-600 hover:underline underline-offset-4">
                Fale Conosco. Por favor não!
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}