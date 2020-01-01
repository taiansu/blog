exports.onRouteUpdate = ({location}) => {
  if (window.MathJax && window.MathJax.Hub) {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  }
};
