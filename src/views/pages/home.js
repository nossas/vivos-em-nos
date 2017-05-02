import { h } from 'preact' /** @jsx h */
import { MenuTrigger } from '../../menu/components'
import { LayoutDefault, Footer } from '../layout/layout'
import {
  ButtonPrimary,
  OrnamentPageFooter,
  ParagraphLineRounded,
  SectionHeader,
  SectionPrimary,
} from '../components'
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

      <SectionPrimary
        className="section--about-campaign"
        header={<SectionHeader title={<span>Sobre<br />a campanha</span>} />}
      >
        <div className="caption">
          <ParagraphLineRounded>
            <span className="color--primary">No Brasil,</span> a cada duas pessoas, uma conhece
            alguém que foi <span className="color--primary">assassinado</span>
          </ParagraphLineRounded>
        </div>
        <p>
          As estatísticas assustam, mas os números não nos permitem enxergar o mais importante:
          os nomes, os rostos e as histórias dessas vítimas. Tratá-las como dígitos nos
          relatórios de segurança pública nos afasta da real dimensão do problema e nos
          impede de cobrar soluções efetivas.
        </p>
        <p>
          <span className="color--primary">#VivosEmNós</span> quer usar a memória como ferramenta
          para transformar solidariedade em união, saudade em mobilização e indignação em força
          para mudança. Se você conhece alguém que teve a sua história interrompida pela violência,
          crie aqui uma página de homenagem para se juntar à luta por mais respeito à vida.
        </p>
      </SectionPrimary>

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
