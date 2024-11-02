import style from './index.module.scss'

export const Introduction = () => {
    return (
        <section className={style.container} id="concept">
            <div>
                <img src="/assets/kv-intro/main_4.png" alt="" className={style.main}/>
                <div className={style.intro}>
                    <div className={style.jobun}>
                        <h3>〜ぼうけんのしるし〜</h3>
                        <p>ぼくたちは　ながいながい　たびの　すえ <br />  
                            おおきな　まるい　ひかりを　みつけた<br />
                            [ハロ]<br />
                            うえの　うえに　あったもの
                        </p>
                    </div>
                    <img src="/assets/kv-intro/intro.png" className={style.sirusi} alt="〜ぼうけんのしるし〜　ぼくたちは　ながいながい　たびの　すえ　おおきな　まるい　ひかりを　みつけた　[ハロ]　うえの　うえに　あったもの" />
                </div>
                <img src="/assets/kv-intro/map.png" className={style.map} alt="巴楼愛卵島　はろあいらんど" />
            </div>
            <a href="/behind-the-artwork" className={style.imade}>
                <img src="/assets/imade/logo_2.png" alt="" />
            </a>
        </section>
    )
}