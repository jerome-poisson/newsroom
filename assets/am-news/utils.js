import {get} from 'lodash';
import {gettext} from '../utils';


export const isDataItem = (item) => ((get(item, 'source') || '').toLowerCase() === 'intelematics');
export const isFuel = (item) => (get(item, 'slugline') || '').match(/fuel/gi);
export const isWeather = (item) => (get(item, 'slugline') || '').match(/weather|observation|forecast/gi);
export const isTraffic = (item) => (get(item, 'slugline') || '').match(/traffic/gi);
export const isAlert = (item) => !isFuel(item) && (get(item, 'slugline') || '').match(/^alert /gi);
export const isQuote = (item) => !isFuel(item) && (get(item, 'slugline') || '').match(/^quote /gi);
export const isHeadlines = (item) => !isFuel(item) && (get(item, 'slugline') || '').match(/headlines/gi);

export const getAMNewsIcon = (item) => {
    let iconType = 'text';

    if (isDataItem(item)) {
        if (isFuel(item)) {
            iconType = 'am-fuel';
        } else if (isWeather(item)) {
            iconType = 'am-weather';
        } else if (isTraffic(item)) {
            iconType = 'am-traffic';
        }
    } else if (isAlert(item)) {
        iconType = 'am-alert';
    } else if (isHeadlines(item)) {
        iconType = 'am-headlines';
    } else if (isQuote(item)) {
        iconType = 'am-quote';
    }

    return iconType;
};

export const getAMNewsToolTip = (item) => {
    let iconType = gettext('Text');

    if (isDataItem(item)) {
        if (isFuel(item)) {
            iconType = gettext('Fuel');
        } else if (isWeather(item)) {
            iconType = gettext('Weather');
        } else if (isTraffic(item)) {
            iconType = gettext('Traffic');
        }
    } else if (isAlert(item)) {
        iconType = gettext('Alert');
    } else if (isHeadlines(item)) {
        iconType = gettext('Headlines');
    } else if (isQuote(item)) {
        iconType = gettext('Quote');
    }

    return iconType;
};