# DT_Nodejs_api

## API Desctiption<br>

| Request Type	| Base URL | API Endpoint	| Payload | Description |
|---|---|---|---|---|
| GET	| /api/v3/app	| /events?id=:event_id	| - | Gets an event by its unique id |
|	GET	| /api/v3/app	| /events?type=latest&limit=5&page=1	| - | Gets an event by its recency & paginate results by page number and limit of events per page |
|	POST	| /api/v3/app	| /events	| name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank | Creates an event and returns the Id of the event i.e. created |
|	PUT	| /api/v3/app	| /events/:id	| Same as POST payload | |
|	DELETE | /api/v3/app	| /events/:id	| - | Deletes an event based on its Unique Id |


| Object Data Model of an event	| 
|---|
| "type:""event"" |
| uid:18 (user id) |
| name: Name of the event |
| tagline: A proper tag-line for the event |
| schedule: (Date + time) Timestamp |
| description: String |
| files[image]: Image file (File upload) |
| moderator: A user who is going to host |
| category: Category of the event |
| sub_category: Sub category |
| rigor_rank: Integer value |
| attendees: Array of user Id's who is attending the event |
