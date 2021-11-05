

import { gql } from '@apollo/client'


export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
        portfolio(id: $id) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }
    `;

export const GET_PORTFOLIOS = gql`
    query Portfolios {
        portfolios {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }
`;


export const CREATE_PORTFOLIO = gql`
        mutation CreatePortfolio {
            createPortfolio(input: {
            title: "New Job"
            company: "New compnay"
            companyWebsite: "New Webiste"
            location: "new place" 
            jobTitle: "new title"
            description: "blah balh balh"
            startDate: "startdate"
            endDate: "enddate"
            }) {
                _id, 
                title, 
                company, 
                companyWebsite,
                location, 
                jobTitle, 
                description,
                startDate
                endDate
            }
        }`;