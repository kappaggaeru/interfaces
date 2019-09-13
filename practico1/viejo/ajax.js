// alert("hola");
$(document).ready(function(){
  $("#ajax").click(function(){
		console.log("otra vez");
    $.ajax({url: "canvas.html", success: function(result){
			$("#contenido").html(result);
    }});
  });
});