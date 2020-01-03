import React from "react"
import { Link } from "gatsby"
import banner from "../../content/assets/banner.jpg"
import logo from "../../content/assets/logo.png"
import "../styles/global.css"

class Layout extends React.Component {
  render() {
    const { children, author, title, description, social} = this.props

    return (
      <div className="font-sans">
        <div className="min-w-sm mt-0 mx-0 mb-3">
          <img src={banner} alt="banner background"  className="h-48 md:h-64 lg:h-72 w-full object-cover object-center" />

          <div className="-mt-12 flex items-center justify-around lg:-mt-16">
            <img src={logo} alt="logo" className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover object-center lg:h-32 lg:w-32" />
          </div>

          <h1 className="mx-auto mt-2 text-center text-gray-900 tracking-wide text-xl lg:text-2xl">
            <Link className="shadow-none no-underline" to={`/`}>
              {title}
            </Link>
          </h1>

          <h3 className="mx-auto text-center text-gray-900 tracking-wide font-normal font-serif text-lg sm:text-2xl md:text-3xl">{description}</h3>

          <div className="my-3 mx-auto flex items-center justify-center text-gray-700 text-xs sm:text-sm md:text-base">
            <a href={`https://github.com/${social.github}`}>
              <i className="fab fa-github"></i>
            </a>
            <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <a href={`https://twitter.com/${social.twitter}`}>
              <i className="fab fa-twitter"></i>
            </a>
            <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <a href={`https://www.facebook.com/${social.facebook}`}>
              <i className="fab fa-facebook"></i>
            </a>
            <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <Link to={"/about"}>
            <span>about</span>
            </Link>
          </div>
        </div>


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
