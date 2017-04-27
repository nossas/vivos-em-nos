import { h, Component } from 'preact' /** @jsx h */
import {
  ButtonPrimary,
  MemoryImage,
  MemorySummary,
  Quote,
  SectionHeader,
  SectionPrimary,
  Silhouette
} from '../components'
import { Carousel, CarouselNavigator } from '../../carousel/components'

const Header = (
  <SectionHeader title='Veja algumas homenagens'>
    <Silhouette variation='2' height='380' />
  </SectionHeader>
)

export default class FeaturedMemories extends Component {
  constructor (props) {
    super(props)

    const { memories, setListCarousel } = this.props
    setListCarousel(memories)
  }

  render () {
    const { memories, currentCarouselIndex } = this.props
    const memory = memories[currentCarouselIndex]

    return (
      <SectionPrimary header={Header}>
        <div className='ornament' />
        <Carousel>
          <MemoryImage
            source={memory.image}
            width='164px'
            height='132px'
          />
          <MemorySummary
            name={memory.name}
            birthYear={memory.birthYear}
            deathYear={memory.deathYear}
            description={memory.description}
          />
          <Quote>
            {memory.quote}
          </Quote>
        </Carousel>

        <footer>
          <CarouselNavigator />
          <ButtonPrimary href={memory.url}>
            Ver homenagem completa
          </ButtonPrimary>
        </footer>
      </SectionPrimary>
    )
  }
}
