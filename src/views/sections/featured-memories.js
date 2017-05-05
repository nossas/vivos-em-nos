import { h, Component } from 'preact' /** @jsx h */
import { ViewPager, Frame, Track, View, AnimatedView } from 'react-view-pager'
import {
  ButtonPrimary,
  MemorySummary,
  Quote,
  SectionHeader,
  SectionPrimary,
} from '~src/views/components'
import * as paths from '~src/paths'
import './slider.scss'

const Memory = ({ memory }) => (
  <div>
    <MemorySummary
      name={memory.victimName}
      owner={memory.ownerFirstName}
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
    <ButtonPrimary href={paths.memory(memory.id)}>
      Ver homenagem completa
    </ButtonPrimary>
  </div>
)

class FeaturedMemoriesSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 0,
    }
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
    const { loading, memories, className } = this.props

    return loading ? null : (
      <SectionPrimary
        className={`section--featured-memories ${className}`}
        header={<SectionHeader title="Homenagens" />}
      >
        <ViewPager>
          <Frame className="frame" autoSize="height">
            <Track
              infinite
              viewsToShow={1}
              className="track"
              ref={(track) => { this.track = track }}
              onViewChange={(indicies) => {
                this.setState({ currentView: indicies[0] })
              }}
            >
              {memories.map(memory => (
                <View className="view">
                  <div>
                    <div className="components--memory-summary">
                      <img
                        src="/img/icon-one-finger-swipe-horizontally.svg"
                        alt="Gesture Swipe Horizontally"
                        style={{ position: 'absolute', right: 0, top: 0 }}
                        width="40"
                        height="40"
                        className="help--gesture"
                      />
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url('${process.env.SERVER_DOMAIN}${memory.victimPhoto}')`,
                          width: 164,
                          height: 132,
                          left: 0,
                        }}
                      />
                      <div
                        className="summary"
                        style={{ paddingTop: 100, marginLeft: '30%', width: '63%' }}
                      >
                        <div className="memory-identity">
                          <div className="name">{memory.victimName}</div>
                          <span className="lifetime">
                            {memory.victimBornAt} / {memory.victimDeadAt}
                          </span>
                          <div className="owner">{memory.ownerFirstName}</div>
                        </div>
                        <div className="memory-description">
                          <span className="components--paragraph-line-rounded">
                            {memory.victimHistory}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="quote">
                      {memory.victimRememberText}
                    </div>
                  </div>
                </View>
              ))}
            </Track>
          </Frame>
          <nav className="pager-controls">
            {Array(memories.length).fill('').map((element, index) => (
              <button
                type="button"
                className={`pager-control ${this.state.currentView === index ? 'active' : ''}`}
                onClick={() => this.track.scrollTo(index)}
              >
                {index + 1}
              </button>
            ))}
          </nav>
          <a
            type="button"
            className="button-primary"
            href={`/memory/${memories[this.state.currentView].id}`}
          >
            Ver homenagem completa
          </a>
        </ViewPager>
      </SectionPrimary>
    )
  }
}

FeaturedMemoriesSection.defaultProps = {
  className: '',
}

export default FeaturedMemoriesSection
