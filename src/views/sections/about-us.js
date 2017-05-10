import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { SectionHeader, SectionPrimary } from '~src/views/components'

const AboutUs = ({ className }) => (
  <SectionPrimary
    id="about-us"
    className={`section--about-us ${className}`}
    header={
      <SectionHeader
        title={
          <FormattedMessage
            id="section--about-us.header"
            defaultMessage="Quem{breakLine}somos"
            values={{ breakLine: <br /> }}
          />
        }
      />
    }
  >
    <p>
      <FormattedMessage
        id="section--about-us.initiative"
        defaultMessage={
          '{hashtag} é uma iniciativa da campanha Instinto de Vida, uma aliança ' +
          'latino-americana criada a partir da união de organizações não governamentais ' +
          'que compartilham um objetivo: reduzir à metade a violência letal na região em 10 anos.'
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
    <p>
      <FormattedMessage
        id="section--about-us.the-goal"
        defaultMessage={
          'Essa meta requer muito foco, compromisso e pressão por políticas públicas efetivas. ' +
          '{hashtag} é o espaço que criamos para homenagear as pessoas levadas precocemente ' +
          'pela violência e unir todos que desejam lutar pelo respeito à vida. A ' +
          'sensibilização é o primeiro passo em direção à mudança.'
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
  </SectionPrimary>
)

AboutUs.defaultProps = {
  className: '',
}

export default AboutUs
