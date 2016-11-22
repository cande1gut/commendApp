//al recibir un socket siempre va a afuera de un click
$( document ).ready(function() {
  var socket = io();

  $('.modal-trigger').leanModal();

  var text = "Cultural";
  var trigger;
  var div;
  var options;
  var options2 = [];
  var categoria = "Cultural";
  var escuela = "Tec GDA";
  var opcion3 = "Artist";
  var opcion4 = "Performance Art";
  var opcion5 = "Art";
  var opcion6 = "Literary Editor";
  var counter = 5;
  var opc5 = false;
  var opc6 = false;
  var labelC;

  socket.emit('pr', {pr: "Cultural"});

  socket.emit('catQ', {catQ: text});

  socket.on('catR', function(catRm) {
    options = catRm.catR;
  });

  socket.on('depR', function(depRm) {
    options = depRm.depR;
  });

  socket.on('intR', function(intRm) {
    options = intRm.intR;
  });

  socket.on('entR', function(entRm) {
    options = entRm.entR;
  });

  socket.on('commendR', function(commendRm) {
    var commL = commendRm.commendR;
    labelC = commL[0].label;
    $(".title").html(commL[0].label);

    socket.emit('commendF', {cat: categoria, label: labelC});
    socket.emit('commendM', {cat: categoria, label: labelC});
    socket.emit('commendV', {cat: categoria, label: labelC});

    socket.on('commendFR', function(commendFRm) {
      var commF = commendFRm.commendFR;
      $("#comida1").html(commF[0][1].label);
      $("#comida2").html(commF[1][1].label);
      $("#comida3").html(commF[2][1].label);
    });

    socket.on('commendMR', function(commendMRm) {
      var commM = commendMRm.commendMR;
      $("#musica1").html(commM[0][1].label);
      $("#musica2").html(commM[1][1].label);
      $("#musica3").html(commM[2][1].label);
    });

    socket.on('commendVR', function(commendVRm) {
      var commV = commendVRm.commendVR;
      $("#lugar1").html(commV[0][1].label);
      $("#lugar2").html(commV[1][1].label);
      $("#lugar3").html(commV[2][1].label);
    });
  });

  $('.dropdown-b').click(function(e){
    e.preventDefault();
    trigger = $(this).closest('div').attr('id');
    div = $("#"+trigger);

    $("#dropUl li").remove();

    if(trigger == 'trigger1')
    {
      $("#dropUl").append("<li><a>Cultural</a></li>");
      $("#dropUl").append("<li><a>Sport</a></li>");
      $("#dropUl").append("<li><a>Interest</a></li>");
      $("#dropUl").append("<li><a>Entertainment</a></li>");
    }
    else if(trigger == 'trigger2')
    {
      $("#dropUl").append("<li><a>Tec GDL</a></li>");
      $("#dropUl").append("<li><a>Tec Monterrey</a></li>");
    }
    else if(trigger == 'trigger3')
    {
      for(i=0;i<options.length;i++)
      {
        $("#dropUl").append("<li><a>"+options[i][1]+"</a></li>");
      }
    }
    else if(trigger == 'trigger4')
    {
      for(i=0;i<options.length;i++)
      {
        $("#dropUl").append("<li><a>"+options[i][1]+"</a></li>");
      }
    }
    else if(trigger == 'trigger5')
    {
      for(i=0;i<options.length;i++)
      {
        $("#dropUl").append("<li><a>"+options[i][1]+"</a></li>");
      }
    }
    else if(trigger == 'trigger6')
    {
      for(i=0;i<options.length;i++)
      {
        $("#dropUl").append("<li><a>"+options[i][1]+"</a></li>");
      }
    }

    $("#dropUl li").click(function(){
      text = $(this).text();

      if(text == "Cultural")
      {
        $("#tag3").text("Artist");
        $("#tag4").text("Performance Art");
        $("#tag5").text("Art");
        $("#tag6").text("Literary Editor");
        opcion3 = "Artist";
        opcion4 = "Performance Art";
        opcion5 = "Art";
        opcion6 = "Literary Editor";
        socket.emit('catQ', {catQ: text});
        socket.emit('pr', {pr: "Cultural"});
      }
      else if(text == "Sport")
      {
        $("#tag3").text("Athlete");
        $("#tag4").text("Amateur Sports Team");
        $("#tag5").text("Sports League");
        $("#tag6").text("Sport");
        opcion3 = "Athlete";
        opcion4 = "Amateur Sports Team";
        opcion5 = "Sports League";
        opcion6 = "Sport";
        socket.emit('depQ', {depQ: "Deportes"});
        socket.emit('pr', {pr: "Deportes"});
      }
      else if(text == "Interest")
      {
        $("#tag3").text("Education");
        $("#tag4").text("Public Figure");
        $("#tag5").text("Company");
        $("#tag6").text("Book");
        opcion3 = "Education";
        opcion4 = "Public Figure";
        opcion5 = "Company";
        opcion6 = "Book";
        socket.emit('intQ', {intQ: "Interes"});
        socket.emit('pr', {pr: "Interes"});
      }
      else if(text == "Entertainment")
      {
        $("#tag3").text("Magazine");
        $("#tag4").text("Landmark");
        $("#tag5").text("Festival");
        $("#tag6").text("Bar");
        opcion3 = "Magazine";
        opcion4 = "Landmark";
        opcion5 = "Festival";
        opcion6 = "Bar";
        socket.emit('entQ', {entQ: "Entretenimiento"});
        socket.emit('pr', {pr: "Entretenimiento"});
      }

      if(trigger == "trigger1")
      {
        categoria = text;
      }
      else if(trigger == "trigger2")
      {
        escuela = text;
        socket.emit('escuela', {esc: escuela});
      }
      else if(trigger == "trigger3")
      {
        opcion3 = text;
      }
      else if(trigger == "trigger4")
      {
        opcion4 = text;
      }
      else if(trigger == "trigger5")
      {
        opcion5 = text;
      }
      else if(trigger == "trigger6")
      {
        opcion6 = text;
      }

      $("#" + trigger + ' a').text(text);
      $("#fader").fadeOut();
      $(".dropdown-c").removeClass("zoomIn");
      $(".dropdown-c").addClass("zoomOut").fadeOut("fast");
    });

    $(".dropdown-c").removeClass("zoomOut");
    $(".dropdown-c").addClass("zoomIn").fadeIn("fast");

    var offset = div.offset();
    var width = div.width();
    var height = div.height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    var selectWidth = $(".dropdown-c").width()/2;
    var selectHeight = $(".dropdown-c").height()/2;

    $("#fader").fadeIn();
    $('.dropdown-c').fadeIn().css({
      'left' : centerX-selectWidth,
      'top' : centerY-selectHeight
    });
  });

  $('#fader').click(function(e){
    e.preventDefault();
    $("#fader").fadeOut();
    $(".dropdown-c").removeClass("zoomIn");
    $(".dropdown-c").addClass("zoomOut").fadeOut("fast");
  });

  $("#calculate").click(function(){
    $("#menu").trigger("click");
    $("#openM").fadeIn();

    options2.push('"'+opcion3+'"');
    options2.push('"'+opcion4+'"');

    if(opcion5 != "" && opc5)
    {
      options2.push('"'+opcion5+'"');
    }
    if(opcion6 != "" && opc6)
    {
      options2.push('"'+opcion6+'"');
    }

    if(categoria == "Sport")
    {
      categoria = "Deportes";
    }
    else if(categoria == "Interest")
    {
      categoria = "Interes";
    }
    else if(categoria == "Entertainment")
    {
      categoria = "Entretenimiento";
    }
    socket.emit('commend', {cat: categoria, array: options2});

    options2 = [];
  });

  $("#trigger5, #trigger6").hide();
  $("#comma5, #comma6").hide();

  $("#add").click(function(){
    if(counter == 5)
    {
      $("#comma5").fadeIn();
      $("#trigger5").fadeIn();
      opc5 = true;
    }
    else if(counter == 6)
    {
      $("#comma6").fadeIn();
      $("#trigger6").fadeIn();
      opc6 = true;
    }
    else
    {
      alert("You are already using all available variables");
    }
    counter++;
  });

  $("#erase").click(function(){
    options2 = [];
    opc5 = false;
    opc6 = false;
    $("#menu").trigger("click");

    if(counter > 5)
    {
      $("#comma5").fadeOut();
      $("#trigger5").fadeOut();
      $("#comma6").fadeOut();
      $("#trigger6").fadeOut();
      counter = 5;
    }
    else
    {
      alert("You can't erase your initial variables");
    }
  });

});
