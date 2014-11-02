$(function(){
	$(".comment").click(function(event) {
		var that = $(this);
		var toId = that.data('tid');
		var toName = that.data('tname');
		var commentId = that.data('cid');
		if ($('#toId').length > 0) {
			$('#toId').val(toId);
		}
		else {
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm');
		}

		if ($('#commentId').length > 0) {
			$('#commentId').val(commentId);
		}
		else {
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm');
		}
		var contentText = $('#contentText');
		contentText.val('回复 '+ toName + ' ：');
		contentText.focus();
		event.stopPropagation();
		event.preventDefault();
	});
});