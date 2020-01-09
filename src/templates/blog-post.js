import React from "react"
import { Link, graphql } from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"

import PostLayout from "../components/post-layout"
import SEO from "../components/seo"
import authorImg from "../../content/assets/author.png"

class BlogPostTemplate extends React.Component {
  render() {
    const { previous, next } = this.props.pageContext
    const {title: siteTitle, description: siteDescription, author, social} = this.props.data.site.siteMetadata
    const {frontmatter, excerpt, body, fields: {readingTime}} = this.props.data.mdx
    const {title, description, image, date, tags} = frontmatter

    return (
      <PostLayout location={this.props.location} title={siteTitle} description={siteDescription} image={image} social={social} readingTime={readingTime.text}>
        <SEO
          title={title}
          description={description || excerpt}
        />
        <article>
          <header className="text-center -mt-18">
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="mt-2 mb-4 flex justify-center items-center text-gray-500">
              <Link to={"/about"}>
                <img src={authorImg} alt="logo"
                  className="rounded-full shadow mr-2 h-8 w-8 sm:shadow-md md:h-10 md:w-10 md:shadow-lg lg:h-12 lg:w-12 lg:shadow-xl"/>
              </Link>
              <span className="text-xs sm:text-base md:text-lg lg:text-xl">on{' '}<time>{date}</time></span>
              { tags && tags.length ? (
                  <span className="text-xs sm:text-base md:text-lg lg:text-xl">
                    <i className="fa fa-tags ml-3 mr-1" />
                    {tags.join(", ")}
                  </span>
              ) : ""}
            </div>
          </header>

          <div className="mdx-content mt-8 max-w-md mx-auto sm:max-w-sm md:max-w-md md:mt-10 md:max-w-lg lg:mt-12 lg:max-w-xl">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </article>

        <div className="flex items-start justify-center md:mb-4">
          <div className="w-3/4 border-t border-gray-300 py-3 sm:w-1/2">
            <div className="uppercase font-bold text-xs text-gray-400 -mt-2">written by</div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mt-4">
                <img src={authorImg} alt="author-image" className="h-8 w-8 rounded-full border shadow mr-2" />
                <div className="mr-2">{author},</div>
                <div className="font-bold">{date}</div>
              </div>
              <div className="mt-1">
                <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
              </div>
              <div className="mt-1">
                <a href="/rss.xml">Subscribe {` `}<i className="fas fa-rss ml-1"></i></a>
              </div>
            </div>

          </div>
        </div>

        <nav>
          <ul className="-mx-6 my-4 flex flex-wrap justify-between p-0 list-none text-sm sm:text-base sm:mx-0 lg:mx-4 lg:text-lg">
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
        social {
          default
          facebook
        }
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
