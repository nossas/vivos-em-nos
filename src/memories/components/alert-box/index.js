import { h } from 'preact' /** @jsx h */
import { ButtonOutline } from '../../../views/components'
import './styles.sass'

const AlertBox = ({ children, next, doneText }) => (
  <div className="AlertBox">
    {children}
    {next && (
      <ButtonOutline onClick={next}>
        {doneText}
      </ButtonOutline>
    )}
  </div>
)

AlertBox.defaultProps = {
  doneText: 'Ok entendi',
}

export default AlertBox
