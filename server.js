/** Name: Oscar Fischer
 *  Course: CSC337
 *  Description: This is the server-side code for PA8, which is a basic translating
 *  service by parsing the URL path into three different segments.
 *  It obviously is not perfect, but it does its job. 
 */

const express = require('express');
const app = express();
const parser = require('body-parser');
const mongoose = require('mongoose');
const connectionString= 'mongodb+srv://ozfischer19:my157DEVpqlcot@cluster0.3b3pexm.mongodb.net/chat'

mongoose.connect(connectionString, {useNewUrlParser: true});
mongoose.connection.on('error', ()=>{
    console.log('Cannot connect to mongoose');
});

app.use(parser.text({type: '*/*'}));
app.use(express.static('public_html'))

const port = 80;
app.listen(port, ()=> {
    console.log('server is running!')
})

const Schema = mongoose.Schema;
const ChatMessageSchema = new Schema({
  time: String,
  name: String,
  chatMessage: String
});
const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

app.get('/chats/', (req, res)=>{
    let p1 = ChatMessage.find({}).exec();
    p1.then((results)=>{
        let newString = '';
        for (i in results){
            newString += results[i].name +': '+results[i].chatMessage+'\n';
        }
        res.send(newString);
    });
});

app.post('/chats/post/', (req, res)=>{
    let text =(req.body).split('&');
    let date = text[0].split('=');
    let alias = text[1].split('=');
    let message = text[2].split('=');
    var chat = new ChatMessage({
        time: date[1],
        name: alias[1],
        chatMessage: message[1]
    });
    let p1 = chat.save();
    p1.catch((err)=> {console.log(err)});
    res.end();
});