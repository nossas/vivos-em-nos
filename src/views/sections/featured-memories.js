import { h, Component } from 'preact' /** @jsx h */
import { ViewPager, Frame, Track, View } from 'react-view-pager'
import { SectionHeader, SectionPrimary } from '~src/views/components'
import * as string from '~src/utils/string'
import './slider.scss'

class FeaturedMemoriesSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 0,
    }
  }

  render() {
    const { loading, memories, className } = this.props
    return loading || !memories.length ? null : (
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
                          <div className="owner">Homenageada por: {memory.ownerFirstName}</div>
                        </div>
                        <div className="memory-description">
                          <span className="components--paragraph-line-rounded">
                            {memory.victimHistory.substring(0, 50) + (memory.victimHistory.length > 50 ? '...' : '')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="quote">
                      {memory.victimRememberText.substring(0, 100) + (memory.victimRememberText.length > 100 ? '...' : '')}
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
            href={string.slugify(memories[this.state.currentView].victimName)}
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
