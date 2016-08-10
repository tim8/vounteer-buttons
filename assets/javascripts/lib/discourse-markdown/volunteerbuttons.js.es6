import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['volunteerbutons'] = true;
});



export function setup(helper) {
  helper.whiteList([ 
    'button',
    'button[volunteer]',
    'button.btn-small',
    'button.volunteer-button',
    'button.btn',
    'button[show]'
  ]);

  helper.inlineRegexp({
    start: '[vs:',
    matcher: /^\[vs:([a-zA-Z]{2}\d{12})\]/,
    emitter: function(contents) {
      var show = contents[1];
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': show,
            'volunteer': 'sound'
        }, '<i class="fa fa-pencil-square-o"></i>Volunteer'];
    }
  });
  helper.inlineRegexp({
    start: '[vt:',
    matcher: /^\[vt:([a-zA-Z]{2}\d{12})\]/,
    emitter: function(contents) {
      var show = contents[1];
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': show,
            'volunteer': 'trivia'
        }, '<i class="fa fa-pencil-square-o"></i>Volunteer'];
    }
  });
}