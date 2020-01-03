import React from "react"
import logo from "../../content/assets/logo.png"
import { Link } from "gatsby"

const PostHeader = ({image}) => (
  <header className="mb-3 bg-center bg-cover flex items-start justify-between h-128 " style={{backgroundImage: `url(${image})`}}>
    <Link to={"/"}>
      <img src={logo} alt="logo" className="h-12 border-8 mt-3 ml-3 border-black" />
    </Link>
  </header>
)

export default PostHeader
