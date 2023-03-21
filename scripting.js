/**
 * Name: Oscar Fischer
 * Class: CSC337
 * Description: This handles the scripting portion of the PA. It sends inputs to the 
 * server to store.
 */

setInterval(getMessages, 1000);

function getMessages() {
      var httpRequest = new XMLHttpRequest(); 
      if (!httpRequest) {    
        alert('Error!'); 
        return false;  
      } 
      httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState === XMLHttpRequest.DONE) { 
          if (httpRequest.status === 200) {
            let body = document.getElementById('body');
            let bodyList =  httpRequest.responseText.split('\n');
            let newBody = '';
            for (line = 0; line < bodyList.length - 1; line++) {
              let newLine = bodyList[line].split(':');
              newBody += '<span class=\'bold\'>' + newLine[0] + ': </span>';
              newBody += '<span>' + newLine[1] + '</span><br>';
            }
            newBody += '<br><br>';
            body.innerHTML = newBody;    
          } 
          else { alert('ERRROR'); }    
        }  
      } 
      let url = '/chats/';  
      httpRequest.open('GET', url);  
      httpRequest.send(); 
    
  }

function sendText() {
    var httpRequest = new XMLHttpRequest(); 
    if (!httpRequest) {    
      alert('Error!'); 
      return false;  
    } 
    httpRequest.onreadystatechange = () => { 
      if (httpRequest.readyState === XMLHttpRequest.DONE) { 
        if (httpRequest.status === 200) {} 
        else { alert('ERROR'); }    
      }  
    } 
    let d = new Date();
    let a = document.getElementById('alias').value;
    let m = document.getElementById('message').value;
    let url = '/chats/post/';
    httpRequest.open('POST', url);  
    httpRequest.send("date="+ d + "&alias=" + a + "&message=" + m); 
    document.getElementById('message').value = '';
}
