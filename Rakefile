require 'rake'
require 'fileutils'

task default: :dev
task deploy: %w[build push]

desc "Build"
task :build do
  puts "Building your blog..."
  sh 'bundle exec jekyll build'
end

task :push do
  puts "Deploy to S3 bucket"
  sh 's3_website push'
  puts "--- New post is online ---"
end

task :dev do
  sh 'bundle exec jekyll serve'
end
