import { h } from 'preact'
import { Router } from 'preact-router';
import { Provider } from 'preact-redux';

import store from '../store';
import Home from './pages/home';
import Layout from './tags/layout';
import Article from './pages/article';
import Error404 from './pages/errors/404';
import Credit from './pages/credit';
import Blog from './pages/blog';
import Todo from './todo';

// track pages on route change
const onChange = obj => window.ga && ga('send', 'pageview', obj.url);

export default (
	<Provider store={store}>
		<Layout>
			<Router onChange={ onChange }>
				<Home path="/" />
				<Todo path="/todo" />
				<Blog path="/blog" />
				<Article path="/blog/:title" />
				<Credit path="/credit" />
				<Error404 default />
			</Router>
		</Layout>
	</Provider>
);
