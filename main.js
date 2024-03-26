// Скролл всей страницы при открытии попапа
$('#learn-more-popup-open').click(() => {
    $("body").css('overflow', 'hidden');
});
$('#learn-more-popup-close').click(() => {
    $("body").css('overflow', 'auto');
});

//Клик вне контейнера попапов
$('.collection-list-wrapper-4').click(function (e) {
    if (!$('.collection-item-3').is(e.target) && $('.collection-item-3').has(e.target).length === 0 ) {
        $('.image-3').trigger('click')
    }
})
$('.popup').click(function (e) {
    if (!$('.div-block-40').is(e.target) && $('.div-block-40').has(e.target).length === 0 && !$('.image-3').is(e.target)) {
        $('.image-3').trigger('click')
    }
})

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
const ele = document.getElementById('scrollable-grab-container');
ele.style.cursor = 'grab';

let pos = {
    top: 0,
    left: 0,
    x: 0,
    y: 0
};

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

    if (tabsAreVisible || additionalOptionsAreVisible && !chekoutFormIsVisible) {
        let innerHeight = $('.chekout-bar').innerHeight();
        $('.cookie-banner').css('transform', `translateY(-${innerHeight}px)`)
        $('.chekout-bar').css('transform', 'translateY(0px)')
    } else {
        $('.cookie-banner').css('transform', 'translateY(0px)')
        $('.chekout-bar').css('transform', 'translateY(371px)');
    }

    if ((distance <= -switchersHeight) && !chekoutFormIsVisible) {
        $('.switchers-container').addClass('fixed')
        changeHighlight();
    } else if ( distance = -switchersHeight) {
        $('.switchers-container').removeClass('fixed')
        changeHighlight();
    }

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
        $('.request-items-list.main').css('background', '#ECEBFF');
        $('.success-message .contacts-2').css('background', '#ECEBFF');
    } else if (index == 1) {
        $('#standardTab').trigger('click');
        $('.cartplan').eq(1).css('background', '#FFDCF5');
        $('.request-items-list.main').css('background', '#FFDCF5');
        $('.success-message .contacts-2').css('background', '#FFDCF5');
    } else if (index == 2) {
        $('#ultimateTab').trigger('click');
        $('.cartplan').eq(1).css('background', '#BEF9EB');
        $('.request-items-list.main').css('background', '#BEF9EB');
        $('.success-message .contacts-2').css('background', '#BEF9EB');
    }
});

for (let i = 0; i < $('.service-button').length; i++) {
    $('.service-button').eq(i).click(function () {
        $('.switcher-item').eq(i).trigger('click');
    })
}

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
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon' && e.target.className !== 'div-block-43') {
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
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon' && e.target.className !== 'div-block-43') {
            openPopupContainer(i, 1, 'Transform')
        }
    })
}

for (let i = 0; i < $('#tab3 .item-container').length; i++) {
    $('#tab3 .item-container').eq(i).click(function (e) {
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon' && e.target.className !== 'div-block-43') {
            openPopupContainer(i, 2, 'Advance')
        }
    })
}

for (let i = 0; i < $('.additional-cards-container').children().length; i++) {
    $('.additional-cards-container .item-container').eq(i).click(function (e) {
        if (e.target.id !== 'plus-icon' && e.target.id !== 'minus-icon' && e.target.className !== 'div-block-30') {
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
    let name = $('.additional-cards-container .item-container .card-name').eq(i - 1).text();
    if (typeof estimData.additionalOptions.find(elem => elem === name) !== 'undefined') {
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
        for (let k = 0; k < $('.collection-list-4 .w-dyn-item').length; k++) {
            if ($('.collection-list-4 .w-dyn-item').eq(k).text() == name) {
                $('.collection-list-4 .w-dyn-item').eq(k).css('opacity', '0');
                setTimeout(function () {
                    $('.collection-list-4 .w-dyn-item').eq(k).css('display', 'none');
                }, 300)
            }
        }
        $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    }
    if (estimData.additionalOptions.length === 0) {
        $('.request-plus-icon').css('opacity', '0');
        $('.request-item.no-choosen-items').css('display', 'block');
    };
}

//Прибавить доп функционал(клик по плюсу в блоке 'Augment your Brand Experience')
for (let i = 1; i <= $('.additional-cards-container').children().length; i++) {
    $('.additional-cards-container .item-container').eq(i - 1).children().children('#plus-icon').click(function () {
        let name = $('.additional-cards-container .item-container .card-name').eq(i - 1).text();
        if (typeof estimData.additionalOptions.find(elem => elem.name === name) === 'undefined') {
            let price = getPrice();
            price += additionalOptions[i - 1].cost;
            price = String(price).slice(0, 2) + ' ' + String(price).slice(2);
            $('.priceincart').each(function () {
                $(this).text(price);
            });
            estimData.fullPrice = price;
            estimData.term += additionalOptions[i - 1].term;
            $('.term').text(estimData.term);
            estimData.additionalOptions.push(name);
            $('.collection-list-wrapper-static-basket .w-dyn-item').eq(i - 1).css({
                'opacity': '1',
                'display': 'block'
            });
            for (let k = 0; k < $('.collection-list-4 .w-dyn-item').length; k++) {
                if ($('.collection-list-4 .w-dyn-item').eq(k).text() == name)
                    $('.collection-list-4 .w-dyn-item').eq(k).css({
                        'opacity': '1',
                        'display': 'block'
                    });
            }
            $('#estimField').val(JSON.stringify(estimData, null, '\t'));
        }
        if (estimData.additionalOptions.length >= 1) {
            $('.chekout-bar .request-plus-icon').css('opacity', '1');
        };
        $('.request-item.no-choosen-items').css('display', 'none');
        $('.additional-cards-container .item-container').eq(i - 1).children().children('#minus-icon').removeClass('inactive');
        $(this).addClass('selected');
    });
    $('.additional-cards-container .item-container').eq(i - 1).children().children('#minus-icon').click(function () {
        removeAdditionalOption(i);
        $(this).addClass('inactive');
        $('.additional-cards-container .item-container').eq(i - 1).children().children('#plus-icon').removeClass('selected');
    });
    $('.chekout-bar .request-item-container').children('.remove-icon').eq(i - 1).click(function () {
        removeAdditionalOption(i);
        $('.additional-cards-container .item-container').eq(i - 1).children().children('#minus-icon').addClass('inactive');
        $('.additional-cards-container .item-container').eq(i - 1).children().children('#plus-icon').removeClass('selected');
    });
    $('.chekout-form .request-item-container').children('.remove-icon').eq(i - 1).click(function () {
        removeAdditionalOption(i);
        $('.additional-cards-container .item-container').eq(i - 1).children().children('#minus-icon').addClass('inactive');
        $('.additional-cards-container .item-container').eq(i - 1).children().children('#plus-icon').removeClass('selected');
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
        for (let i = 0; i < $('.tabs .plus-icon:visible').length; i++) {
            if ($('.chekout-form .branding-bundle-bottom .tab-item').eq(i).text() == name) {
                $('.chekout-form .branding-bundle-bottom .tab-item').eq(i).css({
                    'opacity': '1',
                    'display': 'block'
                });
                $('.request-items-list.main').css('max-height', '80vh');
                $('.branding-bundle-bottom .request-plus-icon').css('opacity', '1');
            }
        }
        $('.branding-bundle-bottom').css('display', 'flex')
        $('.chekout-bar .request-plus-icon').css('opacity', '1');
    } else {
        estimData.additionalOptions.find(elem => elem.name === name).amount = amount;
        let list = $('.chekout-form .tab-item:visible');
        let itemCloned = false;
        list.each(function () {
            if ($(this).text() == name && !itemCloned && $(this).attr('id') !== 'clonedItem') {
                let newItem = $(this).clone();
                newItem.attr('id', 'clonedItem')
                newItem.children('.remove-icon').each(function () {
                    let clickedItemText = $(this).parent().text();
                    for (let i = 0; i < $('.tabs .minus-icon:visible').length; i++) {
                        let tabItemText = $('.tabs .minus-icon:visible').eq(i).parent().parent().parent().children('#card-name').text();
                        if (tabItemText == clickedItemText) {
                            $(this).click(function () {
                                $('.tabs .minus-icon:visible').eq(i).trigger('click');
                            })
                        }
                    }
                });
                newItem.appendTo('.collection-list-several-options-static-basket');
                itemCloned = true;
                return false;
            }
        });
    }
    let newItem = $('.chekout-bar .w-dyn-item').first().clone()
    newItem.css({
        'display': 'flex',
        'opacity': '1'
    });
    newItem.children().children('.request-item').text(name);
    newItem.children().children('.remove-icon').click(function () {
        let clickedItemText = name;
        for (let i = 0; i < $('.tabs .minus-icon:visible').length; i++) {
            let tabItemText = $('.tabs .minus-icon:visible').eq(i).parent().parent().parent().children('#card-name').text();
            if (tabItemText == clickedItemText) {
                $('.tabs .minus-icon:visible').eq(i).trigger('click');
            }
        }
        if ($('.chekout-bar .collection-list-4 .w-dyn-item:visible').length == 0) {
            $('.chekout-bar .request-plus-icon').css('opacity', '0');
        }
    });
    newItem.prependTo('.chekout-bar .collection-list-4');
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    $('.amount').each(function () {
        if ($(this).parent().parent().children('.card-name').text() == name) {
            $(this).text(amount)
        }
    })
    $(clickedElement).parent().parent().children('#amount').text(amount);
    $(clickedElement).parent().children('.minus-icon').removeClass('inactive');
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
            // $(clickedElement).parent().parent().children('#amount').text(amount - 1);
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
            // $(clickedElement).parent().parent().children('#amount').text(amount - 1);
            estimData.additionalOptions.splice(currentElemIndex, 1);
            $(clickedElement).addClass('inactive')
        }
        if ($('.tab-item:visible').length == 1) {
            if ($('#show-Branding-Details').text() !== 'Hide details') {
                $('.request-items-list.main').css('max-height', '80px');
            }
            $('.branding-bundle-bottom').hide();
            $('.branding-bundle-bottom .request-plus-icon').css('opacity', '0');
        }
        let neededClonedItem = false;
        for (let i = 0; i < $('.tab-item:visible').length; i++) {
            if ($('.tab-item:visible').eq(i).text() == name && $('.tab-item:visible').eq(i).attr('id') == 'clonedItem') {
                neededClonedItem = true;
            }
        }
        if (neededClonedItem) {
            for (let i = 0; i < $('.tab-item:visible').length; i++) {
                let currentTabItem = $('.tab-item:visible').eq(i);
                if (currentTabItem.text() == name) {
                    if (currentTabItem.attr('id') === 'clonedItem') {
                        currentTabItem.remove()
                        break;
                    }
                }
            }
        } else {
            for (let i = 0; i < $('.tab-item:visible').length; i++) {
                let currentTabItem = $('.tab-item:visible').eq(i);
                if (currentTabItem.text() == name) {
                    currentTabItem.css({
                        'opacity': '0',
                        'display': 'none'
                    })
                    break;
                }
            }
        }
        for (let i = 0; i < $('.chekout-bar .w-dyn-item:visible').length; i++) {
            if ($('.chekout-bar .w-dyn-item:visible').eq(i).text() == name) {
                $('.chekout-bar .w-dyn-item:visible').eq(i).remove()
                break;
            }
        }
        if ($('.chekout-bar .collection-list-4 .w-dyn-item:visible').length == 0) {
            $('.chekout-bar .request-plus-icon').css('opacity', '0');
        }
        $('.amount').each(function () {
            if ($(this).parent().parent().children('.card-name').text() == name) {
                $(this).text(amount - 1)
            }
        })
        $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    }
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

for (let i = 0; i < $('.tabs .minus-icon:visible').length; i++) {
    if ($('.tabs .minus-icon:visible').eq(i).parent().parent().parent().children('#card-name').text() == $('.collection-list-several-options-static-basket .remove-icon').eq(i).parent().text()) {
        $('.collection-list-several-options-static-basket .remove-icon').eq(i).click(function () {
            $('.tabs .minus-icon:visible').eq(i).trigger('click');
        })
    }
}

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
    $('.picked-plan-icon').css({'top': "16px", 'bottom': 'unset'});
    estimData.plan = 'Start';
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    currentBundle = 1;
    if ($('#show-Branding-Details').text() == 'Hide details') {
        handleBrandingBundleDetails(1)
    }
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
    $('.picked-plan-icon').css({'top': "40%", 'bottom': 'unset'});
    estimData.plan = 'Transform';
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    currentBundle = 2;
    if ($('#show-Branding-Details').text() == 'Hide details') {
        handleBrandingBundleDetails(2)
    }
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
    $('.picked-plan-icon').css({'top': "unset", 'bottom': '16px'});
    estimData.plan = 'Advance';
    $('#estimField').val(JSON.stringify(estimData, null, '\t'));
    currentBundle = 3;
    if ($('#show-Branding-Details').text() == 'Hide details') {
        handleBrandingBundleDetails(3)
    }
});

function handleCookieBar() {
    if (Cookies.get('cookie-accepted') == 'true') {
        $('.cookie-banner').css('display', 'none');
    } else {
        $('.cookie-banner').css('display', 'flex');
    }
}
handleCookieBar()
document.querySelector('.cookie-btn').addEventListener('click', function () {
    Cookies.set('cookie-accepted', 'true')
});

let currentBundle = 2;

function handleBrandingBundleDetails(currentBundle) {
    if (currentBundle == 1) {
        $('#first-bundle-collection').removeClass('hidden');
        $('#second-bundle-collection').addClass('hidden');
        $('#third-bundle-collection').addClass('hidden');
    } else if (currentBundle == 2) {
        $('#first-bundle-collection').addClass('hidden');
        $('#second-bundle-collection').removeClass('hidden');
        $('#third-bundle-collection').addClass('hidden');
    } else if (currentBundle == 3) {
        $('#first-bundle-collection').addClass('hidden');
        $('#second-bundle-collection').addClass('hidden');
        $('#third-bundle-collection').removeClass('hidden');
    }
}

$('#show-Branding-Details').click(function () {
    if ($(this).text() == 'Show details') {
        $(this).text('Hide details')
        if ($('.branding-bundle-bottom .tab-item:visible').length == 0) {
            $('.branding-bundle-bottom').hide();
        }
        $('.request-items-list.main').css('max-height', '80vh')
        handleBrandingBundleDetails(currentBundle)
        if (window.innerWidth > 480) {
            $('#first-bundle-collection').css({
                'max-height': '80vh',
                'margin-top': '50px'
            })
            $('#second-bundle-collection').css({
                'max-height': '80vh',
                'margin-top': '50px'
            })
            $('#third-bundle-collection').css({
                'max-height': '80vh',
                'margin-top': '50px'
            })
        } else {
            $('#first-bundle-collection').css({
                'max-height': '80vh',
                'margin-top': '8px'
            })
            $('#second-bundle-collection').css({
                'max-height': '80vh',
                'margin-top': '8px'
            })
            $('#third-bundle-collection').css({
                'max-height': '80vh',
                'margin-top': '8px'
            })
        }        
    } else {
        $(this).text('Show details')
        if ($('.branding-bundle-bottom .tab-item:visible').length !== 0) {
            $('#first-bundle-collection').css({
                'max-height': '0',
                'margin-top': '0'
            })
            $('#second-bundle-collection').css({
                'max-height': '0',
                'margin-top': '0'
            })
            $('#third-bundle-collection').css({
                'max-height': '0',
                'margin-top': '0'
            })
        } else {
            $('.request-items-list.main').css('max-height', '80px')
            setTimeout(() => {
                $('#first-bundle-collection').addClass('hidden');
                $('#second-bundle-collection').addClass('hidden');
                $('#third-bundle-collection').addClass('hidden');
            }, 300)
        }
    }
});

$('.mh-menu-icon').click(function () {
    $('.mobile-header').toggleClass('active')
})

$('.close-success-btn').click(function () {
    $('.w-form-done').hide();
})
