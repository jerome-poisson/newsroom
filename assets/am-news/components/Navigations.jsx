import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { gettext } from 'utils';


const Navigations = ({navigations=[], activeNavigation, toggleNavigation, fetchItems}) => {

    const tabs = navigations.map((navigation) => (
        <li className="nav-item" key={navigation.name}>
            <a href=""
                className={classNames(
                    'nav-link',
                    {active: activeNavigation === navigation._id}
                )}
                onClick={(event) => {
                    event.preventDefault();
                    toggleNavigation(navigation);
                    fetchItems();
                }}>{gettext(navigation.name)}</a>
        </li>
    ));

    return (
        <ul
            className="nav nav-tabs px-3 justify-content-around flex-nowrap flex-sm-wrap am-news__nav-tabs">
            {tabs}
        </ul>
    );

};

Navigations.propTypes = {
    navigations: PropTypes.array.isRequired,
    activeNavigation: PropTypes.string,
    toggleNavigation: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired,
};

export default Navigations;