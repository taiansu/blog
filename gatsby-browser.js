require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

exports.onRouteUpdate = ({location}) => {
  if (window.MathJax && window.MathJax.Hub) {
    window.MathJax.Hub.Config({
      CommonHTML: {
        scale: 110
      },
      SVG: {
        scale: 110
      }
    })

    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  }
};
