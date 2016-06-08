window.addEventListener('DOMContentLoaded', function() {

    var template = document.getElementById('templ').innerHTML;
    console.log(template);
    var info = {
        name: 'Теплухина Наталья Валериевна',
        profession: 'скучная домохозяйка',
        facts: [
        'Мне очень нравится именно фронтенд',
        'Хочу вернуться к основной специальности',
        'Хочу получать за это немножко (или много) денег'
        ],
        phone: '+380993312879',
        vk: 'http://vk.com/id5770815',
        feedback: 'Пока что все идет весело, дальше будет видно'
    };

    document.body.innerHTML = _.template(template)(info);
});