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
        return /^.*$/.exec(value);
      }
    }
  });

  helper.inlineRegexp({
    start: '[vs:',
    matcher: /^\[vs:([a-zA-Z]{2}\d{12})\]/,
    emitter: function(contents) {
      var icon = contents[1];
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': contents,
            'volunteer': 'sound'
        }, '<i class="fa fa-pencil-square-o"></i>Volunteer'];
    }
  });
  helper.inlineRegexp({
    start: '[vt:',
    matcher: /^\[vt:([a-zA-Z]{2}\d{12})\]/,
    emitter: function(contents) {
      var icon = contents[1];
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': contents,
            'volunteer': 'trivia'
        }, '<i class="fa fa-pencil-square-o"></i>Volunteer'];
    }
  });
}