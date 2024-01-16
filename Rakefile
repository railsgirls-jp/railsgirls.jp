require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'version' => "0.2.13",
  'layouts' => File.join(SOURCE, "_layouts"),
  'pages' => File.join(SOURCE, "_pages"),
  'posts' => File.join(SOURCE, "_posts"),
  'pages-jp' => File.join(SOURCE, "_pages-jp"),
  'post_ext' => "markdown",
  'page_ext' => "markdown"
}

desc <<~DESK
  Begin a new guide in #{CONFIG['pages']}
  Usage: rake guide title="A Title" [date="2012-02-09"]
DESK
task :guide do
  abort("rake aborted: '#{CONFIG['pages']}' directory not found.") unless FileTest.directory?(CONFIG['pages'])
  title = ENV["title"] || "new-guide"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['pages'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new guide: #{filename}"
  open(filename, 'w') do |guide|
    guide.puts "---"
    guide.puts "layout: page"
    guide.puts "title: \"#{title.gsub(/-/,' ')}\""
    guide.puts 'description: ""'
    guide.puts "category: "
    guide.puts "tags: []"
    guide.puts "---"
    guide.puts ""
  end
end # task :guide

desc <<~DESK
  Begin a new post in #{CONFIG['posts']}/blog
  Usage: rake blog title="A Title" [date="2012-02-09"] [post_ext="html"]
DESK
task :blog do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  post_ext = ENV['post_ext'] || CONFIG['post_ext']
  filename = File.join(CONFIG['posts'], 'blog', "#{date}-#{slug}.#{post_ext}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "date: #{date}"
    post.puts "image: /images/railsgirls-sq.png"
    post.puts "---"
    post.puts ""
  end
end # task :blog

desc <<~DESK
  Begin a new original_content in #{CONFIG['pages-jp']}
  Usage: rake original_content title="A Title" [date="2012-02-09"]
DESK
task :original_content do
  abort("rake aborted: '#{CONFIG['pages-jp']}' directory not found.") unless FileTest.directory?(CONFIG['pages-jp'])
  title = ENV["title"] || "new-oroginal_contents"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  post_ext = ENV['post_ext'] || CONFIG['post_ext']
  filename = File.join(CONFIG['pages-jp'], "#{date}-#{slug}.#{post_ext}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |original_content|
    original_content.puts "---"
    original_content.puts "layout: original_content"
    original_content.puts "title: \"#{title.gsub(/-/,' ')}\""
    original_content.puts "permalink: "
    original_content.puts "---"
    original_content.puts ""
  end
end # task :original_contents

desc <<~DESK
  Create a new directory and page.
  Usage: rake page name="about.html"
  You can also specify a sub-directory path.
  If you don't specify a file extension we create an index.markdown at the path specified
DESK
task :directory_with_page do
  name = ENV["name"] || "new-page.md"
  filename = File.join(SOURCE, "#{name}")
  filename = File.join(filename, "index.markdown") if File.extname(filename) == ""
  title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  mkdir_p File.dirname(filename)
  puts "Creating new page: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: page"
    post.puts "title: \"#{title}\""
    post.puts 'description: ""'
    post.puts "---"
    post.puts ""
  end
end # task :directory_with_page

desc "Launch preview environment"
task :preview do
  system "jekyll serve --watch"
end

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

#Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }

# Check HTML files by HTMLProofer: https://github.com/gjtorikian/html-proofer
require 'html-proofer'
task :test do
  options = {
    checks: [
      'Links',
      'Images',
      'Scripts',
      'OpenGraph',
    ],
    allow_hash_href:    false,
    allow_missing_href: true,
    disable_external:   true,
    enforce_https:      false,
    check_internal_hash: false,

    ignore_empty_alt:   true,
    ignore_missing_alt: true,

    # NOTE: Ignore file, URL, and response as follows
    ignore_files: [
      /2017(.*)\.html/,
      /2018(.*)\.html/,
      /2019(.*)\.html/,
      /2021(.*)\.html/,
      /2022(.*)\.html/,
    ],
  }

  sh("bundle exec jekyll build")
  HTMLProofer.check_directory('_site', options).run
end
