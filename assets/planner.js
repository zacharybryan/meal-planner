const plannerInput = [];
let recipeName;
let recipeLink;
let recipeIngredients;

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
});

$('#chooseWhenDialog').dialog({
    autoOpen: false,
    modal: true,
    width: 700,
    draggable: false,
    close: function () {
        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });
    },
    buttons: [
        {
            text: 'Add to Planner',
            // Add classes below within the quotes, spaces in between each class
            class: 'btn',
            click: function () {
                let mealDay = $('#daySelect').val();
                let mealTime = $('#timeHandle').text()
                let meal = $('input[name=whichMeal]:checked').next().text();
                let mealEl = $("[data-day=" + mealDay + "]").find('.card-title:contains(' + meal + ')').parent()
                mealEl.find('a').attr({ 'href': recipeLink, 'target': '_blank' })
                mealEl.find('.timeDisplay').text(mealTime)
                mealEl.find('a').text(recipeName)
                mealEl.find('ul').html(recipeIngredients)
                $('#chooseWhenDialog').dialog('close')
            }
        }
    ]
})

$("#timeSlider").slider({
    min: 0,
    max: 1425,
    step: 15,
    value: 600,
    create: function () {
        $('#timeHandle').text("12:00 PM");
    },
    slide: function (e, ui) {
        let hours1 = Math.floor(ui.value / 60);
        let minutes1 = ui.value - (hours1 * 60);

        if (hours1.length === 1) hours1 = '0' + hours1;
        if (minutes1.length === 1) minutes1 = '0' + minutes1;
        if (minutes1 === 0) minutes1 = '00';
        if (hours1 >= 12) {
            if (hours1 === 12) {
                hours1 = hours1;
                minutes1 = minutes1 + " PM";
            } else {
                hours1 = hours1 - 12;
                minutes1 = minutes1 + " PM";
            }
        } else {
            hours1 = hours1;
            minutes1 = minutes1 + " AM";
        }
        if (hours1 === 0) {
            hours1 = 12;
            minutes1 = minutes1;
        }
        let time = hours1 + ':' + minutes1;
        time.toString();
        $('#timeHandle').text(time);
    }
});

$('.ingredientsList').accordion({
    collapsible: true,
    active: false,
});

$(document).ready(function () {

    console.log(moment().format('dddd'))

    // Hi these are notes for me(Nick) to display the proper dates I'll take care of them
    // Select the element with the associated day
    // find out how many there were before and after it in the $('.dateDisplay') array
    // log the elements before the associated day
    // log the elements after the associated day
    // use $('.dateDisplay')/after .each( date + 1) to set the upcoming dates
    // use $('.dateDisplay')/before .each( $('.dateDisplay').length - date)

    $('select').formSelect();

    $('#searchBtn').click(function (event) {
        event.preventDefault()
        console.log('running')
        const recipeSearch = $('#recipe-search').val()
        app_id = "580e9c1d"
        api_key = "f3651c3d279f9b429a95b97fd5f70466"
        const queryUrl = "https://api.edamam.com/search?q=" + recipeSearch + "&app_id=" + app_id + "&app_key=" + api_key;

        $.ajax({
            type: "GET",
            url: queryUrl,
            success: function (response) {
                console.log(response)
                response.hits.forEach(function (i) {
                    console.log(i)
                    let recipe = i.recipe;
                    console.log(recipe)
                    let calories = Math.floor(recipe.calories / recipe.yield);
                    console.log(calories)
                    let ingredientsArr = [];
                    recipe.ingredients.forEach(i => {
                        ingredientsArr.push(i.text);
                    });

                    let newList = $('<ul class="ingredients is-list">')

                    $(ingredientsArr).each(function (index, item) {
                        let newListItem = $('<li>')
                        newListItem.text(item)
                        newList.append(newListItem);
                    })

                    let uploadRecipe =
                        '<article class="valign-wrapper">' +
                        '<div class="card">' +
                        '<div class="card-image">' +
                        '<img class="recipe-image" src="' + recipe.image + '" alt="image of recipe">' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<h3 class="title">' + recipe.label + '</h3>' +
                        '<p class="recipeCal">' + calories + ' calories per serving</p>' +
                        '<p class="recipeServings"> Servings: ' + recipe.yield + '</p>' +
                        $(newList)[0].outerHTML +
                        '<hr>' +
                        '<a href="' + recipe.url + '" class="recipeLink" >View this Recipe!</a>' +
                        '<footer class="card-footer">' +
                        '<a class="btn waves-effect waves-light addTo" data-function="add" "type="submit" name="action">Add To Planner<i class="material-icons right send"></i></button>' +
                        '<a class="btn waves-effect waves-light" "type="submit" name="action">Save Recipe</button>' +
                        '</footer>' +
                        '</div>' +
                        '</div>' +
                        '</article>'
                    $("#recipe-cards").append(uploadRecipe);
                })
                $('.addTo').click(function (event) {
                    event.stopPropagation();
                    $('html, body').css({
                        overflow: 'hidden',
                    });
                    $('#chooseWhenDialog').dialog('open');
                    $('#timeSlider').width($('#daySelect').width())
                    $('input.dropdown-trigger').click(function (event) {
                        event.stopPropagation();
                        if ($('div[role="dialog"]').height() < $('ul.select-dropdown').height()) {
                            console.log(event.target)
                            let adjustedHeight = $('div[role="dialog"]').height() + $('ul.select-dropdown').height();
                            $('#chooseWhenDialog').dialog("option", "height", adjustedHeight)
                        }
                        $('#dialogBottom').css('margin-top', $('ul.select-dropdown').height())
                    })

                    $('li').click(function (event) {
                        if ($(this).parent().hasClass('select-dropdown')) {
                            $('#chooseWhenDialog').dialog("option", "height", 'auto');
                            $('#dialogBottom').css('margin-top', 'auto')
                        }
                    })

                    $('#chooseWhenDialog').click(function () {
                        if ($('.dropdown-content').css('display') === 'none') {
                            $('#chooseWhenDialog').dialog("option", "height", 'auto')
                            $('#dialogBottom').css('margin-top', 'auto')
                        }
                    })

                    recipeName = $(this).parent().parent().find('.title').text();

                    recipeLink = $(this).parent().parent().find('a.recipeLink').attr('href')

                    recipeIngredients = $(this).parent().parent().find('ul').html()

                })
            }
        })
        $("#recipe-search").val("");

    })

    $('#recipe-search').keypress(function (e) {
        if (e.which == 13) {
            $('#searchBtn').click();
        }
    })

});