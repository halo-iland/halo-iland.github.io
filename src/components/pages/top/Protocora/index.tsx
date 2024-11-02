'use client'
import { useState } from 'react'
import style from './index.module.scss'

export const Protocora = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    const openModal = (index: number) => {
        setSelectedImageIndex(index)
    }

    const closeModal = () => {
        setSelectedImageIndex(null)
    }

    return (
        <section id="protocora" >
            <div className={style.protocora}>
                <div>
                    <img src="/assets/protocora/main_prt.png" alt="" className={style.mainProtocora}/>
                </div>
                <div className={style.bg}>
                    <div className={style.wrapper}>
                        <img src="/assets/protocora/Types-of-protocola.png" alt="" className={style.ptr_ttl}/>
                        <div className={style.prts}>
                        {[...Array(8)].map((_, i) => {
                            return (
                                <>
                                    <div key={i} className={style.prt}>
                                        <button onClick={() => openModal(i)} className={style.buttonStyle}>
                                            <img src={`/assets/protocora/prts/prt0${i + 2}.png`} alt="" />
                                        </button>
                                    </div>
                                    {selectedImageIndex === i && (
                                        <div className={style.modal}>
                                            <button onClick={closeModal} className={style.modal}>
                                                <img src={`/assets/protocora/ex/ex0${i + 2}.png`} alt="" className={style.modal_img}/>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )
                        })}
                        </div>
                     </div>
                 </div> 
            </div>
        </section>
    )
}