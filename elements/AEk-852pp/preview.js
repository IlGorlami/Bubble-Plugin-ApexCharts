function(instance, properties) {

    let getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    let loadJS = function(url, implementationCode, location){
        var scriptTag = document.createElement('script');
        scriptTag.src = url;

        scriptTag.onload = implementationCode;
        scriptTag.onreadystatechange = implementationCode;

        location.appendChild(scriptTag);
    };
    let apexChartPreview = function(){

        //Get all the keys but Bubble property
        let keys = Object.keys(properties).filter(word => word !== "bubble" && !word.includes("not_"));

        let options = {};

        keys.forEach(key => {
            if (properties[key]) {
                options[key] = JSON.parse(properties[key]);
            }
        });

    if (options.tooltip) {
        if (options.tooltip.x) {

            if (options.tooltip.x.formatter) {
                options.tooltip.x.formatter = eval("(" + options.tooltip.x.formatter + ")");
            }
        }

        if (options.tooltip.y) {
            if (options.tooltip.y.formatter) {
                options.tooltip.y.formatter = eval("(" + options.tooltip.y.formatter + ")");
            }
            if (options.tooltip.y.title) {
                options.tooltip.y.title.formatter = eval("(" + options.tooltip.y.title.formatter + ")");
            }
        }
    }


    if (options.dataLabels) {

        if (options.dataLabels.formatter) {
            options.dataLabels.formatter = eval("(" + options.dataLabels.formatter + ")");
        }
    }

    if (options.xaxis) {

        if (options.xaxis.labels) {
            if (options.xaxis.labels.formatter) {
                options.xaxis.labels.formatter = eval("(" + options.xaxis.labels.formatter + ")");
            }
        }
    }

    if (options.yaxis) {

        if (options.yaxis.labels) {
            if (options.yaxis.labels.formatter) {
                options.yaxis.labels.formatter = eval("(" + options.yaxis.labels.formatter + ")");
            }
        }
    }


        var container = document.createElement('div');

        // Append elements
        instance.canvas.appendChild(container);
        var apexChart = new ApexCharts(container, options);
        apexChart.render();
    }
    loadJS('https://cdn.jsdelivr.net/npm/apexcharts@3.28.1', apexChartPreview, document.body);


}