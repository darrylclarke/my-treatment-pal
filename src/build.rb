def usage()
  display = [
    "",
    "ruby build.rb -component <file-name> <dir-name> <component-name>",
    "ruby build.rb -component <file-name> <dir-name> -clean",
    "ruby build.rb -component arrow-bar arrow-bar ArrowBar",
    "",
    "ruby build.rb -jsx <file-name> <dir-name> <component-name>",
    "ruby build.rb -jsx <file-name> <dir-name> -clean",
    "",
    "ruby build.rb -menu",
    "",
    "",
    "",
  ]
  puts display.join("\n")
end

def main(args)
  if args.length == 0 or (args[0][0] == "-" and (args[0].match(/help/) or args[0].match(/\?/)))
    usage

  elsif args[0] == "-component" && args[3] != "-clean"
    create_dir(args[2])
    create_js(args[1], args[3])
    create_jsx(args[1], args[3])
    create_scss(args[1], args[3])

  elsif args[0] == "-component" && args[3] == "-clean"
    [".jsx"].each { |ext| delete("#{full_name}#{ext}") }
    delete("#{ARGV[2]}/index.js")
    delete("#{ARGV[2]}/#{ARGV[2]}.scss")
    Dir.rmdir("#{args[2]}")

  elsif args[0] == "-jsx" && args[3] != "-clean"
    create_jsx(args[1], args[3])

  elsif args[0] == "-jsx" && args[3] == "-clean"
    delete("#{full_name}.jsx")

  elsif args[0] == "-menu"
    write_menu

  end
end

def full_name
  "#{ARGV[2]}/#{ARGV[1]}"
end

def create_js(file_name, component_name, override=nil)
  write_file '.js', "#{ARGV[2]}/index",
             ["import #{component_name} from './#{file_name}.jsx';",
              "export default #{component_name}",
              ""]
end

def create_jsx(file_name, component_name, override=nil)
  write_file '.jsx', override,
             ["import React, { Component } from 'react';",
              "import PropTypes from 'prop-types';",
              "import './#{ARGV[2]}.css';",
              "",
              "const propTypes = {",
              "  propname: PropTypes.bool.isRequired,",
              "};",
              "",
              "class #{component_name} extends Component \{",
              "  // constructor(props) \{",
              "  //   super(props);",
              "  // \}",
              "",
              "  render() \{",
              "    return (",
              "      <div>{this.props.noop}</div>",
              "    );",
              "  \}",
              "\}",
              "",
              "#{component_name}.propTypes = propTypes;",
              "",
              "export default #{component_name};",
              ""]
end

def create_scss(file_name, component_name, override=nil)
  write_file '.scss', "#{ARGV[2]}/#{ARGV[2]}",
             ["@import \"../shared/variables\";",
              "",
              ".#{file_name} \{",
              "\}",
              ""]
end

def create_dir(directory_name)
  Dir.mkdir(directory_name) unless File.exists?(directory_name)
end

def write_file(extension, file_name_override, contents)
  file_name = file_name_override || "#{full_name}"
  file_name += extension
  File.open(file_name, "w") {|f| f.write(contents.join("\r\n")) }
end

def delete(path_to_file)
  File.delete(path_to_file) if File.exist?(path_to_file)
end

def menu_items
  [
    ['home', nil, nil],
    ['this_app_is_for_you', 'thisAppIsForYou', 'This App Is For You'],
    ['behind_the_law', 'behindTheLaw', 'Behind the Law'],
    ['personalize_your_power', 'personalizeYourPower', 'Personalize Your Power'],
    ['purpose', nil, nil],
    ['recognition', nil, nil, 1],
    ['unification', nil, nil, 2],
    ['realization', nil, nil, 3],
    ['thanksgiving', nil, nil, 4],
    ['release', nil, nil, 5],
    ['treatment', 'treatment', 'Treatment'],
  ]
end

def menu_name(item)
  item[0]
end
def menu_js_name(item)
  item[1] || item[0]
end
def menu_human_name(item)
  item[2] || item[0].capitalize
end
def menu_colour(item)
  item[3]
end

def menu_button(item)
  [
    "<MenuButton",
    "  active=\{this.props.page === '#{menu_name(item)}'\}",
    "  name=\{'#{menu_name(item)}'\}",
    "  hasBox=\{#{menu_colour(item) ? menu_colour(item) : 'null'}\}",
    "  action={this.select.bind(this)}",
    ">",
    "  #{menu_human_name(item)}",
    "</MenuButton>",
    "",
  ].join("\r\n")
end

def menu_handler(item)
  [
    "#{menu_js_name(item)}Clicked() \{",
    "  this.SlideRight.close();",
    "  this.props.setPage('#{menu_name(item)}');",
    "\}",
    "",
  ].join("\r\n")
end

def write_menu
  handlers = []
  buttons = []

  # menu_items.each { |item| handlers << menu_handler(item)}
  menu_items.each { |item| buttons << menu_button(item)}

  File.open("navbar/test.jsx2", "a") do |f|
    f.write( handlers.join("\r\n"))
    f.write("\r\n")
    f.write( buttons.join("\r\n"))
  end
end



main(ARGV)
