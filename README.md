# Fambase 1.0.0 !

Fambase is a social network founded by Victoh !

## Technologies

### Backend

- The NoSQL database for modern applications: `mongodb`
- Elegant MongoDB object modeling for node.js: `mongoose`
- GraphQLServer: `apollo-server`
- Authentication built on top of tokens: `jwt`
- Image Upload: `cloudinary`
- Easily faking data: `faker`
- Testing framework: `jest`
- Integration testing package: `apollo-server-testing`

**Most of the backend code is test covered except some resolvers and the subscription ones**

## Setup

- Make sure you have mongodb installed
- create from `.env.example` a `.env` file and fill in the example values with your actual values ( `you need to have a cloudinary account` )

```sh
npm install && npm start
```
