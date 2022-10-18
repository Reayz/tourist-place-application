A tourist place application with React, ASP.NET Core API and gRPC service
---
This project is combined with 3 individual projects:

1. touristplacereactapp
2. TouristPlaceAPI
3. APIGrpcService

Here is the details: 
* First one is a ReactJS application. This is for rendaring fontend UI with data provided by the API. This ReactJS project is designed with Class component. Here State is globally managed by Redux. And used React Router Dom for different page navigation.
* Second one is a ASP.NET Core 6.0 API project. It is for provide backend data to ReactJS application. For getting data from database it use gRPC service(a separate project - third one) and get data as Protocol Buffers.
* Third one is a gRPC service application. It is for interact with database with Entrity Framework and provide data to API as Protocol Buffers.
