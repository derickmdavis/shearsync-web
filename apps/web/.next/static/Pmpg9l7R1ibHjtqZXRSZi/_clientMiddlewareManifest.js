self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/book(?:\\/([^\\/#\\?]+?))(\\.json)?[\\/#\\?]?$",
    "originalSource": "/book/:slug"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()