const express = require('express')
const next = require('next')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const data = {
    portfolios: [
        {
            _id: '32dsa8d9',
            title: 'Job in USA',
            content: 'Its was nice',
            jobTitle: 'chef',
            daysOfExperience: 100,
            isCurrentlyEmployed: false
        },
        {
            _id: 'adsg34df',
            title: 'Job in barcelona',
            content: 'Its was sunny',
            jobTitle: 'Developer',
            isCurrentlyEmployed: true
        },
        {
            _id: 'h89saf3w',
            title: 'Job in Russia',
            content: 'It was a lovely place',
            jobTitle: 'manager',
            daysOfExperience: 25,
            isCurrentlyEmployed: true
        },
    ]
}

app.prepare().then(() => {
    const server = express()

    // Construct a schema, using GraphQL schema language
    const schema = buildSchema(`
        type Portfolio {
            _id: ID!,
            title: String,
            content: String,
            jobTitle: String,
            daysOfExperience: Int,
            isCurrentlyEmployed: Boolean
        }
    
        type Query {
            hello: String
            portfolio: Portfolio
            portfolios: [Portfolio]
            }
    `);

    // The root provides a resolver for each API endpoint
    const root = {
        hello: () => {
            return 'Hello World!'
        },
        portfolio: () => {
            return data.portfolio[0]
        },
        portfolios: () => {
            return data.portfolios
        }
    };

    server.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }));

    server.all('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    });
})