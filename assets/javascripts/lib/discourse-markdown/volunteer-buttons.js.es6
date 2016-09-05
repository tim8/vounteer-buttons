import { registerOption } from 'pretty-text/pretty-text';
import { renderAvatar } from 'discourse/helpers/user-avatar';

registerOption((siteSettings, opts) => {
  opts.features['volunteer-buttons'] = true;
});



export function setup(helper) {
  helper.whiteList([ 
    'button[volunteer]',
    'button.btn btn-small volunteer-button'
  ]);
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'button' && name === 'show') {
        return /^[a-zA-Z]{2}\d{12}/.exec(value);
      }
    }
  });

  helper.inlineRegexp({
    start: '[vs:',
    matcher: /^\[vs:([a-z]{2}\d{12})(?:\:([a-z0-9]+))?\]/i,
    emitter: function(contents) {
      var show = contents[1];
      if(contents[2]){
        return ['p',
          ['button', {
              'class' : 'btn btn-small volunteer-button volunteered',
              'show': show,
              'volunteer': 'sound',
              'user': contents[2]
          }, '<i class="fa fa-check-square-o"></i>'], 
          ['a', {'class': 'mention', href: '/users/' + contents[2].toLowerCase() }, ' @' + contents[2] ]
        ];
      }
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': show,
            'volunteer': 'sound'
        }, '<i class="fa fa-pencil-square-o"></i>Volunteer'];
    }
  });
  helper.inlineRegexp({
    start: '[vt:',
    matcher: /^\[vt:([a-z]{2}\d{12})(?:\:([a-z0-9]+))?\]/i,
    emitter: function(contents) {
      var show = contents[1];
      if(contents[2]){
        return ['button', {
            'class' : 'btn btn-small volunteer-button volunteered',
            'show': show,
            'volunteer': 'trivia',
            'user': contents[2]
        }, '<i class="fa fa-check-square-o"></i> '+ renderAvatar(contents[2], {usernamePath: contents[2], imageSize: 'small'}) ];
      }
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': show,
            'volunteer': 'trivia'
        }, '<i class="fa fa-pencil-square-o"></i>Volunteer'];
    }
  });
}