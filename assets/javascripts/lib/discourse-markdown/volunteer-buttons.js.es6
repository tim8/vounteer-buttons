import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['volunteer-butons'] = true;
});



export function setup(helper) {
  helper.whiteList([ 
    'button',
    'button[volunteer]',
    'button.btn-small',
    'button.volunteer-button',
    'button.btn'
  ]);
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'button' && name === 'show') {
        return /^(.+)$/.exec(value);
      }
    }
  });

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