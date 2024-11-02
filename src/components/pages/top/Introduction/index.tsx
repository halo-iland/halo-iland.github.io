import style from './index.module.scss'

export const Introduction = () => {
    return (
        <div className={style.container}>
            <img src="/assets/kv-intro/main.png" alt="" />
            <img src="/assets/kv-intro/intro.png" className={style.boken} alt="" />
            <img src="/assets/kv-intro/map.png" className={style.boken} alt="" />
        </div>
    )
}