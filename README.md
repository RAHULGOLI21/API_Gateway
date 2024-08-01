FRONTEND - MIDDLE_END - BACKEND

=> We need a intermediate layer between client Side and Microservices
=> Using this middle end when client send requests, we will be able to make decision that which microservice       should  actually need to respond to this request.
=> We can do message Validation, response transformation and rate limitting.
=> We try to prepare an API Gateway that acts as a middle end.

// Example of a situation where we need a API Gateway
# Suppose we have a lot of requests that are bombarded from a IP then, it is not the task of the microservice to apply RATE_LIMITTING. The microservice has its own task which it is intented for. So it is best to have a API_Gateway to service as a middleEnd between Frontend and Backend.

# LoadBalancer task isto just re-route the incoming request to the application server. So eventually LoadBalancer will not have all this rateLimitting logic. So it just re-route the request to corresponding API_Gateways.

