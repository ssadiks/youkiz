import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Routes from '../../src/Routes';
import HeaderContainer from '../../src/components/container/HeaderContainer/HeaderContainer';

const renderer = (req, store) => {
  const muiTheme = getMuiTheme({
    userAgent: req.headers['user-agent']
  });

  const content = renderToString(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <StaticRouter location={req.path} context={{}}>
          <div>
            {renderRoutes(Routes)}
          </div>
        </StaticRouter>
      </MuiThemeProvider>
    </Provider>
  );

  return `
    <html>
      <head>
        <link href="css/style.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="js/vendors.js"></script>
        <script src="js/bundle.js"></script>
      </body>
    </html>
  `;
};

export default renderer;
