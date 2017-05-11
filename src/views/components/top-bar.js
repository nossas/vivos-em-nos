import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'
import { FormattedMessage } from 'react-intl'
import { MenuTrigger, MenuHorizontal, MenuHorizontalItem } from '~src/menu/components'
import * as detect from '~src/utils/detect'
import * as paths from '~src/paths'

export default () => (
  <section className="components--top-bar">
    {detect.mobile ? (<div className="bar columns is-mobile">
      <div className="column is-one-quarter-mobile">
        <MenuTrigger />
      </div>
      <div className="column has-text-centered logo">
        <h1><Link href="/">
          <img src="/img/logo-vivos-em-nos.svg" alt="logo vivos em nos" />
        </Link></h1>
      </div>
      <div className="column is-one-quarter-mobile"></div></div>) :
    (<div className="bar columns is-mobile"><MenuHorizontal>
      <MenuHorizontalItem href={paths.home()}>
        <FormattedMessage
          id="components--menu-item.home"
          defaultMessage="Início"
        />
      </MenuHorizontalItem>
      <MenuHorizontalItem href={paths.memoryCreate()}>
        <FormattedMessage
          id="components--menu-item.create-memory"
          defaultMessage="Criar Homenagem"
        />
      </MenuHorizontalItem>
      <MenuHorizontalItem href={paths.aboutUs()}>
        <FormattedMessage
          id="components--menu-item.about-us"
          defaultMessage="Quem Somos"
        />
      </MenuHorizontalItem>
      <a
        className="menu--horizontal-item"
        target="_blank"
        href="https://www.facebook.com/sharer.php?u=https://vivosemnos.org"
      >
        <FormattedMessage
          id="components--menu-item.share"
          defaultMessage="Compartilhar"
        />
      </a>
      <a
        className="menu--horizontal-item"
        target="_blank"
        href="https://facebook.com/vivosennos/?ref=homepage"
      >
        <FormattedMessage
          id="components--menu-item.follow"
          defaultMessage="Seguir"
        />
      </a>
    </MenuHorizontal></div>)}
  </section>
)
