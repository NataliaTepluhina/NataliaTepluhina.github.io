var test = {
    insert: function (tag, parent, number) {
        var element = document.createElement(tag);
        var block = document.querySelectorAll(parent);
        block[number].appendChild (element);
    },

    insertText: function (text, parent, number) {
        var element = document.createTextNode(text);
        var block = document.querySelectorAll(parent);
        block[number].appendChild (element);
    },

    addClass: function (tag, number, newclass) {
        var elem=document.querySelectorAll(tag);
        elem[number].classList.add (newclass);
    },

    content: function (tag, number, text) {
        var elem = document.querySelectorAll(tag);
        elem[number].innerHTML = text;
    },

    setAttr: function (tag, number, attrib, value) {
        var elem = document.querySelectorAll(tag);
        elem[number].setAttribute (attrib, value);
    }

};

test.insert ('h1', 'body', 0);
test.addClass ('h1', 0, 'text-left');
test.content ('h1', 0, 'Тест по программированию');
test.insert ('ol', 'body', 0);

for (var i = 0; i < 3; i++) {
    test.insert ('li','ol', 0);
    test.insert ('h3', 'li', i);
    test.content ('h3', i, 'Вопрос №'+(i+1));

    for (var a = 0; a < 3; a++) {
        var numb = 3*i+a;
        test.insert ('div','li',i);
        test.addClass ('div', numb, 'checkbox');
        test.insert ('label', 'div', numb);
        test.insert ('input', 'label', numb);
        test.setAttr ('input', numb, 'type', 'checkbox');
        test.insertText ('Вариант ответа №'+(a+1), 'label', numb);
        
    }
}

test.insert ('button', 'body', 0);
test.setAttr ('button',0, 'type', 'submit');
test.addClass ('button', 0, 'btn');
test.addClass ('button', 0, 'btn-primary');
test.addClass ('button', 0, 'left-block');
test.content ('button', 0, 'Проверить мои результаты');