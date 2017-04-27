import { h } from 'preact'
import './styles.sass'

const AlertBox = ({ children, onClick, done, doneText }) => (
  <div className='AlertBox'>
    {children}
    {done && <button className='ButtonPrimary' onClick={done}>{doneText}</button>}
  </div>
)

AlertBox.defaultProps = {
  doneText: 'Ok entendi'
}

export default AlertBox
