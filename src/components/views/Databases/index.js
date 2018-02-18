import React from 'react';
import Auth from './../../../auth/Auth';

class Databases extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            databases: [],
            databaseName: ''
        };
    }

    componentWillMount() {
        this.props.toggleLoadingScreen();
        this.updateDatabasesList();
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.databaseName !== '') {
            fetch('/databases/' + this.state.databaseName, {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'x-access-token': Auth.getToken()
                })
            }).then((res) => {
                return res.json();
            }).then(() => {
                this.props.toggleLoadingnScreen();
                this.updateDatabasesList();
            }).then(() => {
                this.setState({ databaseName: '' });
            }).catch((err) => {
                console.error(err);
            });
        }
    }

    render() {
        const getDatabases = this.state.databases.map((element) => 
            <tr key={element.Database}>
                <td><input type="checkbox" className="panel__checkbox" name={"database-" + element.Database} /></td>
                <td><a href={"/databases/" + element.Database}>{element.Database}</a></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );

        return (
            <React.Fragment>
                <div className="panel panel--big panel--light">
                    <h3 className="panel__title">Actions</h3>
                    <div className="panel__body">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <label htmlFor="databaseNameInput">
                                <input type="text" name="databaseName" size="40" className="panel__input" id="databaseNameInput" onChange={this.handleInputChange.bind(this)} />
                            </label>
                            <button className="panel__button" type="submit">Create new database</button>
                        </form>
                    </div>
                </div>

                <div className="panel panel--big">
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