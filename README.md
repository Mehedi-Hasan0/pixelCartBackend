## Author

- [@mahedihasan](https://github.com/Mehedi-Hasan0)

## About

An e-commerce platform backend. The main focus of this backend is to implement error handling, CRUD operations, pagination and filtering, transactions, and additional routes as necessary.

## Live link

coming soon

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

## Application route

#### User

```
  GET     /api/v1/users/
  GET     /api/v1/users/:id   (GET a single user)
  POST    /api/v1/users/create-user
  DELETE  /api/v1/users/:id
```

#### Seller

```
  GET     /api/v1/sellers/
  GET     /api/v1/sellers/:id  (GET a single seller)
  POST    /api/v1/sellers/create-seller
```

### Admin

```
  POST    /api/v1/admin/create-admin
```

#### Pagination & Filtering routes of Users

```
/api/v1/users?pag=1&limit=10
/api/v1/users?sortBy=createdAt&sortOrder=asc   (need both sortBy & sortOrder to sort data)
```

#### Pagination & Filtering routes of Sellers

```
/api/v1/sellers?pag=1&limit=10
/api/v1/sellers?sortBy=createdAt&sortOrder=asc   (need both sortBy & sortOrder to sort data)
```

## Features

- Proper global error handling
- Data validation using zod
- CRUD operations
- Pagination, filtering & transactions
