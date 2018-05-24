(function () {
  'use strict'
  let defaultOptions = {
    key: '',
    isProduction: false
  }
  angular.module('ravepayment', [])
		.provider('$rave', function () {
		  function load_script (callback) {
		    let script = document.createElement('script') // use global document since Angular's $document is weak
		    if (script.readyState) {  // IE
		      script.onreadystatechange = function () {
		        if (script.readyState === 'loaded' || script.readyState === 'complete') {
		          script.onreadystatechange = null
		          callback()
		        }
		      }
		    } else {  // Others
		      script.onload = function () {
		        callback()
		      }
		    }
		    script.src = (!defaultOptions.isProduction)
							? 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/flwpbf-inline.js'
							: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js'
		    document.body.appendChild(script)
		  }

  this.config = function (options) {
    angular.extend(defaultOptions, options)
  }
  this.$get = ['$q', function ($q) {
    let deferred = $q.defer()

    load_script(function () {
      deferred.resolve()
    })
    return deferred.promise
  }]
  return this
}).directive('ravePayButton', ['$rave', function ($rave) {
  let raveDirective = {}
  raveDirective.restrict = 'E'
  raveDirective.replace = 'true';

  raveDirective.template = function (element, attribute) {
    return `<button class="paystack-pay-button {{class}}">${attribute.text || 'Make Payment'}</button>`
  }

  raveDirective.scope = {
  	class: '@',
  	email: '=',
  	amount: '=',
  	reference: '=',
  	callback: '=',
  	close: '=',
  	meta: '=?',
  	currency: '=?',
  	country: '=?',
  	customerFirstname: '=?',
  	customerLastname: '=?',
  	customTitle: '=?',
  	customDescription: '=?',
  	customLogo: '=?',
  	integrityHash: '=?',
  }

  raveDirective.link = function (scope, element, attrs) {
    $rave.then(function () {
	    element.bind('click', function () {
		    var _opts = {
			    customer_email: scope.email,
			    amount: scope.amount,
			    txref: scope.reference,
			    PBFPubKey: defaultOptions.key,
			    onclose: () => scope.close(),
			    callback: response => scope.callback(response),
			    meta: scope.meta,
			    currency: scope.currency || 'NGN',
			    country: scope.country || 'NG',
			    customer_firstname: scope.customerFirstname || '',
			    customer_lastname: scope.customerLastname || '',
			    custom_title: scope.customTitle || '',
			    custom_description: scope.customDescription || '',
			    custom_logo: scope.customLogo
		    };

		    if ( scope.integrityHash != undefined && typeof( scope.integrityHash ) == "string" ) {
		    	_opts.integrityHash = scope.integrityHash;
		    }
		    window.getpaidSetup( _opts );
	    });
    })
  }

  return raveDirective
}])
})()
