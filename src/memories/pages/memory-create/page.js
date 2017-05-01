import { h, Component } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../../../views/layout/layout'
import { MemoryForm } from '../../components'
import { TopBar } from '../../../views/components'

export default class Page extends Component {

  getMemoryByToken() {
    if (this.props.getMemoryByToken.allMemories) {
      const { allMemories: { nodes } } = this.props.getMemoryByToken
      if (nodes[0]) {
        const { memoryAssetsByMemoryId, ...memory } = nodes[0]
        memory.memoryAssets = [...memoryAssetsByMemoryId.nodes,
          {}
        ]
        return memory
      }
    }
  }

  render () {
    const memory = this.getMemoryByToken()

    return (
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
          <MemoryForm memory={memory} />
        </div>
      </LayoutDefault>
    )
  }
}
