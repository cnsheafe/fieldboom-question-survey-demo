import React from 'react';

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Survey',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
  Document: ({ Html, Head, Body, children }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
        />
        <script src="https://use.fontawesome.com/b6d36a0626.js" />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),

  webpack: (config, { defaultLoaders }) => {
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.json$/,
            use: [{ loader: 'json-loader' }],
          },
          defaultLoaders.jsLoader,
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ];
    return config;
  },
};
