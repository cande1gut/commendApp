var neo4j = require('node-neo4j');
db = new neo4j("http://commend-candelariogtz209002.codeanyapp.com:8080");
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var nodemailer = require("nodemailer");
initWebServer();

//label,id,post_activity,fan_count,link,talking_about_count,attributes/users_can_post,attributes/category,color,size,attributes/username
/*USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/cande1gut/data/master/nodes.csv' AS row CREATE (page:Page {idP:toInt(row.id), label:row.label, timeSet:row.timeset, fanCount:toInt(row.fan_count), category:row.category, username:row.username, usersCanPost:row.users_can_post, link:row.link, postActivity:toFloat(row.post_activity), talkingAboutCount:toInt(row.talking_about_count)})*/
/*USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/cande1gut/data/master/edges.csv' AS row MATCH (f:Page {idP: toInt(row.Source)}), (t:Page {idP:toInt(row.Target)}) CREATE (f)-[:RELATED]->(t)*/


function initWebServer(){

  var app = connect().use(serveStatic(__dirname));
  var server = http.createServer(app);
  var io = require('socket.io').listen(server);

  io.on('connection', function(socket){

    socket.on('catQ', function(catm) {
      db.cypherQuery("MATCH (n:" + catm.catQ + ") WHERE EXISTS(n.category) RETURN DISTINCT 'node' as element, n.category AS category LIMIT 25 UNION ALL MATCH ()-[r]-() WHERE EXISTS(r.category) RETURN DISTINCT 'relationship' AS element, r.category AS category", function(err, result){
        if(err) throw err;

        socket.emit('catR', {catR: result.data});
      });
    });

    socket.on('depQ', function(depm) {
      db.cypherQuery("MATCH (n:" + depm.depQ + ") WHERE EXISTS(n.category) RETURN DISTINCT 'node' as element, n.category AS category LIMIT 25 UNION ALL MATCH ()-[r]-() WHERE EXISTS(r.category) RETURN DISTINCT 'relationship' AS element, r.category AS category", function(err, result){
        if(err) throw err;

        socket.emit('depR', {depR: result.data});
      });
    });

    socket.on('intQ', function(intm) {
      db.cypherQuery("MATCH (n:" + intm.intQ + ") WHERE EXISTS(n.category) RETURN DISTINCT 'node' as element, n.category AS category LIMIT 25 UNION ALL MATCH ()-[r]-() WHERE EXISTS(r.category) RETURN DISTINCT 'relationship' AS element, r.category AS category", function(err, result){
        if(err) throw err;

        socket.emit('intR', {intR: result.data});
      });
    });

    socket.on('entQ', function(entm) {
      db.cypherQuery("MATCH (n:" + entm.entQ + ") WHERE EXISTS(n.category) RETURN DISTINCT 'node' as element, n.category AS category LIMIT 25 UNION ALL MATCH ()-[r]-() WHERE EXISTS(r.category) RETURN DISTINCT 'relationship' AS element, r.category AS category", function(err, result){
        if(err) throw err;

        socket.emit('entR', {entR: result.data});
      });
    });

    socket.on('commend', function(commendm) {
      db.cypherQuery('Match(n:'+commendm.cat+') Where n.category IN ['+ commendm.array + '] WITH n ORDER BY n.pagerankInterno LIMIT 1 return n', function(err, result){
        if(err) throw err;
        var resultL;

        socket.emit('commendR', {commendR: result.data});
      });
    });

    socket.on('commendF', function(commF) {
      db.cypherQuery('MATCH (a:'+commF.cat+'),(b:Food), p = shortestPath((a)-[*..15]-(b)) WHERE a.label = '+'"'+commF.label+'"'+' RETURN nodes(p)[0], nodes(p)[length(nodes(p))-1], length(nodes(p)) as hops ORDER BY hops Asc', function(err, result){
        if(err) throw err;

        socket.emit('commendFR', {commendFR: result.data});
      });
    });

    socket.on('commendM', function(commM) {
      db.cypherQuery('MATCH (a:'+commM.cat+'),(b:Music), p = shortestPath((a)-[*..15]-(b)) WHERE a.label = '+'"'+commM.label+'"'+' RETURN nodes(p)[0], nodes(p)[length(nodes(p))-1], length(nodes(p)) as hops ORDER BY hops Asc', function(err, result){
        if(err) throw err;

        socket.emit('commendMR', {commendMR: result.data});
      });
    });

    socket.on('commendV', function(commV) {
      db.cypherQuery('MATCH (a:'+commV.cat+'),(b:Venues), p = shortestPath((a)-[*..15]-(b)) WHERE a.label = '+'"'+commV.label+'"'+' RETURN nodes(p)[0], nodes(p)[length(nodes(p))-1], length(nodes(p)) as hops ORDER BY hops Asc', function(err, result){
        if(err) throw err;

        socket.emit('commendVR', {commendVR: result.data});
      });
    });

  });

  server.listen(9000, function() {
      console.log('Server started...');
  });

};
