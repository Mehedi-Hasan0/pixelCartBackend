## Author

- [@mahedihasan](https://github.com/Mehedi-Hasan0)

## About

An e-commerce platform backend. The main focus of this backend is to implement error handling, authentication and authorization, CRUD operations, pagination and filtering, transactions, and additional routes as necessary.

## Live link

coming soon

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_URL`

## Application route

### Auth

```
  POST     /api/v1/auth/login/
  POST     /api/v1/auth/refresh-token
  POST     /api/v1/auth/change-password
```

#### User

```
  GET     /api/v1/users/
  GET     /api/v1/users/:id   (GET a single user)
  POST    /api/v1/users/create-user
  DELETE  /api/v1/users/:id
```

| route                       | Type     | Authorization  |
| :-------------------------- | :------- | :------------- |
| `/api/v1/users/`            | `GET`    | Admin          |
| `/api/v1/users/:id`         | `GET`    | Admin          |
| `/api/v1/users/create-user` | `POST`   | All            |
| `/api/v1/users/:id`         | `Delete` | Admin & Seller |

#### Seller

```
  GET     /api/v1/sellers/
  GET     /api/v1/sellers/:id  (GET a single seller)
  POST    /api/v1/sellers/create-seller
  PATCH   /api/v1/sellers/:id
```

| route                           | Type    | Authorization |
| :------------------------------ | :------ | :------------ |
| `/api/v1/sellers/`              | `GET`   | Admin         |
| `/api/v1/sellers/:id`           | `GET`   | Admin         |
| `/api/v1/sellers/create-seller` | `POST`  | All           |
| `/api/v1/sellers/:id`           | `PATCH` | Seller        |

#### Buyer

```
  PATCH   /api/v1/buyers/:id
```

| route                | Type    | Authorization |
| :------------------- | :------ | :------------ |
| `/api/v1/buyers/:id` | `PATCH` | Buyer         |

### Products

```
  GET     /api/v1/products/
  GET     /api/v1/products/:id   (GET a single product)
  POST    /api/v1/products/create-product
  PATCH   /api/v1/products/:id
  DELETE  /api/v1/products/:id
```

| route                             | Type     | Authorization  |
| :-------------------------------- | :------- | :------------- |
| `/api/v1/products/`               | `GET`    | All            |
| `/api/v1/products/:id`            | `GET`    | All            |
| `/api/v1/products/create-product` | `POST`   | Seller         |
| `/api/v1/products/:id`            | `PATCH`  | Seller         |
| `/api/v1/products/:id`            | `DELETE` | Seller & Admin |

#### Pagination & Filtering routes of Users

```
/api/v1/users?page=1&limit=10
/api/v1/users?sortBy=createdAt&sortOrder=asc   (need both sortBy & sortOrder to sort data)
```

#### Pagination & Filtering routes of Sellers

```
/api/v1/sellers?page=1&limit=10
/api/v1/sellers?sortBy=createdAt&sortOrder=asc   (need both sortBy & sortOrder to sort data)
```

#### Pagination & Filtering routes of Products

```
/api/v1/products?page=1&limit=10
/api/v1/products?sortBy=price&sortOrder=asc   (need both sortBy & sortOrder to sort data)
/api/v1/products?searchTerm=T-shirt   (search fields works on 'title', 'brand', 'sku', 'categories')
/api/v1/products?minPrice=100&maxPrice=1000
/api/v1/products?brand=Polo&categories=T-shirt
```

## Features

- Proper global error handling
- Data validation using zod
- CRUD operations
- Pagination, filtering & transactions
