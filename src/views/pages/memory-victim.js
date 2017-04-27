import { h } from 'preact' /** @jsx h */
import { Header, LayoutDefault } from '../tags/layout'
import { TopBar, MemoryImage, MemorySummary } from '../components'

export default () => (
  <LayoutDefault>
    <Header>
      <TopBar />
    </Header>

    <div className='page pages--memory-victim'>
      <section className='section--victim-data'>
        <MemoryImage
          source='http://bit.ly/2proUwJ'
          width='223px'
          height='179px'
        />
        <MemorySummary
          name='Marina'
          birthYear='1990'
          deathYear='2015'
          description='Baleada em um assalto quando saía da faculdade.'
        />
      </section>
      victim memory page
    </div>
  </LayoutDefault>
)
