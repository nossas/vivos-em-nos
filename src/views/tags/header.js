import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'

export function SmallHeader () {
  return (
    <div className="header">
      <h1>Preact Starter</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/credit">Credit</Link>
      </nav>
    </div>
  )
}
