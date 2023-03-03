This is the address formatter which takes in the address/ place from the client and displays the formatted address in 
the address form.

To start the server:

http-server -c-1

Run form.html in the browser.

### To Run Backend Server

* Checkout the Package and run `npm install`
* To Start server in developer mode, run `npm run watch`
* The Server would be started in localhost:3001

### Endpoints

```
GET /:country/format
```

```
POST /:country/validate
```

```
GET /:country/search
```

```
GET /search
```
