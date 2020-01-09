import React from "react"
import { Link } from "gatsby"

import logo from "../../content/assets/logo.png"
import banner from "../../content/assets/banner.jpg"
import "../styles/global.css"

class Layout extends React.Component {
  render() {
    const { children, title, description, image, readingTime } = this.props

    return (
      <div className="font-sans flex flex-col min-h-screen">
        <header className="mb-3 -mt-8 bg-center bg-cover flex items-center justify-between h-32 " style={{backgroundImage: `url(${image})`}}>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 border-8 mt-3 ml-3 border-black" />
          </Link>
          <div className="mt-5 mr-3 text-gray-500">{ readingTime }</div>
        </header>

        <main className="px-8 -mt-8 flex-1 flex-auto font-light">{children}</main>

        <footer className="text-center text-white flex-shrink-0">
          <div className="flex flex-col items-center justify-center h-32 sm:h-48 w-full bg-right-bottom" style={{backgroundImage: `url(${banner})`}}>
            <Link to={"/"}>
              <h3 className="font-sans font-bold text-2xl sm:text-xl lg:text-2xl">
                {title}
              </h3>
            </Link>
            <Link to={"/"}>
              <h2 className="font-serif hidden sm:block text-2xl lg:text-4xl">{description}</h2>
            </Link>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
