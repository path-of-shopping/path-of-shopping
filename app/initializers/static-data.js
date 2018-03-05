export function initialize(app) {
  app.deferReadiness();
  let container = app.__container__;
  container.lookup('service:fetchers/static-data-fetcher').fetch().then(function() {
    app.advanceReadiness();
  });
}

export default {
  name: 'static-data',
  initialize
};
