import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { MenuHorizontal, MenuHorizontalItem, MenuTrigger } from '~src/menu/components'
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
        <FormattedMessage
          id="section--splash.hero"
          defaultMessage={
            'Vamos usar a memória como ferramenta para mudança. Homenageando ' +
            'aqueles que estão {hashtag}, podemos ' +
            'transformar saudade em mobilização e, juntos, lutar por mais respeito à vida.'
          }
          values={{ hashtag: <span className="color--primary">#VivosEmNós</span> }}
        />
      </p>
      <ButtonPrimary href={paths.memoryCreate()}>
        Criar sua homenagem
      </ButtonPrimary>
    </div>

    <div className="column--desktop column is-hidden-mobile is-half-tablet">
      <MenuHorizontal>
        <MenuHorizontalItem href={paths.home()}>
          <FormattedMessage
            id="components--menu-item.home"
            defaultMessage="início"
          />
        </MenuHorizontalItem>
        <MenuHorizontalItem href={paths.memoryCreate()}>
          <FormattedMessage
            id="components--menu-item.create-memory"
            defaultMessage="criar homenagem"
          />
        </MenuHorizontalItem>
        <MenuHorizontalItem href={paths.aboutUs()}>
          <FormattedMessage
            id="components--menu-item.about-us"
            defaultMessage="quem somos"
          />
        </MenuHorizontalItem>
        <a
          className="menu--horizontal-item"
          target="_blank"
          href="https://www.facebook.com/sharer.php?u=https://vivosemnos.org"
        >
          <FormattedMessage
            id="components--menu-item.share"
            defaultMessage="compartilhar"
          />
        </a>
        <a
          className="menu--horizontal-item"
          target="_blank"
          href="https://www.facebook.com/vivosennos/?fref=ts"
        >
          <FormattedMessage
            id="components--menu-item.follow"
            defaultMessage="seguir"
          />
        </a>
      </MenuHorizontal>
      <div
        style={{
          height: 'calc(100% - 59px)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30px',
        }}
      >
        <img
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
         src="/img/featured-splash.png" />
      </div>
    </div>
  </div>
)
