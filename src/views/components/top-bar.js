import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'
import { MenuTrigger } from '../../menu/components'

export default () => (
  <section className="components--top-bar">
    <div className="bar columns is-mobile">
      <div className="column is-one-quarter-mobile">
        <MenuTrigger />
      </div>
      <div className="column has-text-centered logo">
        <h1><Link href="/">
          <img src="/img/logo-vivos-em-nos.svg" alt="logo vivos em nos" />
        </Link></h1>
      </div>
      <div className="column is-one-quarter-mobile"></div>
    </div>
  </section>
)
