import React from "react"
import { Link } from "gatsby"
import SocialIcons from "./social-icons"
import banner from "../../content/assets/banner1.jpg"
import logo from "../../content/assets/logo.png"
import "../styles/global.css"

class Layout extends React.Component {
  render() {
    const { children, author, title, social} = this.props

    return (
      <div className="font-sans">
        <hgroup className="mx-0 mt-0 mb-3 min-w-sm">
          <img src={banner} alt="banner background"  className="object-cover object-top w-full h-32 sm:h-48 lg:h-64" />

          <div className="flex items-center justify-around -mt-8 lg:-mt-12">
            <img src={logo} alt="logo" className="object-cover object-center w-16 h-16 border border-white rounded-full shadow-md lg:h-24 lg:w-24" />
          </div>

          <h2 className="mx-auto mt-2 text-xl tracking-wide text-center text-gray-800 sm:text-2xl lg:text-3xl">
            <Link className="no-underline shadow-none" to={`/`}>
              {author}
            </Link>
          </h2>

          <h1 className="mx-auto font-serif text-2xl tracking-wide text-center sm:text-3xl lg:text-4xl">
            {title}
          </h1>

          <SocialIcons social={social} styles="my-3 text-gray-500"/>

        </hgroup>

        <main className="px-8">{children}</main>

        <footer className="mx-auto mt-8 mb-5 text-center text-gray-500">
          <div>
            {author} © {new Date().getFullYear()}
            <span className="mx-3">·</span>
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
          </div>
          <div>
            build with {` `}<a className="underline" href="https://www.gatsbyjs.org">Gatsby</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
