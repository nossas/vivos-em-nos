import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import * as paths from '~src/paths'

export default ({ ContainerComponent, ChildrensComponent }) => (
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
    <ChildrensComponent href={paths.memoriesList()}>
      <FormattedMessage
        id="components--menu-item.memories-list"
        defaultMessage="Homenagens"
      />
    </ChildrensComponent>
    <ChildrensComponent href={paths.aboutUs()}>
      <FormattedMessage
        id="components--menu-item.about-us"
        defaultMessage="Quem Somos"
      />
    </ChildrensComponent>
  </ContainerComponent>
)
