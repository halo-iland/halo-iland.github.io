import style from './index.module.scss'

export const Character = () => {
    return (
        <section id="character" className={style.container}>
            <h1>Characters</h1>
            <div className={style.characters}>
                <div className={style.character}>
                    <div className={style.sui}></div>
                    <h3>翠翠</h3>
                    <p>
                        いもむしの仲間で まんまるの小さな からだをもつハフ
                    </p>
                    <p>
                        ハロの島に存在する 【プロトコラ】の石 で羽をもった姿に 進化する<br />
                        ねるときや敵から みをまもるときには 縮まることも わかっている
                    </p>
                </div>
                <div className={style.character}>
                    <div className={style.uku}></div>
                    <h3>うく</h3>
                    <p>
                        あざらしの仲間で そのからだは ふかふかそうに みえるけど 実は290kgもある
                    </p>
                    <p>
                        きらきらしたものや かわいいものを 収集するのがすきで、<br />
                        プロトコラも いくつか持っていて 翠翠にみせびらかしては 冒険をそそのかす
                    </p>
                </div>
                <div className={style.character}>
                    <div className={style.niim}></div>
                    <h3>ニーム</h3>
                    <p>
                        へびの仲間で ぐにゃぐにゃと かたちを変えながら 巻きつくことで<br />
                        あいてのからだを 治すふしぎな パワーのもちぬし
                    </p>
                    <p>
                        いっけん冷静そうに みえるけど、怒ると あつく真っ赤になる ので要注意
                    </p>
                </div>
            </div>
        </section>

    )
}