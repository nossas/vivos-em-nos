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
      <FormattedMessage
        id={'section--about-campaign.statistics'}
        defaultMessage={
          'As estatísticas assustam, mas os números não nos permitem enxergar o mais importante:' +
          'os nomes, os rostos e as histórias dessas vítimas. Tratá-las como dígitos nos' +
          'relatórios de segurança pública nos afasta da real dimensão do problema e nos' +
          'impede de cobrar soluções efetivas.'
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
        id={'section--about-campaign.the-goal'}
        defaultMessage={
          '{hashtag} quer usar a memória como ferramenta para transformar solidariedade em ' +
          'união, saudade em mobilização e indignação em força para mudança. Se você conhece ' +
          'alguém que teve a sua história interrompida pela violência, crie aqui uma página de ' +
          'homenagem para se juntar à luta por mais respeito à vida.'
        }
      />
    </p>
    <p>

    </p>
  </SectionPrimary>
)

AboutCampaignSection.defaultProps = {
  className: '',
}

export default AboutCampaignSection
