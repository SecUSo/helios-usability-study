'use strict';

neuchatelApp.directive("moveNextOnMaxlength", function() {
    return {
        restrict: "A",
        link: function($scope, element) {
            element.on("input", function(e) {
                console.log('Input into element ' + element);
                if(element.val().length === 4) {
                    console.log('Element ' + element + ' full');
                    e.preventDefault();
                    var $nextElement = element.next();
                    if($nextElement.length) {
                        console.log('Element ' + element + ' has next. Switching focus to ' + $nextElement[0]);
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
});