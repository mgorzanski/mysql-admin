import React from 'react';

class Databases extends React.Component {
    render() {
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
                                    <tr>
                                        <td><input type="checkbox" /></td><td>beta_wp</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" /></td><td>brown-cms2</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" /></td><td>rss-app</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" /></td><td>cms2</td>
                                    </tr>
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