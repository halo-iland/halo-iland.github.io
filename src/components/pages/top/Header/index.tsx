import style from './index.module.scss'
import Link from 'next/link'	

export const Header = () => {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <ul>
                    <li>
                        <Link href="#protocora">Introduciton／Story</Link>
                    </li>
                    <li>
                        <Link href="#protocora">Protocora</Link>
                    </li>
                    <li>
                        <Link href="#character">Character</Link>
                    </li>
                    <li>
                        <Link href="#contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}   