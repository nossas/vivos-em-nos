import { h } from 'preact' /** @jsx h */
import { ButtonOutline } from '../../../views/components'
import './styles.sass'

const AlertBox = ({ children, next, doneText }) => (
  <div className="AlertBox">
    <div className="columns">
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
        {children}
        {next && (
          <ButtonOutline onClick={next}>
            {doneText}
          </ButtonOutline>
        )}
        </div>
      </div>
    </div>
  </div>
)

AlertBox.defaultProps = {
  doneText: 'Ok, entendi!',
}

export default AlertBox
