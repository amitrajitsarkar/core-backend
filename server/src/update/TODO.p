#1 . Have to implement the delete user logic in a different class. ✅
#2 . JWT auth implement will be added.
#3 . "Update" may also be implemented. 
#4 . some kind of transaction in the mongo -- plz dont but nvrmd....


topics :
JWT
user clicks "View Messages"
    ↓
Browser sends: GET /api/messages
Authorization: Bearer <expired-access-token>
    ↓
Server checks: Token valid? ❌ EXPIRED
    ↓
Server responds: 401 Unauthorized
    ↓
 BROWSER/APP AUTOMATICALLY HANDLES THIS
    ↓
JavaScript intercepts the 401 error
    ↓
Sends refresh token to server:
POST /api/refresh
Cookie: refreshToken=<-refresh-token>
    ↓
Server validates refresh token 
    ↓
Server creates NEW access token (expires 4:00 PM)
    ↓
Browser stores new access token
    ↓
Browser RETRIES original request:
GET /api/messages
Authorization: Bearer <NEW-access-token>
    ↓
Server responds: Here's  messages
    ↓
You see  messages (never knew anything happened!)
