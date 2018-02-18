import React from 'react';

class Query extends React.Component {
    handleSubmit (event) {

    }

    render() {
        return (
            <React.Fragment>
                <div className="panel panel--big" id="panel-query">
                    <h3 className="panel__title">Write raw SQL</h3>
                    <div className="panel__body">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <textarea name="query" className="panel__textarea"></textarea>
                            <button className="panel__button" type="submit">Execute</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Query;