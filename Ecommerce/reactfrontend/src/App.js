import React, { useEffect } from "react";
import Axios from 'axios';

export default function App() {
    // will update list as database updates on refreshing the site
    const [list, setList] = React.useState([]);
    const [message,setmessage]=React.useState([]);
    // will be run once 
    useEffect(()=> {  
        // here we get the data by requesting data from this link
        // to our nodejs server
        
        Axios.get('http://localhost:4000/api/shoes')
        .then((res)=> setList(res.data))
        .catch(error => {setmessage("server is not responding")
        console.log("error received",JSON.stringify(error))
            // Handle error
            if(error.message){
             console.log("the error message is",JSON.stringify(message))
            }
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              //console.log('Error', error.message);
            }
            console.log(error.config);
          })
    }
        
    , []);

    // creating list of shoes
    let val = list.map((item)=>{
        return <li key={item.id}>{item.name}</li>
    });
    
    return (
        <div>
            <h1>hello world</h1>
            <p>i live in this world</p>
            <ol>
                {val}
            </ol>
            {message}
        </div>
    )
}