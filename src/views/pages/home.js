import { h } from 'preact' /** @jsx h */
import { connect } from 'preact-redux'
import * as MenuActions from '../../menu/redux/action-creators'
import { LayoutDefault } from '../tags/layout'
import { ButtonPrimary } from '../components'
import { FeaturedMemories } from '../sections'

const Home = ({ setMenuActive }) => (
  <div className='page page__home'>
    <div className='card splash'>
      <button className='menu-open' onClick={() => setMenuActive(true)}>
        <img src='/img/icone-menu.svg' alt='hamburguer menu' />
      </button>
      <h1 className='logo'><img src='/img/logo-vivos-em-nos.svg' alt='logo vivos em nos' /></h1>
      <p>
        Vamos usar a memória como ferramenta para mudança. Homenageando
        aqueles que estão #VivosEmNós, podemos transformar saudade
        em mobilização e, juntos, lutar por mais respeito à vida.
      </p>
      <ButtonPrimary href='/homenagem'>
        Crie sua homenagem
      </ButtonPrimary>
    </div>

    <FeaturedMemories />
  </div>
)

const HomePage = ({ setMenuActive }) => (
  <LayoutDefault><Home setMenuActive={setMenuActive} /></LayoutDefault>
)

const mapDispatchToProps = {
  setMenuActive: MenuActions.setActive
}

export default connect(undefined, mapDispatchToProps)(HomePage)
