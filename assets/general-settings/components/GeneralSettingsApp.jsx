import React from 'react';
import PropTypes from 'prop-types';
import {gettext} from 'utils';
import {connect} from 'react-redux';
import {get, sortBy} from 'lodash';

import {save} from '../actions';

import TextInput from 'components/TextInput';

class GeneralSettingsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {values: {}};
        Object.keys(props.config).forEach((key) => {
            this.state.values[key] = get(props.config[key], 'value') || '';
        });

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(key, val) {
        const values = {...values, [key]: val};
        this.setState({values});
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.save(this.state.values);
    }

    render() {
        const {config} = this.props;
        const fields = sortBy(Object.keys(config), (_id) => config[_id].weight).map((_id) => {
            const field = config[_id];
            if (field.type === 'text') {
                return (
                    <TextInput
                        key={_id}
                        type="text"
                        name={_id}
                        label={field.label}
                        value={this.state.values[_id]}
                        placeholder={field.default}
                        onChange={(event) => this.onChange(_id, event.target.value)}
                        description={field.description}
                    />
                );
            }
            return null;
        });
        return (
            <div className="flex-row">
                <div className="flex-col flex-column">
                    <section className="content-main">
                        <div className="list-items-container">
                            <form onSubmit={this.onSubmit}>
                                {fields}

                                <button type="submit" className="btn btn-primary">{gettext('Save')}</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

GeneralSettingsApp.propTypes = {
    config: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    config: state.config,
});

const mapDispatchToProps = {
    save,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettingsApp);
