import React from "react"
import { graphql } from "gatsby"
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import Layout from "../components/layout"

const NotFoundPage = ({data, location}) => {
  const { title: siteTitle, author, description, social } = data.site.siteMetadata

  return (
    <Layout
      location={location}
      title={siteTitle}
      author={author}
      social={social}
      description={description}
    >

      <GatsbySeo
        tilte="404: Not Found"
        canonical={location}
        />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        social {
          default
          facebook
        }
      }
    }
  }
`
