setup

git clone repo
npm install
npm run dev

enviornment varibles 
PORT
MONGO_URL
JWT_SECRET

1. Register User

URL

POST  http:localhost:3000/api/users/register

Request Body

{
"name":"Vihang",
"email":"vihang@gmail.com",
"password":"123456"
}

2. Login User

URL

POST http:localhost:3000/api/users/login

Request Body

{
"email":"vihang@gmail.com",
"password":"123456"
}

3. Create Blog

URL

POST http:localhost:3000/api/blogs/addBlogs

Headers

Authorization:TOKEN

Request Body

{
"title":"My First Blog",
"content":"This is blog content",
"tags":["node","javascript"]
}

4. Get All Blogs

URL

GET http:localhost:3000/api/blogs/getallBlogs

Query Example

?page=1&limit=10

5. Get Blog By ID

URL

GET http:localhost:3000/api/blogs/:id/getBlogById

Example

GET http:localhost:3000/api/blogs/69b165c5f5849ce143374043/getBlogById

6. Update Blog

URL

PUT http:localhost:3000/api/blogs/:id/updateBlogById

Headers

Authorization:TOKEN

Request Body

{
"title":"Updated Blog Title",
"content":"Updated content",
"tags":["node","api"]
}

7. Delete Blog

URL

DELETE http:localhost:3000/api/blogs/:id/deleteBlogById

Headers

Authorization:TOKEN
