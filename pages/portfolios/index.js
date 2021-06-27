import axios from 'axios';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';
import {useState} from 'react';

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
    return axios.post('http://localhost:3000/graphql', { query })
        .then(({data: graph}) => graph.data)
        .then(data => data.createPortfolio)
};

const fetchPortfolios = () => {
    const query = `query 
        Portfolios {
            portfolios { 
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
        .then(data => data.portfolios)
};

const Portfolios = ({data}) => {
    const [portfolios, setPortfolios] = useState(data.portfolios);

    const createPortfolio = async () => {
        const newPortfolio = await graphCreatePortfolio();
        const newPortfolios = [...portfolios, newPortfolio];
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
                    className="btn btn-primary">Create Portfolio</button>
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
                        </div>
                    )
                    }
                </div>
            </section>
        </>
    )
}

Portfolios.getInitialProps = async () => {
    const portfolios = await fetchPortfolios();
    return {data: { portfolios }};
}


export default Portfolios;