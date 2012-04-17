# Include required libraries.

muffin = require 'muffin'
Q = require 'q'



# Options.

option '-w', '--watch', 'Keep watching file modifying.'
option '-c', '--compile', 'Compile client scripts as ADVANCED_OPTIMIZATIONS.'



# Constants.

commonArgs = "
  public/closure-library/closure/bin/build/closurebuilder.py
  --root=./public/closure-library/
  --root=./resources/client/
  --namespace=\"my.app\" "

COMMAND = 
  BUILD: commonArgs + "
  --output_mode=script
  --output_file=./public/javascripts/app.js
  "
  COMPILE: commonArgs + "
  --output_mode=compiled 
  --output_file=./public/javascripts/app-min.js
  --compiler_jar=./library/closure-compiler/compiler.jar
  --compiler_flags=\"--compilation_level=ADVANCED_OPTIMIZATIONS\""



# Tasks.

execCommand = (command) ->
  q = (muffin.exec(command))[1]
  Q.when q, (result) ->
    err = result[0]
    out = result[1]
    if err
      console.log err
    else
      console.log out

task 'build', 'Make closure builder build scripts.', (options) ->
  command = if options.compile then COMMAND.COMPILE else COMMAND.BUILD
  if !options.watch
    execCommand(command)
  else
    isFirst = true
    muffin.run
      files: './**/*'
      options: options
      map:
        'client/.*?\.js': (matches) ->
          return  if isFirst
          execCommand(command)
      after: ->
        execCommand(command)  if isFirst
        isFirst = false

