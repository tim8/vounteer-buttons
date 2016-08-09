import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['volunteer-butons'] = true;
});



export function setup(helper) {
  helper.whiteList([ 
    'button[volunteer=sound]',
    'button[volunteer=trivia]',
    'button.btn btn-small volunteer-button'
  ]);
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'button' && name === 'show') {
        return /([0-9a-z-]+)/.exec(value);
      }
    }
  });

  helper.inlineRegexp({
    start: '[vs:',
    matcher: /^\[vs:([0-9a-z-]+)\]/,
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
    matcher: /^\[vt:([0-9a-z-]+)\]/,
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