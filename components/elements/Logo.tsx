import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/dashboard"}>
    <div className='cursor-pointer'>
      <Image
      src={"/logo.png"}
      alt='logo Image'
      width={275}
      height={182}
      className='object-cover object-center max-w-[275px] mx-auto'
      />
      <h2 className='text-center font-extrabold text-2xl'>
        GEOGRAPHY <br />GEYSER
      </h2>
    </div>
    </Link>
  )
}

export default Logo
