# Unit4 Advanced Queries  MQL

## Query Operators:

  $
  - precedes MQL operators
  - precedes Aggregation pipeline stages
  - Allows Access to Field Values

  **Comapirison**

  $eq = EQual to  ||  $ne = NotEqual to
  $gt > Greater Than  ||  $lt < Less Than
  $gte >= Greater Than or Equal to  || $lte <= Less Than or Equal to

  Comparison Operators specifically allow finding data within a certain range

    { <field>: { <operator>: <value> } }
    $eq is default 


mongo mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"


**login**

mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

use sample_training

db.trips.find({ "tripduration": { "$lte" :100 },
                "usertype": { "$ne": "Subscriber" } }).pretty()


db.trips.find({ "tripduration": { "$lte" : 70 },
                "usertype": { "$eq": "Customer" }}).pretty()

db.trips.find({ "tripduration": { "$lte" : 70 },
                "usertype": "Customer" }).pretty()               

### Lab 1: Comparison Operators
How many documents in the sample_training.zips collection have fewer than 1000 people listed in the pop field?
db.zips.find({"pop":{"$lt":1000}}).count()
How many documents in the sample_training.zips collection have fewer than 1000 people listed in the pop field?

### Lab 2: Comparison Operators

What is the difference between the number of people born in 1998 and the number of people born after 1998 in the sample_training.trips collection?

  $subtract (aggregation)   https://docs.mongodb.com/manual/reference/operator/aggregation/subtract/
    { $subtract: [ <expression1>, <expression2> ] }
    Expression 1 born in 1998:
      db.trips.find({"birth year": 1998}).count()

    Expression 2 Born after 1998:
      db.trips.find({"birth year": {$gt: 1998} }).count()

  Now Bring in $subtract
    db.trips.find({ $subtract: [ <expression1>, <expression2> ] }
  )




db.trips.find({ $subtract: [ <expression1>, <expression2> ] }
  )

db.trips.find(db.trips.find({ $subtract: [ {db.trips.find({"birth year": 1998}).count()}, db.trips.find({"birth year": {$gt: 1998} }).count() ] }
  ))
