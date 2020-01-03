import React from "react"
import HomeHeader from "./home-header"
import PostHeader from "./post-header"
import "../styles/global.css"

const rootPath = `${__PATH_PREFIX__}/`

class Layout extends React.Component {
  render() {
    const { location, children, author, title, description, image, social} = this.props
    const Header = location.pathname === rootPath ? HomeHeader : PostHeader

    return (
      <div className="font-sans">
        <Header title={title} description={description} image={image} social={social} />

        <main className="px-8">{children}</main>

        <footer className="my-3 mx-auto text-center text-gray-500">
          {author} © {new Date().getFullYear()}, build with
          {` `}
          <a className="underline" href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
