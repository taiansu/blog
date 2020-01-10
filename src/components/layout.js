import React from "react"
import { Link } from "gatsby"
import SocialIcons from "./social-icons"
import banner from "../../content/assets/banner1.jpg"
import logo from "../../content/assets/logo.png"
import "../styles/global.css"

class Layout extends React.Component {
  render() {
    const { children, author, title, description, social} = this.props

    return (
      <div className="font-sans">
        <div className="min-w-sm mt-0 mx-0 mb-3">
          <img src={banner} alt="banner background"  className="h-32 sm:h-48 lg:h-64 w-full object-cover object-top" />

          <div className="-mt-8 flex items-center justify-around lg:-mt-12">
            <img src={logo} alt="logo" className="h-16 w-16 rounded-full border border-white shadow-md object-cover object-center lg:h-24 lg:w-24" />
          </div>

          <h2 className="mx-auto mt-2 text-center text-gray-800 tracking-wide text-xl sm:text-2xl lg:text-3xl">
            <Link className="shadow-none no-underline" to={`/`}>
              {title}
            </Link>
          </h2>

          <h1 className="mx-auto text-center tracking-wide font-serif text-2xl sm:text-3xl lg:text-4xl">
            {description}
          </h1>

          <SocialIcons social={social} styles="my-3 text-gray-500"/>

        </div>

        <main className="px-8">{children}</main>

        <footer className="mt-8 mb-5 mx-auto text-center text-gray-500">
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
