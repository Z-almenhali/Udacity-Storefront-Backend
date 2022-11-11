# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `GET /products`
- Show: `GET /products/1`
- Create : `POST /products`

#### Users
- Index: `GET /users`
- Show: `GET /users/1`
- Create : `POST /users`

#### Orders
- Index: `GET /orders`
- Show: `GET /orders/1`
- Create : `POST /orders`
- Add product to order : `POST /orders/1/products`

## Data Shapes
#### User
Table name: user

Schema:
- id: serial (primary key)
- firstname: varchar
- lastname: varchar
- password: text

#### Product
Table name: product

Schema:
- id: serial (primary key)
- name: varchar
- price: integer
- category: varchar

#### Orders
Table name: orders

Schema:
- id: serial (primary key)
- status: varchar
- user_id: serial (foreight key for user table)

#### Orders products
Table name: order_products

Schema:
- id: serial (primary key)
- quantity: integer
- orderId: serial (foreight key for order table)
- productId: serial (foreight key for product table)
