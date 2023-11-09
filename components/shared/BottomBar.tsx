"use client"
import { sidebar_links } from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function BottomBar() {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebar_links.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && 'bg-secondary-500'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>

    </section>
  )
}