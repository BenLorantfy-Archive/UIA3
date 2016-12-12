var Station = function(el){
    
    // [ Make sure el is jquery object ]
    el = $(el);
    
    var id = el.attr("id");
    
    function fail(message){
        if(message){
            var failure = $("<div class='failure'></div>");
            failure.text(message);
            el.find(".failures").append(failure);       
        }
        el.addClass("failed");
    }
    
    if(el.find(".dialCanvas").length == 0){
//        el.find("label").text("")
        
        return {
            name:id,
            fail:function(message){
                el.find(".label").text(message);
                
                fail();
            }
        };
    }
    
    // [ Create the segments ]
    var segments = [];
    var min = el.find(".segments").data("min") * 1;
    var max = el.find(".segments").data("max") * 1;
    var size = max - min;
    el.find(".segment").each(function(){
        var color = "white";
        if($(this).hasClass("green")) color = "green";
        if($(this).hasClass("yellow")) color = "yellow";

        var segment = {
             color:color
            ,min:(($(this).data("min") * 1 == 0) ? 0 : ((($(this).data("min") - min) / size) * 360)) 
            ,max:(($(this).data("max") * 1 == 0) ? 0 : ((($(this).data("max") - min) / size) * 360))
        };

        segments.push(segment);
    })

    var dial = new Dial(el.find("canvas")[0],segments);
    dial.change(function(value){
        var text = Math.round(value/100 * size) + min;
        el.find(".value").text(text);

        if(text.toString().length >= 4){
            el.find(".value").css("font-size","70px");
            el.find(".value").css("margin-top","5%");
        }else{
            el.find(".value").css("margin-top","");
            el.find(".value").css("font-size","");
        }
    });

    setTimeout(function(){
        dial.set(50);     
    },150);
            
    
    return {
        name:id,
        dial:dial,
        set:function(value){
            dial.set(value)   
        },
        fail:fail
    }
}