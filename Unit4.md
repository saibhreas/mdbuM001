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
Expression 1 born in 1998:
      db.trips.find({"birth year": 1998}).count()

Expression 2 Born after 1998:
      db.trips.find({"birth year": {$gt: 1998} }).count()

db.trips.find({"birth year":{"$gt":1998}}).count() - db.trips.find({"birth year":1998}).count()

  

  Query Operators - Logic

  $and  meet all specifications (is implicit if not specified)
  $or   at least one spec
  $nor  returns only those that fail to match  (use as filter)
  $not  negates the query specification returna all that do not match

use sample_training
db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
                                    { "src_airport": "KZN" }
                                  ] },
                          { "$or" :[ { "airplane": "CR2" },
                                     { "airplane": "A81" } ] }
                         ]}).pretty()


Atlas command:
{$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}]}
{$nor: [{result: "No Violation Issued"}, {result: "Violation Issued"}, {result:"Pass"}, {result:"Fail"}]}


1. How many businesses in the sample_training.inspections dataset have the
   inspection result "Out of Business" and belong to the Home Improvement
   Contractor - 100 sector?
sector:"Home Improvement Contractor - 100"

db.inspections.find({"result":"Out of Business", "sector":"Home Improvement Contractor - 100"}).count()

db.inspections.find({$and : [{"result":"Out of Business"}, {"sector":"Home Improvement Contractor - 100"}]}).count()

Quiz 2: Logic Operators
Which is the most succinct query to return all documents from the sample_training.inspections collection where the inspection date is either "Feb 20 2015", or "Feb 21 2015" and the company is not part of the "Cigarette Retail Dealer - 127" sector?


db.inspections.find({ "$or": [ { "date": "Feb 20 2015" },{ "date": "Feb 21 2015" } ],"sector": { "$ne": "Cigarette Retail Dealer - 127" }}).pretty()




Chapter 4: Advanced CRUD Operations

Lab 1: Logic Operators
db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": -10 } })

How many zips in the sample_training.zips dataset are neither over-populated nor under-populated?

In this case, we consider population of more than 1,000,000 to be over- populated and less than 5,000 to be under-populated.

Copy/paste the exact numeric value (without double quotes) of the result that you get into the response field.
