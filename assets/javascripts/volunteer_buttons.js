import PostView from "discourse/views/post";
import Post from 'discourse/models/post';

export default {
  name: 'Button',
  initialize: function(container) {
    PostView.reopen({
      createVolunteerButton: function($post) {
        if(this.get('post.topic').category && this.get('post.topic.category').id != 11){
            return
        };
        var age = new Date() - new Date(this.get('post.topic.created_at')),
            buttons = $post.find(".volunteer-button"),
            user = Discourse.User.currentProp('username');
        
        if(!buttons){return};
        if(!user){
            $(buttons).after('log in to volunteer');
        };
        if (!user || age >= 86400000) { 
            $(buttons).prop("disabled", true);
            //$(buttons).remove();
            return
            };
        
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
};