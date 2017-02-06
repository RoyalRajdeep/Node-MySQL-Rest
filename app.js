var express             = require('express'),
    path                = require('path'),
    bodyParser          = require('body-parser'),
    app                 = express();

/* EJS as template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* MySQL DB Connectivity*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port : 8889,
        database : 'test'
    },'request')
);

app.get('/',function(req,res){
    res.send('Welcome to Quantinsti');
});


// REST API Route Handlers
var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


// GET Index
router.route('/index').get(function(req,res,next){
    req.getConnection(function(err,conn){
        if (err) return next("Can't Connect");
        var query = conn.query('SELECT * FROM instruments',function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.render('index',{title:"Quantinsti | Home Page",data:rows});
        });
    });
});

// Get a Single Instrument from Query Parameters
router.route('/instrument').get(function(req,res,next){
    var instrument_id = req.query.instrument_id;
    req.getConnection(function(err,conn){
        if (err) return next("Cannot Connect");
        var query = conn.query("SELECT * FROM instruments WHERE instrument_id = ? ",[instrument_id],function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            //if instrument not found
            if(rows.length < 1)
                return res.send("Instrument Not found");
            res.render('instrument-single',{title:"Instrument Details | Quantinsti",data:rows});
        });
    });
});

// Get a Single Instrument
router.route('/instrument/:instrument_id').get(function(req,res,next){
    var instrument_id = req.params.instrument_id;
    req.getConnection(function(err,conn){
        if (err) return next("Cannot Connect");
        var query = conn.query("SELECT * FROM instruments WHERE instrument_id = ? ",[instrument_id],function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            //if instrument not found
            if(rows.length < 1)
                return res.send("Instrument Not found");
            res.render('instrument-single',{title:"Instrument Details | Quantinsti",data:rows});
        });
    });
});

// GET All Instruments
router.route('/showAll').get(function(req,res,next){
    req.getConnection(function(err,conn){
        if (err) return next("Can't Connect");
        var query = conn.query('SELECT * FROM instruments',function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.render('instrument-all',{title:"All Instruments | Quantinsti",data:rows});
        });
    });
});


// Instrument Update View
router.route('/instrument-query').get(function(req,res,next){
    req.getConnection(function(err,conn){
        if (err) return next("Can't Connect");
        res.render('instrument-update',{title:"Execute Query | Quantinsti"});
    });
});

// PUT for Execute Query and Instrument Update
router.route('/instrument').put(function(req,res,next){

    var instrument_id = req.body.instrument_id;
    var position = req.body.size;

    if(instrument_id == undefined || position == undefined){
        return next("Invalid Arguments");
    }

    if(req.body.side == 2) {
        position = -(req.body.size);
    }

    var data = {
        instrument_id : instrument_id,
        position : position
    };

    req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");
        var query = conn.query("UPDATE instruments set position= position + ? WHERE instrument_id = ? ",[position,instrument_id], function(err, rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.sendStatus(200);
        });
    });
});

app.use('/api', router);

var server = app.listen(3000,function(){
   console.log("Listening to port %s",server.address().port);
});
