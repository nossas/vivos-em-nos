import { h } from 'preact' /** @jsx h */
import { Header, Footer, LayoutDefault } from '~src/views/layout/layout'
import { TopBar, OrnamentPageFooter } from '~src/views/components'
import { MemoryForm } from '~src/memories/components'

export default ({ token, memory }) => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    <Footer />

    <div className="page page--memory-create">
      <p>
        Preenchendo o formulário abaixo, você cria uma homenagem a alguém que morreu,
        vítima da violência.
      </p>
      <p>
        Depois de publicada, você vai poder compartilhar essa página nas suas redes sociais
        e dizer a todos como essa pessoa permanece viva na sua memória.
      </p>
      <MemoryForm
        form={token ? 'editMemoryForm' : 'addMemoryForm'}
        memory={memory}
      />
      <OrnamentPageFooter />
    </div>
  </LayoutDefault>
)
