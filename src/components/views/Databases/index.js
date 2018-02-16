import React from 'react';
import Auth from './../../../auth/Auth';

class Databases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            databases: []
        };
    }

    componentWillMount() {
        fetch('/databases?token=' + Auth.getToken(), {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({ databases: data.results });
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        const getDatabases = this.state.databases.map((element) => 
            <tr key={element.Database}>
                <td></td>
                <td>{element.Database}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );

        return (
            <React.Fragment>
                <div className="panel panel--light" id="panel-actions">
                    <h3 className="panel__title">Actions</h3>
                    <div className="panel__body">
                        <button className="panel__button">Create new database</button>
                    </div>
                </div>

                <div className="panel" id="panel-databases">
                    <h3 className="panel__title">Databases</h3>
                    <div className="panel__body">
                        <form>
                            <input type="search" name="q" size="24" className="panel__input" />
                            <button className="panel__button">Search</button>
                            <button className="panel__button panel__button--disabled float-right" disabled>Delete selected databases</button>
                        </form>
                        <nav className="panel__nav">
                            <table className="panel__table">
                                <thead>
                                    <tr>
                                        <th style={{width: '7px'}}></th>
                                        <th>Name</th>
                                        <th>Tables</th>
                                        <th>Records</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getDatabases}
                                </tbody>
                            </table>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Databases;