(function($) {
	var element = '',
		save    = {},
		cols    = 0,
		rows    = 0;

	$.fn.generateBox = function(e) {
		setValue({
			element: this,
			save: e.save,
			cols: e.col,
			rows: e.row
		});

		if (typeof e.save !== 'undefined') {
			generateFromSave(e.save);
		} else {
			generate();
		}
	}

	setValue = function(value) {
		element = value.element;
		cols    = value.cols;
		save    = value.save;
		cols    = value.cols;
		rows    = value.rows;
	}

	generate = function() {
		var el = '';
		el += '<div class="table-wrapper">'
			for (var i = 1; i <= rows; i++) {
				el += '<div class="table-row">';
					if (i % 2 === 0) {
						for (var j = 1; j <= cols; j++) {
							if (j % 2 === 0) {
								el += '<div class="table-column not-use empty"></div>';
							} else {
								el += '<div class="table-column negative empty"></div>';
							}
						}
					} else  {
						for (var j = 1; j <= cols; j++) {
							if (j % 2 === 0) {
								el += '<div class="table-column negative empty"></div>';
							} else {
								el += '<div class="table-column positive empty"></div>';
							}
						}
					}
				el += '</div>';
			}
		el += '</div>';
		$(element).html(el);
		$('.table-column.negative').click(function(e){
			// console.log(e);
			$(this).toggleClass('empty selected');
		});
		$('.table-column.positive').click(function(e){
			// console.log(e);
			$(this).toggleClass('empty selected');
		});
		console.log({
			element : element,
			save : save,
			cols : cols,
			rows : rows
		});
	}

	generateFromSave = function(object) {
		var el = '';
		el += '<div class="table-wrapper">'
			for (var i = 1; i <= rows; i++) {
				el += '<div class="table-row">';
					if (i % 2 === 0) {
						for (var j = 1; j <= cols; j++) {
							if (j % 2 === 0) {
								el += '<div class="table-column not-use empty"></div>';
							} else {
								el += '<div class="table-column negative empty"></div>';
							}
						}
					} else  {
						for (var j = 1; j <= cols; j++) {
							if (j % 2 === 0) {
								el += '<div class="table-column negative empty"></div>';
							} else {
								el += '<div class="table-column positive empty"></div>';
							}
						}
					}
				el += '</div>';
			}
		el += '</div>';
		$(element).html(el);
		$('.table-column.negative').click(function(e){
			// console.log(e);
			$(this).toggleClass('empty selected');
		});
		$('.table-column.positive').click(function(e){
			// console.log(e);
			$(this).toggleClass('empty selected');
		});
		console.log({
			element : element,
			save : save,
			cols : cols,
			rows : rows
		});
	}

}(jQuery));