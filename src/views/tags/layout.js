import { h } from 'preact';
import Header from './header';
import Menu from '../../menu'

export default function (props) {
  return (
    <div id="app">
      <Header />
      <Menu />
      <main id="content">
        { props.children }
      </main>
    </div>
  );
}
