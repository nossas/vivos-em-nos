import { h } from 'preact' /** @jsx h */
import { MenuTrigger } from '../../menu/components'

export default () => (
  <section className='components--top-bar'>
    <div className='bar'>
      <MenuTrigger />
    </div>
  </section>
)
