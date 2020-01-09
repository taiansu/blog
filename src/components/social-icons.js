import React from "react"
import { Link } from "gatsby"

const SocialIcons = ({social, styles = "", showAbout = true})  => (
  <div className={`${styles} mx-auto flex items-center justify-center text-base sm:text-lg`}>
    <a href={`https://github.com/${social.default}`}>
      <i className="fab fa-github"></i>
    </a>
    <span className="mx-2 sm:mx-3">·</span>
    <a href={`https://twitter.com/${social.default}`}>
      <i className="fab fa-twitter"></i>
    </a>
    <span className="mx-2 sm:mx-3">·</span>
    <a href={`https://linkedin.com/in/${social.default}`}>
      <i className="fab fa-linkedin"></i>
    </a>
    <span className="mx-2 sm:mx-3">·</span>
    <a href={`https://www.facebook.com/${social.facebook}`}>
      <i className="fab fa-facebook"></i>
    </a>
    <span className="mx-2 sm:mx-3">·</span>
    <a href="/rss.xml">
      <i className="fas fa-rss ml-1"></i>
    </a>

    {
      aboutLink(showAbout)
    }

  </div>
)

export default SocialIcons

function aboutLink(show) {
  if (!show) { return "" }
  return (
    <>
      <span className="mx-2 sm:mx-3">·</span>
      <Link to={"/about"}><i className="far fa-address-card"></i></Link>
    </>
  )
}
