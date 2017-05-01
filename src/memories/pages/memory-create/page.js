import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../../../views/layout/layout'
import { MemoryForm } from '../../components'
import { TopBar } from '../../../views/components'

export default () => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    <div className="page page--memory-create">
      <p>
        Preenchendo o formulário abaixo, você cria uma homenagem a alguém que morreu,
        vítima da violência.
      </p>
      <p>
        Depois de publicada, você vai poder compartilhar essa página nas suas redes sociais
        e dizer a todos como essa pessoa permanece viva na sua memória.
      </p>
      <MemoryForm />
    </div>
  </LayoutDefault>
)
