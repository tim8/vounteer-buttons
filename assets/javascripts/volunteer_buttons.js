Discourse.PostView.reopen({
  createVolunteerButton: function($post) {
    
   
    if (!Discourse.User.currentProp('username') && this.get('post.topic.category').id != 1 ) { return };
    
    var age = new Date() - new Date(this.get('post.topic.created_at')),
        buttons = $post.find(".volunteer-button"),
        user = Discourse.User.currentProp('username');
  
    if(age >= 86400000){
        $(buttons).remove();
    }
      $(buttons).click(function(obj) {
        var elem = $(obj.currentTarget),
            show = this.getAttribute("show"),
            type = this.getAttribute("volunteer-type");

        elem.after('<i class="fa fa-spinner fa-spin"></i> Updating...');
        elem.hide();
        $.ajax({
            url: 'http://api.vigglerumors.com/volunteer/'+ type +'/'+ show,
            type: 'PUT',
            data: 'user=' + user
        });

      });

  }.on('postViewInserted', 'postViewUpdated'),

  destroyVolunteerButton: function() {
  }.on('willClearRender')
});