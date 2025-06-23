import BookshelfIcon from "../assets/bookshelf-nav.svg?react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 p-4 flex item-center justify-center w-full h-16 bg-transparent">
      <ul className="flex items-center justify-between gap-10 mx-20 w-full rounded-full">
        <li>
          <BookshelfIcon className="h-10 w-10 stroke-black stroke-[2]" />
        </li>
        <ul className="flex space-x-5 text-white text-shadow-2xs">
          <li>Our Story</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>
      </ul>
    </nav>
  );
};

export default Navbar;
