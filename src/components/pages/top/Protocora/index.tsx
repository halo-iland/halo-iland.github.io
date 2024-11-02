import style from './index.module.scss'

export const Protocora = () => {
    return (
        <section id="protocora" >
            <div className={style.protocora}>
                <div>
                    <img src="/assets/protocora/main_prt.png" alt="" className={style.mainProtocora}/>
                </div>
                <div className={style.bg}>
                    <h1>Protocora</h1>
                    <div className={style.wrapper}>
                        {/* <img src="/assets/protocora/itiran.JPG" alt="" /> */}
                        <div className={style.prts}>
                        {[...Array(8)].map((_, i) => {
                            return (
                                <div key={i} className={style.prt}>
                                    <img src={`/assets/protocora/prts/prt0${i + 2}.png`} alt="" />
                                </div>
                            )
                        })}
                        </div>
                     </div>
                 </div> 
            </div>
        </section>
    )
}