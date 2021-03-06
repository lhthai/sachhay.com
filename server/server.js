import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from "express-graphql";
import cors from "cors";
import mongoose from 'mongoose';
import compression from 'compression'
import redis from 'redis';
import dotenv from "dotenv";
import graphQLSchema from './graphql/schema'
import graphQLResolvers from './graphql/resolvers'
import path from 'path'

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express();

// Config middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

const client = redis.createClient();

client.on('error', function (err) {
    console.log('error' + err)
});

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphQLSchema,
        context: { client },
        rootValue: graphQLResolvers,
        graphiql: true
    })
);


app.use(express.static(path.join(__dirname, "../client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


function main() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
            app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
        })
        .catch(err => {
            console.log(err);
        })
}

main();