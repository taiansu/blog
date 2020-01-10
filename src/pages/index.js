import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const {
      title: siteTitle,
      author,
      description,
      social,
    } = data.site.siteMetadata
    const posts = data.allMdx.edges

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        author={author}
        social={social}
        description={description}
      >
        <SEO title="All posts" />
        <div className="max-w-md mx-auto mt-6 md:max-w-lg md:mt-6 lg:max-w-xl lg:mt-8">
          <ul>
            {posts.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <li key={node.fields.slug} className="my-6 w-3/4 mx-auto">
                  {index === 0 ? (
                    ""
                  ) : (
                    <hr className="text-gray-900 mb-6" />
                  )}
                  <div className="flex flex-col justify-start">
                    <div className="flex items-center text-gray-600">
                      <time className="text-base">{node.frontmatter.date}</time>

                      { node.frontmatter.tags.length === 0 ?  ""
                        : (<span className="hidden text-xs sm:inline-block">
                              <i className="fa fa-tags ml-4 mr-2" />
                            </span>)
                      }
                      <span className="hidden text-xs sm:inline-block">{node.frontmatter.tags.join(", ")}</span>

                    </div>
                    <h2 className="text-base sm:text-xl sm:mt-1">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h2>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
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
