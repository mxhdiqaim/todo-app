# How to use the API

For GraphQL request,
Hit the below URL

```
https://hasura-todo-api.hasura.app/v1/graphql
```

Now make your `query,` `mutation,` or ` subscription` request to the API URL.

# Support for REST API

The API also supports REST API requests, (`GET,` `POST,` `PUT` and `DELETE`)
To get Todos with REST API, hit the following `URL` with ``GET` request.

```
https://hasura-todo-api.hasura.app/api/rest/get-todos
```

For `POST` request

```
https://hasura-todo-api.hasura.app/api/rest/add-todo
```

For `PUT` request

```
https://hasura-todo-api.hasura.app/api/rest/update-todo
```

for `DELETE`

```
https://hasura-todo-api.hasura.app/api/rest/delete-todo/:id
```

For more info, see this [repo](https://github.com/mxhdiqaim/todo-app) in action. go straight to [this](https://github.com/mxhdiqaim/todo-app/blob/main/src/components/layouts/Todos.jsx) to this file to see how it goes.
