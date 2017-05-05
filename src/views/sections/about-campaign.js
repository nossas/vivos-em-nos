import { h } from 'preact' /** @jsx h */
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
)

AboutCampaignSection.defaultProps = {
  className: '',
}

export default AboutCampaignSection
