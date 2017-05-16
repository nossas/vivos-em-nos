import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import {
  ParagraphLineRounded,
  SectionHeader,
  SectionPrimary,
  Silhouette,
} from '~src/views/components'

const AboutCampaignSection = ({ className }) => (
  <SectionPrimary
    className={`section--about-campaign ${className}`}
    header={
      <SectionHeader
        title={(
          <FormattedMessage
            id="section--about-campaign.header"
            defaultMessage="Sobre{breakLine}a campanha"
            values={{ breakLine: <br /> }}
          />
        )}
      >
        <Silhouette variation="1" forceHeight="570px" />
      </SectionHeader>
    }
  >
    <div className="caption">
      <ParagraphLineRounded>
        <FormattedMessage
          id="section--about-campaign.paragraph-line-rounded"
          defaultMessage={
            '{highlightBeginning} a cada quatro pessoas, ' +
            'uma conhece alguém que foi {highlightEnding}'
          }
          values={{
            highlightBeginning: (
              <span className="color--primary">
                <FormattedMessage
                  id="section--about-campaign.paragraph-line-rounded.highlight-beginning"
                  defaultMessage="No Brasil,"
                />
              </span>
            ),
            highlightEnding: (
              <span className="color--primary">
                <FormattedMessage
                  id="section--about-campaign.paragraph-line-rounded.highlight-ending"
                  defaultMessage="assassinado"
                />
              </span>
            ),
          }}
        />
      </ParagraphLineRounded>
    </div>
    <p>
      <b>
        <FormattedMessage
          id="section--about-campaign.statistics"
          defaultMessage={
            'As estatísticas assustam, mas os números não nos permitem enxergar o mais ' +
            'importante: os nomes, os rostos e as histórias dessas vítimas.'
          }
        />
      </b>
      {' '}
      <FormattedMessage
        id="section--about-campaign.them-are-not-only-digits"
        defaultMessage={
          'Tratá-las como dígitos nos relatórios de segurança pública nos afasta da real ' +
          'dimensão do problema e nos impede de cobrar soluções efetivas.'
        }
      />
      {' '}
      <b>
        <FormattedMessage
          id="section--about-campaign.memory-as-tool"
          defaultMessage={
            '{hashtag} quer usar a memória como ferramenta para transformar solidariedade em ' +
            'união, saudade em mobilização e indignação em força para mudança.'
          }
          values={{
            hashtag: (
              <FormattedMessage
                id="global--brand-name"
                defaultMessage="#VivosEmNós"
              />
            ),
          }}
        />
      </b>
    </p>

    <p>
      <b>
        <FormattedMessage
          id="section--about-campaign.create-your-memory"
          defaultMessage={
            'Se você conhece alguém que teve sua vida interrompida pela violência, crie aqui ' +
            'uma página de homenagem. Vamos montar um livro para contar essas histórias na ' +
            'Assembleia Geral da OEA'
          }
        />
      </b>
      {' '}
      <FormattedMessage
        id="section--about-campaign.show-it-to-the-leaders"
        defaultMessage={
          '(Organização dos Estados Americanos) no dia 19 de junho, onde estarão presentes os ' +
          'principais líderes da região.'
        }
      />
      {' '}
      <b>
        <FormattedMessage
          id="section--about-campaign.they-must-know"
          defaultMessage={
            'Eles precisam conhecer as histórias por trás dos números e vamos ' +
            'pressioná-los para mudar este cenário.'
          }
        />
      </b>
    </p>
  </SectionPrimary>
)

AboutCampaignSection.defaultProps = {
  className: '',
}

export default AboutCampaignSection
