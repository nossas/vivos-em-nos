import { h } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { Header, LayoutDefault } from '~src/views/layout/layout'
import { TopBar } from '~src/views/components'
import { MemoryForm } from '~src/memories/components'

export default ({ token, memory }) => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    <div className="page page--memory-create">
      <p>
        <FormattedMessage
          id="page--memory-create.form-description"
          defaultMessage={
            '{strong} Depois de publicada, você vai poder compartilhar essa página nas suas ' +
            'redes sociais e dizer a todos como essa pessoa permanece viva na sua memória.'
          }
          values={{
            strong: (
              <b>
                <FormattedMessage
                  id="page--memory-create.form-description.strong"
                  defaultMessage={
                    'Preenchendo o formulário abaixo, você cria uma homenagem' +
                    'a alguém que morreu, vítima da violência.'
                  }
                />
              </b>
            )
          }}
        />
      </p>
      <MemoryForm
        form={token ? 'editMemoryForm' : 'addMemoryForm'}
        memory={memory}
      />
    </div>
  </LayoutDefault>
)
