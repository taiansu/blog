import React from "react"
import HomeHeader from "./home-header"
import PostHeader from "./post-header"
import "../styles/global.css"

const rootPath = `${__PATH_PREFIX__}/`

class Layout extends React.Component {
  render() {
    const { location, children, author, image } = this.props
    const Header = location.pathname === rootPath ? HomeHeader : PostHeader

    return (
      <div>
        <Header image={image} />

        <main className="max-w-sm mx-10">{children}</main>

        <footer className="mt-5 mx-auto font-semibold text-center">
          {author} © {new Date().getFullYear()}, build with
          {` `}
          <a className="underline font-sans" href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
