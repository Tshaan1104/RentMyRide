import Link from 'next/link';
import Image from 'next/image';
import img1 from '../../public/rmr logo.png'
import img2 from '../../public/rmr block logo.png'
import { Usernav } from './usernav';
import SearchComponents from './searchcomponents';

export function Navbar(){
    return (
        <nav className="w-full border-b">
<div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
<Link href="/">
<Image src={img1} alt="Desktop Logo" className='w-32 hidden lg:block'/>

<Image src={img2} alt="mobile logo" className='block lg:hidden w-12' priority/>

</Link>
<SearchComponents/>

<Usernav/>
</div>
        </nav>
    );
}