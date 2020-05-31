$(document).ready(function(){
    var count = 0;
    var empname = "";
    var seat = "";
    var empDetails =""
    $('#randomize').on("click",function(){
        var str = "";
        str =   '<a id="close">+</a>'+
                '<div id="dynsearch">'+
                '<div class="input-group"><input type="text" id="userInput" class="form-control" name="name"></div>'+
                '<div id="search_results">'+
                '<p>Department: </p>'+
                '<p>Team:</p></div>'+
                '<div id="submit"><button class="btn-success">Reserve</button></div>'
        $('#randomize-bg-modal').css("display","flex");
        $('#randomize-content').html(str);
        close();
        click_result();
    })
    function click_result(){
        var tempStr =""
        $("body").on("click",".result",function(){
            $("#userInput").val($(this).text());
            $("#search_results").empty();
            empname = $(this).text();
            var promise = new Promise(function(resolve,reject){
                randomize();
                setTimeout(function(){resolve()},100);
            });
            promise.then(function(){
                tempStr = `<p>Department: Hospitality</p>`+
                `<p>Team: ${empDetails.team}</p>`;
                $("#search_results").html(tempStr);
            });
    
           
            
        })
        
    }
    $('#randomize-content').on("keyup",'#userInput',function(){
        if(this.value.length === 0)
        $("#search-results").empty();
        if(this.value.length > 2)
        ajaxGet(this.value);
    });
    function close(){
        $("#randomize-bg-modal").on("click","#close",function(){
            $("#randomize-bg-modal").css("display","none");
            $("#randomize-content").empty();
            location.assign("/");
        })
    }

    function randomize(){
        var team = ""
        $.get(`/ajax/get/${empname}`,function(employees,status,xhr){
            empDetails = employees[0];
            team = employees[0].team;
            $.get(`/ajax/seat/team/${team}`,function(seats,status,xhr){
                seat = seats[(Math.floor(Math.random()*seats.length))].seat;
                success(empname,seat);
            })
        })
    }


    // function randomizeGet(userInput){
    //     $.ajax({
    //         type: "GET",
    //         url: "ajax/get/"+userInput,
    //         success: function(result){
    //             $("#randomize-results").empty();
    //             var str = ""
    //             if(result.length == 0){
    //                 str+='<p class="result nav-item" Not found</p>';
    //             }else if(result == "err"){
    //                 str+='<p class="result nav-item> DB error!</p>';
    //             }else{
    //                 $.each(result,function(i,employee){
    //                     if(employee.inOffice){
    //                         str+='<p class="booked nav-item">'+employee.name+'</p>'
    //                     }else{
    //                         str+='<p class="result nav-item">'+employee.name+'</p>'
    //                     }
    //                 })
    //             }
    //             $("#randomize-results").html(str);
    //         },
    //         error: function(e){
    //             $('#randomize-results').empty();
    //             $('#randomize-results').html('<p class="result"><strong>ERR</strong></p>');
    //             console.log("Error : "+e);
    //         }
            
    //     })
    // }
})