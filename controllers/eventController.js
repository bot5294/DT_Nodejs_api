const { ObjectId } = require("mongodb");
const connection = require("../config/mongodb");
const fs = require("fs");
module.exports.createEvent = (req, res) => {
  try {
    let {
      name,
      tagline,
      attendees,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;
    let arr = [];
    arr = req.files;
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].path;
    connection(function (err, client) {
      let db = client.db("DT_Nodejs_DB");
      db.collection("events").insertOne(
        {
          name,
          tagline,
          schedule,
          description,
          moderator,
          category,
          attendees,
          sub_category,
          rigor_rank,
          photos: arr,
        },
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("inserted documents =>", result);
          res.status(200).json({
            message: `Event Created Successfully, Id =  ${result.insertedId}`,
          });
          return result;
        }
      );
    });
  } catch (err) {
    console.log(`Error at createEvent : ${err}`);
    return res.status(500).json({
      message: "Internal Server Error, Contact Admin",
    });
  }
};

module.exports.updateEvent = (req, res) => {
  try {
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
      let {
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        attendees,
        sub_category,
        rigor_rank,
      } = req.body;
      let arr = [];
      arr = req.files;
      for (let i = 0; i < arr.length; i++) arr[i] = arr[i].path;
      let attendeesArr = [];
      attendeesArr = attendees;
      attendeesArr.forEach((element) => {
        return ObjectId(element);
      });
      let isPhotoProvided = arr.length > 0 ? true : false;
      console.log("isPhotoProvided : ", isPhotoProvided);
      console.log("arr.length", arr.length);
      if (isPhotoProvided) {
        if (arr.length != 2) {
          return res.status(401).json({
            message: "Provide only 2 photos or none",
          });
        }
        connection(function (err, client) {
          let db = client.db("DT_Nodejs_DB");
          db.collection("events")
            .findOneAndUpdate(
              { _id: new ObjectId(id) },
              {
                $set: {
                  name,
                  tagline,
                  schedule,
                  description,
                  moderator,
                  category,
                  sub_category,
                  attendees: attendeesArr,
                  rigor_rank,
                  photos: arr,
                },
              }
            )
            .then((record) => {
              if (record) {
                let photoArr = [];
                photoArr = record.value.photos;
                for (let i = 0; i < photoArr.length; i++) {
                  let filename = photoArr[i];
                  if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                    console.log(`${filename} Deleted successfully`);
                  } else {
                    console.log(
                      "file not exists, unable delete photos at updateEvent"
                    );
                  }
                }
                return res.status(200).json({
                  message: "This record updated successfully",
                  record: record,
                });
              }
            });
        });
      } else {
        connection(function (err, client) {
          let db = client.db("DT_Nodejs_DB");
          db.collection("events")
            .findOneAndUpdate(
              { _id: new ObjectId(id) },
              {
                $set: {
                  name,
                  tagline,
                  schedule,
                  description,
                  moderator,
                  category,
                  attendees: attendeesArr,
                  sub_category,
                  rigor_rank,
                },
              },
              { returnDocument: "after" }
            )
            .then((record) => {
              if (record) {
                return res.status(200).json({
                  message: "Here is the updated record [no photo update]",
                  record: record,
                });
              }
            });
        });
      }
    } else {
      return res.status(404).json({
        message: "Provide legitimate id",
      });
    }
  } catch (err) {
    console.log(`Error at updateEvent : ${err}`);
    return res.status(500).json({
      message: "Internal Server Error, Contact Admin",
    });
  }
};

module.exports.deleteEvent = (req, res) => {
  try {
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
      connection(async function (err, client) {
        let db = await client.db("DT_Nodejs_DB");
        let record = await db
          .collection("events")
          .findOneAndDelete({ _id: new ObjectId(id) });
        if (record.value != null) {
          let photoArr = [];
          photoArr = record.value.photos;
          for (let i = 0; i < photoArr.length; i++) {
            let filename = photoArr[i];
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
              console.log(`${filename} Deleted successfully`);
            } else {
              console.log(
                "file not exists, unable delete photos at updateEvent"
              );
            }
          }
          return res.status(200).json({
            message: "This document Delete Successfully",
            record: record,
          });
        } else {
          return res.status(404).json({
            message: "No records found for this id",
          });
        }
      });
    } else {
      return res.status(404).json({
        message: "Provide legitimate id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error,contact Admin",
    });
  }
};

module.exports.getEventDetails = (req, res) => {
  try {
    if (req.query.id) {
      let id = req.query.id;
      if (ObjectId.isValid(id)) {
        connection(async function (err, client) {
          let db = await client.db("DT_Nodejs_DB");
          let record = await db
            .collection("events")
            .findOne({ _id: new ObjectId(id) });
          if (record) {
            return res.status(200).json({
              message: `Here are the requested event details`,
              event: record,
            });
          } else {
            return res.status(404).json({
              message: `No record found with this id`,
            });
          }
        });
      } else {
        return res.status(404).json({
          message: "Provide legitimate id",
        });
      }
    } else {
      let type = req.query.type;
      let limit = parseInt(req.query.limit);
      let page = parseInt(req.query.page);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let howToSort;
      switch (type) {
        case "latest":
          howToSort = 1;
          break;
        case "oldest":
          howToSort = -1;
          break;
        default:
          howToSort = 1;
          break;
      }
      connection(async function (err, client) {
        let db = await client.db("DT_Nodejs_DB");
        let cursor = await db
          .collection("events")
          .find({}, { projection: { name: 1, schedule: 1 } })
          .sort({ schedule: howToSort })
          .skip(startIndex)
          .limit(limit);
        let recordCount = await cursor.count();
        let isAvailable = recordCount > 0;
        if (isAvailable) {
          let arr = [];
          await cursor.forEach((e) => {
            arr.push(e);
          });
          return res.status(200).json({
            message: `Here are the requested event details`,
            event: arr,
          });
        } else {
          return res.status(404).json({
            message: `No record found`,
          });
        }
      });
    }
  } catch (err) {
    console.log(`Error at  ${err}`);
    return res.status(500).json({
      message: "Internal Server Error, Contact Admin",
    });
  }
};
