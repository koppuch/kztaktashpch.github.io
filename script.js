// ---- СОСТАВ (14 игроков) ----
const playersData = [
    { name: "Владимир Сухой", position: "Вратарь", number: 35, age: 27, info: "Рост 192 см, надёжный последний рубеж" },
    { name: "Илья Разарён", position: "Левый вингер (ЛВ)", number: 69, age: 22, info: "Скорость и дриблинг" },
    { name: "Матвей Капчито", position: "Нападающий (НАП)", number: 23, age: 18, info: "Бомбардир, 9 голов в сезоне" },
    { name: "Матвей Лога", position: "Защитник (ЗАЩ)", number: 1, age: 26, info: "Капитан, лидер обороны" },
    { name: "Никита Эверьяно", position: "Центральный полузащитник (ЦП)", number: 9, age: 23, info: "Мотор команды" },
    { name: "Артем Калашидзе", position: "Правый полузащитник (ПІВ/ППЗ)", number: 67, age: 21, info: "Креативный фланг" },
    { name: "Данила Родин", position: "Полузащитник (П3)", number: 52, age: 25, info: "Оборонец-полузащитник, универсал" },
    { name: "Алекс Флорнето", position: "Центральный полузащитник (ЦП)", number: 66, age: 28, info: "Опытный распасовщик" },
    { name: "Денис Помидрочкин", position: "Центральный атакующий полузащитник (ЦАП)", number: 6, age: 24, info: "Ключевые передачи" },
    { name: "Никита Калитен", position: "Левый защитник (ЛЗ)", number: 14, age: 23, info: "Атакующий фуллбек" },
    { name: "Александр Зайчик", position: "Центральный защитник (ЦЗ)", number: 5, age: 26, info: "Выносливый и цепкий" },
    { name: "Леонтий Масса", position: "Центральный полузащитник (Ц3)", number: 99, age: 20, info: "Молодой талант" },
    { name: "Влад Презедентов", position: "Защитник (ЗАЩ)", number: 11, age: 27, info: "Опытный крайний защитник" },
    { name: "Денис Глушаков", position: "Левый полузащитник (ЛП)", number: 10, age: 29, info: "Стандарты и дальний удар" },
    { name: "Андрей Тихонов", position: "Нападающий (НАП)", number: 20, age: 19, info: "Воспитанник клуба, подаёт надежды" }
];

// Генерация расписания на каждую субботу (апрель-июнь 2026)
function generateMatches() {
    const startDate = new Date(2026, 3, 4); // 4 апреля 2026 — суббота
    const matches = [];
    const opponents = ["Химик Дзержинск", "Торпедо-Восток", "Спартак Починки-2", "Локомотив Арзамас", "Зенит Саранск", "Динамо Восток", "Волна Восток", "Текстильщик Лукоянов"];
    for (let i = 0; i < 6; i++) {
        const matchDate = new Date(startDate);
        matchDate.setDate(startDate.getDate() + (i * 7));
        const day = matchDate.getDate().toString().padStart(2,'0');
        const month = (matchDate.getMonth()+1).toString().padStart(2,'0');
        const dateStr = `${day}.${month}.2026`;
        const opponent = opponents[i % opponents.length];
        const location = (i % 2 === 0) ? "Дома" : "В гостях";
        matches.push({
            date: dateStr + " (суббота), 17:00",
            opponent: opponent,
            location: location,
            round: `${i+1} тур`
        });
    }
    return matches;
}

const matchesData = generateMatches();

function renderPlayers() {
    const container = document.getElementById('playersContainer');
    if (!container) return;
    container.innerHTML = '';
    playersData.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.setAttribute('data-name', player.name);
        card.setAttribute('data-pos', player.position);
        card.setAttribute('data-detail', `Номер: ${player.number} | Возраст: ${player.age} | ${player.info}`);
        card.innerHTML = `
            <div class="player-img">
                <i class="fas fa-user-astronaut"></i>
            </div>
            <div class="player-info">
                <h3>${player.name}</h3>
                <span class="position">${player.position} • №${player.number}</span>
                <p style="font-size:0.75rem; margin-top:6px;"><i class="fas fa-calendar-alt"></i> ${player.age} лет</p>
            </div>
        `;
        card.addEventListener('click', () => {
            document.getElementById('modalName').innerText = player.name;
            document.getElementById('modalPos').innerHTML = `<strong>${player.position}</strong> | Номер ${player.number}`;
            document.getElementById('modalDetails').innerHTML = `Возраст: ${player.age} <br> ${player.info}`;
            document.getElementById('playerModal').style.display = 'flex';
        });
        container.appendChild(card);
    });
}

function renderMatches() {
    const container = document.getElementById('matchesContainer');
    if (!container) return;
    container.innerHTML = '';
    matchesData.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-info">
                <div class="match-date"><i class="far fa-calendar-check"></i> ${match.date}</div>
                <div class="vs"><strong>${match.opponent}</strong> <span style="background:#eee; padding:2px 10px; border-radius:20px;">${match.location}</span></div>
                <p><i class="fas fa-flag-checkered"></i> ${match.round} / Вторая высшая лига (Восток)</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Модальное окно
const modal = document.getElementById('playerModal');
const closeModal = document.querySelector('.close-modal');
if (closeModal) closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Бургер-меню
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('active'));

// Активная ссылка при скролле
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
function changeActiveLink() {
    let scrollPos = window.scrollY + 150;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollPos >= top && scrollPos < bottom && id) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', changeActiveLink);
window.addEventListener('load', changeActiveLink);

document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('active');
        }
    });
});

// Форма записи на просмотр
const trialForm = document.getElementById('trialForm');
trialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('trialName').value.trim();
    const age = document.getElementById('trialAge').value.trim();
    const phone = document.getElementById('trialPhone').value.trim();
    if (name && age && phone) {
        alert(`Спасибо, ${name}! Ваша заявка на просмотр принята. Тренер свяжется с вами по номеру ${phone} в ближайшее время. Ждём вас на стадионе в Починках!`);
        trialForm.reset();
    } else {
        alert('Пожалуйста, заполните обязательные поля: ФИО, возраст, телефон.');
    }
});

renderPlayers();
renderMatches();