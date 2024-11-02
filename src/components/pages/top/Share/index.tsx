import style from './index.module.scss'

export const Share = () => {
    return (
        <>
            <div className={style.share}  id="contact">
                <a href="https://www.instagram.com/halo.iland/" className={style.sns}>
                    <img src="/assets/sns/Instagram_Glyph_White.svg" alt=""  />
                </a>
                <p>Instagram</p>
            </div> 
            <p className={style.footer}>&copy; 2024 halo official </p>
        </>
    )
}