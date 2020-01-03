import React from "react"
import logo from "../../content/assets/logo.png"
import { Link } from "gatsby"
import "../styles/global.css"

class Layout extends React.Component {
  render() {
    const { children, author, image } = this.props

    return (
      <div className="font-sans">
        <header className="mb-3 bg-center bg-cover flex items-start justify-between h-32 " style={{backgroundImage: `url(${image})`}}>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 border-8 mt-3 ml-3 border-black" />
          </Link>
        </header>

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
