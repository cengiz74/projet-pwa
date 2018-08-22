import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const login = [
      {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ0ZXN0QGd1cC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ' +
          '9.yilnZE_TROwQMXdP-vllKfZkPsA1DpoX5-ogZtgzbD4',
        username: 'test@gup.com'
      }
    ];
    return {login};
  }
}
