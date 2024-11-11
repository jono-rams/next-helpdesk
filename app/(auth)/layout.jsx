import Link from "next/link";
import Image from "next/image";
import Logo from "../components/dojo-logo.png";

export default function AuthLayout({ children }) {
  return (
    <>
      <nav>
        <Image
          src={Logo}
          alt="Dojo Helpdesk logo"
          width={70}
          quality={100}
          placeholder="blur"
          priority="true"
          className="inline-block mr-2"
        />
        <h1>Jono&#39;s Helpdesk</h1>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
