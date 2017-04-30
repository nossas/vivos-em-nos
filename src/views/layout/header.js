import { h } from 'preact' /** @jsx h */
import { connect } from 'preact-redux'
import { Link } from 'preact-router'
import * as MenuActions from '../../menu/redux/action-creators'

function SmallHeader({ setMenuActive }) {
  return (
    <div className="header">
      <div className="row">
        <div className="col-xs-3 menu-box">
          <button className="menu-open" onClick={() => setMenuActive(true)}>
            <img src="/img/icone-menu.svg" alt="hamburguer menu" />
          </button>
        </div>
        <div className="col-xs-6 menu-box">
          <h1 className="logo"><Link href="/">
            <img src="/img/logo-vivos-em-nos.svg" alt="logo vivos em nos" />
          </Link></h1>
        </div>
      </div>
    </div>
  )
}


const mapDispatchToProps = {
  setMenuActive: MenuActions.setActive,
}

export default connect(undefined, mapDispatchToProps)(SmallHeader)
