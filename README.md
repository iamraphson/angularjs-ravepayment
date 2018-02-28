# Rave Payment Component for Angular 1.x
An Angular library for RavePay Payment Gateway.

### Demo
![Demo Image](Demo.png?raw=true "Demo Image")

### Get Started

This AngularJS library provides a wrapper to add RavePay Payment to your AngularJS 1.x applications

###Install

##### NPM
```
npm install angularjs-ravepayment --save
```

##### Javascript via CDN
```
<!-- angular 1.x -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js"></script>
<!-- Angularjs-Ravepayment -->
<script src="https://unpkg.com/angularjs-ravepayment/dist/angular-rave.min.js"></script>

```

### Usage

```
<div ng-app="RaveApp" ng-controller="RaveController">
    <rave-pay-button
        class="paymentbtn"
        text="Pay Me, My Money"
        email="email"
        amount="amount"
        reference="reference"
        meta="metadata"
        callback="callback"
        close="close"
    ></rave-pay-button>
</div>
```
```
<script>
    let raveApp = angular.module("RaveApp", ['ravepayment'])

    raveApp.config(['$raveProvider', function ($raveProvider) {
        $raveProvider.config({
            key: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X",
            isProduction: false
        })
    }])

    raveApp.controller("RaveController", function($scope){
        $scope.amount = 1000 //Naira

	    $scope.metadata = [
		   {
		        metaname:‘flightid’,
		        metavalue:‘93849-MK5000’
           }
		]

	    $scope.computeReference = function() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( let i=0; i < 10; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

	    $scope.reference = $scope.computeReference();

	    $scope.email = "nsegun5@gmail.com";
	    $scope.callback = function (response) {
		    console.log(response);
	    };

	    $scope.close = function () {
		    console.log("Payment closed");
	    };
    })
</script>
```
[Usage](index.html)

Please checkout [Rave Documentation](https://flutterwavedevelopers.readme.io/v1.0/reference#introduction) for other available options you can add to the tag

## Deployment
REMEMBER TO CHANGE THE KEY WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM AND CHANGE `isProduction` to `true`

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details


