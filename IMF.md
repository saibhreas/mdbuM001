 m001-student
Database User
•	username: m001-student
•	password: m001-mongodb-basics
0.0.0.0/0

moo1 Sandbox

mongodb+srv://m001-student: m001-mongodb-basics @sandbox.tbzlc.mongodb.net/test


mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/test

MongoDB shell version v4.4.6




### Data handling:

Export

mongodump -- uri "<Atlas Cluster URI>"
Eports data in BSON

mongoexport --uri "<Atlas Cluster URI>"
Exports in JSON

mongorestore
JSON

mongodump
BSON

URI string
uniform Resource Identifier
srv-establishes a secure connection
mongodb+srv://user:password@clusterURI.mongodb.net/database
**//for this class this is the URI string**
  mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/test

for the shell:
mongosh "mongodb+srv://sandbox.tbzlc.mongodb.net/myFirstDatabase" --username m001-student

## From site

https://docs.mongodb.com/manual/reference/program/mongoimport/#compatibility

mongodump --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"

mongoexport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --collection=sales --out=sales.json

mongorestore --uri "mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies"  --drop dump

mongoimport --uri="mongodb+srv://<your username>:<your password>@<your cluster>.mongodb.net/sample_supplies" --drop sales.json



EXAMPLE OF QUERRY FILTER IN atlas
{"state":"NY", "city":"ALBANY"}

Namespace - The concatenation of the database name and collection name is called a namespace.

We looked at the sample_training.zips collection and issued the following queries:

{"state": "NY"}
{"state": "NY", "city": "ALBANY"}


### Find Command using shell

in working dir type 
mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

Querry like we did in Atlas:
db.zips.find( {"state":"NY"} )

