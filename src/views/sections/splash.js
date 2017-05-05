import { h } from 'preact' /** @jsx h */
import { MenuTrigger } from '~src/menu/components'
import { ButtonPrimary } from '~src/views/components'
import * as paths from '~src/paths'

export default () => (
  <div className="card splash columns">
    <div className="column--hybrid column is-half-tablet">
      <MenuTrigger className="is-hidden-tablet" />
      <h1 className="logo">
        <img
          src="/img/logo-vivos-em-nos.svg"
          alt="logo vivos em nos"
        />
      </h1>
      <p>
        Vamos usar a memória como ferramenta para mudança. Homenageando
        aqueles que estão <span className="color--primary">#VivosEmNós</span>, podemos
        transformar saudade em mobilização e, juntos, lutar por mais respeito à vida.
      </p>
      <ButtonPrimary href={paths.memoryCreate()}>
        Crie sua homenagem
      </ButtonPrimary>
    </div>

    <div className="column--desktop column is-block-tablet is-half-tablet">
      <div className="menu--horizontal">
        <div className="menu--horizontal-item active">inicio</div>
        <div className="menu--horizontal-item">criar homenagem</div>
        <div className="menu--horizontal-item">quem somos</div>
      </div>
      <div>
        === image placeholder ===
      </div>
    </div>
  </div>
)
