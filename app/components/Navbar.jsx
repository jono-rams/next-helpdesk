import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }) {
  return (
    <nav>
      <Link href="/">
        <Image
          src={Logo}
          alt="Dojo Helpdesk logo"
          width={70}
          quality={100}
          placeholder="blur"
          priority="true"
          className="inline-block mr-2"
        />
        <h1 className="inline-block">Jono&#39;s Helpdesk</h1>
      </Link>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">Tickets</Link>

      {user && <span>Hello, {user.email}</span>}
      <LogoutButton />
    </nav>
  );
}
