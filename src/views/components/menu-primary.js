import { h } from 'preact' /** @jsx h */
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import * as paths from '~src/paths'

const MenuPrimary = ({ ContainerComponent, ChildrensComponent, childrensClassName, intl }) => {
  const isStaging = /^staging.*/.test(window.location.host)
  const shareURL = isStaging
    ? intl.formatMessage({
      id: 'global--home.vivos-em-nos.staging.link.site',
      defaultMessage: 'https://staging.vivosemnos.org',
    })
    : intl.formatMessage({
      id: 'global--home.vivos-em-nos.link.site',
      defaultMessage: 'https://vivosemnos.org',
    })

  return (
    <ContainerComponent>
      <ChildrensComponent href={paths.home()}>
        <FormattedMessage
          id="components--menu-item.home"
          defaultMessage="Início"
        />
      </ChildrensComponent>
      <ChildrensComponent href={paths.memoryCreate()}>
        <FormattedMessage
          id="components--menu-item.create-memory"
          defaultMessage="Criar Homenagem"
        />
      </ChildrensComponent>
      <ChildrensComponent href={paths.aboutUs()}>
        <FormattedMessage
          id="components--menu-item.about-us"
          defaultMessage="Quem Somos"
        />
      </ChildrensComponent>
      <a
        className={childrensClassName}
        target="_blank"
        href={`https://www.facebook.com/sharer.php?u=${shareURL}`}
      >
        <FormattedMessage
          id="components--menu-item.share"
          defaultMessage="Compartilhar"
        />
      </a>
    </ContainerComponent>
  )
}

MenuPrimary.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(MenuPrimary)
