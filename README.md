# Storefront backend
## Scripts needed
 - `npm install` to install all the required dependencies
 - `npm run build` to build the project
 - `npm run start ` to start the server
 - `npm run test` to run the test
 - `npm run format` to run lint and prettify

## Instructions to run the project
### Make .env file
```
POSTGRES_HOST=localhost
POSTGRES_DB=store_DB
POSTGRES_USER=Zahar
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=Qq2424@!!!
TOKEN_SECRET=kg590k35hmjy340y9k34yes4k09yk904hzzg43g
SALT_ROUNDS=10
```
### Start DB
`docker compose build`  
`docker compose start`

### install project
`npm install`

### start project
`npm run start`

### connect
DB will be on localhost:5432  
API will be on localhost:3000