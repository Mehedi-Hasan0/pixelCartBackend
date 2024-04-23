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
```

#### Seller

```
  POST    /api/v1/sellers/create-seller
```

### Admin

```
  POST    /api/v1/admin/create-admin
```

## Features

- Proper global error handling
- Data validation using zod
- CRUD operations
- Pagination, filtering & transactions
