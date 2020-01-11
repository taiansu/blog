import React from "react"
import { Link } from "gatsby"

const Paginator = ({pageContext: {currentPage, numPages}}) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : pageUrl(currentPage - 1)
  const nextPage = pageUrl(currentPage + 1)

  return (
    <div className="max-w-md mx-auto my-4 flex justify-between md:max-w-lg lg:max-w-xl">
      { isFirst ? <span className="w-1/2"></span> : <Link to={prevPage} rel="prev" className="w-1/2 text-left"> ← Previous Page </Link>}
      { isLast ?  <span className="w-1/2"></span> : <Link to={nextPage} rel="prev" className="w-1/2 text-right"> Next Page → </Link>}
    </div>
  )
}

export default Paginator

function pageUrl(num) {
  return `page${num.toString()}`
}
