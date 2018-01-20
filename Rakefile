require 'rake'
require 'fileutils'

task default: :dev
desc 'Deploy: build and push'
task deploy: %w(build push)

desc 'Build'
task :build do
  puts '--- Building your blog ---'
  sh 'JEKYLL_ENV=production bundle exec jekyll build'
end

desc 'Push'
task :push do
  puts '--- Copy keybase.txt ---'
  FileUtils.cp 'priv/keybase.txt', '_site/keybase.txt'
  puts '--- Deploy to Google Cloud Plateform storge ---'
  sh 'gsutil -m rsync -r _site gs://taian.su'
  puts '--- New post is online ---'
end

desc 'Dev'
task :dev do
  sh 'bundle exec jekyll serve --incremental'
end
