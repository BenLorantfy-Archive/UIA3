var Simulator = (function(){
    var failures = 0;
    
    function addFailureToLine(){
        $("#statusBanner").addClass("fail");
        failures++;
    }
    
    function removeFailureFromLine(){
        failures--;
        
        if(failures == 0){
            $("#statusBanner").removeClass("fail");
        }
    }
    
    var stations = {};
    $(".module").each(function(){
        var station = new Station(this);    
        stations[station.name] = station;
    });
    
    // [ Empty Conditions ]
    stations["hopper"].dial.change(function(value){
        if(value == 0){
            stations["hopper"].fail("No Cans");
            addFailureToLine();
        }
    })
    
    stations["fillHead"].dial.change(function(value){
        if(value == 0){
            stations["fillHead"].fail("No Paint");
            addFailureToLine();
        }
    })
    
    stations["sealer"].dial.change(function(value){
        if(value == 0){
            stations["sealer"].fail("No Lids");
            addFailureToLine();
        }
    })
    
    stations["casePacker"].dial.change(function(value){
        if(value == 0){
            stations["casePacker"].fail("No Cartons");
            addFailureToLine();
        }
    })
    
    return {
        Hopper:{
            empty:function(){
                stations["hopper"].set(0);
            }
        }
        ,FillHead:{
            clog:function(){
                console.log(stations);
                stations["fillHead"].fail("Clogged");
                addFailureToLine();
            }
            ,empty:function(){
                stations["fillHead"].set(0);
            }
        }
        ,WeighStation:{}
        ,Sealer:{
            empty:function(){
                stations["sealer"].set(0);
            }
        }
        ,Labeler:{
            empty:function(){
                stations["labeler"].fail("No Labels");
                addFailureToLine();
            }
        }
        ,CasePacker:{
            empty:function(){
                stations["casePacker"].set(0);
            }   
            ,jam:function(){
                stations["casePacker"].fail("Jam");
                addFailureToLine();
            }
            ,palletMissing:function(){
                stations["casePacker"].fail("Missing Pallet");
                addFailureToLine();
            }
        }
    }
})();
