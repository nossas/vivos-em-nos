import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'
import { MenuTrigger, MenuHorizontal, MenuHorizontalItem } from '~src/menu/components'
import { Logo, MenuPrimary } from '~src/views/components'
import * as detect from '~src/utils/detect'

export default () => (
  <section className="components--top-bar">
    {detect.mobile ? (
      <div className="bar columns is-mobile">
        <div className="column is-one-quarter-mobile">
          <MenuTrigger />
        </div>
        <div className="column has-text-centered logo">
          <h1>
            <Link href="/">
              <Logo />
            </Link>
          </h1>
        </div>
        <div className="column is-one-quarter-mobile" />
      </div>
    ) : (
      <div className="bar columns is-mobile">
        <MenuPrimary
          ContainerComponent={MenuHorizontal}
          ChildrensComponent={MenuHorizontalItem}
          childrensClassName="menu--horizontal-item"
        />
      </div>
    )}
  </section>
)
