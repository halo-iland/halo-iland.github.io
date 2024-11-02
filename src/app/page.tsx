import Background from "@/components/pages/top/Background";
import { Header } from "@/components/pages/top/Header";
import { Protocora } from "@/components/pages/top/Protocora";
import { Introduction } from "@/components/pages/top/Introduction";
import { Character } from "@/components/pages/top/Character"; 
import { Share } from "@/components/pages/top/Share";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <meta property="og:image" content="/assets/kv-intro/main.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    </Head>
      <Background />
      <Header />
      <Introduction />
      <Protocora />
      <Character />
      <Share /> 
    </>
  );
}
