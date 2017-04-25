import { h } from 'preact' /** @jsx h */

export default function (props) {
  return <a href={props.href} class="ButtonPrimary">{props.text}</a>
}
