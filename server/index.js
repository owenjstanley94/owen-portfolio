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
            company: 'Burger King',
            companyWebsite: 'www.burgerking.com',
            location: 'USA',
            jobTitle: 'chef',
            description: 'Its was nice',
            startDate: '01/01/2014',
            endDate: '01/01/2016',
        },
        {
            _id: '3dg77sdfgadr',
            title: 'Job in UK',
            company: 'Pizza Hut',
            companyWebsite: 'www.pizzahut.com',
            location: 'UK',
            jobTitle: 'Salad Chef',
            description: 'Its was hot, and boring',
            startDate: '01/01/2016',
            endDate: '01/06/2019',
        },
        {
            _id: '32dsa8d9',
            title: 'Job in Barcelona',
            company: 'Little Cafe',
            companyWebsite: 'www.littlecafe.es',
            location: 'Spain',
            jobTitle: 'Head Waiter',
            description: 'Its was beautiful',
            startDate: '01/01/2019',
            endDate: '01/08/2021',
        },
    ]
}

app.prepare().then(() => {
    const server = express()

    // Construct a schema, using GraphQL schema language
    const schema = buildSchema(`
        type Portfolio {
            _id: ID,
            title: String,
            company: String,
            companyWebsite: String,
            location: String,
            jobTitle: String,
            description: String,
            startDate: String,
            endDate: String,
        }
    
        type Query {
            hello: String
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
            }
    `);

    // The root provides a resolver for each API endpoint
    const root = {
        hello: () => {
            return 'Hello World!'
        },
        portfolio: ({id}) => {
            const portfolio = data.portfolios.find(p => p._id === id)
            return portfolio;
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