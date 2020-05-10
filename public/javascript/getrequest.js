$(document).ready(function(){
    var count =0;
    $('#empsearch').keyup(function () {
        if(this.value.length === 0)
        $('#names').empty();
        if(this.value.length > 3)
        ajaxGet(this.value);
    });

    function ajaxGet(userInput){
        $.ajax({
            type: "Get",
            url : "ajax/get/"+userInput,
            success: function(result){
                $('#names').empty();
                var str =""
                if(result.length === 0){
                    str+='<a class="dropdown-item" href="#">Employee not found</a>';
                }else{
                    $.each(result, function (i,employee) { 
                        // $('#names .dropdown-item').append(employee.name + " ");
                       str+='<a class="dropdown-item" href="#">'+employee.name+'</a>'
                     });
                }
                
                 $('#names').html(str);
                 console.log("live search success");
            },
            error : function(e){
                $('#names').empty();
                $("#names").html('<a class="dropdown-item" href="#"><strong>No employee found!!!</strong></a>');
                console.log("Error : ",e);
            }
        });
    }











})