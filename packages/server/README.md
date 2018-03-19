# Yamato-Server

> Note: This server was built using this project as a boilerplate: https://github.com/Saeris/Flickr-Wormhole

## <a name="contents"></a> Table of Contents

  - [Installation](#install)
  - [Example Queries](#examples)


## <a name="install"></a> Installation

### Dependencies

Before you start, make sure you have a working [NodeJS](http://nodejs.org/) environment. Preferably use [Yarn](https://yarnpkg.com/) instead of NPM for installation of packages to ensure that you'll use exactly the same dependencies as the project.

From the project folder, execute the following command:

```shell
yarn
```

You will also need to install Serverless globally:

```shell
yarn global add serverless
```

Once the project main dependencies have been installed, run `resetdb` to set up a local database:

```shell
yarn resetdb
```
> NoteL This script will delete your existing database.sqlite file!

Open a second terminal window to start the server:

```shell
yarn start
```

Finally, run the `populate` command to seed the database with some mock data:

```shell
yarn populate
```

The server should now be listening on port `1337`. To access GraphiQL and begin exploring the API documentation, navigate to [http://127.0.0.1:1337/graphiql](http://127.0.0.1:1337/graphiql) in your browser of choice.

> *[Back to Top](#contents)*
