import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { title, children, author, description } = this.props

    return (
      <div className="max-w-sm mx-auto px-6 py-1">
        <h1 className="mt-8 mx-auto text-center text-4xl">
          <Link className="shadow-none no-underline" to={`/`}>
            {title}
          </Link>
        </h1>
        <h3 className="mb-5 mx-auto text-center text-2xl text-gray-800 font-hairline">{description}</h3>

        <main>{children}</main>

        <footer className="mt-5 mx-auto text-center">
          {author} © {new Date().getFullYear()}, with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
