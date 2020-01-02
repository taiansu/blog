import React from "react"
import { Link } from "gatsby"
import banner from "../../content/assets/banner.jpg"
import logo from "../../content/assets/logo.png"
// import author from "../../content/assets/author.png"

const HomeHeader = ({title, description})  => (
  <div className="min-w-sm mt-0 mx-0 mb-3">
    <img src={banner} alt="banner background"  className="h-48 md:h-64 lg:h-72 w-full object-cover object-center" />
    <div className="-mt-12 flex items-center justify-around">
      <img src={logo} alt="logo" className="h-24 w-24 rounded-full object-cover object-center lg:h-32 lg:w-32" />
    </div>
    <h1 className="mx-auto mt-3 text-center text-gray-900 font-sans text-4xl lg:text-5xl">
      <Link className="shadow-none no-underline" to={`/`}>
        {title}
      </Link>
    </h1>
    <h3 className="mt-0 mx-auto text-center text-md text-gray-900 font-normal font-serif lg:text-2xl">{description}</h3>
  </div>
)

export default HomeHeader
