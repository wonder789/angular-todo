var app = angular.module("todoApp",[]);

app.controller("todoController", [ '$scope', 'todoStorage' , '$log'  , function( $scope, todoStorage, $log ){
  $scope.todos = todoStorage.get();


}]);
// Todo Service
app.service("todoStorage", function(){
    var todoList = [
        {
          idx : 1,
          content : '공부하기',
          createdAt : Date.now(),
          completed : false,
        },
        {
          idx : 2,
          content : '운동하기2323',
          createdAt : Date.now(),
          completed : false,
        },
        {
          idx : 3,
          content : '방 정리하기',
          createdAt : Date.now(),
          completed : false,
        },
        {
          idx : 4,
          content : '오늘은 뭐하지',
          createdAt : Date.now(),
          completed : false,
        }
    ];

    this.get = function(){
        return todoList;
    }

    this.add = function( todoItem ){
      todoList.push(todoItem);
    }

    this.remove = function( todoItem ){
        for ( var i = todoList.length - 1 ; i > 0 ; i -- ){
          if( todoList[i].idx == todoItem.idx ) {
            todoList.splice( i, 1 );
          }
        }
    }


});
