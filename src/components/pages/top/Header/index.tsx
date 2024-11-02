'use client'
import style from './index.module.scss'

export const Header = () => {
    const scrollToId = (id:string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }
    return (
        <header className={style.header}>
            <nav className={style.nav}>
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