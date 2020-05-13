$(function(){
    
    //declare variables
        
        //paintingerasing or not
        var paint=false;//1
     
        //painting or erasing
        var paint_erase = "paint";

        //get the canvas and context
        var canvas = document.getElementById("paint");
        //using method get context which is going to return  a drawing context or canvas
        var ctx = canvas.getContext("2d");
        //get the canvas conatainer
        var container = $("#container");
        //mouse position
        var mouse={x:0,y:0};
    
     //onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);   
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    
    //set drawing parameters(linewidth,linejoin,linecap)

    ctx.lineJoin="round";
    ctx.lineCap="round";
    
    //click inside container
    container.mousedown(function(e){
        paint="true";
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);        
    });
    //move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x=e.pageX-this.offsetLeft;
        mouse.y=e.pageY-this.offsetTop;
        if(paint=="true"){
            if(paint_erase=="paint"){
                //get color input
                ctx.strokeStyle = $("#paintcolor").val();
            }
            else{
                //white color
                ctx.strokeStyle="white";
            }
        ctx.lineTo(mouse.x,mouse.y);
        ctx.stroke();//visiblity
        }
    });
    //mouse up->we are not paintingerasing anymore
        container.mouseup(function(){
            paint="false";
        })
    //if we leave the container we are not painting erasing anymore
        
    //click on the reset button
         $("#reset").click(function(){
                ctx.clearRect(0,0,canvas.width,canvas.height);
             paint_erase="paint";
             $("#erase").removeClass("erasemode");
              });
    //click on save button
  $("#save").click(function(){
        if(typeof(localStorage) != null){
              localStorage.setItem("imgCanvas", canvas.toDataURL()); 
        }else{
            window.alert("Your browser does not support local storage!");   
        }
    });
    
    //click on erase button
    $("#erase").click(function(){
            if(paint_erase=="paint"){
                paint_erase="erase";
            }
            else{
                paint_erase="paint";
            }
            $(this).toggleClass("erasemode");
        });
    
    //change color input
    $("#paintcolor").change(function(){
       $("#circle").css("background-color",$(this).val()); 
    });
    
    //change line width using slider
    $("#slider").slider({
        min:3,
        max:30,
        slide: function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth=ui.value;
        }
    });
    //functions
    
});