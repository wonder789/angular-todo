var app = angular.module("todoApp",[]);

// Todo Controller
app.controller("todoController", [ '$scope', 'todoStorage' , '$log'  , function( $scope, todoStorage, $log ){
    // 할 일 목록 가져오기
    $scope.todos = todoStorage.get();

    // 할 일 상태 변경(토글)
    $scope.todoToggleComplete = function( todo ){
      todo.completed = !todo.completed;
    }

    // 할 일 지우기
    $scope.todoRemove = function( todo ){
      todoStorage.remove(todo);
    }

    // 할 일 추가
    $scope.todoAdd = function( newTodoContent ){
      todoStorage.add({
        idx : $scope.todos.length + 1,
        content : newTodoContent,
        createdAt : new Date(),
        completed : false,
      });
      //등록 후 초기화
      $scope.newTodoContent = "";
    }

}]);
// Todo Service
app.service("todoStorage", function(){
    var TODO_DATA = "TODO_DATA";
    var todoList = [
        {
          idx : 1,
          content : '공부하기',
          createdAt : Date.now()+1,
          completed : false,
        },
        {
          idx : 2,
          content : '운동하기2323',
          createdAt : Date.now()+2,
          completed : false,
        },
        {
          idx : 3,
          content : '방 정리하기',
          createdAt : Date.now()+3,
          completed : false,
        },
        {
          idx : 4,
          content : '오늘은 뭐하지',
          createdAt : Date.now()+4,
          completed : false,
        }
    ];

    this.__getTodoFormLocalStorage = function(){
      var storageData = JSON.parse(localStorage.getItem(TODO_DATA));
      if( storageData ){
          todoList = storageData;
      }
    }

    this.__saveToLocalStorage = function(){
        localStorage.setItem(TODO_DATA,  JSON.stringify(todoList));
    }

    this.get = function(){
        this.__getTodoFormLocalStorage()
        return todoList;
    }

    this.add = function( todoItem ){
      todoList.push(todoItem);
      this.__saveToLocalStorage();
    }

    this.remove = function( todoItem ){
        for ( var i = todoList.length - 1 ; i >= 0 ; i -- ){
          if( todoList[i].idx == todoItem.idx ) {
            todoList.splice( i, 1 );
          }
        }
        this.__saveToLocalStorage();
    }


});

// utility directive
app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(e) {
            if(e.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
            }
        });
    };
});
