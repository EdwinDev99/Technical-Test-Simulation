export interface User {
  name: {
    first: string;
    last: string;
  };
  location: {
    country: string;
    city: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
