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
            _id: 'id1',
            title: 'Technical Support Analyst',
            company: 'Chessable',
            companyWebsite: 'www.chessable.com',
            location: 'Remote',
            jobTitle: 'Technical Support Analyst',
            description: 'Providing technical support to users of chessable.com',
            startDate: '01/04/2021',
            endDate: 'Current',
        },
        {
            _id: 'id2',
            title: 'Repairs Associate',
            company: 'Zebra',
            companyWebsite: 'www.zebra.com',
            location: 'Preston, England',
            jobTitle: 'Repairs Associate',
            description: 'Responsible for repairing printers for Walmart stores',
            startDate: '01/05/2020',
            endDate: '18/09/2021',
        },
        {
            _id: 'id3',
            title: 'Menswear Deputy Manager',
            company: 'The House of Bruar',
            companyWebsite: 'www.hob.com',
            location: 'Pitlochry, Scotland',
            jobTitle: 'Menswear Deputy Manager',
            description: 'Deputy manager, took care ofthe day-to-day running of the menswear department, including rotas, payroll and merchandising.',
            startDate: '02/03/2018',
            endDate: '01/01/2020',
        },
        {
            _id: 'id4',
            title: 'Digitiser',
            company: 'OBAS',
            companyWebsite: 'www.obas.com',
            location: 'Longridge, England',
            jobTitle: 'Digitiser',
            description: 'Digitised a variety of logos and branding for both print and embroidery. Operated industrial print and embroidery machinery when required, including basic maintenance.',
            startDate: '02/03/2019',
            endDate: '01/01/2020',
        },
        {
            _id: 'id5',
            title: 'Digitiser',
            company: 'OBAS',
            companyWebsite: 'www.obas.com',
            location: 'Longridge, England',
            jobTitle: 'Digitiser',
            description: 'Digitised a variety of logos and branding for both print and embroidery. Operated industrial print and embroidery machinery when required, including basic maintenance.',
            startDate: '02/03/2019',
            endDate: '01/01/2020',
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
            return data.portfolios;
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