// import { Header } from "@/components/pages/behind-the-artwork/Header";
'use client'

import style from './page.module.scss'

export default function BehindTheArtworkPage() {
    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return (
        <>
            <section id="top">
                <a onClick={toTop}>
                    <img src="/assets/imade/logo_2.png" className={style.logo} alt="" />
                </a>
                <img src="/assets/imade/key.png" className={style.key} alt="" /> 
            </section>
            <section>
                <img src="/assets/imade/concept.png" alt="concept 私たち人間は成長するとき　変身をしない。　時を刻むこと、新しく知ること、大人になること　生きとし生けるもの全てにおいて、成長や進化は尊いものだ。　私たちの身に起こる成長は　羽を手にするような壮大さはないけれど　目に見えずとも、大きな変化は起き続けている。　美しい姿で空を飛ぶ蝶の変身が教えてくれた　進化のドラマチックな一瞬は　まさにヒトの人生そのものなのかもしれない。　変わらないなかで、変わっていく。　それこそが、私たちの「変身」。" className={style.concept}/>
            </section>
            <section className={style.statement}>
                <img src="/assets/imade/imade-bg-3.png" alt="" />
                <div className={style.content}>
                    <p>私たちは架空の島「ハロiland」を舞台に 新たな鑑賞体験を創造するアートワークチームです。</p>
                    <p>実際には存在しない世界をより現実味を持って皆さんに好きになっていただくために、「EP(Extended-Episode Playing)＊」＝「拡張する物語遊び」を提案いたします。</p>
                    <p>
                        芸術のチームとしての活動を、音楽の作品発表形態になぞらえながら定期的なかたちでお届けすることで<br />
                        もっとアートを身近に、自由に感じていただけたらと私たちハロは考えます。<br />
                    </p>
                    <p>
                        <small>＊一般的に音楽の作品発表形態のひとつであるEPは、<br />
                            シングルより長く、フル・アルバムよりも短いリリースとされています
                        </small>
                    </p>
                    <p>現在予定しているEPは01~10。</p>
                    <p>少しずつ分かってくるハロilandの世界を、<br />
                    さまざまなメディアアートが詰め込まれたアルバムでお楽しみください。</p>
                </div>
                <img src="/assets/imade/imade-bg-2.png" alt="" />
            </section>
            <section>
                <img src="/assets/imade/imade-bg.png" alt="" />
                <img src="/assets/imade/image.png" alt="" />
            </section>
        </>
    );
}