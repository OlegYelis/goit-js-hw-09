!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),o=null;var r=function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))};t.addEventListener("click",(function(){(o=setInterval(r,1e3))&&t.setAttribute("disabled",!0)})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),clearInterval(o)}))}();
//# sourceMappingURL=01-color-switcher.fcba2c88.js.map
