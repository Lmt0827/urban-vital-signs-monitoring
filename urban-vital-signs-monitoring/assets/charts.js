// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var accent4 = style.getPropertyValue('--accent4').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Keyword Cloud ---
  var keywords = [
    { text: '城市体检', value: 95, color: '#dc3545' },
    { text: '生命线安全工程', value: 90, color: '#0d6efd' },
    { text: '实时监测', value: 85, color: '#198754' },
    { text: '动态预警', value: 82, color: '#fd7e14' },
    { text: '城市更新', value: 80, color: '#6f42c1' },
    { text: '韧性城市', value: 78, color: '#0d6efd' },
    { text: 'CIM基础平台', value: 72, color: '#198754' },
    { text: '四级预警', value: 70, color: '#dc3545' },
    { text: 'AI赋能', value: 68, color: '#fd7e14' },
    { text: '数字孪生', value: 65, color: '#6f42c1' },
    { text: '指标体系', value: 88, color: '#0d6efd' },
    { text: '安全韧性', value: 83, color: '#dc3545' },
    { text: '智慧城市', value: 75, color: '#198754' },
    { text: '地下管网', value: 60, color: '#fd7e14' },
    { text: '传感器网络', value: 58, color: '#6f42c1' },
    { text: '数据共享', value: 55, color: '#0d6efd' },
    { text: '闭环机制', value: 52, color: '#198754' },
    { text: 'ISO标准', value: 50, color: '#6f42c1' },
    { text: 'ESG指标', value: 48, color: '#fd7e14' },
    { text: '社区参与', value: 45, color: '#dc3545' },
    { text: '空间智能', value: 42, color: '#0d6efd' },
    { text: '15分钟生活圈', value: 40, color: '#198754' },
    { text: '海绵城市', value: 38, color: '#6f42c1' },
    { text: '老旧小区改造', value: 55, color: '#dc3545' },
    { text: '公共服务', value: 62, color: '#0d6efd' },
    { text: '物联网', value: 56, color: '#198754' },
    { text: '开放数据', value: 44, color: '#fd7e14' },
    { text: 'CitiVerse', value: 40, color: '#6f42c1' },
    { text: '全维度诊断', value: 46, color: '#dc3545' },
    { text: '城市体征', value: 92, color: '#0d6efd' }
  ];

  var cloudEl = document.getElementById('keyword-cloud');
  if (cloudEl) {
    keywords.sort(function(a, b) { return b.value - a.value; });
    keywords.forEach(function(kw) {
      var span = document.createElement('span');
      span.className = 'keyword-item';
      span.textContent = kw.text;
      var fontSize = 0.7 + (kw.value / 100) * 0.8;
      span.style.fontSize = fontSize + 'rem';
      span.style.background = kw.color;
      span.style.opacity = 0.7 + (kw.value / 100) * 0.3;
      cloudEl.appendChild(span);
    });
  }

  // --- Chart: Dimension Comparison (Radar) ---
  var dimChart = echarts.init(document.getElementById('chart-dimension'), null, { renderer: 'svg' });
  dimChart.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { data: ['国内政策', '国外政策'], bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    radar: {
      indicator: [
        { name: '公共安全', max: 100 },
        { name: '基础设施', max: 100 },
        { name: '生态环境', max: 100 },
        { name: '公共服务', max: 100 },
        { name: '数据治理', max: 100 },
        { name: 'AI/智能化', max: 100 },
        { name: '社区参与', max: 100 },
        { name: '标准体系', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          name: '国内政策',
          value: [95, 92, 75, 80, 70, 72, 45, 88],
          areaStyle: { color: accent + '33' },
          lineStyle: { color: accent, width: 2 },
          itemStyle: { color: accent }
        },
        {
          name: '国外政策',
          value: [70, 65, 85, 82, 80, 78, 75, 82],
          areaStyle: { color: accent2 + '33' },
          lineStyle: { color: accent2, width: 2 },
          itemStyle: { color: accent2 }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { dimChart.resize(); });

  // --- Chart: Indicator Count Comparison (Bar) ---
  var indChart = echarts.init(document.getElementById('chart-indicators'), null, { renderer: 'svg' });
  indChart.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['国内', '国外'], bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 120, right: 40, top: 20, bottom: 50 },
    xAxis: { type: 'value', axisLine: { lineStyle: { color: rule } }, axisLabel: { color: muted }, splitLine: { lineStyle: { color: rule, type: 'dashed' } } },
    yAxis: {
      type: 'category',
      data: ['GB/T 43048', 'GB/T 47678.10', '城市体检指标', 'ISO 37120', 'U4SSC KPIs', 'Happy City Index', 'ISO 37125', '重庆落地指标'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 11 }
    },
    series: [
      {
        name: '国内',
        type: 'bar',
        data: [58, 42, 89, 0, 0, 0, 0, 4476],
        itemStyle: { color: accent, borderRadius: [0, 4, 4, 0] },
        barMaxWidth: 20
      },
      {
        name: '国外',
        type: 'bar',
        data: [0, 0, 0, 104, 100, 64, 252, 0],
        itemStyle: { color: accent2, borderRadius: [0, 4, 4, 0] },
        barMaxWidth: 20
      }
    ]
  });
  window.addEventListener('resize', function() { indChart.resize(); });

  // --- Chart: Policy Trend (Line) ---
  var trendChart = echarts.init(document.getElementById('chart-trend'), null, { renderer: 'svg' });
  trendChart.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['国内政策', '国内标准', '国外政策', '国外标准'], bottom: 0, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 50, right: 20, top: 20, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['2024-Q3', '2024-Q4', '2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4', '2026-Q1', '2026-Q2'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: '文件数量',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '国内政策',
        type: 'line',
        data: [1, 2, 1, 2, 1, 3, 2, 5],
        smooth: true,
        lineStyle: { color: accent, width: 2 },
        itemStyle: { color: accent },
        areaStyle: { color: accent + '15' }
      },
      {
        name: '国内标准',
        type: 'line',
        data: [0, 1, 1, 0, 1, 1, 2, 3],
        smooth: true,
        lineStyle: { color: accent3, width: 2 },
        itemStyle: { color: accent3 },
        areaStyle: { color: accent3 + '15' }
      },
      {
        name: '国外政策',
        type: 'line',
        data: [1, 1, 2, 1, 1, 2, 2, 3],
        smooth: true,
        lineStyle: { color: accent2, width: 2 },
        itemStyle: { color: accent2 },
        areaStyle: { color: accent2 + '15' }
      },
      {
        name: '国外标准',
        type: 'line',
        data: [0, 1, 1, 0, 1, 0, 1, 2],
        smooth: true,
        lineStyle: { color: accent4, width: 2 },
        itemStyle: { color: accent4 },
        areaStyle: { color: accent4 + '15' }
      }
    ]
  });
  window.addEventListener('resize', function() { trendChart.resize(); });

  // --- Chart: Hotspot Word Frequency (Horizontal Bar) ---
  var hotChart = echarts.init(document.getElementById('chart-hotspot'), null, { renderer: 'svg' });
  hotChart.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: 100, right: 40, top: 10, bottom: 30 },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: ['城市体征监测', '城市体检', '生命线安全', '实时监测', '动态预警', '指标体系', '韧性城市', 'AI赋能', '数字孪生', 'CIM平台', '传感器网络', '数据共享', '老旧小区改造', '社区参与', '开放数据'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [92, 95, 90, 85, 82, 88, 78, 68, 65, 72, 58, 55, 55, 45, 44],
      itemStyle: {
        color: function(params) {
          var colors = [accent, accent3, accent, accent2, accent3, accent, accent2, accent4, accent + '99', accent2, accent + '99', accent2, accent3, accent4, accent2];
          return colors[params.dataIndex] || accent;
        },
        borderRadius: [0, 4, 4, 0]
      },
      barMaxWidth: 18,
      label: { show: true, position: 'right', color: muted, fontSize: 10 }
    }]
  });
  window.addEventListener('resize', function() { hotChart.resize(); });

  // --- Chart: Warning Mechanism Comparison (Grouped Bar) ---
  var warnChart = echarts.init(document.getElementById('chart-warning'), null, { renderer: 'svg' });
  warnChart.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['国内', '国外'], bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 50, right: 20, top: 20, bottom: 50 },
    xAxis: {
      type: 'category',
      data: ['实时监测', '动态预警', '四级预警', '传感器密度', '数据延迟要求', 'AI分析', '社区参与', '开放数据'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 10, rotate: 25 }
    },
    yAxis: {
      type: 'value',
      name: '重视程度',
      max: 100,
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '国内',
        type: 'bar',
        data: [95, 92, 90, 85, 88, 72, 45, 40],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 25
      },
      {
        name: '国外',
        type: 'bar',
        data: [70, 65, 50, 75, 60, 78, 80, 85],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] },
        barMaxWidth: 25
      }
    ]
  });
  window.addEventListener('resize', function() { warnChart.resize(); });
})();
