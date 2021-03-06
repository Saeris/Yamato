module.exports = {
  ignore: [`src/**/_TEST_/*.spec.js`],
  plugins: [
    [`babel-plugin-webpack-alias`, { findConfig: true }],
    `inline-dotenv`,
    [`babel-plugin-inline-replace-variables`, {
      ENV: { type: `node`, replacement: `process.env.NODE_ENV` },
      PORT: { type: `node`, replacement: `process.env.PORT` },
      LOCAL: { type: `node`, replacement: `process.env.LOCAL` },
      LOGLEVEL: { type: `node`, replacement: `process.env.LOGLEVEL` },
      DB_HOST: { type: `node`, replacement: `process.env.DB_HOST` },
      DB_USERNAME: { type: `node`, replacement: `process.env.DB_USERNAME` },
      DB_PASSWORD: { type: `node`, replacement: `process.env.DB_PASSWORD` },
      DB_NAME: { type: `node`, replacement: `process.env.DB_NAME` },
      PRIVATE_KEY: { type: `node`, replacement: `process.env.PRIVATE_KEY` },
      PUBLIC_KEY: { type: `node`, replacement: `process.env.PUBLIC_KEY` }
    }],
    [`babel-plugin-provide-modules`, {
      "graphql": [
        { GraphQLBoolean: `GqlBool` },
        { GraphQLEnumType: `GqlEnum` },
        { GraphQLError: `GqlError` },
        { GraphQLFloat: `GqlFloat` },
        { GraphQLID: `GqlID` },
        { GraphQLInputObjectType: `GqlInput` },
        { GraphQLInt: `GqlInt` },
        { GraphQLInterfaceType: `GqlInterface` },
        { GraphQLList: `GqlList` },
        { GraphQLNonNull: `GqlNonNull` },
        { GraphQLObjectType: `GqlObject` },
        { GraphQLScalarType: `GqlScalar` },
        { GraphQLSchema: `GqlSchema` },
        { GraphQLString:  `GqlString` },
        { GraphQLUnion: `GqlUnion` },
        `isInputType`,
        `isOutputType`,
        `isLeafType`,
        `isCompositeType`,
        `isAbstractType`,
        `getNullableType`,
        `getNamedType`
      ],
      "graphql-iso-date": [
        { GraphQLDate: `GqlDate` },
        { GraphQLDateTime: `GqlDateTime` },
        { GraphQLTime: `GqlTime` }
      ],
      "graphql-custom-types": [
        { GraphQLEmail: `GqlEmail` },
        { GraphQLURL: `GqlURL` }
      ],
      "graphql-relay": [
        { globalIdField: `globalId` },
        `nodeDefinitions`,
        `toGlobalId`,
        `fromGlobalId`,
        `connectionArgs`,
        `connectionDefinitions`,
        `connectionFromArray`
      ],
      "join-monster": `joinMonster`,
      "dataloader": `Dataloader`,
      "winston": [ `log`, `info`, `debug`, `error` ]
    }]
  ],
  presets: [
    [`@babel/preset-env`, {
      targets: { node: `6.10` },
      useBuiltIns: `usage`
    }],
    `@babel/preset-stage-0`,
    `@babel/preset-flow`
  ],
  env: {
    test: {
      sourceMaps: `inline`,
      plugins: [
        `istanbul`
      ],
      presets: [
        `babel-preset-power-assert`
      ]
    }
  }
}
