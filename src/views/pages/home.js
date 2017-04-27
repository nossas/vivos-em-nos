import { h } from 'preact' /** @jsx h */
import { connect } from 'preact-redux'
import ButtonPrimary from '../components/ButtonPrimary'
import * as MenuActions from '../../menu/redux/action-creators'
import { MyLayout } from '../tags/layout'

const Home = ({ setMenuActive }) => (
  <div className="page page__home">
    <div className="card splash">
      <button className="menu" onClick={() => setMenuActive(true)}>
        <img src="/img/icone-menu.svg" alt="hamburguer menu" />
      </button>
      <h1><img src="/img/logo-vivos-em-nos.svg" alt="logo vivos em nos" /></h1>
      <p>
        Vamos usar a memória como ferramenta para mudança. Homenageando
        aqueles que estão #VivosEmNós, podemos transformar saudade
        em mobilização e, juntos, lutar por mais respeito à vida. </p>
      <ButtonPrimary text="crie sua homenagem" href="/homenagem" />
    </div>
  </div>
)

const HomePage = ({ setMenuActive }) => (
  <MyLayout><Home setMenuActive={setMenuActive} /></MyLayout>
)

const mapDispatchToProps = {
  setMenuActive: MenuActions.setActive,
}

export default connect(undefined, mapDispatchToProps)(HomePage)
