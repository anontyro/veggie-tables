export const BACKEND_ROUTES = {
  STOCK_ROOT: '/api/stock',
  STOCK_IMG: '/api/stock/image',
  STOCK_IMG_LIST: '/api/stock/images',
};

export const AUTH_ROUTES = {
  LOGIN_GQL: 'https://alexwilkinson.co/graphql',
  LOGIN: 'https://auth.alexwilkinson.co/user/authenticate',
};

export const FRONTEND_ROUTES = {
  HOME: '/',
  CART: '/cart',
  USER: '/user',
  ITEM_DETAILS: '/item/:id',
  ADMIN: {
    LOGIN: '/admin/login',
    ITEM_LIST: '/admin/item-list',
    ADD_ITEM: '/admin/add-item',
  },
};
