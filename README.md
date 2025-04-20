# **RESTful API for An E-commerce Website (Ezlil)**

## Project Overview 
A RESTful API for the Ezlil e-commerce website is designed to provide a robust and scalable interface for managing the core functionalities of the online store. This API allows seamless interaction with the website's backend, enabling the handling of products, user accounts, orders, and other essential e-commerce features. 
[Run the application locally](#run-locally)

---

## Tech Stack

**Server:** Node, Express, multer, jsonwebtoken, bcrypt

**Database:** MongoDB

**ODM Tool:** Mongoose

---

## Key Features

- **Product Management:** Endpoints to create, read, update, and delete products.
- **User Authentication:** Secure login, registration, and user profile management.
- **Order Processing:** Endpoints for managing the shopping cart, checkout process, and order history.
- **Inventory Management:** Real-time tracking and updating of stock levels.
- **Payment Integration:** Secure processing of payments via various payment gateways.
- **Search and Filter:** Advanced search and filtering options for product catalog.
- **Review and Rating System:** Endpoints for users to leave reviews and ratings for products.

---

## Stackholders

- **Developers:** Building front-end applications or mobile apps that need to interact with the E-commerce API.
- **E-commerce Managers:** Managing product listings, inventory, and customer orders through custom dashboards or admin panels.
- **Third-party Integrators:** Companies looking to integrate e-commerce capabilities with other services or platforms, such as CRM systems or marketing tools.
- **Customers:** Indirectly benefiting from a more responsive and feature-rich e-commerce experience.

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`

`SECRET`(Secret Key for JWT)

---

## Run Locally <a id="run-locally"></a>

Clone the project

```bash
  git clone https://github.com/sanjithrk06/Ezlil-API.git
```

Go to the project directory

```bash
  cd Ezlil-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

---

# Schema Design

## User Schema (users)

| S.No | Field Names | Type         | Ref       | Required | Unique | Default |
| :--: | ----------- | ------------ | --------- | -------- | ------ | ------- |
|  1   | First Name  | String       | -         | Y        | -      | -       |
|  2   | Last Name   | String       | -         | Y        | -      | -       |
|  3   | Email       | String       | -         | Y        | Y      | -       |
|  4   | Password    | String       | -         | Y        | -      | -       |
|  5   | Mobile      | String       | -         | Y        | Y      | -       |
|  6   | Role        | Enum         | -         | -        | -      | User    |
|  7   | Address     | [{ObjectId}] | addresses | -        | -      | -       |
|  8   | Payment     | [{ObjectId}] | payment   | -        | -      | -       |
|  9   | Ratings     | [{ObjectId}] | ratings   | -        | -      | -       |
|  10  | Reviews     | [{ObjectId}] | reviews   | -        | -      | -       |

---
## Addresses Schema (addresses)

| S.No | Field Names    | Type     | Ref   | Required | Unique |
| :--: | -------------- | -------- | ----- | -------- | ------ |
|  1   | Name           | String   | -     | Y        | -      |
|  2   | Address Line 1 | String   | -     | Y        | -      |
|  3   | Address Line 2 | String   | -     | Y        | -      |
|  4   | City           | String   | -     | Y        | -      |
|  5   | State          | String   | -     | Y        | -      |
|  6   | Zip Code       | Number   | -     | Y        | -      |
|  7   | User           | ObjectId | users | Y        | -      |
|  8   | Mobile         | String   | -     | Y        | -      |

---
## Cart Schema (cart)

| S.No | Field Names            | Type              | Ref       | Required | Unique | Default |
| :--: | ---------------------- | ----------------- | --------- | -------- | ------ | ------- |
|  1   | User                   | ObjectId          | users     | Y        | -      | -       |
|  2   | Cart Items             | [{ObjectId}, ...] | cartItems | Y        | -      | -       |
|  3   | Total Price            | Number            | -         | Y        | -      | 0       |
|  4   | Total Items            | Number            | -         | Y        | -      | 0       |
|  5   | Total Discounted Price | Number            | -         | Y        | -      | 0       |
|  6   | Discount               | Number            | -         | Y        | -      | 0       |

---
## Cart Items Schema (cartItems)

| S.No | Field Names      | Type     | Ref      | Required | Unique | Default |
| :--: | ---------------- | -------- | -------- | -------- | ------ | ------- |
|  1   | Cart             | ObjectId | cart     | Y        | -      | -       |
|  2   | Product          | ObjectId | products | Y        | -      | -       |
|  3   | Quantity         | Number   | -        | Y        | -      | 1       |
|  4   | Price            | Number   | -        | Y        | -      | -       |
|  5   | Discounted Price | Number   | -        | Y        | -      | -       |
|  6   | User             | ObjectId | users    | Y        | -      | -       |

---
## Category Schema (categories)

| S.No | Field Names     | Type     | Ref        | Required | Unique | Default | Max Length |
| :--: | --------------- | -------- | ---------- | -------- | ------ | ------- | ---------- |
|  1   | Name            | String   | -          | Y        | -      | -       | 50         |
|  2   | Parent Category | ObjectId | categories | -        | -      | -       |            |


---
## Order Schema (orders)
| S.No | Field Names                                                                   | Type               | Ref        | Required | Unique | Default               |
| :--: | ----------------------------------------------------------------------------- | ------------------ | ---------- | -------- | ------ | --------------------- |
|  1   | User                                                                          | ObjectId           | users      | -        | -      | -                     |
|  2   | Order Items                                                                   | [{ObjectId}, ....] | orderItems | -        | -      | -                     |
|  3   | Order Date                                                                    | Date               | -          | Y        | -      | date.now()            |
|  4   | Delivery Date                                                                 | Date               | -          | -        | -      | -                     |
|  5   | Shipping Address                                                              | ObjectId           | addresses  | Y        | -      | -                     |
|  6   | Payment Details [ payment Method, transaction id, payment id, payment status] | String             | -          | -        | -      | For Status, "PENDING" |
|  7   | Total Price                                                                   | Number             | -          | Y        | -      | -                     |
|  8   | Total Discounted Price                                                        | Number             | -          | Y        | -      | -                     |
|  9   | Discount                                                                      | Number             | -          | Y        | -      | -                     |
|  10  | Order Status                                                                  | String             | -          | Y        | -      | -                     |
|  11  | Total Item                                                                    | Number             | -          | Y        | -      | -                     |

---
## Order Items Schema (orderItems)
| S.No | Field Names      | Type     | Ref      | Required | Unique | Default |
| :--: | ---------------- | -------- | -------- | -------- | ------ | ------- |
|  1   | Product          | ObjectId | products | Y        | -      | -       |
|  2   | Quantity         | Number   | -        | Y        | -      | -       |
|  3   | Price            | Number   | -        | Y        | -      | -       |
|  4   | Discounted Price | Number   | -        | Y        | -      | -       |
|  5   | User             | ObjectId | users    | Y        | -      | -       |

---
## Product Schema (products)

| S.No | Field Names      | Type               | Ref        | Required | Unique | Default |
| :--: | ---------------- | ------------------ | ---------- | -------- | ------ | ------- |
|  1   | Title            | String             | -          | Y        | -      | -       |
|  2   | Description      | String             | -          | Y        | -      | -       |
|  3   | Price            | Number             | -          | Y        | -      | -       |
|  4   | Discounted Price | Number             | -          | -        | -      | -       |
|  5   | Discount Present | Number             | -          | -        | -      | -       |
|  6   | Quantity         | Number             | -          | Y        | -      | -       |
|  7   | Brand            | String             | -          | -        | -      | -       |
|  8   | Image Url        | String             | -          | -        | -      | -       |
|  9   | Ratings          | [{ObjecyId}, ....] | ratings    | -        | -      | -       |
|  10  | Reviews          | [{ObjecyId}, ....] | reviews    | -        | -      | -       |
|  11  | Num Ratings      | Number             | -          | -        | -      | 0       |
|  12  | Category         | ObjectId           | categories | -        | -      | -       |

---
## Rating Schema (ratings)

| S.No | Field Names | Type     | Ref      | Required | Unique | Default |
| :--: | ----------- | -------- | -------- | -------- | ------ | ------- |
|  1   | User        | ObjectId | users    | Y        | -      | -       |
|  2   | Product     | ObjectId | products | Y        | -      | -       |
|  3   | Rating      | Number   | -        | Y        | -      | -       |

---
## Reviews Schema (reviews)

| S.No | Field Names | Type     | Ref      | Required | Unique | Default |
| :--: | ----------- | -------- | -------- | -------- | ------ | ------- |
|  1   | User        | ObjectId | users    | Y        | -      | -       |
|  2   | Product     | ObjectId | products | Y        | -      | -       |
|  3   | Review      | String   | -        | Y        | -      | -       |

---

