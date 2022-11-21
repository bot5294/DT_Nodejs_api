const { ObjectId } = require("mongodb");
const fs = require("fs");
const ApiResponse = require("../response-handler/ApiResponse");
const { log } = require("console");
module.exports.createEvent = (req, res, next) => {
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
    console.log("req.files : ", req.files);
    let arr = [];
    arr = req.files;
    console.log("arr : ", arr);
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].path;
    const collection = req.app.locals.collection;
    collection.insertOne(
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
        // console.log("inserted documents =>", result);
        next(
          ApiResponse.success(
            `Event Created Successfully, Id =  ${result.insertedId}`
          )
        );
        return;
      }
    );
  } catch (err) {
    console.log(`Error at createEvent : ${err}`);
    next(ApiResponse.badRequest("Internal Server Error, Contact Admin"));
    return;
  }
};

module.exports.updateEvent = (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(ObjectId.isValid(id));
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
      console.log(attendees, "Inside eContoller");
      attendeesArr = attendees;
      console.log(attendeesArr);
      if (Array.isArray(attendeesArr))
        if (attendeesArr.length > 0) {
          console.log(attendeesArr.length);
          attendeesArr.forEach((element) => {
            if (ObjectId.isValid(element)) return ObjectId(element);
          });
        }
      let isPhotoProvided = arr.length > 0 ? true : false;
      console.log("isPhotoProvided : ", isPhotoProvided);
      console.log("arr.length", arr.length);
      if (isPhotoProvided) {
        if (arr.length != 2) {
          next(ApiResponse.badRequest("Provide only 2 photos or none"));
          return;
        }
        const collection = req.app.locals.collection;
        collection
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
              next(ApiResponse.badRequest(`This record updated successfully`));
              return;
            }
          });
      } else {
        const collection = req.app.locals.collection;
        collection
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
      }
    } else {
      next(ApiResponse.badRequest("Provide legitimate id"));
      return;
    }
  } catch (err) {
    console.log(`Error at updateEvent : ${err}`);
    next(ApiResponse.badRequest("Internal Server Error,Contact Admin"));
    return;
  }
};

module.exports.deleteEvent = (req, res, next) => {
  try {
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
      const collection = req.app.locals.collection;
      collection.findOneAndDelete({ _id: new ObjectId(id) }).then((record) => {
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
            message: "This document Deleted Successfully",
            record: record,
          });
        } else {
          next(ApiResponse.success("No records Found for this id"));
          return;
        }
      });
    } else {
      next(ApiResponse.success("Provide legitimate id"));
      return;
    }
  } catch (err) {
    next(ApiResponse.badRequest("Internal Server Error,Contact Admin"));
    return;
  }
};

module.exports.getEventDetails = (req, res, next) => {
  try {
    if (req.query.id) {
      let id = req.query.id;
      if (ObjectId.isValid(id)) {
        const collection = req.app.locals.collection;
        collection.findOne({ _id: new ObjectId(id) }).then((record) => {
          if (record) {
            return res.status(200).json({
              message: `Here are the requested event details`,
              event: record,
            });
          } else {
            next(ApiResponse.notFound("No record found for this id"));
            return;
          }
        });
      } else {
        next(ApiResponse.badRequest("Provide legitimate id"));
        return;
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
          howToSort = -1;
          break;
        case "oldest":
          howToSort = 1;
          break;
        default:
          howToSort = 1;
          break;
      }
      const collection = req.app.locals.collection;
      let cursor = collection
        .find({}, { projection: { name: 1, schedule: 1 } })
        .sort({ schedule: howToSort })
        .skip(startIndex)
        .limit(limit);
      cursor.count().then((recordCount) => {
        let isAvailable = recordCount > 0;
        if (isAvailable) {
          let arr = [];
          cursor
            .forEach((e) => {
              arr.push(e);
            })
            .then(() => {
              return res.status(200).json({
                message: `Here are the requested event details`,
                event: arr,
              });
            });
        } else {
          next(ApiResponse.notFound("No record found"));
          return;
        }
      });
    }
  } catch (err) {
    console.log(`Error at  ${err}`);
    next(ApiResponse.badRequest("Provide legitimate id"));
    return;
  }
};
