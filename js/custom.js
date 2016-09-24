// var defaults = {"workspace":[15,37],"value":[[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,true,false,true,true,true,true,true,true,true,false,true,false,true,false,true,true,true,false,true,false,true,false,true,false,true,true,true,false,true,false,true,false,true,false,false],[false,false,true,false,false,false,false,false,false,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,false,false,true,false,true,false,false],[false,false,true,true,true,true,true,true,true,true,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,true,true,false,true,false,true,false,true,false,false],[false,false,true,false,false,false,false,false,false,false,false,false,true,false,true,false,false,false,true,false,true,false,true,false,false,false,false,false,true,false,true,false,true,false,false,false,false],[false,false,true,true,true,true,true,true,true,false,true,false,true,false,true,false,true,true,true,false,true,false,true,false,true,true,true,false,true,true,true,true,true,false,true,false,false],[false,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false,true,false,true,false,true,false,true,false,true,false,true,false,false,false,false,false,false,false,true,false,false],[false,false,true,false,true,true,true,true,true,false,true,false,true,false,true,false,true,true,true,false,true,false,true,false,true,true,true,false,true,false,true,false,false,false,true,false,false],[false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false,true,false,false,false,true,false,true,false,true,false,true,false,true,false,true,false,false,false,true,false,false],[false,false,true,false,true,false,true,true,true,false,true,true,true,false,true,true,true,false,true,false,true,false,true,false,true,false,true,true,true,true,true,true,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,true,false,false,false,true,false,false,false,true,false,true,false,true,false,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,true,true,true,true,true,true,true,true,true,false,true,true,true,false,true,true,true,true,true,false,true,false,true,true,true,true,true,true,true,true,false,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]};

var zoom = 1;
$(document).ready(function() {
    $('.toolbar').niceScroll();
    $('.workspace').niceScroll();
    $('.widget').niceScroll();
    
    if (typeof localStorage.kufi === 'undefined') {
        var text = '<h3>Empty Workspace.</h3><p>Create new or generate new workspace.</p>';
        $('#table').html(text);
    } else {
	    $('#table').generateBox({
	        col: 5,
	        row: 5,
	        save: localStorage.kufi
	    });
    }

    $('#setWorkspace').click(function(e) {
        delete localStorage.kufi;
        $('#table').generateBox({
            col: $('#colWorkspace').val(),
            row: $('#rowWorkspace').val()
        });
    });

    $('#downloadAsPNG').click(function(e) {
        e.preventDefault();
        downloads('image/png', 'download.png');

    });

    $('#downloadAsJPG').click(function(e) {
        e.preventDefault();
        downloads('image/jpeg', 'download.jpg');
    });

    $('#downloadJPG').click(function(e) {
        e.preventDefault();
        downloads('image/jpeg', 'download.jpg');
    });

    $('#downloadAsPDF').click(function(e) {
        e.preventDefault();
        downloadPDF('image/png', 'download.pdf');
    });

    $('#zoomIn').click(function() {
    	console.log('Function not available.');
    });

    $('#zoomOut').click(function() {
    	console.log('Function not available.');
    });

    $('#buttonNew').click(function() {
        $('#table').generateBox({
            col: 5,
            row: 5
        });
    });

    $('#buttonDelete').click(function() {
        var text = '<h3>Empty Workspace.</h3><p>Create new or generate new workspace.</p>';
        delete localStorage.kufi;
        $('#table').html(text);
    });

    $('#buttonExit').click(function() {
        var text = '<h3>Empty Workspace.</h3><p>Create new or generate new workspace.</p>';
        delete localStorage.kufi;
        $('#table').html(text);
    });

    $('#buttonSave').click(function() {
    	$.ajax({
    		url: './common/encrypt.php',
    		data: {
    			json: localStorage.kufi
    		},
    		type: 'POST',
    		dataType: 'json',
    		success: function(data) {
    			console.log(data);
    		}
    	})
    });
});

function resetColor() {
	$('.table-column.positive').addClass('empty');
	$('.table-column.negative').addClass('empty');
	$('.table-column.not-use').addClass('empty');
}

function addColor() {
	$('.table-column.positive').removeClass('empty');
	$('.table-column.negative').removeClass('empty');
	$('.table-column.not-use').removeClass('empty');
}

function downloads(mime, name) {
    resetColor();
    setTimeout(function() {
	    html2canvas($('#table'), {
	        onrendered: function(canvas) {
	            var a = document.createElement('a');
	            a.href = canvas.toDataURL(mime).replace(mime, "image/octet-stream");
	            a.download = name;
	            a.click();
	        }
	    });
		addColor();
    }, 500);
};

function downloadPDF(mime, name) {
    resetColor();
    setTimeout(function() {
	    html2canvas($("#table"), {
	        onrendered: function(canvas) {
	            var imgData = canvas.toDataURL(
	                mime);
	            var doc = new jsPDF('p', 'mm');
	            doc.addImage(imgData, 'PNG', 10, 10);
	            doc.save(name);
	        }
	    });
		addColor();
    }, 500);
};

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
