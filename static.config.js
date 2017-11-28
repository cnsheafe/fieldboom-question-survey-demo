export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      // {
      //   path: '/about',
      //   component: 'src/containers/About',
      // },
      // {
      //   path: '/blog',
      //   component: 'src/containers/Blog',
      //   getProps: () => ({
      //     posts,
      //   }),
      //   children: posts.map(post => ({
      //     path: `/post/${post.id}`,
      //     component: 'src/containers/Post',
      //     getProps: () => ({
      //       post,
      //     }),
      //   })),
      // },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },

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
