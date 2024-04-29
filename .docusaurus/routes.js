import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/zh-Hans/',
    component: ComponentCreator('/zh-Hans/', '3aa'),
    exact: true
  },
  {
    path: '/zh-Hans/blog',
    component: ComponentCreator('/zh-Hans/blog', '56f'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/archive',
    component: ComponentCreator('/zh-Hans/blog/archive', '358'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/first-blog-post',
    component: ComponentCreator('/zh-Hans/blog/first-blog-post', '495'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/greetings',
    component: ComponentCreator('/zh-Hans/blog/greetings', '5db'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/long-blog-post',
    component: ComponentCreator('/zh-Hans/blog/long-blog-post', 'd10'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/mdx-blog-post',
    component: ComponentCreator('/zh-Hans/blog/mdx-blog-post', '38a'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags',
    component: ComponentCreator('/zh-Hans/blog/tags', '61f'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/docusaurus',
    component: ComponentCreator('/zh-Hans/blog/tags/docusaurus', '3d7'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/facebook',
    component: ComponentCreator('/zh-Hans/blog/tags/facebook', 'a5d'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/greetings',
    component: ComponentCreator('/zh-Hans/blog/tags/greetings', '6de'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/hello',
    component: ComponentCreator('/zh-Hans/blog/tags/hello', 'e3f'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/tags/hola',
    component: ComponentCreator('/zh-Hans/blog/tags/hola', 'aa6'),
    exact: true
  },
  {
    path: '/zh-Hans/blog/welcome',
    component: ComponentCreator('/zh-Hans/blog/welcome', 'c57'),
    exact: true
  },
  {
    path: '/zh-Hans/markdown-page',
    component: ComponentCreator('/zh-Hans/markdown-page', 'fe2'),
    exact: true
  },
  {
    path: '/zh-Hans/docs',
    component: ComponentCreator('/zh-Hans/docs', 'b84'),
    routes: [
      {
        path: '/zh-Hans/docs',
        component: ComponentCreator('/zh-Hans/docs', '47b'),
        routes: [
          {
            path: '/zh-Hans/docs',
            component: ComponentCreator('/zh-Hans/docs', '53e'),
            routes: [
              {
                path: '/zh-Hans/docs/category/tutorial---basics',
                component: ComponentCreator('/zh-Hans/docs/category/tutorial---basics', 'af3'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/category/tutorial---extras',
                component: ComponentCreator('/zh-Hans/docs/category/tutorial---extras', 'f3b'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/hello',
                component: ComponentCreator('/zh-Hans/docs/hello', '9c2'),
                exact: true
              },
              {
                path: '/zh-Hans/docs/intro',
                component: ComponentCreator('/zh-Hans/docs/intro', 'f21'),
                exact: true
              },
              {
                path: '/zh-Hans/docs/Misc/hello',
                component: ComponentCreator('/zh-Hans/docs/Misc/hello', '4fc'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/intro',
                component: ComponentCreator('/zh-Hans/docs/Misc/intro', '294'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-basics/congratulations',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-basics/congratulations', '6e1'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-basics/create-a-blog-post', '2d0'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-basics/create-a-document',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-basics/create-a-document', 'fde'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-basics/create-a-page',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-basics/create-a-page', 'f3e'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-basics/deploy-your-site', 'c87'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-basics/markdown-features',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-basics/markdown-features', '4a5'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-extras/manage-docs-versions', 'e6a'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Misc/tutorial-extras/translate-your-site',
                component: ComponentCreator('/zh-Hans/docs/Misc/tutorial-extras/translate-your-site', 'edf'),
                exact: true,
                sidebar: "miscSidebar"
              },
              {
                path: '/zh-Hans/docs/Pwn/hello',
                component: ComponentCreator('/zh-Hans/docs/Pwn/hello', 'cdd'),
                exact: true,
                sidebar: "pwnSidebar"
              },
              {
                path: '/zh-Hans/docs/Pwn/intro',
                component: ComponentCreator('/zh-Hans/docs/Pwn/intro', '734'),
                exact: true,
                sidebar: "pwnSidebar"
              },
              {
                path: '/zh-Hans/docs/Re/hello',
                component: ComponentCreator('/zh-Hans/docs/Re/hello', 'd55'),
                exact: true,
                sidebar: "reSidebar"
              },
              {
                path: '/zh-Hans/docs/Re/intro',
                component: ComponentCreator('/zh-Hans/docs/Re/intro', 'd64'),
                exact: true,
                sidebar: "reSidebar"
              },
              {
                path: '/zh-Hans/docs/Web/hello',
                component: ComponentCreator('/zh-Hans/docs/Web/hello', 'cb0'),
                exact: true,
                sidebar: "webSidebar"
              },
              {
                path: '/zh-Hans/docs/Web/intro',
                component: ComponentCreator('/zh-Hans/docs/Web/intro', '20e'),
                exact: true,
                sidebar: "webSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
