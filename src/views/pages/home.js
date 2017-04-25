import { h } from 'preact' /** @jsx h */
import ButtonPrimary from '../components/ButtonPrimary'

export default function (props) {
  return (
    <div className="page page__home">
      <div className="card splash">
        <button className="menu"><img src="/img/icone_menu.png" alt="hamburguer menu" /></button>
        <h1><img src="/img/logo-vivos-em-nos.png" alt="logo vivos em nos" /></h1>
        <p>
          Vamos usar a memória como ferramenta para mudança. Homenageando
          aqueles que estão #VivosEmNós, podemos transformar saudade
          em mobilização e, juntos, lutar por mais respeito à vida. </p>
        <ButtonPrimary text="crie sua homenagem" href="/homenagem" />
      </div>
    </div>
  )
}
