[![Deploy to GitHub Pages](https://github.com/taiansu/blog/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/taiansu/blog/actions/workflows/deploy.yml)

# CodeJourney Taiwan's blog

Production builds include GA4 (`G-PB380CGWQ9`) through Hugo's built-in
Google Analytics template. Local preview does not load the tracking script.

## How to Contribute

### Prerequisite
```shell
brew install hugo
```

### Steps
1. Fork the repo
2. Clone the project to local machine with `git clone YOUR_REPO_ADDR`
3. Create a new post:
```shell
hugo new posts/YOUR_ARTICLE_TITLE.md
```
4. Write some awesome stuffs!
5. Run a local preview server
```shell
make server
```
6. Preview the article in [http://localhost:1313/](http://localhost:1313/)
6. Build the post with
```shell
make build
```
7. Send a pull request to our repo at [codejourneytw/codejourneytw.github.io](https://github.com/codejourneytw/codejourneytw.github.io)
