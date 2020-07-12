import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import Layout from '../components/layout'
import Paginator from "../components/paginator"

const BlogIndex = ({ data, pageContext }) => {
  const {
    title: siteTitle,
    siteUrl: location,
    author,
    social
  } = data.site.siteMetadata
  const posts = data.allMdx.edges

  return (
    <Layout
      location={location}
      title={siteTitle}
      author={author}
      social={social}
    >
      <GatsbySeo
        tilte={siteTitle}
        canonical={location}
      />

      <div className="max-w-md mx-auto mt-6 md:max-w-lg md:mt-6 lg:max-w-xl lg:mt-8">
        <ul>
          {posts.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <li key={node.fields.slug} className="w-3/4 mx-auto my-6">

                <section className="flex flex-col justify-start">
                  <div className="flex items-center text-gray-600">
                    <time className="text-base">{node.frontmatter.date}</time>

                    {node.frontmatter.tags.length === 0 ? ""
                      : (<span className="hidden text-xs sm:inline-block">
                        <i className="ml-4 mr-2 fa fa-tags" />
                      </span>)
                    }
                    <span className="hidden text-xs sm:inline-block">{node.frontmatter.tags.join(", ")}</span>

                  </div>
                  <h2 className="text-base sm:text-xl sm:mt-1">
                    <Link to={node.fields.slug}>{title}</Link>
                  </h2>
                </section>

                <hr className="mt-6 text-gray-900" />
              </li>
            )
          })}
        </ul>
      </div>
      <Paginator pageContext={pageContext} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        social {
          default
          facebook
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            description
            tags
          }
          fields {
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`
