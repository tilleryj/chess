##
# Inside: Rails.root/config/compass.rb
if Rails.env.production?
  css_dir = "tmp/stylesheets/compiled"
else
  css_dir = "public/stylesheets/compiled"
end