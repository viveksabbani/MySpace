$(document).ready(function(){
var seatnum = 8;
var seat = "";
var empname ="";
// for(var i=1;i<=seatNum;i++){
//     $(`#S${i}`).on("click",{index:i,seat:`S${i}`},function(event){
//         seatDetails(event.data.seat);
//         $(".bg-modal").css("display","flex");
//         close();
//         click_result();
//     })
// }
for(var i=1;i<=seatnum;i++){
    $(`#S${i}`).on("click",{index:i},function(event){
        seat = `S${event.data.index}`;
        $(".bg-modal").css("display","flex");
        seatDetails(seat);
        close();
        click_result();
    })
}
// $("#S3").on("click",function(){
//     seatDetails("S3");
//     seat = "S3";
//     $(".bg-modal").css("display","flex");
// })
function close(){
    $(".bg-modal").on("click","#close",function(){
        $(".bg-modal").css("display","none");
        $(".modal-content").empty();
        location.assign("/");
    })
}
function click_result(){
    var temp =""
    $("body").on("click",".result",function(){
        $("#userInput").val($(this).text());
        $("#search_results").empty();
        empname = $(this).text();
        success(empname,seat);
        // $('#submit').show();
    })  
}


//Sending seat number and employee name to post route

$(".modal-content").on("click",".btn-danger",function(){
    $.ajax({
        type: "POST",
        url: "/ajax/seat/cancel",
        data:{name:empname,seat:seat},
        success: function(result){
            // console.log(result);
            if(result =="err"){
                $(".modal-content").html('<a id="close">+</a><h3>Unable to cancel the seat reservation! Please try later.</h3>');
            }else{
                $(".modal-content").html(`<a id="close">+</a><h3>${seat}'s reservation for ${empname} has been cancelled</h3>`);
            }
        },
        error: function(e){
            $(".modal-content").html(`<a id="close">+</a><h3>${e}</h3>`);
        }
    })
})

function seatDetails(seat){
    $.ajax({
        type: "Get",
        url : "ajax/seat/"+seat,
        success: function(result){
            if(result == "err"){
                $(".modal-content").html("<h3>Database fetch error! Please try again later!</h3>");
            }else if(result[0].employee_name == undefined){
            var str  =      '<a id="close">+</a>'+
                        `<p>${result[0].division}</p>`+
                        `<p>${result[0].team}</p>`+
                        '<div id="dynsearch">'+
                        '<div class="input-group"><input type="text" id="userInput" class="form-control" name="name"></div>'+
                        '<div id="search_results"></div></div>'+
                        '<div id="submit"><button class="btn-success">Submit</button></div>'
                $(".modal-content").html(str);      
            }else{
                empname = result[0].employee_name;
            var str =       '<a id="close">+</a>'+
                            `<p>${result[0].division}</p>`+
                            `<p>${result[0].team}</p>`+
                            `<p>${result[0].employee_name}</p>`+
                            '<div id="cancel"><button class="btn-danger">Cancel</button>'

                $(".modal-content").html(str);  
            }
        },
        error: function(e){
            $(".modal-content").html(`<a id="close">+</a><h3>${e}</h3>`);
        }
        
    })
}




})
function consolePrint(){
    console.log("It's working;!!!")
}
function success(empname,seat){
    $("body").on("click",".btn-success",function(){
        form_data = {name:empname,seat:seat};
        $.ajax({
            type: "POST",
            url: "/ajax/seat/reserve",
            data: form_data,
            success:function (result){
                $(".modal-content").empty();
                if(result == "err"){
                    $(".modal-content").html('<a id="close">+</a><h3>Unable to reserve the seat! Please try later.</h3>');
                }else{
                    $(".modal-content").html(`<a id="close">+</a><h3>${seat} has been reserved for ${empname}</h3>`);
                }
            },
            error: function(e){
                $(".modal-content").html(`<a id="close">+</a><h3>${e}</h3>`);
            }
        })
    })
    }