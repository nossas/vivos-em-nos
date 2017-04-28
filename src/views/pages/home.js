import { h } from 'preact' /** @jsx h */
import { MenuTrigger } from '../../menu/components'
import { LayoutDefault } from '../tags/layout'
import { ButtonPrimary } from '../components'
import { FeaturedMemories } from '../sections'

export default () => (
  <LayoutDefault>
    <div className='page page__home'>
      <div className='card splash'>
        <MenuTrigger />
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
  </LayoutDefault>
)
