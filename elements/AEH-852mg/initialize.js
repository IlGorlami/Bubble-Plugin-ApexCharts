function(instance, context) {
  instance.canvas.style.overflow = 'visible'  
  instance.data.construct = (container,options) => {
    var apexChart = new ApexCharts(container, options);
    apexChart.render();
    return apexChart;
  }
  instance.data.isInitialized = false;
}