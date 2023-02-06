import data from './assets/data.json' assert { type: 'json' };

const chart = document.querySelector('#chart');

let prices = [];
data.forEach(element => {
    prices.push(element.amount);
});

let max = Math.max(...prices);

for(let i = 0; i < data.length; i++) {
    const chartElementBox = document.createElement('div');
    chartElementBox.classList.add('chart-element-box');
    if(data[i].amount === max) {
        chartElementBox.classList.add('highest');
    }

    const dayOfWeek = document.createElement('p');
    dayOfWeek.innerText = data[i].day;
    dayOfWeek.classList.add('chart-element-day');
    chartElementBox.appendChild(dayOfWeek);

    const chartLine = document.createElement('div');
    chartLine.style.height = data[i].amount + '%';
    chartLine.classList.add('chart-element-line');
    chartLine.setAttribute('data-amount', data[i].amount.toString());
    chartElementBox.appendChild(chartLine);

    chart.append(chartElementBox);
}

const total = prices.reduce((total, amount) => {
    return total + amount;
}, 0);
document.querySelector('#total').innerText = '$' + total;


let label;
function createLabel(e) {
    label = document.createElement('div');
    label.classList.add('chart-element-label');
    label.innerText = '$' + e.target.getAttribute('data-amount');
    e.target.style.position = 'relative';
    e.target.appendChild(label);
}

function removeLabel(e) {
    e.target.style.removeProperty('position');
    e.target.removeChild(label);
}

document.querySelectorAll('.chart-element-line').forEach(element => {
    element.addEventListener('mouseover', createLabel);
    element.addEventListener('mouseout', removeLabel);
});