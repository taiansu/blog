import React from "react"
import PropTypes from "prop-types"

const MathJaxConfig = `
window.MathJax = {
  tex2jax: {
    inlineMath: [['$', '$'] ],
    displayMath: [['$$', '$$'] ],
    processEscapes: true,
    processEnvironments: true,
    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
    TeX: {
      equationNumbers: {autoNumber: 'AMS'},
      extensions: ['AMSmath.js', 'AMSsymbols.js', 'color.js'],
    },
    CommonHTML: { linkbreaks: { automatic: true } },
    SVG: { linkbreaks: { automatic: true } }
  }
};
`;

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link href="https://fonts.googleapis.com/css?family=Baskervville|Montserrat:300,400&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet" />
        <link rel="icon" type="image/png" href="./favicon.png" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          className="min-h-screen"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}

        <script dangerouslySetInnerHTML={{__html: MathJaxConfig}} />
        <script src="https://cdn.bootcss.com/mathjax/2.7.4/latest.js?config=TeX-AMS_CHTML" />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
