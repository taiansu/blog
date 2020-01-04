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
          <img src={banner} alt="banner background"  className="h-48 sm:h-64 lg:h-72 w-full object-cover object-center" />

          <div className="-mt-12 flex items-center justify-around lg:-mt-16">
            <img src={logo} alt="logo" className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover object-center lg:h-32 lg:w-32" />
          </div>

          <h2 className="mx-auto mt-2 text-center text-gray-900 tracking-wide text-xl sm:text-2xl lg:text-3xl">
            <Link className="shadow-none no-underline" to={`/`}>
              {title}
            </Link>
          </h2>

          <h1 className="mx-auto text-center text-gray-900 tracking-wide font-normal font-serif text-2xl sm:text-3xl lg:text-4xl">{description}</h1>

          <div className="my-3 mx-auto flex items-center justify-center text-gray-700 text-base sm:text-lg">
            <a href={`https://github.com/${social.github}`}>
              <i className="fab fa-github"></i>
            </a>
            <span className="mx-3">·</span>
            <a href={`https://twitter.com/${social.twitter}`}>
              <i className="fab fa-twitter"></i>
            </a>
            <span className="mx-3">·</span>
            <a href={`https://www.facebook.com/${social.facebook}`}>
              <i className="fab fa-facebook"></i>
            </a>
            <span className="mx-3">·</span>
            <Link to={"/about"}>
            <span>about</span>
            </Link>
          </div>
        </div>

        <main className="px-8">{children}</main>

        <footer className="mt-8 mb-5 mx-auto text-center text-gray-500">
          <a href="/rss.xml">Subscribe with{` `}<i className="fas fa-rss ml-1"></i></a>
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
