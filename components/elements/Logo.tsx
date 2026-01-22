import Image from 'next/image'
import Link from 'next/link'

interface LogoProps{
  size?: string;
}
function Logo({size="max-w-[275px]"}:LogoProps) {
  return (
    <Link href={"/dashboard"}>
    <div className='cursor-pointer'>
      <Image
      src={"/logo.png"}
      alt='logo Image'
      width={275}
      height={182}
      className={`object-cover object-center ${size} mx-auto`}
      />
      <h2 className={`text-center font-extrabold ${size !== "max-w-[275px]" ? "text-lg":"text-2xl"}`}>
        GEOGRAPHY <br />GEYSER
      </h2>
    </div>
    </Link>
  )
}

export default Logo
