import { onMounted, ref, unref } from "vue";
import * as d3 from "d3";
import { generateRandomData } from "./utils";

export function useD3() {
  let svg: any = ref(null);
  let line: any = ref(null);
  let width: any = undefined;
  let height = undefined;
  let xScale: any;
  let yScale: any;
  // 生成递增的 ROC 数据
  onMounted(() => {
    // 设置图表的宽度和高度
    const margin = { top: 20, right: 200, bottom: 50, left: 50 };
    width = 700 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

    // 创建 SVG 元素
    svg.value = d3
      .select("#d3El")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 创建比例尺
    xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);
    yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    // 创建线条生成器
    line.value = d3
      .line()
      .x((d) => xScale(d.fpr))
      .y((d) => yScale(d.tpr));

    // 添加基线
    svg.value
      .append("line")
      .attr("x1", 0) // X-coordinate of the starting point
      .attr("y1", height) // Y-coordinate of the starting point
      .attr("x2", width) // X-coordinate of the ending point
      .attr("y2", 0) // Y-coordinate of the ending point
      .style("stroke", "#bdd9a9") // Color of the baseline
      .style("stroke-width", 1); // Width of the baseline

    // 添加 X 轴
    var xAxis = svg.value
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickValues(d3.range(0.2, 1.2, 0.2)));

    // 设置X轴轴线颜色
    xAxis.select("path").style("stroke", "#000");
    // 设置X轴刻度文本颜色
    xAxis.selectAll(".tick text").style("fill", "#000");
    // 设置X轴刻度线颜色
    xAxis.selectAll(".tick line").style("stroke", "#000");

    // 添加 Y 轴
    var yAxis = svg.value.append("g").call(d3.axisLeft(yScale).tickValues(d3.range(0, 1.2, 0.2)));
    // 设置Y轴轴线颜色
    yAxis.select("path").style("stroke", "#000");
    // 设置Y轴刻度文本颜色
    yAxis.selectAll(".tick text").style("fill", "#000");
    // 设置Y轴刻度线颜色
    yAxis.selectAll(".tick line").style("stroke", "#000");

    // 添加 X 轴标签
    svg.value
      .append("text")
      .attr("class", "x-axis-label")
      .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("特异度");

    // // 添加 Y 轴标签
    svg.value
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("灵敏度");

    // 添加 X 轴网格线
    svg.value
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickValues(d3.range(0, 1.2, 0.2)).tickSize(-height).tickFormat(""));

    // 添加 Y 轴网格线
    svg.value
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickValues(d3.range(0, 1.2, 0.2)).tickSize(-width).tickFormat(""));

    const legendData = [
      { label: "类目 1", color: "#409EFF" },
      { label: "类目 2", color: "#E3217F" },
      { label: "类目 3", color: "#2ca02c" },
      { label: "类目 4", color: "#d62728" },
      { label: "类目 5", color: "#9467bd" },
    ];
    const legendTopMargin = 20; // Set the desired top margin
    const legend = svg.value
      .selectAll(".legend")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${width + 10},${legendTopMargin + i * 40})`); // Adjusted translation

    legend
      .append("rect")
      .attr("x", 10) // Adjusted x position
      // .attr('y', 10) // Adjusted x position
      .attr("width", 50)
      .attr("height", 8)
      .attr("rx", 2) // Rounded corners, adjust as needed
      .attr("ry", 2) // Rounded corners, adjust as needed
      .style("fill", (d) => d.color);

    legend
      .append("text")
      .attr("x", 80) // Adjusted x position
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "start") // Adjusted text-anchor
      .text((d) => d.label);

    // 在图表画线
    legendData.forEach((data, index) => {
      const linePath = svg.value
        .append("path")
        .data([generateRandomData()])
        .attr("class", `line line${index + 1}`)
        .attr("d", line.value)
        .attr("data-legend", data.label) // 添加图例标签到路径数据中
        .style("stroke", data.color);

      linePath.on("mouseover", function (event, d) {
        const [mouseX, mouseY] = d3.mouse(this);

        // Convert mouse coordinates to data values using scales
        const xValue = xScale.invert(mouseX);
        const yValue = yScale.invert(mouseY);

        // console.log(`Mouseover at x: ${xValue}, y: ${yValue}`);

        // Add auxiliary lines
        svg.value.select(".x-aux-line").remove();
        svg.value.select(".y-aux-line").remove();
        svg.value.select(".tooltip").remove();

        // Vertical auxiliary line
        const xAuxLine = svg.value
          .append("line")
          .attr("class", "x-aux-line")
          .attr("x1", mouseX)
          .attr("y1", 0)
          .attr("x2", mouseX)
          .attr("y2", height)
          .style("stroke", "#dd001b")
          .style("stroke-dasharray", "3,3");

        // Horizontal auxiliary line
        const yAuxLine = svg.value
          .append("line")
          .attr("class", "y-aux-line")
          .attr("x1", 0)
          .attr("y1", mouseY)
          .attr("x2", width)
          .attr("y2", mouseY)
          .style("stroke", "#dd001b")
          .style("stroke-dasharray", "3,3");

        // Display x, y values near the mouse cursor
        const tooltip = svg.value.append("g").attr("class", "tooltip");

        tooltip
          .append("text")
          .attr("x", mouseX + 10)
          .attr("y", mouseY - 10)
          .text(`${data.label}:(${xValue.toFixed(2)}, ${yValue.toFixed(2)})`)
          .style("fill", "#dd001b");

        // svg.value.on("mouseout", function () {
        //   xAuxLine.remove();
        //   yAuxLine.remove();
        //   tooltip.remove();
        // });
        setTimeout(() => {
          xAuxLine.remove();
          yAuxLine.remove();
          tooltip.remove();
        }, 2000);
      });
    });
  });

  // 更新图表
  const updateChart = (legendData, xLabel = "", yLabel = "") => {
    // 更新 X 轴标签
    svg.value.select(".x-axis-label").text(xLabel);
    // 更新 Y 轴标签
    svg.value.select(".y-axis-label").text(yLabel);

    svg.value.selectAll(".line").remove();
    svg.value.selectAll(".legend").remove();

    const legendTopMargin = 20; // Set the desired top margin
    const legend = svg.value
      .selectAll(".legend")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${width + 10},${legendTopMargin + i * 40})`); // Adjusted translation
    legend
      .append("rect")
      .attr("x", 10) // Adjusted x position
      // .attr('y', 10) // Adjusted x position
      .attr("width", 50)
      .attr("height", 8)
      .attr("rx", 2) // Rounded corners, adjust as needed
      .attr("ry", 2) // Rounded corners, adjust as needed
      .style("fill", (d) => d.color);
    legend
      .append("text")
      .attr("x", 80) // Adjusted x position
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "start") // Adjusted text-anchor
      .text((d) => d.label);
    // 在图表画线
    legendData.forEach((data, index) => {
      const linePath = svg.value
        .append("path")
        .data([data.data])
        .attr("class", `line line${index + 1}`)
        .attr("d", line.value)
        .attr("data-legend", data.label) // 添加图例标签到路径数据中
        .style("stroke", data.color); // 设置线条颜色

      linePath.on("mouseover", function (event, d) {
        const [mouseX, mouseY] = d3.mouse(this);

        // Convert mouse coordinates to data values using scales
        const xValue = xScale.invert(mouseX);
        const yValue = yScale.invert(mouseY);

        console.log(`Mouseover at x: ${xValue}, y: ${yValue}`);

        // Add auxiliary lines
        svg.value.select(".x-aux-line").remove();
        svg.value.select(".y-aux-line").remove();
        svg.value.select(".tooltip").remove();

        // Vertical auxiliary line
        const xAuxLine = svg.value
          .append("line")
          .attr("class", "x-aux-line")
          .attr("x1", mouseX)
          .attr("y1", 0)
          .attr("x2", mouseX)
          .attr("y2", height)
          .style("stroke", "#dd001b")
          .style("stroke-dasharray", "3,3");

        // Horizontal auxiliary line
        const yAuxLine = svg.value
          .append("line")
          .attr("class", "y-aux-line")
          .attr("x1", 0)
          .attr("y1", mouseY)
          .attr("x2", width)
          .attr("y2", mouseY)
          .style("stroke", "#dd001b")
          .style("stroke-dasharray", "3,3");

        // Display x, y values near the mouse cursor
        const tooltip = svg.value.append("g").attr("class", "tooltip");

        tooltip
          .append("text")
          .attr("x", mouseX + 10)
          .attr("y", mouseY - 10)
          .text(`(${xValue.toFixed(2)}, ${yValue.toFixed(2)})`)
          .style("fill", "#dd001b");

        setTimeout(() => {
          xAuxLine.remove();
          yAuxLine.remove();
          tooltip.remove();
        }, 2000);
      });
    });
  };
  return { svg, line, updateChart };
}
