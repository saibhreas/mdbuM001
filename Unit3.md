# Unit3 Creating and Manipulating Documents

mongo mongo "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/admin"

    mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

For this exercise connect to you Mongo DB Atlas Sandbox

## Inserting New Documents

1. [ObjectID](#objectIDn)
2. [Errors](#errors)
3. [Order](#order)
4. [Update](#update)
5. [Delete](#delete)
6. [IDE](#ide)
   - [Quiz](#quiz)
   - [Exam](#exam)

## ObjectID

\*\*from https://docs.mongodb.com/manual/reference/method/ObjectId/

> ObjectId
> Description
> ObjectId(<hexadecimal>)
> Returns a new ObjectId value. The 12-byte ObjectId value consists of:
> a 4-byte timestamp value, representing the ObjectId's creation, measured in seconds since the Unix epoch
> a 5-byte random value
> a 3-byte incrementing counter, initialized to a random value
> While the BSON format itself is little-endian, the timestamp and counter values are big-endian, with the most significant bytes appearing first in the byte sequence.

**_\_id_**

unique identifier for a document collection (generated upon creation)

mandatory field in every document

by default it is of the _type_ ObjectId() unless otherwise specified

### Quiz: ObjectId

Problem:

How does the value of \_id get assigned to a document?

You can select an ObjectID as long as it is unique

The system will automatically generate one if not specified

## Errors

for this exercise

      use sample_training

\*\* from: https://docs.mongodb.com/manual/reference/method/db.collection.insert/

The insert() method has the following syntax:

      db.collection.insert(
         <document or array of documents>,
       {
        writeConcern: <document>,
        ordered: <boolean>
       }
      )

Document is a single document or an array

_writeConcern_ is an optional document, specifically overriding the default write operations behavior for a document or array, like adding a 'write time out' to stop the process.

Fields can contain:

      { w: <value>, j: <boolean>, wtimeout: <number> }

_order_ is an optional if true insertion follow the array order, once an error occurs no insertions past that point will be completed and the process ends.

Mongo DB allows for multiple identical documents as long as they have unique "\_id"

MogoDB schema validation allows you to enforce document structure

1.  Get a random document from a collection

         db.inspections.findOne();

2.  Copy this random document, and insert it back to the collection. Do you get a "Duplicate Key" error?

Yes: The insertion did not succeed because a document with this exact ID value already exists.

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

**_Removing the whole collection before inserting it back eliminates the duplicate key issue_**

3. Insert that document into the collection without the \_id field to get a successfull insert. Did it work?

Yes, a new identical document is created with a new unique ObjectId generated by the database

## Order

**_ORDER MATTERS_**

Inserting New Documents - insert() order:

1.  Insert three test documents into the inspections collection

         db.inspections.insert([{"test":1},{"test":2},{"test":3}])

2.  Insert the same three documents into the inspections collection. Did it work? & Why?

    Yes use they did nto have any '\_id' assigned

3.  Insert these three test documents into the inspections collection.

         db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
                        { "_id": 3, "test": 3 }])

    Did it work? & Why?

    **_Yes & No_** The response indicates that one file was inserted, and the others pulled an error. We get no indication in the response which documents was inserted

4.  Try the same insert as above but make it unordered.

          db.inspections.insert([{ "_id": 1, "test": 1 },{ "_id": 1, "test": 2 },
                        { "_id": 3, "test": 3 }],{ "ordered": false })

    The result: all documents with unique \_id will be written, and any duplicates will throw individual errors

5.  Try this command.

        db.inspection.insert([{ "_id":1, "test": 1 },{ "_id": 3,"test": 3 }])

    No because the last insert use the same \_id's

### Quiz: Insert Order

Problem:

Which of the following commands will successfully insert 3 new documents into an empty pets collection?

      db.pets.insert({{ "pet": "cat"},{"pet": "dog"},{"pet": "fish"}})
      //correct- enters all 3 documents to the pets collection


      db.pets.insert([{ "_id": 1, "pet": "cat" },
                { "_id": 1, "pet": "dog" },
                { "_id": 3, "pet": "fish" },
                { "_id": 4, "pet": "snake" }], { "ordered": false })
      // Adds cat, fish,  && snake because of ***ordered:false***.  However, duplicate dog will throw error


      db.pets.insert([{ "_id": 1, "pet": "cat" },
                { "_id": 1, "pet": "dog" },
                { "_id": 3, "pet": "fish" },
                { "_id": 4, "pet": "snake" }], { "ordered": true })
      Does not work, stops becaus of error after first document write


      db.pets.insert([{ "_id": 1, "pet": "cat" },
                { "_id": 2, "pet": "dog" },
                { "_id": 3, "pet": "fish" },
                { "_id": 3, "pet": "snake" })
      // First 3 documents will be inserted. Duplicate will cause an error, but because it happens at the end(order) does not throw error before first 3 are written

## Update

For this lesson

      use sample_training

Grades Collection contains an array field

Update student _"student_id:0"_ record for the _"class:339"_

In Atlas: update one document, select the edit button that looks like a pencil.

### Quiz: Updating Documents- Atlas

Problem:

MongoDB has a flexible data model, which means that you can have fields that contain documents, or arrays as their values.

Select any invalid MongoDB documents from the given choices:

_NONE OF THE ABOVE_ All choices were valid

### Updating Documents- mongo shell

There are two Update method:

***updateOne()***- updates the first document that matches the query

         db.collection.updateOne(filter, update, options)

from https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

The updateOne() method has the following syntax:

         db.collection.updateOne(
            <filter>,
            <update>,
            {
               upsert: <boolean>,
               writeConcern: <document>,
             collation: <document>,
               arrayFilters: [ <filterdocument1>, ... ],
                  hint:  <document|string> // Available starting in MongoDB 4.2.1
            }
         )
<br>

***updateMany()***- updates all documents that match the given query

from https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/

The updateMany() method has the following form:

         db.collection.updateMany(
           <filter>,
           <update>,
            {
              upsert: <boolean>,
              writeConcern: <document>,
              collation: <document>,
              arrayFilters: [ <filterdocument1>, ... ],
                hint:  <document|string> // Available starting in MongoDB 4.2.1
            }
         )

For this exercise use sample_training.zips

      use sample_training

1.  Find all documents in the zips collection where the zip field is equal to 12434.

         db.zips.find({ "zip": "12534" }).pretty()

2.  Find all documents in the zips collection where the city field is equal to "HUDSON".

         db.zips.find({ "city": "HUDSON" }).pretty()

3.  Find how many documents in the zips collection have the city field is equal to "HUDSON".

             db.zips.find({ "city": "HUDSON" }).count()

    <br>

4.  Update all documents in the zips collection where the city field is equal to "HUDSON" by adding 10 to the current value of the "pop" field.<br>

    using the $inc operator:  {$inc": {pop:10, "<field2>": <increment value>, ...}}

          db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })

    multiple fields can be updated at the same time, just separate with comma

    when the operation is complete you get an acknowledgement of the matched and modified elements<br>
    <br>

5.  Update a single document in the zips collection where the zip field is
    equal to 12534 by setting the value of the "pop" field to 17630.

             db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })

    <br>

6.  Update a single document in the zips collection where the zip field is
    equal to 12534 by setting the value of the "population" field to 17630.
    (this is an example of how Mongo DB will interpret population as a new document filed and create it, && not see it as a typo **_implicit creation_**)

          db.zips.updateOne({ "zip": "12534" }, { "$set": { "population": 17630 } })

    $set updates the value of a given filed with a specified value

          {$"set":{<filed1>: <value1>, <field2>: <new value>, ...}}

    $push adds an array filed of specified value

          {$push":<field1>:<value1>, ...}

    <br>

for the next exercise

      use sample_training

1.  Find all documents in the grades collection where the student_id is 151, and the class_id field is 339.

         db.grades.find({ "student_id": 151, "class_id": 339 }).pretty()

2.  Find all documents in the grades collection where the student_id is 250, and the class_id field is 339.

         db.grades.find({ "student_id": 250, "class_id": 339 }).pretty()

3.  Update one document in the grades collection where the student_id is 250, and the class_id field is 339, by adding a document element to the "scores" array.

         db.grades.updateOne({ "student_id": 250, "class_id": 339 },
                    { "$push": { "scores": { "type": "extra credit",
                                             "score": 100 }
                                }
                     })

### Quiz: Updating Documents in the shell

Problem:

Given a pets collection where each document has the following structure and fields:

      {
       "_id": ObjectId("5ec414e5e722bb1f65a25451"),
       "pet": "wolf",
       "domestic?": false,
       "diet": "carnivorous",
       "climate": ["polar", "equatorial", "continental", "mountain"]
      }

- Which of the following commands will add new fields to the updated documents?

      db.pets.updateMany({ "pet": "cat" },
                { "$set": { "type": "dangerous",
                            "look": "adorable" }})
      //fields 'type' && 'look' will be created implicitly by the $set giving a value to documents matching "pet":"cat"

      db.pets.updateMany({ "pet": "cat" },
                { "$push": { "climate": "continental",
                             "look": "adorable" } })
      //"look' filed created with value 'adorable'

  incorrect response:

      db.pets.updateMany({ "pet": "cat" },
                {"$set": { "domestic?": true, "diet": "mice" }})
      //Fields already exist, and will only be updated

      db.pets.updateMany({ "pet": "cat" },
                { "$set": { "climate": "continental" }})
      //problems climate already exists as an array, this will update it to a single value removing the array

## Delete

for this exercise

      use sample_training

Delete is irreversible. once done the document, documents, or collection will be eliminated
deleteOne() should only be used with the '\_id' value

      deleteOne('_id':22)

Begin by removing the test documents added in the previous exercise

      db.inspection.find().pretty()

      db.inspections.deleteMany({'test':1})

      db.inspections.deleteMany({'test':3})


Drop the database

      db.inspection.drop()

### Quiz 1: Deleting Documents

Problem:

The sample dataset contains a few databases that we will not use in this course. Clean up your Atlas cluster and get rid of all the collections in these databases:

      sample_analytics
      sample_geospatial
      sample_weatherdata

Does removing all collections in a database also remove the database?

Yes

### Quiz 2: Deleting Documents

Problem:

Which of the following commands will delete a collection named villains?

      db.villians.drop()

### IDE

#### Quiz

Practice Question:

People often confuse NEW YORK City as the capital of New York state, when in reality the capital of New York state is ALBANY.

Add a boolean field "capital?" to all documents pertaining to ALBANY NY, and NEW YORK, NY. The value of the field should be true for all ALBANY documents and false for all NEW YORK documents.

         db.zips.updateMany({ "city": "NEW YOR" }, { $set: { "capital?": "false"} })

         db.zips.updateMany({ "city": "ALBANY" },{ $set: { "capital?":true} })
<br>

### Exam

**Inserting New Documents - insert() and errors:**

1. Get a random document from a collection

         db.zips.findOne()
        
2. Copy this random document, and insert it back to the collection. Do you get a "Duplicate Key" error?

Yes

3. Insert that document into the collection without the "_id" field to get a succesfull insert. Did it work?

Yes

<br>

**Inserting New Documents - insert() order:**

1. Insert three test documents into the inspections collection:


            db.inspections.insert([{"test":1},{"test":2},{"test":3}])
<br>

2. Insert the same three documents into the inspections collection. Did it work? Why? 

Yes it worked because they do not have id's

3. Insert these three test documents into the inspections collection.

         db.inspections.insert([{"_id": 1, "test": 1},{"_id": 1, "test": 2},{"_id": 3,"test": 3}])

Did it work?  Why?

Yes Because any id's that were not duplicates were written

4. Try the same insert as above but make it unordered.

Unordered throws individual errors for the duplicates, and inserts the rest

5. Try this command. 

        db.inspection.insert([{ "_id":1, "test": 1 },{ "_id": 3,"test": 3 }])

Did it work? Why?

No because of duplicates

<br>

**Updating Documents - mongo shell**

1. Find all documents in the zips collection where the zip field is equal to 12434.

         db.zips.find({"zip": "12434" }).pretty()


2. Find all documents in the zips collection where the city field is equal to "HUDSON".

            ???db.zips.find({ "city": "HUDSON" }).pretty()


3. Find how many documents in the zips collection have the city field is equal to "HUDSON".

            ???db.zips.find({ "city": "HUDSON" }).count()


4. Update all documents in the zips collection where the city field is equal to "HUDSON" by adding 10 to the current value of the "pop" field.

            ???db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })


5. Update a single document in the zips collection where the zip field is equal to 12534 by setting the value of the "pop" field to 17630.

            ???db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })


6. Update a single document in the zips collection where the zip field is equal to 12534 by setting the value of the "population" field to 17630.

             db.zips.updateOne({ "zip": "12534" }, { "$set": { "population": 17630 } })


7. Find all documents in the grades collection where the student_id is 151,
   and the class_id field is 339.

             ???db.grades.find({ "student_id": 151, "class_id": 339 }).pretty()


8. Find all documents in the grades collection where the student_id is 250,
   and the class_id field is 339.

            ???db.grades.find({ "student_id": 250, "class_id": 339 }).pretty()


9. Update one document in the grades collection where the student_id is 250,
   and the class_id field is 339, by adding a document element to the "scores" array.

             db.grades.updateOne({ "student_id": 250, "class_id": 339 },
            { "$push": { "scores": { "type": "extra credit",
                                     "score": 100 }
                        }
             })

   <br>


Deleting Documents and Collections

1. Look at all the documents in the inspections collection that have test field
   equal to 1.


2. Look at all the documents in the inspections collection that have test field
   equal to 3.


3. Delete all the documents from the inspections collection that have test
   field equal to 1


4. Delete one document from the inspections collection that has test field
   equal to 3


5. Inspect what is left of the inspection collection.



6. View what collections are present in the sample_training database.



7. Drop the inspection collection
