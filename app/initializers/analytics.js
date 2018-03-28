export function initialize(app) {
  const container = app.__container__;
  container.lookup('service:analytics').load();
}

export default {
  name: 'analytics',
  initialize
};
