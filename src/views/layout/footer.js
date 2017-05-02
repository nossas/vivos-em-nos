import { h } from 'preact' /** @jsx h */
import {
  OrnamentPageFooter,
} from '../components'

export default () => (
  <footer className="footer--home">
    <div className="container--logos">
      <img
        src="/img/logo-vivos-em-nos.svg"
        alt="Logo Vivos em Nós"
        width="102"
        height="63"
      />
      <img
        src="/img/logo-instinto-de-vida.png"
        alt="Logo Instinto de Vida"
        width="85"
        height="68"
      />
    </div>
    <div>
      Fale conosco: <br />
      <a
        className="link"
        href="mailto:contato@instintodevida.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        contato@instintodevida.org
      </a>
    </div>
    <OrnamentPageFooter />
  </footer>
)
