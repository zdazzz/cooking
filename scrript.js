document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения значения GET-параметра из URL
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Получаем значение параметра "category" из URL
    const category = getParameterByName('category');

    // Если параметр "category" присутствует
    if (category) {
        // Получаем все элементы рецептов
        const recipes = document.querySelectorAll('.recipe');

        // Перебираем все рецепты и скрываем те, которые не соответствуют выбранной категории
        recipes.forEach(recipe => {
            const recipeCategory = recipe.dataset.category;
            if (recipeCategory !== category) {
                recipe.style.display = 'none'; // Скрываем рецепт
            }
        });
    }
});
