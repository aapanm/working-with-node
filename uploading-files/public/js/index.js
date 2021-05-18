$(document).ready(function (e) {
  console.log("ready");

  const file = document.getElementById("fileUpload");

  file.addEventListener("change", () => {
    document.getElementById("submitBtn").style.display = "block";
  });
});
