const {google}=require('googleapis');
require('dotenv').config();

//Provide the required configuration
const CREDENTIALS=JSON.parse(process.env.CREDENTIALS);
const calendarid=process.env.calendar.id;

//Google calendar API settings
const SCOPES='https://www.googleapis.com/auth/calendar';
const calendar=google.calendar({version: "V3"});

const auth=new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

//Your TIMEOFFSET Offset
const TIMEOFFSET ='+02:00'

//Get date-time string for calendar
const DateTimeForCalendar=() =>{

    let date=new date();

    let year=date.getfullyear();
    let month=date.getmonth()+1;
    if (month<10){
        month=`0${month}`;
}
    let day=date.getdate();
    if (day<10){
        day=`0${day}`;}
    let hour=date.gethours();
    if (hour<10){
        hour=`0${hour}`;}
    let minute=date.minutes();
    if (minute<10){
        minute=`0${minute}`;}

    let newdatetime=`${year}-${month}-${day}-T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event=new Date(Date.parse(newdatetime));

    let startdate=event;
    let enddate=new date(date(startdate).sethours(startdate.gethours()+1));

    return{
        'start':startdate,
        'end':enddate
    }
}

//insert new event to google calendar
const insertevent=async(event)=> {
 
    try{
        let response=await calendar.events.insert({
            auth:auth,
            calendarid:calendarid,
            resource:event
        })

        if (response['status']==200 && response['statustext']==='OK'){
            return 1;
        } else{
            return 0;
        }
    } catch (error){
        console.log(`Error at insertevent --> ${error}`)
        return 0;
    }
}

let datetime=dateTimeForCalendar();

//Event for Google calendar
let event ={
    'summary':'This is the summary.',
    'description':'This is the description.',
    'start':{
        'datetime':datetime['start'],
        'timezone':'Europe/Paris'
    },
     'end':{
        'datetime':datetime['start'],
        'timezone':'Europe/Paris'
    }
}

insertevent(event)
.then((res)=>{ 
    console.log(res);
})
.catch((err)=> {
    console.log(err);
})

//Get all the events between two dates
const getevents =async(datetimestart, datetimeend)=>{

    try{
        let response = await calendar.events.list({
            auth: auth,
            calendarid:calendarid,
            timemin:datetimestart,
            timemax:datetimeend,
            timezone:'Europe/Paris'
        });

        let items=response['data']['items'];
        return items;
    } catch(error) {
        console.log[`Error at getevents-->${error}`];
        return 0;
    }
};

let start='2020-10-03T00:00:00.000Z';
let end= '2020-10-04T00:00:00.000Z';

getevents(start,end)
.then((res)=>{
console.log(err);
})
.catch((err)=>{
    console.log(err);
})

//Delete an event from eventid
const deleteevent=async(eventid)=>{

    try{
        let response=await calendar.events.delete({
            auth:auth,
            calendarid:calendarid,
            eventid:eventid
        });
        if (response.data===''){
            return 1;
        }else{
            return 0; 
        }
    } catch (error){
        console.log(`Error at deleteevent__>${error}`);
        return 0;
    }
}

let eventid= //id kod iz nodea

deleteevent(eventid)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})
