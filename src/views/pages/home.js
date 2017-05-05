import { h } from 'preact' /** @jsx h */
import { LayoutDefault, Header } from '~src/views/layout/layout'
import {
  SectionHeader,
  SectionPrimary,
} from '~src/views/components'
import {
  AboutCampaignSection,
  SplashSection,
  FeaturedMemoriesSection,
} from '~src/views/sections'

export default () => (
  <LayoutDefault>
    <Header />

    <div className="page page__home">
      <SplashSection />

      <div className="columns">
        <AboutCampaignSection className="column is-one-third-tablet" />
        <FeaturedMemoriesSection className="column is-one-third-tablet" />
      </div>

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
