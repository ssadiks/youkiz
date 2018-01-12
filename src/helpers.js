import Polyglot from 'node-polyglot';
import usTranslation from './i18n/us.json';
import frTranslation from '../src/i18n/fr.json';
import esTranslation from '../src/i18n/es.json';
import itTranslation from '../src/i18n/it.json';
import ptTranslation from '../src/i18n/pt.json';
import nlTranslation from '../src/i18n/nl.json';
import { BROWSER_LOCALE } from './constants';

/**
 *
 * @param cname
 * @param cvalue
 * @param exdays
 *
 * Set a cookie
 */
export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

/**
 *
 * @param cname
 * @returns {*}
 *
 * Get a cookie
 */
export const getCookie = (cname) => {
  const name = `${cname}=`;

  if (typeof document !== 'undefined') {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }

  return '';
};

/* We set a locale cookie for for the refresh of the page */
const DEFAULT_LOCALE = getCookie('locale') || BROWSER_LOCALE;

/* All the translations json */
const localesTranslation = {
  us: usTranslation,
  fr: frTranslation,
  es: esTranslation,
  it: itTranslation,
  pt: ptTranslation,
  nl: nlTranslation
};

/* Init of polyglot */
const polyglot = new Polyglot({
  locale: DEFAULT_LOCALE,
  phrases: localesTranslation[DEFAULT_LOCALE]
});

export const getLocale = () => polyglot.locale();

export const setLocale = (locale) => {
  polyglot.locale({ locale });
  return new Promise((resolve, reject) => {
    if (localesTranslation[locale]) {
      resolve(locale);
      setCookie('locale', locale, 7);
    } else {
      reject('wrong locale');
    }
  });
};

/**
 *
 * @param key
 * @returns Translation
 */
export const translate = (key) => {
  const { locale } = getLocale();
  polyglot.extend(localesTranslation[locale]);
  return polyglot.t(key);
};

/**
 *
 * @param arr (Array)
 * @param property (String)
 *
 * Get Array of Value From Array of object
 */
export const getArrayOfValue = (arr = [], property = '') => (arr ? arr.filter(a => a[property]).map(b => b[property]) : []);

/**
 *
 * @param arr (Array)
 * @param property (String)
 * @param value (String)
 */
export const filterArrayBy = (arr = [], property = '', value = '') => arr.filter(item => item[property] === value);

/**
 *
 * @param array
 * @param properties ['_id', 'name']
 * @param values ['value', 'label']
 * @returns {array}
 *
 * Rename properties of object in array
 */
export const changePropretiesOfObjectInArray = (array, properties, values) => {
  const sliced = array && (array.map(item => ({ ...item }))).slice(0);

  if (sliced) {
    sliced.forEach((o) => {
      Object.keys(o).forEach((key) => {
        const keyIndex = properties.indexOf(key);
        if (keyIndex > -1) {
          const newKey = values[keyIndex];
          const objClone = o;
          objClone[newKey] = o[key];
          delete objClone[key];
        }
      });
    });
  }

  return sliced;
};

export const sum = (a, b) => a + b;
