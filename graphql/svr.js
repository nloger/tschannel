var express = require('express');
var { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //rootValue: root,
  graphiql: true,
}));
app.listen(5000, () => console.log('Now browse to localhost:5000/graphql'));