import { withPluginApi } from 'discourse/lib/plugin-api';
import AjaxLib from 'discourse/lib/ajax';


function initializePlugin(api)
{
  const siteSettings = api.container.lookup('site-settings:main');

  if (siteSettings.volunteerbuttons_enabled)
  {
    api.decorateCooked(volunteerSyntax);
  }
}

export default function volunteerSyntax($elem, post)
{
  if (!post) { return; }
  if(post.topic.category && post.topic.id != 11){
      return
  };
  var age = new Date() - new Date(post.topic.created_at),
      buttons = post.find(".volunteer-button"),
      user = Discourse.User.currentProp('username');

  if(!buttons){return};
  if(!user){
      $(buttons).after('log in to volunteer');
  };
  if (!user || age >= 86400000) { 
      //$(buttons).prop("disabled", true);
      $(buttons).remove();
      return
      };

    $(buttons).click(function(obj) {
      var elem = $(obj.currentTarget),
          show = this.getAttribute("show"),
          type = this.getAttribute("volunteer");

      elem.after('<i class="fa fa-spinner fa-spin"></i> Updating...');
      elem.hide();
      AjaxLib.ajax({
          url: 'http://api.vigglerumors.com/volunteer/'+ type +'/'+ show,
          type: 'PUT',
          data: 'user=' + user
      });

    });
}

export default {
  name: 'volunteerbuttons',
  initialize: function(container)
  {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};