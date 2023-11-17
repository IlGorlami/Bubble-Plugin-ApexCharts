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
    let yourCodeToBeCalled = function(){

        let seriesMaxCount = 6;

        // Convert Text to JSON    
        let options = JSON.parse(properties.defaultOptions);
        // Loop and add datas //
        let formattedDataList = [];
        for (let i = 1; i < seriesMaxCount; i++){
            let item = {
                name: "",
                data: []
            }
            if (properties["isUsed"+i]){
                item.name = "Data" + i
                for (let j=0; j<5; j++) {
                    item.data.push(getRandomArbitrary(0,1));
                }

                formattedDataList.push(item)

            }
        }
        options.series = formattedDataList;
        options.xaxis.categories = ["1", "2", "3", "4", "5"];

        if (properties.dataFormattedText) {
            options.dataLabels.formatter = function(val) {return eval(properties.dataFormattedText)};
        }

        var container = document.createElement('div');

        // Append elements
        instance.canvas.appendChild(container);
        var apexChart = new ApexCharts(container, options);
        apexChart.render();
    }
    loadJS('https://cdn.jsdelivr.net/npm/apexcharts@3.28.1', yourCodeToBeCalled, document.body);


}