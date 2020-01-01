import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/global.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const {title: siteTitle, author, description} = data.site.siteMetadata
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle} author={author} description={description} >
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3 className="mb-2 text-gray-800 hover:text-gray-700 focus:text-gray-700">
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
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
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: { frontmatter: { published: { ne: false } } },
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
          }
        }
      }
    }
  }
`
