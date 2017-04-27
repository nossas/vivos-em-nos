import cookie from 'js-cookie'

var ven_sid=cookie.get('ven_sid');
if(!ven_sid) {
  /*based on https://github.com/makeable/uuid-v4.js*/
  var UUID=function(){for(var dec2hex=[],i=0;15>=i;i++)dec2hex[i]=i.toString(16);return function(){for(var uuid="",i=1;36>=i;i++)uuid+=9===i||14===i||19===i||24===i?"-":15===i?4:20===i?dec2hex[4*Math.random()|8]:dec2hex[15*Math.random()|0];return uuid}}();
  ven_sid=UUID();
}
cookie.set('ven_sid',ven_sid,180,'/',false,'.devel');

var _apiHost,_user,_project;
var _analyticsOneTimeEventFired={};
try {
  var location = window.location;
  var domain = location.origin || (location.protocol + '//' + location.hostname);
  var _actualRequest={
    referrer: document.referrer||undefined,
    url: location.href,
    protocol: location.protocol.substr(0,location.protocol.length-1),
    hostname: location.hostname,
    domain: domain,
    pathname: location.pathname || location.href.substr(domain.length).replace(/[\?\#].*$/,''),
    userAgent: typeof navigator!=='undefined' ? navigator.userAget : undefined,
    hash: location.hash.replace(/^\#/,''),
    query: (function parseParams() {
        if(location.search) {
          try {
            return location.search.replace(/^\?/,'').split('&').reduce(function (params, param) {
                var paramSplit = param.split('=').map(function (value) {
                    return decodeURIComponent(value.replace('+', ' '));
                });
                params[paramSplit[0]] = paramSplit[1];
                return params;
            }, {});
          } catch(e) {
            return location.search;
          }
        }
    })()
  };

  var origin = (function(request,cookie) {
    try {
      var o = JSON.parse(cookie.get('ctrse_origin')||null) || {createdAt: new Date()};
    } catch(e) {
      o = {createdAt: new Date()};
    }
    var fromCatarse=request.referrer && /^https?:\/\/([^\\/]+\.)?catarse\.me/.test(request.referrer);
    if(fromCatarse) {
      //Só pega o ultimo ref. Não atualiza utms...
      o.ref = (request.query&&request.query.ref) || o.ref; //preferencia para a query.
    } else if(/*!fromCatarse && */ request.referrer || (!o._time || new Date().getTime()-o._time>10*60*1000/*10min*/)) {
      var m=request.referrer && request.referrer.match(/https?:\/\/([^\/\?#]+)/);
      var refDomain=(m && m[1]) || undefined;
      var query=request.query;
      //se, e somente se, tem algum utm na query...
      if(query && ['utm_campaign','utm_source','utm_medium','utm_content','utm_term'].some(function(p){
        return !!query[p];
      })) {//então, substitui todos, mesmo os q nao tem, pois são um conjunto de informações...
        o.domain  = refDomain;
        o.campaign=query.utm_campaign;
        o.source=  query.utm_source;
        o.medium=  query.utm_medium;
        o.content= query.utm_content;
        o.term=    query.utm_term;
      } else if (refDomain && !['domain','utm_campaign','utm_source','utm_medium','utm_content','utm_term'].some(function(p){
        return !!o[p];
      })) {//se tem refDomain e não tem no origin algum utm ou domain anterior...
        o.domain  = refDomain;
      }

      if(!o.campaign && query && query.ref) {
        //nesse caso, como veio de outro dominio, sem utm params, mas com ref, assumimos q esse ref é um campaign.
        o.campaign = query.ref;
      }
    }
    //fazemos o _time aqui por causa da verificação acima !o._time, indicando q foi criado agora.
    o._time=new Date().getTime();
    cookie.set('ctrse_origin',JSON.stringify(o),180,'/',false,'.catarse.me');
    return o;
  })(_actualRequest,monster);
} catch(e) {
  console.error('[CatarseAnalytics] error',e);
}
//Metodos semelhantes ao modulo "h"
function _getApiHost() {
  if(window.CatarseAnalyticsURL)
    return window.CatarseAnalyticsURL;
  if(_apiHost)
    return _apiHost;

  var el=document.getElementById('api-host');
  _apiHost = (el && el.getAttribute('content'));
  if(_apiHost)
    _apiHost=_apiHost+'/rpc/track';
  return _apiHost;
}
function _getUser() {
  if(_user)
    return _user;

  var body = document.getElementsByTagName('body'),
      data = body && body[0] && body[0].getAttribute('data-user');
  if(data) {
    try {
      return _user=JSON.parse(data);
    } catch(e) {
      console.error('[CatarseAnalytics._getUser] error parsing data '+JSON.stringify(data), e);
    }
  }
}
function _getProject() {
  if(_project)
    return _project;
  var el = document.getElementById('project-show-root')||document.getElementById('project-header'),//pode não existir
      data = el && (el.getAttribute('data-parameters')||el.getAttribute('data-stats'));
  if(data) {
    try {
      return  _project=JSON.parse(data);
    } catch(e) {
      console.error('[CatarseAnalytics._getProject] error parsing data '+JSON.stringify(data), e);
    }
  }//else return undefined
}

function _event(eventObj, fn, ignoreGA) {
  if (eventObj) {
    try {
      var project = eventObj.project||_getProject(),
          user = eventObj.user||_getUser();
      var ga = window.ga;//o ga tem q ser verificado aqui pq pode não existir na criaçaõ do DOM
      var gaTracker = (typeof ga==='function' && ga.getAll && ga.getAll() && ga.getAll()[0]) || null;
      ignoreGA = ignoreGA || typeof ga!=='function';

      var data = eventObj.extraData&&typeof eventObj.extraData==='object' ? JSON.parse(JSON.stringify(eventObj.extraData)) : {};
      data.ctrse_sid=ctrse_sid;
      data.origin=origin;
      data.category=eventObj.cat;
      data.action=eventObj.act;
      data.label=eventObj.lbl;
      data.value=eventObj.val;
      data.request=_actualRequest;
      if(user&&user.user_id) {
        data.user={
          id: user.user_id,
          contributions: user.contributions,
          published_projects: user.published_projects
        };
      }
      if(project&&(project.id||project.project_id)) {
        data.project={
          id: project.id||project.project_id,
          user_id: project.user_id||project.project_user_id,
          category_id: project.category_id,
          state: project.address && project.address.state_acronym,
          city: project.address && project.address.city
        };
      }
      if(gaTracker) {
        data.ga={clientId: gaTracker.get('clientId')};
      }

      try {
        var apiUrl=_getApiHost();
        if(apiUrl) {
          var sendData = {
            event: data
          };

          ajax({
              url: apiUrl,
              // The key needs to match your method's input parameter (case-sensitive).
              body: JSON.stringify(sendData),
              headers: {
                'content-type': "application/json; charset=utf-8"
              }
          }, function(status, responseText, req){
            if(status!==200)
              console.error(status,responseText,req);
          });
        }
      } catch(e) {
        console.error('[CatarseAnalytics.event] error:', e);
      }

      if(!ignoreGA) {
        //https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#the_send_method
        ga('send', 'event', eventObj.cat, eventObj.act, eventObj.lbl, eventObj.val, {
          nonInteraction: eventObj.nonInteraction!==false,//default é true,e só será false se, e somente se, esse parametro for definido como false
          transport: 'beacon'
        });
      }
    } catch(e) {
      console.error('[CatarseAnalytics.event] error:',e);
    }
  }
  fn && fn();
}

/*function _lastOrigin() {
  var origin=localStorage
  if(documnet.referrer && /https?:\/\/[^\/]*catarse\.me/.test(document.referrer)) {

  }
}*/
function _pageView() {
  _event({cat:'navigation',act:'pageview',lbl:location.pathname}, null, true)
}
_pageView();

function _checkout(transactionId, prodName, sku, category, price, fee) {
  try {
    if(typeof ga==='function') {
      ga('ecommerce:addTransaction', {
        'id': transactionId,                     // Transaction ID. Required.
        //'affiliation': 'Acme Clothing',   // Affiliation or store name.
        'revenue': price,               // Grand Total.
        //'shipping': ,                  // Shipping.
        'tax': fee,                     // Tax.  Nossa porcentagem
        'current': 'BRL'
      });
      ga('ecommerce:addItem', {
        'id': transactionId,                     // Transaction ID. Required.
        'name': prodName,    // Product name. Required.
        'sku': sku,                 // SKU/code.
        'category': category,         // Category or variation.
        'price': price,                 // Unit price.
        'quantity': '1'                   // Quantity.
      });
      ga('ecommerce:send');
    }
  } catch(e) {
    console.error('[CatarseAnalytics.checkout]',e);
  }
}

export default {
  origin: origin,
  event: _event,
  oneTimeEvent: function(eventObj, fn) {
      if (!eventObj) {
          return fn;
      }
      try {
        if (!eventObj.cat && !eventObj.act) {
          throw new Error('Should inform cat or act');
        }
        var eventKey = eventObj.cat && eventObj.act ? eventObj.cat+'_'+eventObj.act : (eventObj.cat || eventObj.act);
        if (!_analyticsOneTimeEventFired[eventKey]) {
            //console.log('oneTimeEvent',eventKey);
            _analyticsOneTimeEventFired[eventKey] = true;
            _event(eventObj, fn);
        }
      } catch(e) {
        console.error('[CatarseAnalytics.oneTimeEvent] error:',e);
      }
  },
  checkout: _checkout
};