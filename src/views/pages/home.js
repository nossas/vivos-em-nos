import { h } from 'preact' /** @jsx h */
import { connect } from 'preact-redux'
import * as MenuActions from '../../menu/redux/action-creators'
import { MyLayout } from '../tags/layout'
import { ButtonPrimary, Quote, SectionHeader } from '../components'

const Home = ({ setMenuActive }) => (
  <div className="page page__home">
    <div className="card splash">
      <button className="menu-open" onClick={() => setMenuActive(true)}>
        <img src="/img/icone-menu.svg" alt="hamburguer menu" />
      </button>
      <h1 className="logo"><img src="/img/logo-vivos-em-nos.svg" alt="logo vivos em nos" /></h1>
      <p>
        Vamos usar a memória como ferramenta para mudança. Homenageando
        aqueles que estão #VivosEmNós, podemos transformar saudade
        em mobilização e, juntos, lutar por mais respeito à vida.
      </p>
      <ButtonPrimary href='/homenagem'>
        Crie sua homenagem
      </ButtonPrimary>
    </div>

    <section>
      <SectionHeader title='Veja algumas homenagens'>
        <img className='silhouette' src='/img/silhouette-02.svg' height='380' />
      </SectionHeader>
      <article>
        <div className='ornament' />
        <div
          className='memory-image'
          style={{ backgroundImage: 'url(http://static.quizur.com/i/b/581f5c66877f10.71342558581f5c66777f49.87913318.jpg)' }}
        />
        <div className='memory-summary'>
          <div className='memory-identity'>
            <div className='name'>Marina</div>
            <span>1990 / 2015</span>
          </div>
          <div className='memory-description'>
            <span>Baleada em um assalto quando saía da faculdade.</span>
          </div>
        </div>

        <Quote>
          Minha filha sonhava em ser médica, em trabalhar com crianças. Pra gente aqui é tudo
          muito difícil, mas ela trabalhava de dia e conseguia pagar a faculdade à noite. Sempre
          foi muito batalhadora...
        </Quote>
      </article>
      <footer>
        <div className='memory-carousel-navigator'>
          <div className='carousel-item active' />
          <div className='carousel-item' />
          <div className='carousel-item' />
          <div className='carousel-item' />
          <div className='carousel-item' />
        </div>
        <ButtonPrimary href='/homenagem'>
          Ver homenagem completa
        </ButtonPrimary>
      </footer>
    </section>
  </div>
)

const HomePage = ({ setMenuActive }) => (
  <MyLayout><Home setMenuActive={setMenuActive} /></MyLayout>
)

const mapDispatchToProps = {
  setMenuActive: MenuActions.setActive,
}

export default connect(undefined, mapDispatchToProps)(HomePage)
