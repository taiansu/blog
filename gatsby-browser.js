exports.onRouteUpdate = ({location}) => {
  if (window.MathJax && window.MathJax.Hub) {
    window.MathJax.Hub.Config({
      CommonHTML: {
        scale: 135
      },
      SVG: {
        scale: 135
      }
    })

    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  }
};
