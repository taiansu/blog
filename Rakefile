require 'rake'

task default: %w[build deploy]

desc "Build"
task :build do
  puts "Building your blog..."
  sh 'bundle exec jekyll build'
end

task :deploy do
  puts "Deploy to S3 bucket"
  sh 's3_website push'
  puts "--- New post is online ---"
end
