import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
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
        <div className="max-w-md mx-auto mt-4 md:max-w-lg md:mt-6 lg:max-w-xl lg:mt-8">
          {posts.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                { index === 0 ? "" : <hr /> }
                <article className="my-6">
                  <header className="mb-3">
                    <h3 className="text-xl hover:text-gray-700 focus:text-gray-700 md:text-2xl">
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                  </header>
                  <section>
                    <p className="font-serif text-xl font-light"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                  <div className="post-meta mt-3 text-gray-500 text-sm font-light">
                    <time>{node.frontmatter.date}</time>
                    <span>: {node.frontmatter.tags.join(", ")}</span>
                  </div>
                </article>
              </div>
            )
          })}
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
