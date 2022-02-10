var css = `
td{
  padding: 4px;
  vertical-align: top;
  text-align: left;
}

div.layout{
  padding: 8px 4px 0 2px;
  font-size: 13px;
}

h4
{
  font-size: 16px;
  color: #73AE57;
  padding: 0px 0px;
  margin: 6px 0px 0px 0px;
}

h3.banner, h4.banner{
  display: block; 
  background-color: #379CDB; 
  padding: .5em; 
  margin: 0px;  
  color: white; 
  font-weight: 100; 
  text-align: left;
}

div.layout a{
  color: #26A2F0;
  border: 1px solid #efefef;
  background: #fff;
  padding: 4px 0px 0px;
  margin: 0px 0px 4px 0px;
  cursor: pointer;
  border-radius: 6px;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  height: 26px; 
  font-weight: 500;
  font-size: 15px;
  width: 174px;
  display: inline-block;
  text-align: center;
}

div.layout a:hover{
  background: #efefef;
  cursor: hand;
  text-decoration: none;
}
div.layout a:active {
  position:relative;
  top:1px;
}

div.layout input {
	height: 22px;
}

div.hide-content{
  display: none;	
}

div.outline-border{
 border-style:solid;
 border-color:#c6d9ec;
 border-width:1px;
}
.button {
  box-shadow: 0px 0px 0px 2px #9fb4f2;
  background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
  background-color:#7892c2;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.button:hover {
	background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
	background-color:#476e9e;
}
.button:active {
	position:relative;
	top:1px;
}
.spotfire-popup-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}

.spotfire-popup {
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 40%;
  position: relative;
  transition: all 5s ease-in-out;
}

.spotfire-popup .spotfire-popup-close {
  position: absolute;
  top: 0px;
  right: 10px;
  transition: all 200ms;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  color: #000;
}
.spotfire-popup-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}

.spotfire-popup {
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 40%;
  position: relative;
  transition: all 5s ease-in-out;
}

.spotfire-popup .spotfire-popup-close {
  position: absolute;
  top: 0px;
  right: 10px;
  transition: all 200ms;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  color: #000;
}
.spotfire-popup .spotfire-popup-close:hover {
  color: #222;
}
.spotfire-popup .spotfire-popup-content {
  max-height: 30%;
  overflow: auto;
}
div.accordion-container ul {
    list-style: none;
    padding: 0;
}

div.accordion-container ul .inner-visible {
	display: block !important;
	visible: visible;
	padding-left: 1em;
	overflow: hidden;
}

div.accordion-container ul .inner-hidden {
	visibility:hidden !important;
	padding:0px !important;
	border:0px !important;
	height:0px !important;
}
  
div.accordion-container li {
	margin: .5em 0;
}
  
div.accordion-container li div.toggle {
	width: 98%;
	display: block;
	background-color: #ebfaeb;
	padding: .75em;
	border-radius: 0.15em;
	transition: background .3s ease;
	cursor: pointer;
}

div.accordion-container li div.toggle:hover {
	background-color: #adebad;
}

/* Tooltip container */

a.custom-tooltips {
	position: relative;
	display: inline;
}

a.custom-tooltips span {
	position: absolute;
	color: #FFFFFF;
	width: 200px;
	background: #000000;
	text-align: center;
	visibility: hidden;
	border-radius: 6px;
	line-spacing: 8px;
	padding: 6px;
}

a.custom-tooltips span:after {
	content: '';
	position: absolute;
	top: 100%;
	left: 35%;
	margin-left: -8px;
	width: 0;
	height: 0;
	border-top: 8px solid #000000;
	border-right: 8px solid transparent;
	border-left: 8px solid transparent;
}

a:hover.custom-tooltips span {
	visibility: visible;
	opacity: 0.8;
	bottom: 30px;
	left: 50%;
	margin-left: -76px;
	z-index: 999;
}

div.margins{
	margin: 50px 0px 0px 50px;
}
a.custom-tooltips {
	position: relative;
	display: inline;
}

a.custom-tooltips span {
	position: absolute;
	color: #FFFFFF;
	width: 200px;
	background: #000000;
	text-align: center;
	visibility: hidden;
	border-radius: 6px;
	line-spacing: 8px;
	padding: 6px;
}

a.custom-tooltips span:after {
	content: '';
	position: absolute;
	top: 100%;
	left: 35%;
	margin-left: -8px;
	width: 0;
	height: 0;
	border-top: 8px solid #000000;
	border-right: 8px solid transparent;
	border-left: 8px solid transparent;
}

a:hover.custom-tooltips span {
	visibility: visible;
	opacity: 0.8;
	bottom: 30px;
	left: 50%;
	margin-left: -76px;
	z-index: 999;
}

div.margins{
	margin: 50px 0px 0px 50px;
}





`;

// Inject the CSS into an HTML tag which has the id StyleDiv
$("<style/>").text(css).appendTo($("#styleDiv"));

$("#spotfire-popup").click(function (event) {
  event.preventDefault();
  $(".spotfire-popup-overlay").css("visibility", "visible");
  $(".spotfire-popup-overlay").css("opacity", 1);
});

$(".spotfire-popup-close").click(function (event) {
  event.preventDefault();
  $(".spotfire-popup-overlay").css("visibility", "hidden");
  $(".spotfire-popup-overlay").css("opacity", 0);
});
