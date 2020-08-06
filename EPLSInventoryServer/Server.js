//+++++++++++++++++++++++++++++++++TODO:
    //
//=================================Documentation:

// Enable Express

var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var app = express();
var path = require("path");
var mysql = require('mysql');
var sharp = require('sharp');

app.use(express.static('files'));
//app.use('/', express.static(path.join(__dirname, 'files')))
app.use(bodyParser.urlencoded({ extended: false, limit:'50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

// date manipulation
var moment = require('moment');
// random numbers
var uuid = require('node-uuid');
// file/buffer handeling
var fs = require('fs');

// Links mySQL database to the Node server
var db = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'pass', 
    database: 'inventory'
    //port: 3000;
});

// Used for automated ip grabbing. May fail if used on certain virtual machines.
var ip = require('ip');

//start server
var server = require('http').createServer(app);

// Displays the server location for saving images and paths to database.
var serverLoc = "Check ServerLoc.txt";

server.listen(3006, function(){
    console.log("listening on *:3006");
    try {
        
        // unhide if you'd like auto ip grabbing. 
        /*serverLoc = "http://"+ip.address()+":3005";
        console.log(serverLoc);*/
        
        // used to determine IP for server. 
        var data = fs.readFileSync('ServerLoc.txt', 'utf8');
        console.log(data.toString());
        serverLoc = data;
        console.log("ServerLoc = "+serverLoc);
        
    } catch(e) {
        console.log('Error:', e.stack);
    }
});

//connections
/*app.post('/AccessUrlName/', function (req,res) {
    
});*/

app.get('/', function(req, res){
        res.sendFile(__dirname + '/files/EPLSInventorySite/index.html');
});

app.post('/test', function (req,res) {
    var a = req.body;
    console.log("test: " + JSON.stringify(a));
    
    res.send(JSON.stringify("Recieved"));  
});

app.post('/inv', function (req,res) {
    var a = req.body;
    console.log("Location: " + JSON.stringify(a));
    console.log("Sending Req");
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /inv function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        
        var ReqVar = [a.location, a.type];
                var jusT = [a.type];
        
        if(a.type == "All" && a.location == "All"){
            connection.query("SELECT * FROM inventory.item", ReqVar, function(err, rows){
                console.log("All");
                if(!err) {
                    //callback(true);
                    //console.log(rows);
                    res.send(JSON.stringify(rows)); 
                } else {
                    console.log(err);
                    res.send(JSON.stringify("a"));
                }
            });
        } else if(a.type == "All"){
            connection.query("SELECT * FROM inventory.item WHERE v_location = ?", ReqVar, function(err, rows){
                console.log("all types");
                if(!err) {
                    //callback(true);
                    //console.log(rows);
                    res.send(JSON.stringify(rows)); 
                } else {
                    console.log(err);
                    res.send(JSON.stringify("a"));
                }
            });
        } else if(a.location == "All"){
            connection.query("SELECT * FROM inventory.item WHERE v_type = ?", jusT, function(err, rows){
                console.log("all locations");
                if(!err) {
                    //callback(true);
                    //console.log(rows);
                    res.send(JSON.stringify(rows)); 
                } else {
                    console.log(err);
                    res.send(JSON.stringify("a"));
                }
            });
        } else {
            connection.query("SELECT * FROM inventory.item WHERE v_location = ? AND v_type = ?", ReqVar, function(err, rows){
                console.log("specefic location and type");
                if(!err) {
                    //callback(true);
                    //console.log(rows);
                    res.send(JSON.stringify(rows)); 
                } else {
                    console.log(err);
                    res.send(JSON.stringify("a"));
                }
            });
        }    
        
        connection.on('error', function(err) {
            console.log("Select issue found in /inv");
            //callback(false);
            return;
        });
        
        
        connection.release();
        });
  
});


app.post('/ite', function (req,res) {
    var a = req.body;
    console.log("item: " + JSON.stringify(a));
    console.log("geting item");
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /ite function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        
        var ReqVar = [a.barcode];
        console.log(a.barcode);
        connection.query("SELECT * FROM inventory.item WHERE v_barcode = ?", ReqVar, function(err, rows){
                console.log("getting item from database");
                if(!err) {
                    //callback(true);
                    console.log("rows returned: "+JSON.stringify(rows[0]));
                    res.send(JSON.stringify(rows[0])); 
                } else {
                    console.log(err);
                    res.send(JSON.stringify("a"));
                }
            });
        
        connection.on('error', function(err) {
            console.log("Select issue found in /ite");
            //callback(false);
            return;
        });
        
        
        connection.release();
    }); 
});

app.get('/getServer', function(req, res){
   res.send(serverLoc); 
});

app.post('/save', function (req,res) {
    var a = req.body;
    //console.log("Saving: " + JSON.stringify(a));
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /save function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        // "/assets/img/uploads/"+a.barcode+".jpg",
        var bar = [a.barcode]
        var ReqVar = [ a.location, a.barcode, a.type, a.descript, a.make, a.model];
        
        connection.query("SELECT * FROM inventory.item WHERE v_barcode = ?", bar, function(err, rows){
            console.log("checking if barcode exists");
            if(!err) {
                console.log(rows.length);
                if(rows.length == 0){
                    connection.query("INSERT INTO `inventory`.`item` (`v_location`, `v_barcode`, `v_type`, `v_descript`, `v_make`, `v_model`) VALUES (?, ?, ?, ?, ?, ?)", ReqVar, function(err, rows2){
                        console.log("Saving item");
                        if(!err) {
                            //callback(true);
                            console.log("Complete, "+JSON.stringify(rows2.insertId));
                             var buffered = new Buffer(a.img, 'base64');
                        sharp(buffered).withMetadata().resize({width: 750, height: 750}).jpeg().toBuffer()
                        .then(data => {
                            console.log(data);
                            var newBuff = data;
                            fs.writeFile("files/assets/img/uploads/"+rows2.insertId+".jpg", data, 'base64', function(err) {
                                console.log(err);
                            });
                            
                        })
                            res.send(JSON.stringify("a"));
                        } else {
                            console.log("=============Error===============");
                            console.log(err);
                            console.log("=================================");
                            res.send(JSON.stringify("b"));
                        }
                    });
                } else {
                    console.log("barcode exists");
                    res.send(JSON.stringify("d"));
                }
            } else {
                console.log(err);
                res.send(JSON.stringify("c"));
            }
        });
        
        connection.on('error', function(err) {
            console.log("insert issue found");
            //callback(false);
            return;
        });
        
        
        connection.release();
    });
    
    
    //res.send(JSON.stringify("a"));  
});

app.post('/update', function (req,res) {
    var a = req.body;
    console.log("Saving: " + JSON.stringify(a));
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /save function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        
        var bar = [a.barcode]
        var ReqVar = [a.location, a.barcode, a.type, a.descript, a.make, a.model, a.id, "/assets/img/uploads/"+a.barcode+".png"];
        
        connection.query("SELECT * FROM inventory.item WHERE v_barcode = ?", bar, function(err, rows){
            console.log("checking if barcode exists");
            if(!err) {
                console.log(rows.length);
                if(rows.length != 0){
                    if(a.img == "unchanged"){
                        connection.query("UPDATE `inventory`.`item` SET `v_location` = ?, `v_barcode` = ?, `v_type` = ?, `v_descript` = ?, `v_make` = ?, `v_model` = ? WHERE v_idItem = ?", ReqVar, function(err, rows){
                            console.log("Updating item");
                            if(!err) {
                                //callback(true);
                                //callback(true);
                                console.log("Complete No image");
                                res.send(JSON.stringify("a"));
                            } else {
                                console.log("=============Error===============");
                                console.log(err);
                                console.log("=================================");
                                res.send(JSON.stringify("b"));
                            }
                        });
                    } else {
                        connection.query("UPDATE `inventory`.`item` SET `v_location` = ?, `v_barcode` = ?, `v_type` = ?, `v_descript` = ?, `v_make` = ?, `v_model` = ?, `v_image` = ? WHERE v_idItem = ?", ReqVar, function(err, rows){
                            console.log("Updating item");
                            if(!err) {
                                //callback(true);
                                console.log("Complete, Image");
                                var buffered = new Buffer(a.img, 'base64');
                                sharp(buffered).withMetadata().resize({width: 750, height: 750}).jpeg().toBuffer()
                                .then(data => {
                                    console.log(data);
                                    var newBuff = data;
                                    fs.writeFile("files/assets/img/uploads/"+a.barcode+".jpg", data, 'base64', function(err) {
                                        console.log(err);
                                    });

                                })
                                /*fs.writeFile("files/assets/img/uploads/"+a.barcode+".jpg", a.img, 'base64', function(err) {
                                    console.log(err);
                                });*/
                                res.send(JSON.stringify("a"));
                            } else {
                                console.log("=============Error===============");
                                console.log(err);
                                console.log("=================================");
                                res.send(JSON.stringify("b"));
                            }
                        });
                    }
                } else {
                    console.log("barcode does not exists");
                    res.send(JSON.stringify("d"));
                }
            } else {
                console.log(err);
                res.send(JSON.stringify("c"));
            }
        });
        
        connection.on('error', function(err) {
            console.log("insert issue found");
            //callback(false);
            return;
        });
        
        
        connection.release();
    });
    
    
    //res.send(JSON.stringify("a"));  
});


app.post('/comment', function (req,res) {
    var a = req.body;
    console.log("Saving comment: " + JSON.stringify(a));
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /comment function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        var ReqVar = [a.com, a.ite];
        
        connection.query("INSERT INTO `inventory`.`comments` (`v_comment`, `v_item`, `v_date`) VALUES (?, ?, NOW())", ReqVar, function(err, rows){
            console.log("Saving comment");
            if(!err) {
                //callback(true);
                console.log("success");
                res.send(JSON.stringify("a"));
            }else{
                console.log("failed");
                res.send(JSON.stringify("b"));
            }
        });
        
        connection.on('error', function(err) {
            console.log("insert issue found");
            //callback(false);
            return;
        });
        
        
        connection.release();
    });
    
    
});

app.post('/getComment', function (req,res) {
    var a = req.body;
    console.log("Saving comment: " + JSON.stringify(a));
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /comment function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        var ReqVar = [a.item];
        
        connection.query("SELECT * FROM inventory.comments WHERE v_item = ?", ReqVar, function(err, rows){
            console.log("loading comments");
            if(!err) {
                //callback(true);
                console.log("success");
                res.send(JSON.stringify(rows));
            }else{
                console.log("failed");
                res.send(JSON.stringify("b"));
            }
        });
        
        connection.on('error', function(err) {
            console.log("insert issue found");
            //callback(false);
            return;
        });
        
        
        connection.release();
    });
    
    
});

app.post('/updCom', function (req, res) {
    var a = req.body;
    console.log("Saving comment: " + JSON.stringify(a));
    
    db.getConnection(function(err, connection){
        if(err){
            console.log('there was an issue in the /updCom function');
            connection.release();
            //callback(false);
            return;
        }
        console.log("connected");
        
        // ReqVar sanitizes inputs to prevent SQL injection.
        var ReqVar = [a.item.v_comment, a.item.v_id];
        
        connection.query("UPDATE `inventory`.`comments` SET `v_comment` = ? WHERE v_id = ?", ReqVar, function(err){
            console.log("saving updated comment");
            if(!err) {
                //callback(true);
                console.log("success");
                res.send(JSON.stringify("a"));
            }else{
                console.log("failed");
                res.send(JSON.stringify("b"));
            }
        });
        
        connection.on('error', function(err) {
            console.log("update issue found");
            //callback(false);
            return;
        });
        
        
        connection.release();
    });       
});

