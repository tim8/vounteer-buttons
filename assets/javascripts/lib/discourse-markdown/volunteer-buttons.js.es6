import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['volunteer-buttons'] = true;
});



export function setup(helper) {
  helper.whiteList([ 
    'button[volunteer]',
    'button[show]',
    'button[title]',
    'button[disabled]',
    'button[user]',
    'button.btn btn-small volunteer-button',
    'button.btn btn-small volunteer-button volunteered'
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
        const opts          = helper.getOptions();
        const user          = contents[2];
        const avatar        = opts.lookupAvatar(user);
        return ['p',
          ['button', {
              'class' : 'btn btn-small volunteer-button volunteered',
              'show': show,
              'volunteer': 'sound',
              'user': contents[2],
              'title': contents[2] + ' has volunteered for this sound'
          }, '<i class="fa fa-check-square-o"></i> ' + lookupAvatar(user) ],
          ['a', {'class': 'mention', href: '/users/' + user.toLowerCase() },  avatar + ' @' + user ]
        ];
      }
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': show,
            'volunteer': 'sound'
        }, '<i class="vri-tv-v"></i> Volunteer'];
    }
  });
  helper.inlineRegexp({
    start: '[vt:',
    matcher: /^\[vt:([a-z]{2}\d{12})(?:\:([a-z0-9]+))?\]/i,
    emitter: function(contents) {
      var show = contents[1];
      if(contents[2]){
        const opts          = helper.getOptions();
        const user          = contents[2];
        return ['button', {
              'class' : 'btn btn-small volunteer-button volunteered',
              'show': show,
              'volunteer': 'trivia',
              'user': contents[2],
              'title': contents[2] + ' has volunteered for this trivia'
          }, '<i class="fa fa-check-square-o"></i> ' + opts.lookupAvatar(user) ];
      }
        return ['button', {
            'class' : 'btn btn-small volunteer-button',
            'show': show,
            'volunteer': 'trivia'
        }, '<i class="vri-live"></i> Volunteer'];
    }
  });
}