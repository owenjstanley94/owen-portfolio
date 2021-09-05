import axios from 'axios';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_PORTFOLIOS} from '@/apollo/queries';

const graphCreatePortfolio = () => {
    const query = `
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
    return axios.post('http://localhost:3000/graphql', {query})
        .then(({data: graph}) => graph.data)
        .then(data => data.createPortfolio)
};

const graphUpdatePortfolio = (id) => {
    const query = `
        mutation UpdatePortfolio {
            updatePortfolio(id: "${id}", input: {
            title: "UPDATE Job"
            company: "UPDATE compnay"
            companyWebsite: "UPDATE Webiste"
            location: "UPDATE place" 
            jobTitle: "UPDATE title"
            description: "UPDATE blah balh balh"
            startDate: "startdate UPDATE"
            endDate: "enddate UPDATE"
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

    return axios.post('http://localhost:3000/graphql', {query})
        .then(({data: graph}) => graph.data)
        .then(data => data.updatePortfolio)
};

const graphDeletePortfolio = (id) => {
    const query = `
    mutation DeletePortfolio {
        deletePortfolio(id: "${id}")
    }`;

    return axios.post('http://localhost:3000/graphql', {query})
        .then(({data: graph}) => graph.data)
        .then(data => data.deletePortfolio)
};

const Portfolios = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [getPortfolios, {loading, data}] = useLazyQuery(GET_PORTFOLIOS);

    useEffect(() => {
        getPortfolios();
    }, [])

    if (data && data.portfolios.length > 0 && portfolios.length === 0) {
        setPortfolios(data.portfolios);
    }
    
    if (loading) {return 'Loading...'};

    const createPortfolio = async () => {
        const newPortfolio = await graphCreatePortfolio();
        const newPortfolios = [...portfolios, newPortfolio];
        setPortfolios(newPortfolios);
    }

    const updatePortfolio = async (id) => {
        const updatedPortfolio = await graphUpdatePortfolio(id);
        const index = portfolios.findIndex(p => p._id === id);
        const newPortfolios = portfolios.slice();
        newPortfolios[index] = updatedPortfolio;
        setPortfolios(newPortfolios);
    }

    const deletePortfolio = async (id) => {
        const deletedId = await graphUpdatePortfolio(id);
        const index = portfolios.findIndex(p => p._id === deletedId);
        const newPortfolios = portfolios.slice();
        newPortfolios.splice(index, 1);
        setPortfolios(newPortfolios);
    }

    return (
        <>
            <section className="section-title">
                <div className="px-2">
                    <div className="pt-5 pb-4">
                        <h1>Portfolios</h1>
                    </div>
                </div>
                <button
                    onClick={createPortfolio}
                    className="btn btn-primary">Create Portfolio
                </button>
            </section>
            <section className="pb-5">
                <div className="row">
                    {portfolios.map(portfolio =>
                        <div key={portfolio._id} className="col-md-4">
                            <Link
                                href='/portfolios/[id]'
                                as={`portfolios/${portfolio._id}`}>
                                <a className="card-link">
                                    <PortfolioCard portfolio={portfolio}/>
                                </a>
                            </Link>
                            <button
                                className='btn btn-warning'
                                onClick={() => updatePortfolio(portfolio._id)}>Update Portfolio
                            </button>
                            <button
                                className='btn btn-danger'
                                onClick={() => deletePortfolio(portfolio._id)}>Delete Portfolio
                            </button>
                        </div>
                    )
                    }
                </div>
            </section>
        </>
    )
}

export default Portfolios;