import Express from 'express';
import GrqphHTTP from 'express-graphql';
import Schema from './schema';

const APP_PORT = 3000;

const app = Express();

app.use('/graphql', GrqphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}))

app.listen(APP_PORT,() => {
    console.log(`App listening on port ${APP_PORT}`);
})