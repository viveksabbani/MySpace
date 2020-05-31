$(document).ready(function(){
    $('.bg-modal').on("keyup","#userInput",function () {
        // $('#submit').hide();
        if(this.value.length === 0)
        $('#search_results').empty();
        if(this.value.length > 3)
        ajaxGet(this.value);
    });

    
})
function ajaxGet(userInput){
    $.ajax({
        type: "Get",
        url : "ajax/get/"+userInput,
        success: function(result){
            $('#search_results').empty();
            var str =""
            if(result.length === 0){
                str+='<p class="booked">Employee not found</p>';
                
            }else if(result == "err"){
                str+='<p class="result">Database ERROR!</p>';
            }
            else{
                $.each(result, function (i,employee) { 
                    if(employee.inOffice){
                        str+='<p class="booked">'+employee.name+'</p>'
                    }else{
                        str+='<p class="result">'+employee.name+'</p>'
                    }
                    // $('#names .dropdown-item').append(employee.name + " ");
                   
                   
                 });
            }
            
             $('#search_results').html(str);
        },
        error : function(e){
            $('#search_results').empty();
            $("#search_results").html('<p class="result"><strong>No employee found!!!</strong></p>');
            console.log("Error : ",e);
        }
    });
}