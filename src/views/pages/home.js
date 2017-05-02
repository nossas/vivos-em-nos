import { h } from 'preact' /** @jsx h */
import { MenuTrigger } from '../../menu/components'
import { LayoutDefault, Footer } from '../layout/layout'
import { ButtonPrimary, OrnamentPageFooter, SectionHeader, SectionPrimary } from '../components'
import { FeaturedMemories } from '../sections'
import * as paths from '../../paths'

export default () => (
  <LayoutDefault>
    <div className="page page__home">
      <div className="card splash">
        <MenuTrigger />
        <h1 className="logo">
          <img
            src="/img/logo-vivos-em-nos.svg"
            alt="logo vivos em nos"
          />
        </h1>
        <p>
          Vamos usar a memória como ferramenta para mudança. Homenageando
          aqueles que estão #VivosEmNós, podemos transformar saudade
          em mobilização e, juntos, lutar por mais respeito à vida.
        </p>
        <ButtonPrimary href={paths.memoryCreate()}>
          Crie sua homenagem
        </ButtonPrimary>
      </div>

      <FeaturedMemories />
      <SectionPrimary
        className="section--about-us"
        header={<SectionHeader title={<span>Quem<br />somos</span>} />}
      >
        <p>
          <span className="color--primary">#VivosEmNós</span> é uma iniciativa da campanha
          Instinto de Vida, uma aliança latino-americana criada a partir da união de organizações
          não governamentais que compartilham um objetivo: reduzir à metade a violência letal
          na região em 10 anos.
        </p>
        <p>
          Essa meta requer muito foco, compromisso e pressão por políticas públicas
          efetivas. <span className="color--primary">#VivosEmNós</span> é o espaço que criamos
          para homenagear as pessoas levadas precocemente pela violência e unir todos que
          desejam lutar pelo respeito à vida. A sensibilização é o primeiro passo em direção
          à mudança.
        </p>
      </SectionPrimary>
    </div>
    <Footer>
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
    </Footer>
  </LayoutDefault>
)
