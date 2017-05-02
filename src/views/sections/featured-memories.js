import { h, Component } from 'preact' /** @jsx h */
import {
  ButtonPrimary,
  MemoryImage,
  MemorySummary,
  Quote,
  SectionHeader,
  SectionPrimary,
  Silhouette,
} from '../components'
import { Carousel, CarouselNavigator } from '../../carousel/components'
import * as paths from '../../paths'

const Header = ({ silhouette }) => (
  <SectionHeader title="Veja algumas homenagens">
    <Silhouette variation={silhouette} forceHeight="380px" />
  </SectionHeader>
)

export default class FeaturedMemories extends Component {
  constructor(props) {
    super(props)

    const { memories, setListCarousel } = this.props
    setListCarousel(memories)
  }

  //
  // This method should not exists when we have some fetching tool
  // like redial, to fetch the data on ssr.
  //
  componentWillReceiveProps(nextProps) {
    const str = JSON.stringify
    if (str(this.props.memories) !== str(nextProps.memories)) {
      this.props.setListCarousel(nextProps.memories)
    }
  }

  render() {
    const { loading, memories, currentCarouselIndex } = this.props
    const memory = memories[currentCarouselIndex] || {}

    return loading ? null : (
      <SectionPrimary header={<Header silhouette={memory.victimSilhouette} />}>
        <div className="ornament" />
        <Carousel>
          <MemoryImage
            source={memory.victimPhoto}
            width="164px"
            height="132px"
          />
          <MemorySummary
            name={memory.victimName}
            birthYear={memory.victimBornAt}
            deathYear={memory.victimDeadAt}
            description={memory.victimHistory}
          />
          <Quote>
            {memory.victimRememberText}
          </Quote>
        </Carousel>

        <footer>
          <CarouselNavigator />
          <ButtonPrimary href={paths.memory(memory.id)}>
            Ver homenagem completa
          </ButtonPrimary>
        </footer>
      </SectionPrimary>
    )
  }
}
