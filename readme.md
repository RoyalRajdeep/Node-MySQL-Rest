RESTful CRUD in Node.js and MySQL to Manage Orders on Exchange
=================================

## Configuration (database)
Replace the following variables in app.js and create a DB named 'test' or whatever you name it, and then import test.sql

        host: 'localhost',
        user: 'Your-MySQL-UserName',
        password : 'Your-MySQL-Password',
        port : 'Your-MySQL-Server-Port'
        database:'test'

## Installation
Clone or Fork the Repository and slap your keyboard to run following lines :

    cd node-mysql-rest-service

    npm install

    node app.js

## Sample API Calls

    GET Index Page
        api/index

    GET Status of All Instruments
        api/index

    GET Details of an Instrument
        api/instrument/?instrument_id=54573

    GET Details of All Instruments
        api/showAll

    GET View of Update Instrument by Query
        api/instrument-query

    PUT Update Instrument by Filllist Query
        api/instrument

