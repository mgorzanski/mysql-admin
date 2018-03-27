import React from 'react';
import Auth from './../../../auth/Auth';
import { changeDatabase } from './../../../utils/HelperQueries';

class Query extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'databases': [],
            'query': '',
            'canExecute': false,
            'selectedDatabase': '',
            'result': ''
        }
    }

    componentWillMount() {
        this.props.toggleLoadingScreen();
        this.updateDatabasesList();
    }

    handleInputChange(event) {
        const target = event.target || event.target.value;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            if (this.state.selectedDatabase !== '') {
                changeDatabase(this.state.selectedDatabase)
                    .then((res) => {
                        if (res.status === 200) {
                            this.setState({canExecute: true});
                        }
                    });
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.toggleLoadingScreen();
        fetch('/query', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': Auth.getToken()
            }),
            body: JSON.stringify({
                query: this.state.query
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.props.toggleLoadingScreen();
            this.setState({ result: data });
        }).catch((err) => {
            console.err(err);
        });
    }

    updateDatabasesList() {
        fetch('/databases?token=' + Auth.getToken(), {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({ databases: data.results });
            this.props.toggleLoadingScreen();
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        const databasesList = this.state.databases.map((element) => 
           <option key={element.Database} value={element.Database}>{element.Database}</option>
        );

        const QueryResultHeaders = () => {
            let headers = [];
            for (let header in this.state.result[0]) {
                headers.push(<th key={header}>{header}</th>);
            }

            return (<tr>{headers}</tr>);
        }
        
        const QueryResultBody = () => {
            let body = [];
            const result = this.state.result.slice();
            for (let i = 0; i < result.length; i++) {
                let row = [];
                for (let key in result[i]) {
                    row.push(<td key={key}>{result[i][key]}</td>);
                }
                body.push(
                    <tr key={i}>
                        {row}
                    </tr>
                );
            }

            return body;
        }

        const Results = () => {
            return (
                <table className="panel__table">
                    <thead>
                        <QueryResultHeaders />
                    </thead>
                    <tbody>
                        <QueryResultBody />
                    </tbody>
                </table>
            );
        }

        return (
            <React.Fragment>
                <div className="content__title">SQL</div>
                <section className="content__body">
                    <div className="panel panel--small">
                        <h3 className="panel__title">Select database</h3>
                        <div className="panel__body">
                            <div className="panel__select-wrapper">
                                <select name="selectedDatabase" size="16" className="panel__select panel__select--no-overflow" onChange={this.handleInputChange.bind(this)}>
                                    {databasesList}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel--big">
                        <h3 className="panel__title">Write raw SQL</h3>
                        <div className="panel__body">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <textarea name="query" className="panel__textarea" value={this.state.query} onChange={this.handleInputChange.bind(this)}></textarea>
                                { this.state.canExecute ? (<button className="panel__button" type="submit">Execute</button>) : (<button className="panel__button panel__button--disabled" type="submit" disabled>Execute</button>)}
                            </form>
                        </div>
                    </div>

                    { this.state.result !== '' ? (
                        <div className="panel panel--big panel--light">
                        <h3 className="panel__title">Query result</h3>
                        <div className="panel__body">
                            <Results />
                        </div>
                    </div>
                    ) : ('') }
                </section>
            </React.Fragment>
        );
    }
}

export default Query;