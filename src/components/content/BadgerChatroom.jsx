import React, { useEffect, useState } from "react";
import BadgerMessage from "./BadgerMessage";
import {Container, Row, Col, Pagination, FormControl, Button, FormLabel} from "react-bootstrap";



export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const startIdx = (activePage - 1) * 25;
    const endIdx = activePage * 25;
    const messagesOnPage = messages.slice(startIdx, endIdx);
    

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
   



    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })

    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    
    useEffect(loadMessages, [props]);

    const buildPaginator =() => {
        let pages =[]
        
        const num_pages = 4
        for(let i = 1; i <= num_pages; i++){
            pages.push(
                <Pagination.Item
                key={i}
                active= {activePage === i}
                onClick={()=>setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }


      const handlePost = () =>{
        if (!postTitle || !postContent) {
            alert("You must provide both a title and content!");
            return;
          }
      
          fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
              method: 'POST',
              credentials: "include",
              headers: {
                  'Content-Type': 'application/json',
                  "X-CS571-ID": CS571.getBadgerId()
              },
              body: JSON.stringify({
                title: postTitle,
                content: postContent
           })
          }).then(res => {
            if(res.ok){
                alert("Successfully posted!")
                loadMessages();
                window.location.reload();
            }
            else{
                alert("Something went wrong... :(")
            }
          })
            setPostTitle(''); 
            setPostContent('');

      }

      const getId = (message) =>{
        let id = 0;
        for(let i = 0; i < messagesOnPage.length; i++){
            if(messagesOnPage[i].title === message.title){
                id = messagesOnPage[i].id;
            }
        }
        return id;
      } 
      


    return <>
        <h1>{props.name} Chatroom</h1>
        <div>
            <h4>Post a message:</h4>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormControl id = "title" value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}></FormControl>
            <FormLabel htmlFor="content">Content</FormLabel>
            <FormControl id = "content" value ={postContent} onChange={(e)=>setPostContent(e.target.value)}></FormControl>
            <Button onClick={handlePost}>Create Post</Button>
        </div>
        <hr/>
        {
            messagesOnPage.length > 0  ?
                <>
                 <Container fluid>
                    <Row>
                    {messagesOnPage.map((message) => (<Col key={message.id} xs={12} sm={8} md={6} lg={4} xl={3}>
                    <BadgerMessage
                        title={message.title}
                        poster={message.poster}
                        content={message.content}
                        created={message.created}
                        id = {getId(message)}
                        
                    />
                    </Col>
                ))}
                    </Row>
                </Container>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>        
        }
        <Pagination>
            {buildPaginator()}
        </Pagination>
        
    </>
    
}
