// https://umijs.org/config/
import os from 'os';
import slash from 'slash2';
import defaultSettings from './defaultSettings';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST, NODE_ENV } = process.env;


const plugins = [

  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
          dll: {
            include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
            exclude: ['@babel/runtime', 'netlify-lambda'],
          },
          hardSource: false,
        }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
      uglifyOptions: {
        // remove console.* except console.error
        compress: {
          drop_console: true,
          pure_funcs: ['console.error'],
        },
      },
    }
    : {};
export default {
  // add for transfer to umi
  plugins,




  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION ? 'source-map' : false,
  // 路由配置
  routes: [
    {
      name: 'login',
      path: '/login',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/login',
          component: './login/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin'],
      routes: [
        {
          path: '/abnormal/',
          name: '异常监测',
          icon: 'dashboard',
          component: './abnormal/index'
        },
        {
          path: '/commission/',
          name: '分佣比例',
          icon: 'border-outer',
          routes: [
            {
              path: '/commission/get',
              name: '获取比例详情',
              component: './commission/index',
            },
            {
              path: '/commission/update',
              name: '更新比例信息',
              component: './commission/update',
            }
          ]
        },
        {
          path: '/categorymgm/',
          name: '类目',
          icon: 'menu-unfold',
          routes: [
            {
              path: '/categorymgm/List',
              name: '当前类目',
              component: './lm/list',
            },
            {
              path: '/categorymgm/AddFirst',
              name: '增加一级类目',
              component: './lm/addsecond',
            },
            {
              path: '/categorymgm/AddSecond',
              name: '增加二级类目',
              component: './lm/addFirst',
            }
          ]
        },
        {
          path: '/freight/',
          name: '运费模板',
          icon: 'car',
          routes: [
            {
              path: '/freight/add',
              name: '新增运费模板',
              component: './freight/add',
            },
            {
              path: '/freight/list',
              name: '模板列表',
              component: './freight/list',
            }
          ]
        },
        {
          path: '/brandmgm/',
          name: '品牌',
          icon: 'bold',
          routes: [
            {
              path: '/brandmgm/list',
              name: '品牌列表',
              component: './brand/list',
            },
            {
              path: '/brandmgm/add',
              name: '新增品牌',
              component: './brand/add',
            }
          ]
        },
        {
          path: '/goodsmgm/',
          name: '商品',
          icon: 'shop',
          routes: [
            {
              path: '/goodsmgm/Add',
              name: '新增商品',
              component: './goodsmgm/add',
            },
            {
              path: '/goodsmgm/activeImglist',
              name: '商品活动图片列表',
              component: './goodsmgm/activeimglist',
            },
            {
              path: '/goodsmgm/Detail',
              name: '商品详情',
              component: './goodsmgm/detail',
            },
            {
              path: '/goodsmgm/logistics',
              name: '商品物流',
              component: './goodsmgm/add',
            }
          ]
        },

        {
          path: '/couponmgm/',
          name: '优惠券',
          icon: 'money-collect',
          routes: [
            {
              path: '/couponmgm/list',
              name: '优惠券列表',
              component: './yhq/list',
            },
            {
              path: '/couponmgm/Add',
              name: '新增优惠券',
              component: './yhq/add',
            }
          ]
        },
        {
          path: '/activemgm/',
          name: '活动',
          icon: 'pie-chart',
          routes: [
            {
              path: '/activemgm/list',
              name: '活动列表',
              component: './active/list',
            },
            {
              path: '/activemgm/Add',
              name: '新增活动',
              component: './active/add',
            }
          ]
        },
        {
          path: '/ordermgm/',
          name: '订单',
          icon: 'menu',
          routes: [
          ]
        },
        {
          path: '/supermgm/',
          name: '顶级用户',
          icon: 'user',
          routes: [
            {
              path: '/supermgm/list',
              name: '顶级用户列表',
              component: './superuser/list',
            },
            {
              path: '/supermgm/Add',
              name: '新增顶级用户',
              component: './superuser/add',
            }
          ]
        },
        {
          path: '/usermgm/',
          name: '员工',
          icon: 'usergroup-add',
          routes: [
            {
              path: '/usermgm/list',
              name: '员工列表',
              component: './user/list',
            },
            {
              path: '/usermgm/Add',
              name: '新增员工',
              component: './user/add',
            }
          ]
        },
        {
          path: '/',
          redirect: '/abnormal',
          Routes: ['src/pages/Authorized'],
          authority: ['admin'],
        }
      ],
    }
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
};
