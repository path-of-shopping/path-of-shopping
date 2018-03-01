import Service, {inject as service} from '@ember/service';

export default Service.extend({
  api: service('api'),
  searchFactory: service('factories/search-factory'),
  searchFetcher: service('fetchers/search-fetcher'),

  persist(query) {
    const {searchFactory, searchFetcher} = this.getProperties('searchFactory', 'searchFetcher');

    return this.get('api')
      .httpPost('search', {query})
      .then((rawSearch) => {
        const search = searchFactory.create(rawSearch);
        searchFetcher.cache(search);
        return search;
      });
  }
});
