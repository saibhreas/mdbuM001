"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert" 
 
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

type <em>it<em>  iterates through the list

EX now how many zip codes---using count command
db.zips.find( {"state":"NY"} ).count()
Querry yielded 1596

db.zips.find( {"state":"NY", "city":"ALBANY"} ).count()

INTRODUCING PRETTY
db.zips.find( {"state":"NY", "city":"ALBANY"} ).pretty()


____________________________
mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"

show dbs

use sample_training

show collections

db.zips.find({"state": "NY"})

db.zips.find({"state": "NY"}).count()

db.zips.find({"state": "NY", "city": "ALBANY"})

db.zips.find({"state": "NY", "city": "ALBANY"}).pretty()
___________________



mongoimport --uri="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sample_supplies" sales.json

mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"

use sample_training

db.inspections.findOne();

db.inspections.insert({
      "_id" : ObjectId("56d61033a378eccde8a8354f"),
      "id" : "10021-2015-ENFO",
      "certificate_number" : 9278806,
      "business_name" : "ATLIXCO DELI GROCERY INC.",
      "date" : "Feb 20 2015",
      "result" : "No Violation Issued",
      "sector" : "Cigarette Retail Dealer - 127",
      "address" : {
              "city" : "RIDGEWOOD",
              "zip" : 11385,
              "street" : "MENAHAN ST",
              "number" : 1712
         }
  })

db.inspections.insert({
      "id" : "10021-2015-ENFO",
      "certificate_number" : 9278806,
      "business_name" : "ATLIXCO DELI GROCERY INC.",
      "date" : "Feb 20 2015",
      "result" : "No Violation Issued",
      "sector" : "Cigarette Retail Dealer - 127",
      "address" : {
              "city" : "RIDGEWOOD",
              "zip" : 11385,
              "street" : "MENAHAN ST",
              "number" : 1712
         }
  })

db.inspections.find({"id" : "10021-2015-ENFO", "certificate_number" : 9278806}).pretty()

db.inspections.insert([ { "test": 1 }, { "test": 2 }, { "test": 3 } ])
db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
                       { "_id": 3, "test": 3 }])

  db.inspections.find({ "_id": 1 })
                 
                       
db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
                       { "_id": 3, "test": 3 }],{ "ordered": false })

db.inspection.insert([{ "_id": 1, "test": 1 },{ "_id": 3, "test": 3 }])

show collections
use training
show dbs
____________________________________________________________________________

mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"

use sample_training
db.zips.find({ "zip": "12534" }).pretty()
db.zips.find({ "city": "HUDSON" }).pretty()
db.zips.find({ "city": "HUDSON" }).count()
db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })
db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })
db.zips.updateOne({ "zip": "12534" }, { "$set": { "population": 17630 } })
db.grades.find({ "student_id": 151, "class_id": 339 }).pretty()
db.grades.find({ "student_id": 250, "class_id": 339 }).pretty()
db.grades.updateOne({"student_id":250,"class_id":339},{"$push":{"scores":{"type":"extra credit","score": 100 }}})


