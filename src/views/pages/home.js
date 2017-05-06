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
        <FeaturedMemoriesSection className="column is-one-third-tablet" />
        <AboutUsSection className="column is-one-third-tablet" />
        <AboutCampaignSection className="column is-one-third-tablet" />
      </div>

    </div>
  </LayoutDefault>
)
