export default function Footer() {
  return (
    <footer className="z -10 absolute bottom-4 text-xs">
      <nav className="flex h-4 w-full divide-x">
        <a
          href="#"
          className="flex items-center gap-1 px-2 text-gray-600 transition-colors hover:text-gray-900"
        >
          FAQ
        </a>
        <a className="flex items-center gap-1 px-2 text-gray-600 transition-colors hover:text-gray-900">
          Terms
        </a>
        <a className="flex items-center gap-1 px-2 text-gray-600 transition-colors hover:text-gray-900">
          Privacy
        </a>
      </nav>
    </footer>
  );
}
