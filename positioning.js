document.getElementById('s3').addEventListener('click',
function(){
    document.querySelector('.bg-modal').style.display = 'flex'
});
document.getElementById('close').addEventListener('click',
function () {
    document.querySelector('.bg-modal').style.display = 'none'
})


$("#button").on("click",function(){
    console.log("button is clicked!!!");
    $("#populate").html('<p id="para">Hi there!!!</p>');
  })
  $("#populate").on("click","#para",function(){
      console.log("para is clicked!!!");
    $(this).css("color","purple");
  })