var Simulator = (function(){
    var stations = {};
    $(".module").each(function(){
        if($(this).find("canvas").length == 0) return;
        
        var el = $(this);
        var id = $(this).attr("id");
        var station = new Dial(el.find("canvas")[0]);
        station.change(function(value){
            el.find(".value").text(Math.round(value * 1.2));
        });
        
        setTimeout(function(){
            station.set(50);     
        },150);
            
             
        stations[id] = station;
    });
    
    return {
        Hopper:{
            outOfCans:function(){
                stations["hopper"].set(0);
            }
        }
    }
})();
