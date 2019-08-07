# my-cab

Assumptions
---
### General

- Since there is no API endpoint to end trip, So keeping only two statuses (`waiting`, `accepted`)
- Only five driver there is system. ids are `[1,2,3,4,5]` and locations are 
 `[[1, 1], [2, 2], [3, 3], [4, 4],[5, 5]]` respectively.
 - No driver can accept new request if last accepted request is less that 5 min.
 - Assumed same timeZone for DB and application server.
 - Ignored API authorization and strict data sanity and validity check;
 - while DB design considered only ride request table(`ride`) and ignored driver and customer table schema
 - Some of API endpoints design constraints ignored for better endpoint design
 - default running port `localhost:3000`
 - UI written in `Angularjs 1` 
 - No test cases written
 
### Driver App
- endpoint `http://localhost:3000/driver`
- added 3 tab to list `waiting`, `ongoing` and `completed` requests.
- ride request only can be seen by nearest 3 drivers.

### Customer App
- endpoint `http://localhost:3000/customer`
- added 3 input fields for `customerId`, and `location coordinates`

### DashBoard App
- endpoint `http://localhost:3000`
- added refresh button
___

# How Run Application
- create a database manually and udpate in config file `./config/config.json`
- add mysql `username` and `password` to config file
- Run Cmd: `npm start`
- No need create any tables manually.

# API Endpoints
- List the driver rides  + waiting ride request 
```
{
 URL: /driver/:driverId/ride
 Method: GET
}
```
- Accept ride 
```
{
 URL: /driver/:driverId/ride/:riderId
 Method: POST
}
```

- Customer Request New Ride
```
{
 URL: /customer/:customerId/ride/
 Method: POST
}
```
- Dashboard All ride list
```
{
 URL: /admin/ride
 Method: GET
}
```

