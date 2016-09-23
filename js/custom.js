var data = {};

$(document).ready(function() {
    $('#table').generateBox({
        col: 13,
        row: 13,
        save: data
    });
    $('.toolbar').niceScroll();
    $('.workspace').niceScroll();
    $('.widget').niceScroll();

    $('#setWorkspace').click(function(e) {
        // console.log(e);
        $('#table').generateBox({
            col: $('#colWorkspace').val(),
            row: $('#rowWorkspace').val(),
            save: data
        });
    });

    function downloads(mime, name) {
        html2canvas($('#table'), {
            onrendered: function(canvas) {
                var a = document.createElement('a');
                a.href = canvas.toDataURL(mime).replace(mime, "image/octet-stream");
                a.download = name;
                a.click();
            }
        });
    }

    $('#downloadAsPNG').click(function(e) {
        e.preventDefault();
        downloads('image/png','download.png');

    });

    $('#downloadAsJPG').click(function(e) {
        e.preventDefault();
        downloads('image/jpeg','download.jpg');
    });

    $('#downloadJPG').click(function(e) {
        e.preventDefault();
        downloads('image/jpeg','download.jpg');
    });

    $('#downloadAsPDF').click(function(e) {
        e.preventDefault();  
        html2canvas($("#table"), {
            onrendered: function(canvas) {         
                var imgData = canvas.toDataURL(
                    'image/png');              
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('download.pdf');
            }
        });
    });

    $('#zoomIn').click(function() {
        $('#table').css({
          '-webkit-transform' : 'scale(2)',
          '-moz-transform'    : 'scale(2)',
          '-ms-transform'     : 'scale(2)',
          '-o-transform'      : 'scale(2)',
          'transform'         : 'scale(2)'
        });
    });

    $('#zoomOut').click(function() {
        $('#table').css({
          '-webkit-transform' : 'scale(1)',
          '-moz-transform'    : 'scale(1)',
          '-ms-transform'     : 'scale(1)',
          '-o-transform'      : 'scale(1)',
          'transform'         : 'scale(1)'
        });
    });

});
console.log(data);

// window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = 'It looks like you have been editing something. '
//                             + 'If you leave before saving, your changes will be lost.';

//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
// });
