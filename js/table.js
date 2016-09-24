(function($) {
	var element  = '',
		save     = {},
		cols     = 0,
		rows     = 0,
		jsonData = {
			'workspace': [],
			'value': []
		};

	$.fn.generateBox = function(e) {
		setValue({
			element: this,
			save: e.save,
			cols: parseInt(e.col),
			rows: parseInt(e.row)
		});

		if (typeof e.save !== 'undefined') {
			generate(JSON.parse(e.save));
			jsonData = JSON.parse(e.save);
		} else {
			generate();
		}
	}

	$.fn.getZoom = function() {
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform") ||
            this.css("-ms-transform") ||
            this.css("-o-transform") ||
            this.css("transform");
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
            var angle = 0;
        }
        return angle;
    }

	setValue = function(value) {
		element = value.element;
		cols    = value.cols;
		save    = value.save;
		cols    = value.cols;
		rows    = value.rows;
	}

	setObject = function(x, y) {
		if (jsonData['value'][x][y] === true) {
			jsonData['value'][x][y] = false;
		} else {
			jsonData['value'][x][y] = true;
		}
		setLocalStorage(jsonData);
	}

	setLocalStorage = function(json) {
		localStorage.kufi = JSON.stringify(json);
	}

	removeLocalStorage = function(json) {
		localStorage.kufi.clear();
	}

	generate = function(object) {
		var el = '';
		var newRows = (typeof object !== 'undefined') ? object.workspace[0] : rows,
			newCols = (typeof object !== 'undefined') ? object.workspace[1] : cols;
		jsonData['workspace'] = [newRows,newCols];
		el += '<div class="table-wrapper">'
			for (var i = 0; i < newRows; i++) {
				jsonData['value'][i] = [];
				el += '<div class="table-row">';
					if (i % 2 === 1) {
						for (var j = 0; j < newCols; j++) {
							jsonData['value'][i][j] = false;
							var selected = (typeof object !== 'undefined' && object['value'][i][j] === true) ? 'selected' : '';
							if (j % 2 === 1) {
								el += '<div class="table-column not-use '+selected+'" data-x="'+i+'" data-y="'+j+'"></div>';
							} else {
								el += '<div class="table-column negative '+selected+'" data-x="'+i+'" data-y="'+j+'"></div>';
							}
						}
					} else  {
						for (var j = 0; j < newCols; j++) {
							jsonData['value'][i][j] = false;
							var selected = (typeof object !== 'undefined' && object['value'][i][j] === true) ? 'selected' : '';
							if (j % 2 === 1) {
								el += '<div class="table-column negative '+selected+'" data-x="'+i+'" data-y="'+j+'"></div>';
							} else {
								el += '<div class="table-column positive '+selected+'" data-x="'+i+'" data-y="'+j+'"></div>';
							}
						}
					}
				el += '</div>';
			}
		el += '</div>';
		// console.log(jsonData);
		$(element).html(el);
		$('.table-column.negative').click(function(e){
			$(this).toggleClass('empty selected');
			setObject($(e.target).data('x'), $(e.target).data('y'));
		});
		$('.table-column.positive').click(function(e){
			$(this).toggleClass('empty selected');
			setObject($(e.target).data('x'), $(e.target).data('y'));
		});
	}
}(jQuery));