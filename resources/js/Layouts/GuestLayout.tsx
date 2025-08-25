import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import logo from '@/Assets/Icon.png'
import  '@/Style/Guest.css'

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className='guestcontainer'>
            <div className='navbar'>
                <img src={logo} alt="" />
                <h1>Institut National Polytechnique Félix Houphouët-Boigny</h1>
            </div>





            <div>
                {children}
            </div>
            
        </div>
    );
}
