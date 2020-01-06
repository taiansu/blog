import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/post-layout"
import SocialIcons from "../components/social-icons"
import SEO from "../components/seo"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const {title, author, description, social} = data.site.siteMetadata

    return (
      <Layout location={this.props.location} title={title} description={description} author={author} social={social}>
        <SEO title="Tai An Su: About" />
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-500">about</h3>
          <h1 className="text-3xl mt-2">{title}</h1>

          <SocialIcons social={social} styles="mt-2 text-gray-800" showAbout={false}/>

          <ul className="mt-6 ml-4 text-sm list-disc leading-loose sm:ml-16 sm:text-lg lg:ml-24 lg:text-xl">
            <li>software craftsman<span className="italic">, 10+ yrs</span></li>
              <ul id="about-lang" className="font-mono font-normal text-xs sm:text-base lg:text-lg">
                <li className="inline-block">Elixir</li>
                <li className="inline-block">Haskell</li>
                <li className="inline-block">React</li>
                <li className="inline-block">Ruby</li>
                <li className="inline-block">Rust</li>
              </ul>
            <li>magazine editor<span className="italic">, 3 yrs</span></li>
            <li>pluviophile<span className="italic">, 20+ yrs</span></li>
            <li>tango music lover<span className="italic">, 20+ yrs</span></li>
            <li>bookworm<span className="italic">, 30+ yrs</span></li>
            <li>husband and father<span className="italic">, not long enough.</span></li>
            <li>Co-orginazor of <a href="https://elixir.tw" className="text-blue-700">Elixir.tw</a></li>
            <li>Teach JavaScript at <a href="https://astrocamp.tw" className="text-blue-700">AstroCamp</a>, 5xRuby</li>
          </ul>
        </div>
      </Layout>
    )
  }
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

