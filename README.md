# DT_Nodejs_api

# TASK 2 Link : [Task 2: Create API Documentation](https://docs.google.com/spreadsheets/d/1mwk_oneWY-uZC1cNgLB6bD2NvT4Punrgj_-anoW5lBw/edit?usp=sharing)


# TASK 1 has 3 branches:
1) Main Branch : base code <br>
2) Refactor Branch : has universal apihandler,universal mongodb connection,no use of async /await <br>
3) Cli Branch : added a command line interface to work with backend application. <br>
<br>
## Tech Stack
=> Node js<br>
=> Express js<br>
=> MomgodB native<br>

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


# How to Setup this Project on the local system

<b>-> Step 1 :</b><br>
      clone this repository
<code> git clone https://github.com/bot5294/DT_Nodejs_api </code> & <code>cd DT_Nodejs_api </code>
<br>
<b>-> Step 2 :</b> <br>
install required modules <code>npm i</code><br>
<b>-> Step 3 :</b> <br>
start the server <code>npm start</code> <br>
<b>-> Step 4 :</b><br>
Using POSTMAN hit the api

# Screenshots
![image](https://user-images.githubusercontent.com/72665229/196080286-d23d2fd1-05b0-4e8b-a84c-3c7f2292a07d.png)

<hr>

![image](https://user-images.githubusercontent.com/72665229/196080397-52df680a-5a5c-4123-a3dd-96cdf4668ec2.png)

<br>

![image](https://user-images.githubusercontent.com/72665229/196080511-0a90d23c-9946-4633-97c7-bb80b354f9e4.png)


