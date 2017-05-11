import { h } from 'preact' /** @jsx h */
import { LayoutDefault, Header } from '~src/views/layout/layout'
import {
  AboutCampaignSection,
  AboutUsSection,
  SplashSection,
  FeaturedMemoriesSection,
} from '~src/views/sections'

export default () => (
  <LayoutDefault>
    <Header />

    <div className="page page__home">
      <SplashSection />

      <div className="columns">
        <AboutCampaignSection className="column is-one-third-tablet" />
        <FeaturedMemoriesSection
          className="column is-one-third-tablet"
          language={window.defaultLanguage}
        />
        <AboutUsSection className="column is-one-third-tablet" />
      </div>

    </div>
  </LayoutDefault>
)
