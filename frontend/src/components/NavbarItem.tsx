import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

export function NavItem({ to, children }: NavItemProps) {
  return (
    <Link
      draggable={false}
      to={to}
      className="
        group
        relative
        px-3
        py-1
        text-white
        text-2xl
        transition-colors
        duration-400
      hover:text-gray-400
        active:scale-96
      "
    >
      <span className="relative inline-block">
        {children}

        <span
          className="
            absolute
            left-1/2
            -bottom-0.5
            h-px
            w-full
            bg-gray-400
            scale-x-0
            -translate-x-1/2
            transition-transform
            duration-400
            ease-out
            group-hover:scale-x-100
          "
        />
      </span>
    </Link>
  );


}


