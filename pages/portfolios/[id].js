import React from "react";

class PortfolioDetail extends React.Component {
    static getInitialProps({query}) {
        return {query};
    }

    render() {
        const id = this.props.query.id;
        return (
            <h1>Im page with ID: {id}</h1>
        )
    }

}

export default PortfolioDetail;