import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/author.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            default
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="flex mb-8 items-center">
      <div className="mr-4">
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          className="rounded-full h-20 w-20" />
      </div>
      <div>
        <p>
          Written by <strong>{author}</strong> who lives and works in San
          Francisco building useful things.
          {` `}
          <a href={`https://twitter.com/${social.twitter}`}>
            You should follow him on Twitter
          </a>
        </p>
      </div>
    </div>
  )
}

export default Bio
