import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { MenuHorizontal, MenuHorizontalItem, MenuTrigger } from '~src/menu/components'
import { ButtonPrimary, LogoVivosEmNos, MenuPrimary } from '~src/views/components'
import * as paths from '~src/paths'

export default () => (
  <div className="card splash columns">
    <div className="column--hybrid column is-half-tablet">
      <MenuTrigger className="is-hidden-tablet" />
      <h1 className="logo">
        <LogoVivosEmNos />
      </h1>
      <p>
        <FormattedMessage
          id="section--splash.hero"
          defaultMessage={
            'Vamos usar a memória como ferramenta para mudança. Homenageando ' +
            'aqueles que estão {hashtag}, podemos ' +
            'transformar saudade em mobilização e, juntos, lutar por mais respeito à vida.'
          }
          values={{
            hashtag: (
              <span className="color--primary">
                <FormattedMessage
                  id="global--brand-name"
                  defaultMessage="#VivosEmNós"
                />
              </span>
            ),
          }}
        />
      </p>
      <ButtonPrimary href={paths.memoryCreate()}>
        <FormattedMessage
          id="components--primary-button.create-memory"
          defaultMessage="Criar sua homenagem"
        />
      </ButtonPrimary>
    </div>

    <div className="column--desktop column is-hidden-mobile is-half-tablet">
      <MenuPrimary
        ContainerComponent={MenuHorizontal}
        ChildrensComponent={MenuHorizontalItem}
        childrensClassName="menu--horizontal-item"
      />
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
          src={`/img/featured-splash-${window.defaultLanguage}.png`}
          alt="Splash Featured"
        />
      </div>
    </div>
  </div>
)
