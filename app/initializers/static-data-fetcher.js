export function initialize(app) {
  app.deferReadiness();
  const container = app.__container__;
  container.lookup('service:fetchers/static-data-fetcher').fetch().then(function() {
    app.advanceReadiness();
  });
}

export default {
  before: 'global-loader',
  initialize
};
