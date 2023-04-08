---
layout: default
title: You better check you app, before you wreck your app
permalink: testing-rspec
---

# Test your app with RSpec

*Created by Clemens Helm, [@clemenshelm](https://twitter.com/clemenshelm) and Floor Drees, [@floordrees](https://twitter.com/floordrees)*

*Updated by Ana Schwendler, [@anaschwendler](https://twitter.com/anaschwendler)*

**This guide assumes that you have already built a Rails Girls app by** [**following the app development guide**](/app).

[RSpec](https://github.com/rspec/rspec-rails) is a Ruby testing framework, that describes our application's behavior in a syntax that doesn't look much like Ruby. It outputs test results in your terminal, so you'll test your reading skills as well (pun intended).

__COACH__: Talk about testing and Behavior-Driven Development.

## *1.*Add RSpec gem

Open up your `Gemfile` and add this line to the `:development` and `:test` groups, above the end tag:

{% highlight ruby %}
group :development, :test do
  ...
  gem 'rspec-rails', '~> 3.5'
end
{% endhighlight %}

and run
{% highlight sh %}
bundle install
{% endhighlight %}
to install the gem.

Next create the `spec/` directory inside your application:

{% highlight sh %}
mkdir spec/
{% endhighlight %}

The `spec/` directory is where your tests will reside. Finally run the following command:

{% highlight sh %}
rails generate rspec:install
{% endhighlight %}


This adds the following files which are used for configuration:

- `.rspec`
- `spec/spec_helper.rb`
- `spec/rails_helper.rb`

## *2.*Create your first test!

Rubyists often use the words 'test' and 'specification' interchangeably, that's why you'll store your tests in the 'specs' folder.
To do that, do the following steps:

We will be creating a test for ou `idea` model, to do that in the elegant way in Rails:

* Create a `models` folder in your `spec` folder, by running in the terminal:
{% highlight sh %}
mkdir spec/models
{% endhighlight %}

* Save your test as `idea_spec.rb` (`<model_name>_spec.rb`).

Inside that new file, in our first test we will want to guarantee that an idea has a name. In order to do that let's describe one of our specifications:

{% highlight ruby %}
require "rails_helper"

RSpec.describe Idea, type: :model do
  it "has a name" do
    skip
  end
end
{% endhighlight %}

In your terminal run
{% highlight sh %}
rspec spec/models/idea_spec.rb
{% endhighlight %}

which will output that your test is pending as it's not yet implemented.

__COACH__: Talk about googling terminal output.

Let's do something about that!
{% highlight ruby %}
require "rails_helper"

RSpec.describe Idea, type: :model do
  it "has a name" do # yep, you can totally use 'it'
    idea = Idea.create!(name: "My Awesome Idea Name") # creating a new idea 'instance'
    expect(idea.name).to eq("My Awesome Idea Name") # this is our expectation
  end
end
{% endhighlight %}

should give you a more satisfying output.

## *3.*Refactoring

You could actually also create two ideas, to be sure that our project is creating ideas in the right way:

{% highlight ruby %}
require "rails_helper"

RSpec.describe Idea, type: :model do
  it "has a name" do # yep, you can totally use 'it'
    idea = Idea.create!(name: "My Awesome Idea Name") # creating a new idea 'instance'
    second_idea = Idea.create!(name: "My Second Idea Name") # creating another new idea 'instance'
    expect(second_idea.name).to eq("My Second Idea Name") # this is our expectation
  end
end
{% endhighlight %}

which test more things.

__COACH__: Talk a bit about refactoring.

## *4.*Marking to-do's with tests

Yeah! To-do lists. Awesome.
A nifty RSpec feature is the functionality to mark certain tests as pending. In other words, your first thinking about what the implementation should accomplish then write in a test to verify if it is working.

Let's create our next test, by adding the lines below to our `idea_spec.rb`

{% highlight ruby %}
it "has a description"
{% endhighlight %}

will mark a test as pending.

Can you finish this test? Can you think about other tests?

## *5.*Behavior-Driven Development
__COACH__: Talk a bit about Behavior-Driven Development.

By now you can create more tests alone. Feel free to talk to your coach to do that, or ways to create more tests.

Happy testing!
