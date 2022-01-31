# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the report to be sent as csv text
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
    Admin - localhost:8083
    - `/report` Generate report
   
- How to run any additional scripts or tests you may have added
- 
    ```bash
    npm test
    ```
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?

         1. Create an API Gateway

         2. Use OAuth, JWT or any other for user identity and access control

         2. Secure the service-to-service communications

            Effective practices involve authenticating and authorizing requests when two microservices are communicating.

            Generally, there are three main techniques that you can use to secure the interservice communications.

        3. Rate limit & client traffic

            Limiting the external traffic prevent issues such as denial of service (DoS) attacks as well as 
            instances where some clients consume most of the application bandwidth. One approach is to apply 
            various rules that can monitor and control the rate of traffic sent or received from a client based on the IP, time, etc.

        4. Use orchestration managers

            The orchestrations managers allow you to automate the configuration, coordination, and other microservices management 
            tasks in addition to enhancing security. Usually, the tools enable you to manage multiple containers, limit metadata access, 
            segregate workloads, collect logs, and more.
	    
	  		5 Monitor all your systems and services
            Since microservices rely on distributed systems, you need to have a reliable and effective monitoring strategy for all the individual components.
            Deploying continuous monitoring allows you to detect and address security risks in good time. Towards this, there is a wide range of microservices 
            monitoring solutions, including Prometheus, Statsd, InfluxDB, Logstash, etc.

         	6  Protect data at all times (HTTPS)
            Protect data in transit and at rest. Ideally, enforce the use of HTTPS for all communications, to secure the data in transit, and encryption for all 
            sensitive data at rest. 
            Avoid transmitting and storing plain text passwords, keys, credentials, and sensitive data that resides outside the code.
    
    
    3. How would you make this solution scale to millions of records?
    
    	1. Code quality: Code is written in a way that is efficient, useful, and maintainable over the long term.
    	2. 2.Infrastructure planning: application must have adequate server capacity and the ability to react to increased usage.
    	3. 3.High-level architecture: application components must be arranged optimally for the business case.


    5. What else would you have liked to improve given more time?
    	1. I'll containerize and run each service as a single unit and i'll be using a message broker for data broadcast.
    	2. Create an api gateway and proxy requests through an API Gateway.
    	3. Test to observe response time from each service and config service to use typescript.
    	4. Use asynchronous communication to achieve loose coupling
    	5. Add more unit and integration test for edge cases

     
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
