import React from "react"
import { Card } from "react-bootstrap";


function BadgerMessage(props) {

    const user = sessionStorage.getItem('username')
    const isOwner = user === props.poster;

    const dt = new Date(props.created);

   


    const handleDelete = () =>{
        
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${props.id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "X-CS571-ID": CS571.getBadgerId()
            } 
        }).then(res =>{
           if(res.ok){
            alert("Successfully deleted your post")
           }
           if(res === 401){
            alert("You must be logged in to do that!")
            }
           if(res === 404){
            alert("The message you are attempting to delete does not exist!")
           }
           window.location.reload();
        })

      }

   

   

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {isOwner && (
        <button onClick={() => handleDelete()} style ={{color: "black", background:"red"}}>Delete</button>
      )}
    </Card>
}

export default BadgerMessage;