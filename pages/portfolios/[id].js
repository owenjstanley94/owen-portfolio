import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_PORTFOLIO} from '@/apollo/queries';

const PortfolioDetail = ({query}) => {
    const [portfolio, setPortfolio] = useState(null);
    const [getPortfolio, {loading, data}] = useLazyQuery(GET_PORTFOLIO);

    useEffect(() => {
        getPortfolio({variables: {id: query.id}});

    if (data && !portfolio) { setPortfolio(data.portfolio) }
    if (loading || !portfolio) {return 'Loading...'};

    if (data && !portfolio) {
        setPortfolio(data.portfolio)
    }

    return (
        <div className="portfolio-detail">
            <div className="container">

                <div className="jumbotron">
                    <h1 className="display-3">{portfolio.title}</h1>
                    <p className="lead">{portfolio.jobTitle}</p>
                    <p>
                        <a className="btn btn-lg btn-success" href={portfolio.companyWebsite} role="button">
                            See Company
                        </a>
                    </p>
                </div>

                <div className="row marketing">
                    <div className="col-lg-6">
                        <h4 className="title">Location</h4>
                        <p className="text">{portfolio.location}</p>

                        <h4 className="title">Start Date</h4>
                        <p className="text">{portfolio.startDate}</p>
                    </div>

                    <div className="col-lg-6">
                        {/* TODO: days later... */}
                        <h4 className="title">Days</h4>
                        <p className="text">44</p>

                        <h4 className="title">End Date</h4>
                        <p className="text">{portfolio.endDate}</p>
                    </div>
                    <div className="col-md-12">
                        <hr/>
                        <h4 className="title">Description</h4>
                        <p>{portfolio.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

PortfolioDetail.getInitialProps = async ({query}) => {
    return {query};
},

export default PortfolioDetail;