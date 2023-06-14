console.log("Hello Back to School!");
//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard options
//3. Create a variable to store the URL - if doesn't load, might need to specify height and width
let viz;
const url =
  "https://public.tableau.com/views/EmbeddingDashboard_16867363012900/EmbeddingDashboard?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";
const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};
const exportpdfbutton = document.getElementById("exportPDF");
const exportpptbutton = document.getElementById("exportPPT");
const exportpngbutton = document.getElementById("exportPNG");
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction);

function exportPDFfunction() {
  viz.showExportPDFDialog();
}
exportpptbutton.addEventListener("click", exportPPTfunction);
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}
exportpngbutton.addEventListener("click", exportPNGfunction);
function exportPNGfunction() {
  viz.showExportImageDialog();
}
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //need to get active sheet, but this could be a dashboard or a worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  //index of the sheet you want to filter
  const sheetToFilter = sheets[0];
  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
