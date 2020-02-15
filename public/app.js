
$.getJSON("/articles", function(data) {
  
  for (var i = 1; i < data.length; i++) {

    var card = "<div class='card' style='width: 18rem;'>";
    var img = "<img class='card-img-top' src='"+data[i].image+"' alt= 'pic'>";
    var pSec = "<h1 data-id = '"+data[i]._id+"'>"+data[i].title+"</p>";
    var aSec = "<a href='"+ data[i].link +"' type = 'button' class='btn btn-danger'>Go to image</a> </div></div><br><br>"

    
    
    $("#articles").append(card + img + pSec + aSec);



{/* <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "h1", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    
    .then(function(data) {
      console.log(data);
      
      $("#notes").append("<h3>" + data.title + "</h3>");
     
      $("#notes").append("<input id='titleinput' name='title' >");

      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

      $("#notes").append("<button type = 'button' class = 'btn btn-danger' data-id='" + data._id + "' id='savenote'>Save Note</button>");

      
      if (data.note) {
        
        $("#titleinput").val(data.note.title);
        
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
 
      title: $("#titleinput").val(),
 
      body: $("#bodyinput").val()
    }
  })

    .then(function(data) {
    
      console.log(data);
 
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
