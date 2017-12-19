export const DANCES_STYLE = [
  { id: 'Kizomba', name: 'Kizomba' },
  { id: 'Tarraxa', name: 'Tarraxa' },
  { id: 'Semba', name: 'Semba' },
  { id: 'Afro house', name: 'Afro house' },
  { id: 'Lady styling', name: 'Lady styling' }
];

export const GENDERS = ['Male', 'Female'];

export const SNACKBAR_MSG = {
  SUCCESS: {
    VIDEO_CREATE: 'Video created',
    VIDEO_UPDATE: 'Video updated',
    VIDEO_DELETE: 'Video deleted',
    DANCER_CREATE: 'Dancer created',
    DANCER_UPDATE: 'Dancer updated',
    DANCER_DELETE: 'Dancer deleted',
  },
  FAILURE: {
    VIDEO_CREATE: 'Video creation failed',
    VIDEO_UPDATE: 'Video update failed',
    VIDEO_DELETE: 'Video delete failed',
    DANCER_CREATE: 'Dancer creation failed',
    DANCER_UPDATE: 'Dancer update failed',
    DANCER_DELETE: 'Dancer delete failed',
  }
};

export const LOCALES = ['us', 'fr', 'es', 'pt', 'it'];
export const BROWSER_LOCALE = (typeof navigator !== 'undefined') && LOCALES.includes(navigator.language) ? navigator.language : 'us';

export const paramsVideos = {
  filters: {
    dancers: [],
    online: true,
    type: ''
  },
  limit: 3,
  page: 1
};
