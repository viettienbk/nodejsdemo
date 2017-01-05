var app = angular.module('app.index', []);

//  controller

app.controller('profileController', ['$scope', function($scope) {
    $scope.createNote = function() {
        console.log('create Note');
        $.ajax({
            type: 'POST',
            url: location.protocol + '//' + location.host + '/api/note',
            datatype: 'json',
            data: {
                name: $('#name').val()
            },
            success: function(data) {
                console.log(data);
                addNote(data.data);
            },
            error: function(err) {}
        });
    }

    $scope.createSubNote = function(id) {
        console.log('createSubNote');
        $.ajax({
            type: 'POST',
            url: location.protocol + "//" + location.host + "/api/note/content/insert",
            datatype: 'json',
            data: {
                _id: id,
                name: 'abc'
            },
            success: function(data) {
                console.log(data);
            },
            error: function(err) {

            }
        });
    }

    function addNote(data) {
        var note = '';
        note += "<div id='note'>";
        note += "<table>";
        note += "<tr>";
        note += "<td>" + data.name + "</td>";
        note += "<td>" + data.time + "</td>";
        note += "<td><button ng-click=\"createSubNote('" + data._id + "')\">+</button></td>";
        note += "<td><button ng-click='deleteNote(" + data._id + ")'>-</button></td>"
        note += "</tr>";
        note += "</table>";
        console.log(note);
        $(".notes").append(note);
    }

    $scope.logout = function() {
        console.log('logout');
        window.location = '/logout';
    }
}]);