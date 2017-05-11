import { h } from 'preact' /** @jsx h */
import { FormattedMessage, injectIntl } from 'react-intl'

export default injectIntl(({ intl }) => (
  <footer className="footer--home">
    <div className="container--logos">
      <a
        target="_blank"
        href={
          intl.formatMessage({
            id: 'global--home.vivos-em-nos.link',
            defaultMessage: 'https://vivosemnos.org',
          })
        }
      >
        <img
          src="/img/logo-vivos-em-nos.svg"
          alt="Logo Vivos em Nós"
          width="102"
          height="63"
        />
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
        <img
          src="/img/logo-instinto-de-vida.png"
          alt="Logo Instinto de Vida"
          width="85"
          height="68"
        />
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
