// Скролл всей страницы при открытии попапа
$('#learn-more-popup-open').click(() => {
    $("body").css('overflow', 'hidden');
});
$('#learn-more-popup-close').click(() => {
    $("body").css('overflow', 'auto');
});

//Проигрывание фоновых видео при наведении мыши
let bgvideos = document.querySelectorAll('.hoverplay');

bgvideos.forEach((e) => {
    let video = e.querySelector('video');

    if (video) {
        e.addEventListener("mouseover", () => {
            video.play();
        });
        e.addEventListener("mouseleave", () => {
            video.pause();
        });
    }
});

function changeHighlight() {
    $('.active-tab-highlight').css({
        'width': $('.switcher-item.active').innerWidth() + 'px',
        'left': $('.switcher-item.active').position().left + 'px',
        'height': $('.switcher-item.active').innerHeight() + 'px'
    });
}

//Пролистывание элементов в чекаут баре
document.addEventListener('DOMContentLoaded', function () {
    const ele = document.getElementById('scrollable-grab-container');
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
});

// Скрыть/показать чекаут-бар:
$(window).scroll(function () {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    let tabsOffset = $('.tabs').offset().top,
        distance = (tabsOffset - viewport.top),
        switchersHeight = $('.switchers-container').height();

    if (distance <= -switchersHeight) {
        $('.switchers-container').addClass('fixed')
        changeHighlight();
    } else if (distance = -switchersHeight) {
        $('.switchers-container').removeClass('fixed')
        changeHighlight();
    }

    var bounds = $('.tabs').offset();
    bounds.right = bounds.left + $('.tabs').outerWidth();
    bounds.bottom = bounds.top + $('.tabs').outerHeight();

    var bounds2 = $('.additional-option-cards').offset();
    bounds2.right = bounds2.left + $('.additional-option-cards').outerWidth();
    bounds2.bottom = bounds2.top + $('.additional-option-cards').outerHeight();

    var bounds3 = $('.chekout-form').offset();
    bounds3.right = bounds3.left + $('.chekout-form').outerWidth();
    bounds3.bottom = bounds3.top + $('.chekout-form').outerHeight();

    let tabsAreVisible = !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    let additionalOptionsAreVisible = !(viewport.right < bounds2.left || viewport.left > bounds2.right || viewport.bottom < bounds2.top || viewport.top > bounds2.bottom);
    let chekoutFormIsVisible = !(viewport.right < bounds3.left || viewport.left > bounds3.right || viewport.bottom < bounds3.top || viewport.top > bounds3.bottom)

    if ((tabsAreVisible || additionalOptionsAreVisible) && !chekoutFormIsVisible) {
        $('.chekout-bar').css('transform', 'translateY(0px)')
    } else $('.chekout-bar').css('transform', 'translateY(371px)');


});

// Анимация переключения табов
$('.switcher-item').click(function () {
    let index = $(this).index();
    $('.switcher-item').removeClass('active');
    $(this).addClass('active');
    changeHighlight();
    if (index == 0) {
        $('#basicTab').trigger('click');
        $('.cartplan').eq(1).css('background', '#ECEBFF');
    } else if (index == 1) {
        $('#standardTab').trigger('click');
        $('.cartplan').eq(1).css('background', '#FFDCF5');
    } else if (index == 2) {
        $('#ultimateTab').trigger('click');
        $('.cartplan').eq(1).css('background', '#BEF9EB');
    }
});

//открытие попапов карточек (клик по иконке вопроса на карточках)
function openPopupContainer(i, index, cardList) {
    $('.plan-cards-popups').css('display', 'flex');
    $('.plan-cards-popups').css('opacity', '1');
    $('.collection-list-wrapper-4.w-dyn-list').eq(index).css('display', 'flex');
    $('#' + cardList + '-cards-popups .collection-item-3.w-dyn-item').eq(i).css({
        'opacity': '1',
        'display': 'flex'
    });
    $("body").css('overflow', 'hidden');
}

for (let i = 0; i < $('#tab1 .item-container').length; i++) {
    $('#tab1 .item-container').eq(i).click(function (e) {
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon') {
            openPopupContainer(i, 0, 'Start')
        }
    })
}

$('.image-3').click(function () {
    $('.collection-list-wrapper-4.w-dyn-list').css('display', 'none');
    $("body").css('overflow', 'auto');
})

for (let i = 0; i < $('#tab2 .item-container').length; i++) {
    $('#tab2 .item-container').eq(i).click(function (e) {
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon') {
            openPopupContainer(i, 1, 'Transform')
        }
    })
}

for (let i = 0; i < $('#tab3 .item-container').length; i++) {
    $('#tab3 .item-container').eq(i).click(function (e) {
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon') {
            openPopupContainer(i, 2, 'Advance')
        }
    })
}

for (let i = 0; i < $('.additional-cards-container').children().length; i++) {
    $('.additional-cards-container .item-container').eq(i).click(function (e) {
        if (e.target.id !== 'minus-icon' && e.target.id !== 'plus-icon') {
            openPopupContainer(i, 3, 'additional')
        }
    })
}

// Калькулятор + анимация айтемов в корзине
const startPrice = 15000;
const transformPrice = 20000;
const advancePrice = 25000;

let additionalOptions = []; //массив с данными карточек из блока 'Augment your Brand Experience'
for (let i = 1; i <= $('.additional-cards-container').children().length; i++) {
    additionalOptions.push({
        cost: +$('.additional-cards-container .item-container').eq(i - 1).children('.optioncost').text(),
        term: +$('.additional-cards-container .item-container').eq(i - 1).children('.optionterm').text()
    })
};

let estimData = {
    plan: 'Transform',
    fullPrice: getPrice(),
    term: +$('.term').first().text(),
    additionalOptions: []
}
$('#estimField').val(JSON.stringify(estimData, null, '\t')); // перенос данных эстимейта в форму обратной связи

//Убрать / убавить доп функционал (клик по минусу в блоке 'Augment your Brand Experience')  
function removeAdditionalOption(i) {
    if ($('.collection-list-4 .w-dyn-item').eq(i - 1).css('display') !== 'none') {
        let price = getPrice();
        price -= additionalOptions[i - 1].cost;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        estimData.fullPrice = price;
        estimData.term -= additionalOptions[i - 1].term;
        $('.term').text(estimData.term);
        estimData.additionalOptions.splice(estimData.additionalOptions.indexOf($('.collection-list-wrapper-static-basket .w-dyn-item').eq(i - 1).text()), 1);
        $('.collection-list-wrapper-static-basket .w-dyn-item').eq(i - 1).css('opacity', '0');
        setTimeout(function () {
            $('.collection-list-wrapper-static-basket .w-dyn-item').eq(i - 1).css('display', 'none');
        }, 300)
        $('.collection-list-4 .w-dyn-item').eq(i - 1).css('opacity', '0');
        setTimeout(function () {
            $('.collection-list-4 .w-dyn-item').eq(i - 1).css('display', 'none');
        }, 300)
        $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    }
    if (estimData.additionalOptions.length === 0) {
        $('.request-plus-icon').css('opacity', '0');
    };
}
//Прибавить доп функционал(клик по плюсу в блоке 'Augment your Brand Experience')
for (let i = 1; i <= $('.additional-cards-container').children().length; i++) {
    $('.additional-cards-container .item-container').eq(i - 1).children().children('#plus-icon').click(function () {
        if ($('.collection-list-4 .w-dyn-item').eq(i - 1).css('display') == 'none') {
            let price = getPrice();
            price += additionalOptions[i - 1].cost;
            price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
            $('.priceincart').each(function () {
                $(this).text(price);
            });
            estimData.fullPrice = price;
            estimData.term += additionalOptions[i - 1].term;
            $('.term').text(estimData.term);
            estimData.additionalOptions.push($('.collection-list-wrapper-static-basket .w-dyn-item').eq(i - 1).text());
            $('.collection-list-wrapper-static-basket .w-dyn-item').eq(i - 1).css({
                'opacity': '1',
                'display': 'block'
            });
            $('.collection-list-4 .w-dyn-item').eq(i - 1).css({
                'opacity': '1',
                'display': 'block'
            });
            $('#estimField').val(JSON.stringify(estimData, null, '\t'));
        }
        if (estimData.additionalOptions.length >= 1) {
            $('.request-plus-icon').css('opacity', '1');
        };
    });
    $('.additional-cards-container .item-container').eq(i - 1).children().children('#minus-icon').click(function () {
        removeAdditionalOption(i)
    });
    $('.request-item-container').children('.remove-icon').eq(i - 1).click(function () {
        removeAdditionalOption(i)
    });
    $('.request-item-container').children('.remove-icon').eq((i - 1) + 8).click(function () {
        removeAdditionalOption(i)
    });
}

//Добавление доп кол-ва функций из блока табов (клик по плюсу)
function addOptionFromTab(clickedElement) {
    let price = getPrice();
    price += +$(clickedElement).parent().parent().parent().children('.tabitemprice').text();
    price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
    $('.priceincart').each(function () {
        $(this).text(price);
    });
    estimData.fullPrice = price;
    estimData.term += +$(clickedElement).parent().parent().parent().children('.tabitemterm').text();
    $('.term').text(estimData.term);
    let name = $(clickedElement).parent().parent().parent().children('#card-name').text();
    let amount = Number($(clickedElement).parent().parent().children('#amount').text());
    amount += 1;
    if (typeof estimData.additionalOptions.find(elem => elem.name === name) === 'undefined') {
        estimData.additionalOptions.push({
            name: name,
            amount: amount
        });
    } else {
        estimData.additionalOptions.find(elem => elem.name === name).amount = amount;
    }
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    $(clickedElement).parent().parent().children('#amount').text(amount);
}

$('#tab1 #plus-icon').click(function () {
    addOptionFromTab(this);
});
$('#tab2 #plus-icon').click(function () {
    addOptionFromTab(this);
});
$('#tab3 #plus-icon').click(function () {
    addOptionFromTab(this);
});

//Убавление доп кол-ва функций из блока табов (клик по минусу)
function removeOptionFromTab(clickedElement) {
    let name = $(clickedElement).parent().parent().parent().children('#card-name').text();
    let amount = Number($(clickedElement).parent().parent().children('#amount').text());
    let currentElem = estimData.additionalOptions.find(elem => elem.name === name);
    if (typeof currentElem !== 'undefined') {
        let currentElemIndex = estimData.additionalOptions.findIndex(elem => elem.name === name);
        let currentElemPrice = +$(clickedElement).parent().parent().parent().children('.tabitemprice').text();
        let currentElemTerm = +$(clickedElement).parent().parent().parent().children('.tabitemterm').text();
        let price = getPrice();
        if (currentElem.amount > 1) {
            price -= currentElemPrice;
            price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
            $('.priceincart').each(function () {
                $(this).text(price);
            });
            estimData.fullPrice = price;
            estimData.term -= currentElemTerm;
            $('.term').text(estimData.term);
            currentElem.amount -= 1;
            $(clickedElement).parent().parent().children('#amount').text(amount - 1);
        } else {
            price -= currentElemPrice;
            price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
            $('.priceincart').each(function () {
                $(this).text(price);
            });
            estimData.fullPrice = price;
            estimData.term -= currentElemTerm;
            $('.term').text(estimData.term);
            currentElem.amount -= 1;
            $(clickedElement).parent().parent().children('#amount').text(amount - 1);
            estimData.additionalOptions.splice(currentElemIndex, 1);
        }
    }
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
}
$('#tab1 #minus-icon').click(function () {
    removeOptionFromTab(this);
});
$('#tab2 #minus-icon').click(function () {
    removeOptionFromTab(this);
});
$('#tab3 #minus-icon').click(function () {
    removeOptionFromTab(this);
});

//Получение цены в виде числа
function getPrice() {
    let price = 0;
    $('.priceincart').each(function () {
        let str = $(this).text();
        price = Number(str.replace(' ', ''));
    });
    return price;
}

// Клики по вкладкам табов 
$('#basicTab').click(() => {
    let price = getPrice();
    if ($('.cartplan').first().text() == "Transform") {
        price = price - transformPrice + startPrice;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        $('.cartplan').each(function () {
            $(this).text("Start");
        });
        estimData.fullPrice = price;
    } else if ($('.cartplan').first().text() == "Advance") {
        price = price - advancePrice + startPrice;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        $('.cartplan').each(function () {
            $(this).text("Start");
        });
        estimData.fullPrice = price;
    }
    estimData.plan = 'Start';
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
});

$('#standardTab').click(() => {
    let price = getPrice();
    if ($('.cartplan').first().text() == "Start") {
        price = price - startPrice + transformPrice;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        $('.cartplan').each(function () {
            $(this).text("Transform");
        });
        estimData.fullPrice = price;
    } else if ($('.cartplan').first().text() == "Advance") {
        price = price - advancePrice + transformPrice;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        $('.cartplan').each(function () {
            $(this).text("Transform");
        });
        estimData.fullPrice = price;
    }
    estimData.plan = 'Transform';
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
});

$('#ultimateTab').click(() => {
    let price = getPrice();
    if ($('.cartplan').first().text() == "Start") {
        price = price - startPrice + advancePrice;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        $('.cartplan').each(function () {
            $(this).text("Advance");
        });
        estimData.fullPrice = price;
    } else if ($('.cartplan').first().text() == "Transform") {
        price = price - transformPrice + advancePrice;
        price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
        $('.priceincart').each(function () {
            $(this).text(price);
        });
        $('.cartplan').each(function () {
            $(this).text("Advance");
        });
        estimData.fullPrice = price;
    }
    estimData.plan = 'Advance';
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
});
