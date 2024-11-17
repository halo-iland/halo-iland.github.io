'use client'
import { useState } from 'react'
import style from './index.module.scss'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToId = (id:string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
        setIsOpen(false);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    } 

    return (
        <header className={style.header}>
            <button className={`${style.hamburger} ${isOpen ? style.active : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span> 
                <span></span>
            </button>
            <nav className={`${style.nav} ${isOpen ? style.open: ''}`}>
                <ul>
                    <li>
                        <button onClick={() => scrollToId("concept")}>Top</button>
                    </li>
                    <li>
                        <button onClick={() => scrollToId("protocora")}>Protocora</button>
                    </li>
                    <li>
                        <button onClick={() => scrollToId("character")}>Character</button>
                    </li>
                    <li>
                        <button onClick={() => scrollToId("contact")}>Contact</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}   