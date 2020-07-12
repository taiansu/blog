import React from "react"
import { Link, graphql } from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import PostLayout from "../components/post-layout"
import authorImg from "../../content/assets/author.png"

const BlogPostTemplate = ({ pageContext, data, location }) => {
  const { previous, next } = pageContext
  const {title: siteTitle, description: siteDescription, author, social} = data.site.siteMetadata
  const {frontmatter, excerpt, body, fields: {readingTime}} = data.mdx
  const {title, description, date, tags} = frontmatter

  return (
    <PostLayout location={location} title={siteTitle} description={siteDescription} social={social} readingTime={readingTime.text}>
        <GatsbySeo
          tilte={title}
          canonical={location.href}
          openGraph={{
            url: location.href,
            type: 'article',
            title: title,
            site_name: siteTitle,
            description: description || excerpt,
            image: []
          }}
          twitter={{
            handle: '@taiansu',
            site: '@taiansu',
            cardType: 'summary'
          }}
          />
      <article>
        <hgroup className="text-center -mt-18">
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <div className="flex items-center justify-center mt-2 mb-4 text-gray-500">
            <Link to={"/about"}>
              <img src={authorImg} alt="logo"
                className="w-8 h-8 mr-2 rounded-full shadow sm:shadow-md md:h-10 md:w-10 md:shadow-lg"/>
            </Link>
            <span className="text-xs sm:text-base md:text-lg">on{' '}<time>{date}</time></span>
            { tags && tags.length ? (
                <span className="text-xs sm:text-base md:text-lg">
                  <i className="ml-4 mr-1 fa fa-tags" />
                  {tags.join(", ")}
                </span>
            ) : ""}
          </div>
        </hgroup>

        <main className="max-w-md mx-auto mt-8 mdx-content sm:max-w-sm md:max-w-lg md:mt-10 lg:mt-12 lg:max-w-2xl">
          <MDXRenderer>{body}</MDXRenderer>
        </main>
      </article>

      <footer className="flex items-start justify-center md:mb-4">
        <div className="w-3/4 py-3 border-t border-gray-300 sm:w-1/2">
          <div className="-mt-2 text-xs font-bold text-gray-400 uppercase">written by</div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mt-4">
              <img src={authorImg} alt="author" className="w-8 h-8 mr-2 border rounded-full shadow" />
              <div className="mr-2">{author},</div>
              <div>{date}</div>
            </div>
            <div className="mt-1">
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
            </div>
            <div className="mt-1">
              <a href="/rss.xml">Subscribe {` `}<i className="ml-1 fas fa-rss"></i></a>
            </div>
          </div>

        </div>
      </footer>

      <nav>
        <ul className="flex flex-wrap justify-between p-0 my-4 -mx-6 text-sm list-none sm:text-base sm:mx-0 lg:mx-4 lg:text-lg">
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
        date(formatString: "MMM DD, YYYY")
        description
        tags
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
