// $(document).ready(function(){

$("#S3").on("click",function(){
    seatDetails("S3");
    $(".bg-modal").css("display","flex")
})
$(".bg-modal").on("click","#close",function(){
    console.log("close hit");
    $(".bg-modal").css("display","none");
    $(".bg-modal").empty();
})

function seatDetails(seat){
    $.ajax({
        type: "Get",
        url : "ajax/seat/"+seat,
        success: function(result){
            console.log(result);
            if(result[0].employee_name == undefined){
            str  = '<div class="modal-content">'+
                        '<a id="close">+</a>'+
                        `<p>${result[0].division}</p>`+
                        `<p>${result[0].team}</p>`+
                        '<div class="dropdown">'+
                            '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown button</button>'+
                            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'+
                            '<input type="text" name="name" placeholder="name" id="empsearch">'+
                            '<div id="names"><a class="dropdown-item" href="#"></a></div>'+
                        '</div>'+
                    '</div>'
                $(".bg-modal").html(str);      
            }else{
                str =   '<div class="modal-content">'+
                            '<a id="close">+</a>'+
                            `<p>${result[0].division}</p>`+
                            `<p>${result[0].team}</p>`+
                            `<p>${result[0].employee_name}</p>`+
                        '</div>'

                $(".bg-modal").html(str);  
            }
        }
    })
}

function divPopulate(seat){
    
}
// })

