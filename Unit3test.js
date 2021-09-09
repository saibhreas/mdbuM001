mongo "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.tbzlc.mongodb.net/firstCert"

show dbs
use sample_mflix
db.theaters.findOne()

// Add what you found to cause duplicate error

{"_id":ObjectId("59a47286cfa9a3a73e51e736"),"theaterId" : 1017,  "location" : {"address" : {"street1" : "4325 Sunset Dr","city" : "San Angelo","state" : "TX","zipcode" : "76904"},"geo" : {       "type" : "Point","coordinates" : [-100.50107,31.435648]}}}

db.theaters.insert({"_id":ObjectId("59a47286cfa9a3a73e51e736"),"theaterId" : 1017,  "location" : {"address" : { "street1" : "4325 Sunset Dr","city" : "San Angelo","state" : "TX","zipcode" : "76904"},"geo" : { "type" : "Point","coordinates" : [-100.50107,31.435648]}}})

//remove the id field and add again to show no dup error
db.theaters.insert({"theaterId" : 1017,  "location" : {"address" : { "street1" : "4325 Sunset Dr","city" : "San Angelo","state" : "TX","zipcode" : "76904"},"geo" : { "type" : "Point","coordinates" : [-100.50107,31.435648]}}})

//Inserting New Documents - insert() order:
//insert to inspections collection 3 docs
db.inspections.insert([{"test":1},{"test":2},{"test":3}])

//repeat   why did it Worker.theaters.. no id's!
db.inspections.insert([{"test":1},{"test":2},{"test":3}])


db.inspections.insert([{"_id": 1, "test": 1},{"_id": 1, "test": 2},{"_id": 3,"test": 3}])
//repeat  what's the differeence
db.inspections.insert([{"_id": 1, "test": 1},{"_id": 1, "test": 2},{"_id": 3,"test": 3}])

//insert unordered --what happens?
db.inspections.insert([{"_id": 1, "test": 1},{"_id": 1, "test": 2},{"_id": 3,"test": 3}],{ ordered: false })
{ ordered: false }

//next
db.inspection.insert([{ "_id":1, "test": 1 },{ "_id": 3,"test": 3 }])


//Updating Documents  - mongo shell
use sample_training
db.zips.find( {"zip":"12434"}).pretty()

//find "HUDSON"
db.zips.find({ "city": "HUDSON" }).pretty()

//Count
db.zips.find({ "city": "HUDSON" }).count()

//update pop by 10
db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })

//update single with pop number using set
db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })

//update using population to show that it will create the field.
db.zips.updateOne({ "zip": "12534" }, { "$set": { "population": 17630 } })


//find specific student
db.grades.find({ "student_id": 151, "class_id": 339 }).pretty()

//find another specific student
db.grades.find({ "student_id": 250, "class_id": 339 }).pretty()

//update student by pushing new element scores
db.grades.updateOne({"student_id":250,"class_id":339},{"$push":{"scores":{"type":"extra credit","score": 100 }}})

//PRACTICE QUES
db.zips.updateMany({"state": "NY", "city":"NEW YORK"},{"$set":{"capital?":false}})


//PRACTICE QUESTIONS
db.inspections.find({ "test": 1 }).pretty()

db.inspections.find({ "test": 3 }).pretty()

db.inspections.deleteMany({ "test": 1 })

db.inspections.deleteOne({ "test": 3 })

db.inspection.find().pretty()

show collections
db.inspection.drop()

