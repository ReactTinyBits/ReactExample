import dateFns from 'date-fns';
import ru from 'date-fns/locale/ru';

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_FORMAT_MIN_YEARS = 'DD.MM.YY';
export const TIME_FORMAT = 'HH:mm:ss';
export const TIME_FORMAT_WITHOUT_SEC = 'HH:mm';
export const UNIX_STAMP_IN_MILLISECONDS = 'x';
export const DATE_TIME_FORMAT = 'DD.MM.YYYY в HH:mm';
export const DATE_TIME_SIMPLE_FORMAT = 'DD.MM.YYYY HH:mm';

export const UNIX_ONE_DAY = 86400;

export function getISOLocalString(date) {
    return getTimezoneCorrectedDate(date)
        .toISOString()
        .slice(0, -1);
}

export function getTimezoneCorrectedDate(date) {
    const tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzoffset);
}

export function dateTime(date, hasSeconds = true) {
    return dateFns.format(date, `${hasSeconds ? TIME_FORMAT : TIME_FORMAT_WITHOUT_SEC}`);
}

export function dateToUnixTime(date) {
    const unix = dateFns.format(date, UNIX_STAMP_IN_MILLISECONDS);
    return parseInt(unix / 1000, 10);
}

export function dateNow(isUnix = false, hasSeconds = true) {
    const date = new Date();
    return isUnix ? dateToUnixTime(date) : dateTime(date, hasSeconds);
}

export function dateFormat(date, isMinYears = false) {
    if (!date) {
        return '';
    }

    return dateFns.format(date, `${isMinYears ? DATE_FORMAT_MIN_YEARS : DATE_FORMAT}`);
}

export function getClosestMonths(date) {
    return {
        dateFrom: dateFns.format(dateFns.startOfMonth(dateFns.subMonths(date, 1)), 'YYYY/MM/DD'),
        dateTo: `${dateFns.format(dateFns.endOfMonth(dateFns.addMonths(date, 1)), 'YYYY/MM/DD')}T23:59:59`,
    };
}

export function formatDate(date, format = DATE_FORMAT) {
    return dateFns.format(date, format, { locale: ru });
}

export function formatDateTime(date, format = DATE_TIME_FORMAT) {
    return formatDate(date, format);
}

export function parseDate(date) {
    if (typeof date !== 'string' || !date.match(/\d{2}[.,]\d{2}[.,]\d{4}/g)) return null;
    const splitDate = date
        .replace(',', '.')
        .split('.')
        .map(Number);
    if (splitDate.length < 3) return null;
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
}
