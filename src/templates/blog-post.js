import React from "react"
import { Link, graphql } from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"

import PostLayout from "../components/post-layout"
import SEO from "../components/seo"
import author from "../../content/assets/author.png"

class BlogPostTemplate extends React.Component {
  render() {
    const { previous, next } = this.props.pageContext
    const {title: siteTitle} = this.props.data.site.siteMetadata
    const {frontmatter, excerpt, body, fields: {readingTime}} = this.props.data.mdx
    const {title, description, image, date, tags} = frontmatter

    return (
      <PostLayout location={this.props.location} title={siteTitle} image={image} readingTime={readingTime.text}>
        <SEO
          title={title}
          description={description || excerpt}
        />
        <article>
          <header className="text-center -mt-18">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="mt-2 mb-4 flex justify-center items-center text-gray-500">
              <Link to={"/about"}>
                <img src={author} alt="logo"
                  className="rounded-full shadow mr-2 h-8 w-8 sm:shadow-md md:h-10 md:w-10 md:shadow-lg lg:h-12 lg:w-12 lg:shadow-xl"/>
              </Link>
              <span className="text-xs sm:text-base md:text-lg lg:text-xl">on&nbsp;<date>{date}</date></span>
              { tags && tags.length ? <span className="text-xs sm:text-base md:text-lg lg:text-xl">：{tags.join(", ")}</span> : ""}
            </div>
          </header>

          <div class="mdx-content mt-8">
            <MDXRenderer>{body}</MDXRenderer>
          </div>

          <footer/ >
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </PostLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        image
      }
      fields {
        readingTime {
          text
        }
      }
      body
    }
  }
`
