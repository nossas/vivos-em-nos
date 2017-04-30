import { h } from 'preact' /** @jsx h */
import Card from '../../layout/card'

export default function (props) {
  return (
    <div className="page page__404">
      <Card>
        <h1>404 Page</h1>
        <p>Looks like you were given a bad link ;-)</p>
        <pre>{ props.url }</pre>
      </Card>
    </div>
  )
}
