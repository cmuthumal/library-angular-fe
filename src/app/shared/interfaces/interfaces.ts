export interface Book {
  _id: string;
  name: string;
  isbn: string;
  author: string;
}

export interface Author {
  _id: string;
  first_name: string;
  last_name: string;
}