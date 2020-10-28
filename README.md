To work on a project, you need to launch it on a local server, as well as launch a json-server to work with a local database located in the project. After installing the json-server in the project, you must enter the following commands in the terminal to start it: "json-server db.json" or "npx json-server --watch db.json". The assembly of js-files is performed using the Webpack (command: npx webpack). To build the production version, you need to modify the gulpfile.js.
