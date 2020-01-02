import React from "react"
import HomeHeader from "./home_header"
import PostHeader from "./post_header"
import "../styles/global.css"

const rootPath = `${__PATH_PREFIX__}/`

class Layout extends React.Component {
  render() {
    const { location, children, title, description, author} = this.props
    const Header = location.pathname === rootPath ? HomeHeader : PostHeader

    return (
      <div>
        <Header title={title} description={description} />

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
