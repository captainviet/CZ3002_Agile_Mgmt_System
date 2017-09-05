# Agile Management System

## Instruction

1. Clone the repository to your local machine
2. Open *cmd/Terminal* and `cd` to the repository path (e.g. `cd /Users/your-username/Projects/CZ3002_Agile_Mgmt_System`)
3. Type `npm install` to install all the `node_modules/` dependencies
4. Type `meteor` to run the application server
5. When the *cmd/Terminal* shows the message
    > => Started proxy.
    > => Started MongoDB.
    > => Started your app.
    > => App running at: http://localhost:3000/

    open [localhost:3000](http://localhost:3000/) to view the application client

## Note
- Please read the `Application Structure` section carefully, since Meteor compiles the application from the way we organize it
- For more specific description of each individual file's functionality, read the documentation at the start of each file
- *Blaze* refers to the HTML renderer, who takes HTML boilerplate code, *Spacebars* embedded variables syntax, and user-defined components/templates to produce the complete HTML page view
- **Single-page website** refers to a web application who effectively update its data representation and interfaces without the need to refresh
- The file `index.js` included in almost every directories serves as the entry point for importing all modules from the enclosing folder (or `import /path` is equivalent to `import /path/index.js`)

## Application Structure

- `.meteor/` is where all meteor-related data are stored, it is highly recommended not to touch the folder
- `node_modules/` is where all node modules (installed by `npm`) are stored, also recommended not to touch this folder
- `client/` is where client-side codes are stored and loaded
- `server/` is where server-side codes are stored and loaded
- `private/` is where website private assets are stored, accessed only via *Meteor Assets API*
- `public/` is where website public assets are stored, these assets will be automatically loaded to the client
- `imports/` is where application modules are stored, these modules are to be loaded by either the client code inside `client/` or server code inside `server/`
  - `imports/api/` is where server APIs are defined, which can be anything ranging from DB CRUD operations
  - `imports/startup/` is where the startup code for either client/server are defined, usually for initializing certain properties for the website
    - `imports/startup/client` is where the startup code for only client are stored
    - `imports/startup/server` is where the startup code for only server are stored
    - `imports/startup/both` is where the startup code for both client and server are stored
  - `imports/ui/` is where the UIs are defined, both in terms of HTML views (which is rendered using *Blaze* and *Spacebars*) and JS controllers
    - `imports/ui/layouts` is where the page skeletons (or **master layout**) are defined, although for Meteor it is recommended to develope the application as a **single-page website**
    - `imports/ui/pages` is where different page contents are defined (this can be considered different views in the single-page website context)
    - `imports/ui/components` is where different components (as in *React*, or **templates** as in *Blaze*)
    - `imports/ui/stylesheets` is where the custom stylesheets for the application are stored
  - `import/assets` is where the assets for the *Metronic* theme are stored
- `.gitignore` lists the files or directories that are excluded from syncing with git (currently we're excluding `node_modules/` folders since it's filled with `npm` packages which are redundant to store on GitHub)
- `package.json` describes the project as a node module, with all the dependencies as stored in `node_modules/` (to install these dependencies, simply type `npm install` in either the *Terminal (Mac)* or *PowerShell (Wins)*)
