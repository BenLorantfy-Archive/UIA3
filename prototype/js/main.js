var Simulator = (function(){
    var stations = {};
    $(".module").each(function(){
        var station = new Station(this);
        
        // [ Add the specific fail conditions ]
        if(station.name == "hopper"){
            station.dial.change(function(value){
                if(value == 0){
                    station.fail("No Cans");
                }
            })
        }
        
             
        stations[station.name] = station;
    });
    
    return {
        Hopper:{
            outOfCans:function(){
                stations["hopper"].set(0);
            }
        }
        ,FillHead:{
            clog:function(){
                console.log(stations);
                stations["fillHead"].fail("Clogged");
            }
        }
    }
})();
