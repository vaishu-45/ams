import FooterLogo from '../assets/Foooter - Logo.jpg'
import '../styles/Footer.css'

function Footer() {

    const IconInstagram = () => (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="3.2" />
            <circle cx="17.5" cy="6.5" r="0.7" fill="white" stroke="none" />
        </svg>


    );

    const IconX = () => (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="white"
            aria-hidden="true">
            <path d="M18.244 2H21.5l-7.31 8.366L22 22h-4.998l-5.217-6.797L5.9 22H2.64l7.826-8.955L2 2h5.034l4.713 6.207L18.244 2zm-.877 17.591h1.387L7.048 4.329H5.553l11.814 15.262z" />
        </svg>

    );

    const IconFacebook = () => (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="white"
            aria-hidden="true">
            <path d="M22.675 0h-21.35C.594 0 0 .593 0 1.326v21.348C0 23.407.594 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.324 0 2.462.099 2.793.143v3.24h-1.918c-1.504 0-1.796.716-1.796 1.763v2.314h3.59l-.467 3.296h-3.123V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
        </svg>

    );

    return (
        <>
            <footer className="bg-[#181717] px-4 md:px-16 lg:px-28 py-10">
                <div className="footer-in-it flex sm:flex-col lg:flex-row md:flex-row sm:items-center md:items-center lg:items-center">

                    {/* This is the div where there are logo and icons */}
                    <div className='logo-icon flex flex-col items-center md:items-start md:w-[30%] sm:h-30 md:h-50 lg:h-80'>
                        <div className='img-div'>
                            <img
                                src={FooterLogo}
                                alt='Logo'
                                className='logo-img py-10 sm:h-10 md:h-40 lg:h-60'
                            />~
                        </div>
                        <div className='icon-div flex justify-between gap-x-6 sm:h-5 md:h-7 lg:h-10'>
                            <a href="#" aria-label="instagram" className="text-white hover:opacity-80"><IconInstagram /></a>
                            <a href="#" aria-label="x" className="text-white hover:opacity-80"><IconX /></a>
                            <a href="#" aria-label="facebook" className="text-white hover:opacity-80"><IconFacebook /></a>
                        </div>
                    </div>

                    {/* This is the div where there are links to aboutUs and all */}
                    <div className='the-three-blocks flex items-center justify-center md:w-[60%] border-t border-b text-white md:h-40 lg:h-50'>

                        <div className="ttb flex md:flex-row lg:flex-row w-[90%]">
                            <div className='col-1 lg:w-[30%] md:w-[30%] text-center lg:text-xl'>
                                <h3>About Us</h3>
                                <h3>FAQs</h3>
                                <h3>Privacy Policy</h3>
                            </div>
                            <div className='col-2 lg:w-[30%] md:w-[30%]  text-center lg:text-xl'>
                                <h3>Contact Us</h3>
                                <h3>7676767676</h3>
                                <h3 className='wrap-break-word'>adarshmutton@gmail.com</h3>
                            </div>
                            <div className='col-3 lg:w-[40%] md:w-[40%] text-center lg:text-xl'>
                                <h3>Registered office address :</h3>
                                <h3>Panwari ke peeche wali patli gali me hai tumhare sajan ki MUTTON SHOP</h3>
                            </div>
                        </div>

                    </div>

                </div>


                <div className="neeche-ka mt-20 h-10 md:h-7 sm:h-5 pt-6 text-center text-sm text-gray-400 ">
                    © {new Date().getFullYear()} ADARSH MUTTON SHOP. All rights reserved.
                </div>

            </footer>
        </>
    )

}

export default Footer