function(instance, properties, context) {

    let seriesMaxCount = 6;

    instance.xAxisCategories = properties.xAxisDatas.get(0, properties.xAxisDatas.length());

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
            item.name = properties["serieName" + i]
            item.data = properties["serieDatas" + i].get(0,properties["serieDatas" + i].length())
            formattedDataList.push(item)
        }
    }

    options.series = formattedDataList;
    options.xaxis.categories = instance.xAxisCategories;
    options.chart["events"] = {
        "updated" :   function(chartContext, config) { 
            instance.triggerEvent("updated");
        }
    }
    
    if (properties.dataFormattedText) {
        options.dataLabels.formatter = function(val) {return eval(properties.dataFormattedText)};
    }

    if (!instance.data.isInitialized) {

        // Construction
        instance.data.container = document.createElement('div');

        // Append elements
        instance.canvas.appendChild(instance.data.container);
        instance.data.chart = instance.data.construct(instance.canvas, options);


        // Initialization completed
        instance.data.isInitialized = true;

    } else {

        if (options !== instance.data.options) {
            instance.data.chart.updateOptions(options);
        }

    }


    // Save options
    instance.data.options = options;

}