import {useEffect, useRef, useState} from 'react';
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useWindowScroll} from "react-use";
import gsap from "gsap";

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNivisible, setIsNivisible] = useState(false)
    const navContainerRef = useRef(null);
    const audioElamantRef = useRef(null);

    const {y: currentScroolY} = useWindowScroll()

    useEffect(() => {
        if(currentScroolY === 0) {
            setIsNivisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        }else if(currentScroolY > lastScrollY) {
            setIsNivisible(false)
            navContainerRef.current.classList.add('floating-nav')
        }else if(currentScroolY < lastScrollY) {
            setIsNivisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }

        setLastScrollY(currentScroolY)
        
    }, [currentScroolY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNivisible ? 0 : -100,
            opacity: isNivisible ? 1 : 0,
            duration: 0.2,
        })
    }, [isNivisible])

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if(isAudioPlaying){
            audioElamantRef.current.play();
        }else {
            audioElamantRef.current.pause();
        }

    }, [isAudioPlaying]);
    return (
        <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        <img src="/img/logo.png" alt="logo" className='w-10'/>
                        <Button id='product-button' title='Product' rightIcon={<TiLocationArrow/>} containerClass='bg-blue-50 md:flex items-center hidden justify-center gap-1'/>
                    </div>
                    <div className='flex items-center h-full'>
                        <div className='hidden md:block'>
                            {navItems.map((item) => (
                                <a key={item} className='nav-hover-btn' href={`#${item.toLocaleLowerCase()}`}>
                                    {item}
                                </a>
                            ))}
                        </div>
                        <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                            <audio src="/audio/loop.mp3" ref={audioElamantRef} className='hidden' loop/>
                                {[1,2,3,4].map((bar) => (
                                    <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}}/>

                                ))}

                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;