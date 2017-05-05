import { h } from 'preact' /** @jsx h */
import { LayoutDefault, Header } from '~src/views/layout/layout'
import {
  ParagraphLineRounded,
  SectionHeader,
  SectionPrimary,
  Silhouette,
} from '~src/views/components'
import { SplashSection, FeaturedMemories } from '~src/views/sections'

export default () => (
  <LayoutDefault>
    <Header />

    <div className="page page__home">
      <SplashSection />

      <SectionPrimary
        className="section--about-campaign"
        header={
          <SectionHeader title={<span>Sobre<br />a campanha</span>}>
            <Silhouette variation="1" height="570" />
          </SectionHeader>
        }
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
        id="about-us"
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
  </LayoutDefault>
)
