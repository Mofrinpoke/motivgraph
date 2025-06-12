const ctx = document.getElementById('graph').getContext('2d');
let dataPoints = [];

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'モチベーション',
      data: [],
      borderColor: 'blue',
      fill: false
    }]
  },
  options: {
    scales: {
      y: { min: -100, max: 100 }
    }
  }
});

document.getElementById('input-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const event = document.getElementById('event').value;
  const score = parseInt(document.getElementById('score').value);

  if (year && month && event && !isNaN(score)) {
    dataPoints.push({ year, month, event, score });
    updateChart();
    updateList();

    // 入力欄リセット
    document.getElementById('year').value = '';
    document.getElementById('month').value = '';
    document.getElementById('event').value = '';
    document.getElementById('score').value = '';
  }
});

document.getElementById('reset-button').addEventListener('click', function() {
  document.getElementById('year').value = '';
  document.getElementById('month').value = '';
  document.getElementById('event').value = '';
  document.getElementById('score').value = '';
});

function updateChart() {
  chart.data.labels = dataPoints.map(p => `${p.year}/${String(p.month).padStart(2, '0')}`);
  chart.data.datasets[0].data = dataPoints.map(p => p.score);
  chart.update();
}

function updateList() {
  const list = document.getElementById('event-list');
  list.innerHTML = '';
  dataPoints.forEach((p, i) => {
    const li = document.createElement('li');
    li.textContent = `${p.year}年${p.month}月: ${p.event} (${p.score})`;
    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.onclick = () => {
      dataPoints.splice(i, 1);
      updateChart();
      updateList();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

document.getElementById('download-btn').addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'motivation_graph.png';
  link.href = document.getElementById('graph').toDataURL('image/png');
  link.click();
});
