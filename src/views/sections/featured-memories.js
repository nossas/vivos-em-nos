import { h, Component } from 'preact' /** @jsx h */
import {
  ButtonPrimary,
  MemorySummary,
  Quote,
  SectionHeader,
  SectionPrimary,
  Silhouette,
} from '~src/views/components'
import { Carousel, CarouselNavigator } from '~src/carousel/components'
import * as paths from '~src/paths'

const Header = ({ silhouette }) => (
  <SectionHeader title="Veja algumas homenagens">
    <Silhouette variation={silhouette} forceHeight="380px" />
  </SectionHeader>
)

class FeaturedMemoriesSection extends Component {
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
    const { loading, memories, currentCarouselIndex, className } = this.props
    const memory = memories[currentCarouselIndex] || {}

    return loading ? null : (
      <SectionPrimary
        className={className}
        header={<Header silhouette={memory.victimSilhouette} />}
      >
        <div className="ornament" />
        <Carousel>
          <MemorySummary
            name={memory.victimName}
            birthYear={memory.victimBornAt}
            deathYear={memory.victimDeadAt}
            description={memory.victimHistory}
            image={`${process.env.SERVER_DOMAIN}${memory.victimPhoto}`}
            imageWidth="164px"
            imageHeight="132px"
            imageAlignment="left"
            distanceY="100px"
            distanceX="36%"
            width="63%"
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

FeaturedMemoriesSection.defaultProps = {
  className: '',
}

export default FeaturedMemoriesSection
