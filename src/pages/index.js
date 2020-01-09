import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { title: siteTitle, author, description, social } = data.site.siteMetadata
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
          <ul className="ml-2 sm:ml-20 md:ml-24">
          {posts.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <li key={node.fields.slug} className="mb-2 flex flex-col">
                { index === 0 ? "" : <hr className="text-gray-900 mb-4 max-w-md"/> }
                <div className="flex items-baseline mt-2">
                  <h3 className="inline-block text-gray-700 text-xs uppercase tracking-widest w-1/3 sm:text-sm lg:text-base">
                    <time>{node.frontmatter.date}</time>
                  </h3>
                  <h2 className="inline-block text-base sm:text-lg md:text-xl lg:text-2xl">
                    <Link to={node.fields.slug}>{title}</Link>
                  </h2>
                </div>
                <div className="hidden flex text-gray-700 mt-1 text-xs sm:inline-block">
                  <div className="inline-block w-1/3"></div>
                  <div className="inline-block w-2/3">
                    { node.frontmatter.tags.length === 0 ?  ""
                        : (<span className="">
                            <i className="fa fa-tags text-gray-700 mr-2" />
                          </span>)
                    }
                    <span className="w-2/3">{node.frontmatter.tags.join(", ")}</span>
                  </div>
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
            date(formatString: "MMMM DD, YYYY")
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
