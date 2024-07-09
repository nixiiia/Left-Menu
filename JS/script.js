// Проверка на тип устройства для адаптации меню

let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  IOS: function () {
    return navigator.userAgent.match(/IPhone|IPad|IPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.IOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const body = document.querySelector('body');

if (isMobile.any()) {
  body.classList.add('touch');
  const arrow = document.querySelectorAll('.menu__btn');
  for (i = 0; i < arrow.length; i++) {
    const thisLink = arrow[i].previousElementSibling;
    const subMenu = arrow[i].nextElementSibling;
    const thisArrow = arrow[i];

    arrow[i].addEventListener('click', function () {
      subMenu.classList.toggle('open');
    });
  }
} else {
  body.classList.add('mouse');
}

// Скрытие и раскрытие левого меню
// Логика для тоггла на вечное скрытие/раскрытие левого меню

const sidebar = document.querySelector('.sidebar');
const hideSubtitle = document.querySelectorAll('.menu__subtitle');

document.addEventListener('DOMContentLoaded', function () {
  const isCollapsed = localStorage.getItem('isCollapsed') === 'true';
  document.getElementById('toggle-menu').checked = isCollapsed;

  if (isCollapsed) {
    sidebar.classList.add('sidebar-small');
    hideSubtitle.forEach((sub) => sub.classList.add('hide__subtitle'));
  } else {
    sidebar.classList.remove('sidebar-small');
    hideSubtitle.forEach((sub) => sub.classList.remove('hide__subtitle'));
  }
});

function checkLeftMenu() {
  const hideBtn = document.querySelector('.showButton');

  hideBtn.classList.toggle('hideBtn');
  sidebar.classList.toggle('sidebar-small');

  hideSubtitle.forEach((sub) => sub.classList.toggle('hide__subtitle'));
}

function setDefaultMenuState() {
  const checkbox = document.getElementById('toggle-menu');
  localStorage.setItem('isCollapsed', checkbox.checked);

  if (checkbox.checked) {
    sidebar.classList.add('sidebar-small');
    hideSubtitle.forEach((sub) => sub.classList.add('hide__subtitle'));
  } else {
    sidebar.classList.remove('sidebar-small');
    hideSubtitle.forEach((sub) => sub.classList.remove('hide__subtitle'));
  }
}

// Логика отображения новых уведомлений и согласований, с проверкой
// (если новых нет, то не ярлык отображается)

function updateNotificationCount(count) {
  const notificationsCount = document.getElementById('notifications');
  if (count > 0) {
    notificationsCount.textContent = count;
    notificationsCount.classList.remove('notifications-count-empty');
  } else {
    notificationsCount.classList.add('notifications-count-empty');
  }
}

function updateApprovalCount(count) {
  const approvalCount = document.getElementById('approvals');
  if (count > 0) {
    approvalCount.textContent = count;
    approvalCount.classList.remove('notifications-count-empty');
  } else {
    approvalCount.classList.add('notifications-count-empty');
  }
}

// Сюда передаем данные об уведомлениях

updateNotificationCount(5);
updateApprovalCount(48);
