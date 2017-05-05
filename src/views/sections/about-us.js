import { h } from 'preact' /** @jsx h */
import { SectionHeader, SectionPrimary } from '~src/views/components'

const AboutUs = ({ className }) => (
  <SectionPrimary
    id="about-us"
    className={`section--about-us ${className}`}
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
)

AboutUs.defaultProps = {
  className: '',
}

export default AboutUs
