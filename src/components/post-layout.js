import React from "react"
import { Link } from "gatsby"

import logo from "../../content/assets/logo.png"
import banner from "../../content/assets/banner.jpg"
import "../styles/global.css"
import "../styles/article.css"

const Layout = ({ children, title, description, image, readingTime, location }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="flex items-center justify-between h-32 mb-3 -mt-8 bg-center bg-cover " style={{ backgroundImage: `url(${image})` }}>
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-12 mt-3 ml-3 border-8 border-black" />
        </Link>
        <div className="mt-5 mr-3 text-gray-500">{readingTime}</div>
      </header>

      <main className="flex-1 flex-auto px-8 -mt-8">{children}</main>

      <footer className="flex-shrink-0 text-center text-white">
        <div className="flex flex-col items-center justify-center w-full h-32 bg-right-bottom sm:h-48" style={{ backgroundImage: `url(${banner})` }}>
          <Link to={"/"}>
            <h3 className="font-sans text-2xl font-bold sm:text-xl lg:text-2xl">
              {title}
            </h3>
          </Link>
          <Link to={"/"}>
            <h2 className="hidden font-serif text-2xl sm:block lg:text-4xl">{description}</h2>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
