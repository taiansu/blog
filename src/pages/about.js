import React from "react"
import { graphql } from "gatsby"
import { GatsbySeo } from 'gatsby-plugin-next-seo'

import Layout from "../components/post-layout"
import SocialIcons from "../components/social-icons"

const AboutPage = ({data, location}) => {
  const { title, author, description, social } = data.site.siteMetadata

  return (
    <Layout location={location} title={title} description={description} author={author} social={social}>
      <GatsbySeo
        tilte="Tai An, Su: About"
        canonical={location}
        />
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-500">about</h3>
        <h1 className="mt-2 text-3xl">{title}</h1>

        <SocialIcons social={social} styles="mt-2 text-gray-800" showAbout={false}/>

        <ul className="mt-6 ml-4 text-sm leading-loose list-disc sm:ml-16 sm:text-lg lg:ml-24 lg:text-xl">
          <li>Software craftsman<span className="italic">, 10+ yrs</span></li>
            <ul id="about-lang" className="font-mono text-xs font-normal sm:text-base lg:text-lg">
              <li className="inline-block">Elixir</li>
              <li className="inline-block">Haskell</li>
              <li className="inline-block">JavaScript/React</li>
              <li className="inline-block">Ruby</li>
              <li className="inline-block">Rust</li>
            </ul>
          <li>Magazine editor<span className="italic">, 3 yrs</span></li>
          <li>Pluviophile<span className="italic">, 20+ yrs</span></li>
          <li>Tango music lover<span className="italic">, 20+ yrs</span></li>
          <li>Bookworm<span className="italic">, 30+ yrs</span></li>
          <li>Husband and father<span className="italic">, not long enough, <span className="text-xs">and will never be</span>.</span></li>
          <li>Co-orginazor of <a href="https://elixir.tw" className="text-blue-700">Elixir.tw</a></li>
          <li>JavaScript teacher at <a href="https://astrocamp.tw" className="text-blue-700">AstroCamp</a>, 5xRuby</li>
          <li>Software development consultant</li>
        </ul>
      </div>
    </Layout>
  )
}

export default AboutPage

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

