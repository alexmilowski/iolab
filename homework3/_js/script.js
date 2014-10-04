$(document).ready(function() {
    $("#todo-form").submit(function(){
        var text = $("#todo-form-add").val();
		var button = $("<button type=\"button\" name=\"remove\" value=\"remove\">Remove</button>");
		var task = $("<li>" + text + "</li>").append(button);
		$("#todo-list").append(task);
		updateButton();
		return false;
	});
})

function updateButton() {
	$(":button").click(function() {
        $(this).parent().slideUp();
    });
}