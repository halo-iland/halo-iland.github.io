import style from './index.module.scss'
import Link from 'next/link'	

export const Protocora = () => {
    return (
        <section id="protocora" className={style.protocora}>
            <h1>Protocora</h1>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                <img src="/assets/protocora/protocora_2.png" alt="" style={{ margin: '0 auto'
                , width: '90%' }} className="target-element"/>
            </div>
        </section>
    )
}