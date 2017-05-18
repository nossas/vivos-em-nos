import { h } from 'preact' /** @jsx h */
import { FormattedMessage, injectIntl } from 'react-intl'
import { LogoVivosEmNos, LogoInstintoDeVida } from '~src/views/components'

export default injectIntl(({ intl }) => (
  <footer className="footer--home">
    <div className="container--logos">
      <a
        target="_blank"
        href={
          intl.formatMessage({
            id: 'global--home.vivos-em-nos.link.facebook',
            defaultMessage: 'https://facebook.com/vivosennosotros',
          })
        }
      >
        <LogoVivosEmNos height="68" />
      </a>
      <a
        target="_blank"
        href={
          intl.formatMessage({
            id: 'global--home.instinto-de-vida.link',
            defaultMessage: 'https://www.br.instintodevida.org',
          })
        }
      >
        <LogoInstintoDeVida height="68" />
      </a>
    </div>
    <div>
      <FormattedMessage
        id="footer--home"
        defaultMessage="Fale conosco:"
      />
      <br />
      <a
        className="link"
        href="mailto:contato@instintodevida.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        contato@instintodevida.org
      </a>
    </div>
  </footer>
))
