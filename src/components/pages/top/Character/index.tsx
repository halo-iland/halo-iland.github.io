import style from './index.module.scss'

export const Character = () => {
    return (
        <section id="character" className={style.container}>
            <h1>Characters</h1>
            <div className={style.characters}>
                <div className={style.character}>
                    <div className={style.sui}></div>
                    <p>
                        いもむしの仲間で まんまるの小さな からだをもつハフ
                    </p>
                    <p>
                        ハロの島に存在する 【プロトコラ】の石 で羽をもった姿に 進化する
                        ねるときや敵から みをまもるときには 縮まることも わかっている
                    </p>
                </div>
                <div className={style.character}>
                    <div className={style.uku}></div>
                    <p>
                        あざらしの仲間で そのからだは ふかふかそうに みえるけど 実は290kgもある
                    </p>
                    <p>
                        きらきらしたものや かわいいものを 収集するのがすきで、
                        プロトコラも いくつか持っていて 翠翠にみせびらかしては 冒険をそそのかす
                    </p>
                </div>
                <div className={style.character}>
                    <div className={style.niim}></div>
                    <p>
                        へびの仲間で ぐにゃぐにゃと かたちを変えながら 巻きつくことで
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