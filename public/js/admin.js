$(function(){
	//list页面的删除按钮
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);

		$.ajax({
			type: 'DELETE',
			url: '/admin/book/list?id=' + id
		}).done(function(results) {
			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove();
				}
			}
		});
	});

	var tagData = $('#inputTag').val();
	tagData = tagData?tagData.split(',') : [];

	//标签效果
	var tagObj = $('#tags').tags({
		'tagData':tagData,
		afterAddingTag: function(tag){
			$('#inputTag').val(tagObj.getTags().join(','));
		},
		afterDeletingTag:function(tag){
			$('#inputTag').val(tagObj.getTags().join(','));
		}
	});
});

