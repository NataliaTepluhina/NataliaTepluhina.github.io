var namesList = [];
for (var i = 0; i < 5; i++) {
    namesList[i] = prompt('Введите имя №'+(i+1));
}
var name = prompt('Введите имя для поиска');
for (var i = 0; i < namesList.length; i++) {
    if(namesList[i] == name) {
        var nameSearch = namesList[i];
    }
}
if(typeof(nameSearch) == 'undefined') {
    alert('Произошла ошибка');
}
else {
    alert(nameSearch+', вы успешно вошли');
}