(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},112:function(e,t,a){},113:function(e,t,a){},114:function(e,t,a){},123:function(e,t,a){},124:function(e,t,a){},125:function(e,t,a){},126:function(e,t,a){},127:function(e,t,a){},128:function(e,t,a){},129:function(e,t,a){},135:function(e,t,a){},136:function(e,t,a){},137:function(e,t,a){},138:function(e,t,a){},139:function(e,t,a){},145:function(e,t,a){"use strict"
a.r(t)
var n=a(0),r=a.n(n),l=a(32),c=a.n(l),o=a(66),i=a(26),s=a(8),u=a(14),f=a(24),m=a(21),p=a(19),b=a(17),v=a(20),d=Object(n.createContext)()
function h(){var e=Object(n.useContext)(d)
if(!e)throw new Error("useMedia must be used within MediaProvider")
return e}var g=function(e){function t(e){var a
return Object(u.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={matches:[]},a.mediaItems=null,a.updateMatches=a.updateMatches.bind(Object(b.a)(a)),a}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.setup()}},{key:"componentDidUpdate",value:function(e){this.props.breakpoints!==e.breakpoints&&(this.tearDown(),this.setup())}},{key:"componentWillUnmount",value:function(){this.tearDown()}},{key:"setup",value:function(){var e=this,t=this.props.breakpoints
this.mediaItems=Object.keys(t).map((function(e){return{name:e,media:window.matchMedia(t[e])}})),this.mediaItems.forEach((function(t){return t.media.addListener(e.updateMatches)})),this.updateMatches()}},{key:"tearDown",value:function(){var e=this
this.mediaItems.forEach((function(t){return t.media.removeListener(e.updateMatches)})),this.mediaItems=null}},{key:"updateMatches",value:function(){var e,t,a=this.state.matches,n=this.mediaItems.filter((function(e){return e.media.matches})).map((function(e){return e.name}))
t=a,(e=n).length===t.length&&e.every((function(e,a){return e===t[a]}))||this.setState({matches:n})}},{key:"render",value:function(){var e=this.props.children,t=this.state.matches
return r.a.createElement(d.Provider,{value:t},e)}}]),t}(r.a.Component)
g.defaultProps={breakpoints:{small:"(min-width: 768px)",medium:"(min-width: 920px)",large:"(min-width: 1200px)"}}
var y=a(2),E=a(9),O=Object(n.createContext)()
function j(){var e=Object(n.useContext)(O)
if(!e)throw new Error("useDrawers must be used within DrawersProvider")
return e}var w="toggleSidebar",_="closeSidebar",N="togglePane",R="closePane",C="toggleShortcuts",x="closeShortcuts",S={isSidebarOpen:!1,isPaneOpen:!1,isShortcutsOpen:!1}
function k(e,t){switch(t){case w:return Object(E.a)({},S,{isSidebarOpen:!e.isSidebarOpen})
case _:return Object(E.a)({},e,{isSidebarOpen:!1})
case N:return Object(E.a)({},S,{isPaneOpen:!e.isPaneOpen})
case R:return Object(E.a)({},e,{isPaneOpen:!1})
case C:return Object(E.a)({},S,{isShortcutsOpen:!e.isShortcutsOpen})
case x:return Object(E.a)({},e,{isShortcutsOpen:!1})
default:throw new Error}}var P=a(68),z="undefined"!=typeof window&&window.SVG_JAR_PUBLIC_URL?window.SVG_JAR_PUBLIC_URL:"/",M="".concat(z,"svg-jar-viewer.json"),H=Object(n.createContext)()
function V(){var e=Object(n.useContext)(H)
if(!e)throw new Error("useAssets must be used within AssetsProvider")
return e}var I=a(58),B=a.n(I)
function D(e){var t=document.createElement("textarea")
t.value=e,t.setAttribute("readonly",""),t.style.fontSize="12pt",t.style.border="0",t.style.padding="0",t.style.margin="0",t.style.position="absolute",t.style.right="-9999px",document.body.appendChild(t),function(e){var t=document.activeElement
e.select(),t&&t.focus()}(t)
var a=function(){try{return document.execCommand("copy")}catch(e){return!1}}()
return document.body.removeChild(t),a}var L=a(59),A=Object(n.createContext)()
function T(){var e=Object(n.useContext)(A)
if(!e)throw new Error("useCurrentAsset must be used within CurrentAssetProvider")
return e}var F,G=a(11),q="medium",W="large",U=(F={},Object(G.a)(F,q,"(min-width: 960px)"),Object(G.a)(F,W,"(min-width: 1200px)"),F),K=a(6),J=a.n(K),Y=a(27),X=a(3),Q=a.n(X),Z="undefined"!=typeof window,$={children:Q.a.oneOfType([Q.a.arrayOf(Q.a.node),Q.a.node]).isRequired,elementID:Q.a.string}
function ee(e){var t=e.children,a=e.elementID
return Z&&Object(l.createPortal)(t,document.getElementById(a))}ee.propTypes=$,ee.defaultProps={elementID:"portal"}
var te=ee,ae=(a(99),{top:"translate3d(0, -100%, 0)",bottom:"translate3d(0, 100%, 0)",left:"translate3d(-100%, 0, 0)",right:"translate3d(100%, 0, 0)"})
function ne(e){var t=e.children,a=e.isOpen,l=e.placement,c=e.className,o=e.onClose,i=Object(n.useRef)()
return Object(Y.c)(a,null,{from:{opacity:0,transform:ae[l]},enter:{opacity:1,transform:"translate3d(0,0,0)"},leave:{opacity:0,transform:ae[l]},config:{duration:250},onRest:function(){i.current&&a&&i.current.focus()}}).map((function(e){var a=e.item,n=e.key,s=e.props
return a&&r.a.createElement(te,{key:n},r.a.createElement(Y.a.div,{className:J()(c,"drawer","drawer--".concat(l)),style:{transform:s.transform},ref:i,role:"dialog","aria-modal":"true",tabIndex:"-1",onKeyDown:function(e){"Escape"===e.key&&o()}},t),r.a.createElement(Y.a.div,{className:"drawer__overlay",role:"presentation",style:{opacity:s.opacity},onClick:o}))}))}ne.defaultProps={placement:"left",className:null}
var re=ne,le=a(28),ce=function(){var e=j().toggleShortcuts,t=T(),a=t.copyHelper,n=t.copySVG,r=t.copyCSS,l=t.downloadSVG
return Object(le.a)("enter",a,[a]),Object(le.a)("s",n,[n]),Object(le.a)("c",r,[r]),Object(le.a)("d",l,[l]),Object(le.a)("shift+/",e),null}
function oe(){return(oe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var ie=r.a.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),se=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",oe({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),ie)},ue=r.a.forwardRef((function(e,t){return r.a.createElement(se,oe({svgRef:t},e))}))
a.p,a(100)
var fe=function(e){var t=e.onClose
return r.a.createElement("div",{className:"shortcuts-bar"},r.a.createElement("h2",{className:"shortcuts-bar__title"},"Keyboard shortcuts"),r.a.createElement("button",{className:"shortcuts-bar__close",type:"button",onClick:t,"aria-label":"Close"},r.a.createElement(ue,null)),r.a.createElement("ul",{className:"shortcuts-bar__list"},r.a.createElement("li",{className:"shortcuts-bar__item"},r.a.createElement("div",{className:"shortcuts-bar__keys"},r.a.createElement("kbd",{className:"shortcuts-bar__key"},"enter")),r.a.createElement("p",null,"Copy Helper to clipboard")),r.a.createElement("li",{className:"shortcuts-bar__item"},r.a.createElement("div",{className:"shortcuts-bar__keys"},r.a.createElement("kbd",{className:"shortcuts-bar__key"},"d")),r.a.createElement("p",null,"Download SVG")),r.a.createElement("li",{className:"shortcuts-bar__item"},r.a.createElement("div",{className:"shortcuts-bar__keys"},r.a.createElement("kbd",{className:"shortcuts-bar__key"},"c")),r.a.createElement("p",null,"Copy CSS to clipboard")),r.a.createElement("li",{className:"shortcuts-bar__item"},r.a.createElement("div",{className:"shortcuts-bar__keys"},r.a.createElement("kbd",{className:"shortcuts-bar__key"},"/")),r.a.createElement("p",null,"Focus search bar")),r.a.createElement("li",{className:"shortcuts-bar__item"},r.a.createElement("div",{className:"shortcuts-bar__keys"},r.a.createElement("kbd",{className:"shortcuts-bar__key"},"s")),r.a.createElement("p",null,"Copy SVG to clipboard")),r.a.createElement("li",{className:"shortcuts-bar__item"},r.a.createElement("div",{className:"shortcuts-bar__keys"},r.a.createElement("kbd",{className:"shortcuts-bar__key"},"?")),r.a.createElement("p",null,"Show shortcuts"))))},me=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a]
return function(e){t.forEach((function(t){t&&("function"==typeof t?t(e):t.current=e)}))}},pe=a(18),be=a(10),ve=a(62)
function de(e,t){var a=t.translate,n=Object(be.a)(t,["translate"])
if(!e)return null
var r=e.includes("right"),l=e.includes("left"),c=e.includes("bottom"),o=r||c?-a:a,i=r||l?"translateX(".concat(o,"%)"):"translateY(".concat(o,"%)")
return Object(E.a)({},n,{transform:i})}var he=Object(n.forwardRef)((function(e,t){var a=e.children,n=e.isShown,l=e.placement,c=e.className,o=e.onAnimationEnd,i=Object(be.a)(e,["children","isShown","placement","className","onAnimationEnd"])
return r.a.createElement(ve.Transition,{items:n,from:{opacity:0,translate:10},enter:{opacity:1,translate:0},leave:{opacity:0,translate:10},config:{duration:200},onRest:o},(function(e){return e&&function(e){return r.a.createElement(te,null,r.a.createElement(pe.b,{placement:l},(function(n){var l=n.ref,o=n.style,s=n.placement,u=n.arrowProps
return r.a.createElement("div",Object.assign({className:c,ref:me(l,t),style:o,"data-placement":s},i),a({arrowProps:u,style:de(s,e)}))})))}}))}))
he.defaultProps={placement:"auto",className:null,onAnimationEnd:null}
var ge=he
pe.a.Target=function(e){var t=e.children
return r.a.createElement(pe.c,null,(function(e){var a=e.ref
return Object(n.cloneElement)(t,{ref:me(a,t.ref)})}))},pe.a.Content=ge,pe.a.Target.displayName="AnimatedPopper.Target",pe.a.Content.displayName="AnimatedPopper.Content"
var ye=pe.a
function Ee(e){var t=e.label,a=e.placement,l=e.children,c=e.showingDelay,o=e.hidingDelay,i=Object(n.useState)(!1),s=Object(y.a)(i,2),u=s[0],f=s[1],m=Object(n.useRef)(),p=Object(n.useRef)(),b=Object(n.useRef)(),v=Object(n.useRef)()
function d(){clearTimeout(m.current)}function h(){clearTimeout(p.current)}function g(){u?(h(),p.current=setTimeout((function(){return f(!1)}),o)):d()}function E(e){var t=e.relatedTarget
if(v.current){var a=b.current.contains(t),n=v.current.contains(t)
a||n||g()}else g()}return r.a.createElement(ye,null,r.a.createElement(ye.Target,null,Object(n.cloneElement)(l,{onMouseEnter:function(){u?h():(d(),m.current=setTimeout((function(){return f(!0)}),c))},onMouseDown:g,onMouseLeave:E,ref:me(b,l.ref)})),r.a.createElement(ye.Content,{className:"tooltip",isShown:u,placement:a,ref:v,onMouseLeave:E},(function(e){var a=e.arrowProps,n=e.style
return r.a.createElement("div",{className:"tooltip__content",style:n,role:"presentation"},t,r.a.createElement("div",Object.assign({className:"tooltip__arrow"},a)))})))}a(112),Ee.defaultProps={placement:"bottom",showingDelay:200,hidingDelay:100}
var Oe=Ee
function je(){return(je=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var we=r.a.createElement("defs",null,r.a.createElement("linearGradient",{x1:"50%",y1:"0%",x2:"50%",y2:"100%",id:"svg-jar-logo-red"},r.a.createElement("stop",{stopColor:"#FBA5A4",offset:"0%"}),r.a.createElement("stop",{stopColor:"#F66C6B",offset:"100%"})),r.a.createElement("linearGradient",{x1:"50%",y1:"0%",x2:"50%",y2:"100%",id:"svg-jar-logo-yellow"},r.a.createElement("stop",{stopColor:"#FFDF74",offset:"0%"}),r.a.createElement("stop",{stopColor:"#FFBC40",offset:"80%"})),r.a.createElement("linearGradient",{x1:"50%",y1:"0%",x2:"50%",y2:"100%",id:"svg-jar-logo-blue"},r.a.createElement("stop",{stopColor:"#7ED4FD",offset:"0%"}),r.a.createElement("stop",{stopColor:"#48A9F9",offset:"80%"})),r.a.createElement("linearGradient",{x1:"50%",y1:"0%",x2:"50%",y2:"100%",id:"svg-jar-logo-purple"},r.a.createElement("stop",{stopColor:"#ABB2FF",offset:"0%"}),r.a.createElement("stop",{stopColor:"#7E85FF",offset:"100%"}))),_e=r.a.createElement("g",{fillRule:"nonzero",fill:"none"},r.a.createElement("path",{d:"M24.001 20.594v3.914a7 7 0 0 1-5.802 6.897 39.22 39.22 0 0 1-6.72.595c-1.92 0-3.794-.152-5.623-.455a7.055 7.055 0 0 1-.601-.127L24 20.594h.001z",fill:"url(#svg-jar-logo-red)",transform:"translate(-.001)"}),r.a.createElement("path",{d:"M24.001 11v7.046L2.834 30.266a6.998 6.998 0 0 1-2.833-5.627v-.381l23.972-13.84c.019.191.028.386.028.582z",fill:"url(#svg-jar-logo-yellow)",transform:"translate(-.001)"}),r.a.createElement("path",{d:"M22.001 1.362V4a1 1 0 0 1-1 1h-3a6 6 0 0 1 5.329 3.24L0 21.71v-7.645L22.001 1.362z",fill:"url(#svg-jar-logo-blue)",transform:"translate(-.001)"}),r.a.createElement("path",{d:"M19.947 0L.001 11.517V11a6 6 0 0 1 6-6h-3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h16.947-.001z",fill:"url(#svg-jar-logo-purple)",transform:"translate(-.001)"})),Ne=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",je({viewBox:"0 0 24 32",ref:t},a),we,_e)},Re=r.a.forwardRef((function(e,t){return r.a.createElement(Ne,je({svgRef:t},e))}))
function Ce(){return(Ce=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var xe=r.a.createElement("path",{d:"M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"}),Se=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Ce({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),xe)},ke=r.a.forwardRef((function(e,t){return r.a.createElement(Se,Ce({svgRef:t},e))}))
function Pe(){return(Pe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var ze=r.a.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"}),Me=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Pe({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),ze)},He=r.a.forwardRef((function(e,t){return r.a.createElement(Me,Pe({svgRef:t},e))}))
function Ve(){return(Ve=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var Ie=r.a.createElement("path",{d:"M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"}),Be=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Ve({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),Ie)},De=r.a.forwardRef((function(e,t){return r.a.createElement(Be,Ve({svgRef:t},e))}))
function Le(){return(Le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var Ae=r.a.createElement("path",{d:"M11.999.5C5.649.5.5 5.648.5 12c0 5.082 3.294 9.392 7.865 10.914.574.103.756-.236.756-.541 0-.274.006-1.037 0-1.997-3.198.694-3.861-1.515-3.861-1.515-.523-1.329-1.275-1.682-1.275-1.682-1.045-.714.077-.699.077-.699 1.153.08 1.762 1.184 1.762 1.184 1.026 1.758 2.691 1.25 3.346.956.106-.742.402-1.251.731-1.536-2.554-.292-5.238-1.277-5.238-5.686 0-1.255.448-2.281 1.184-3.086-.118-.289-.514-1.46.112-3.043 0 0 .967-.309 3.162 1.18.918-.256 1.902-.383 2.88-.388.976.005 1.96.132 2.88.388 2.195-1.488 3.159-1.18 3.159-1.18.627 1.583.232 2.754.114 3.043.736.805 1.183 1.831 1.183 3.086 0 4.42-2.689 5.391-5.251 5.674.412.357.787 1.047.787 2.12v3.184c0 .308.186.647.77.536C20.209 21.389 23.5 17.08 23.5 12 23.5 5.648 18.352.5 11.999.5z"}),Te=r.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),Fe=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Le({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),Ae,Te)},Ge=r.a.forwardRef((function(e,t){return r.a.createElement(Fe,Le({svgRef:t},e))}))
a.p,a(113)
var qe=function(){var e=j().toggleShortcuts
return r.a.createElement("nav",{className:"tab-bar"},r.a.createElement("a",{className:"tab-bar__logo",href:"https://svgjar.web.app/",target:"_blank",rel:"noopener noreferrer","aria-label":"To landing page"},r.a.createElement(Re,null)),r.a.createElement("ul",{className:"tab-bar__section"},r.a.createElement("li",{className:"tab-bar__item"},r.a.createElement(Oe,{label:"Configuration",placement:"auto"},r.a.createElement("a",{className:"tab-bar__tab",href:"https://github.com/ivanvotti/ember-svg-jar/blob/master/docs/configuration.md#configuration-options",target:"_blank",rel:"noopener noreferrer","aria-label":"To configuration info"},r.a.createElement(ke,null)))),r.a.createElement("li",{className:"tab-bar__item"},r.a.createElement(Oe,{label:"Shortcuts",placement:"auto"},r.a.createElement("button",{className:"tab-bar__tab",type:"button","aria-label":"Show shortcuts",onClick:e},r.a.createElement(De,null))))),r.a.createElement("ul",{className:"tab-bar__section"},r.a.createElement("li",{className:"tab-bar__item"},r.a.createElement(Oe,{label:"Documentation",placement:"auto"},r.a.createElement("a",{className:"tab-bar__tab",href:"https://github.com/ivanvotti/ember-svg-jar#table-of-contents",target:"_blank",rel:"noopener noreferrer","aria-label":"To documentation"},r.a.createElement(He,null)))),r.a.createElement("li",{className:"tab-bar__item"},r.a.createElement(Oe,{label:"GitHub repository",placement:"auto"},r.a.createElement("a",{className:"tab-bar__tab",href:"https://github.com/ivanvotti/ember-svg-jar",target:"_blank",rel:"noopener noreferrer","aria-label":"To GitHub repository"},r.a.createElement(Ge,null))))))}
function We(e){var t=e.gridWidth,a=e.gridHeight
return t&&a?"".concat(t,"x").concat(a):"unknown"}function Ue(){return(Ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Ke=r.a.createElement("path",{d:"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"}),Je=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Ue({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),Ke)},Ye=r.a.forwardRef((function(e,t){return r.a.createElement(Je,Ue({svgRef:t},e))}))
function Xe(){return(Xe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var Qe=r.a.createElement("path",{d:"M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"}),Ze=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Xe({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),Qe)},$e=r.a.forwardRef((function(e,t){return r.a.createElement(Ze,Xe({svgRef:t},e))}))
a.p,a(114)
var et=function(){var e=V().assets,t=Object(s.d)({dir:s.b,grid:s.b}),a=Object(y.a)(t,2),n=a[0],l=a[1],c=n.dir,o=n.grid,i=e.map((function(e){return e.fileDir})).filter((function(e,t,a){return a.indexOf(e)===t})).sort((function(e,t){return e.localeCompare(t)})),u=e.map((function(e){return{gridWidth:e.gridWidth,gridHeight:e.gridHeight}})).sort((function(e,t){var a=e.gridWidth,n=e.gridHeight,r=t.gridWidth,l=t.gridHeight,c=Number(a)-Number(r)
return 0!==c?c:Number(n)-Number(l)})).map((function(e){return We(e)})).filter((function(e,t,a){return a.indexOf(e)===t}))
function f(e){var t=Object.entries(e),a=Object(y.a)(t,1),r=Object(y.a)(a[0],2),c=r[0],o=r[1],i=n[c]===o?null:o
l(Object(G.a)({},c,i))}return r.a.createElement("div",{className:"sidebar"},r.a.createElement("section",{className:"sidebar__section"},r.a.createElement("button",{className:J()("sidebar__item",{"is-active":!c&&!o}),type:"button",onClick:function(){return l({dir:null,grid:null})}},r.a.createElement(Ye,{className:"sidebar__icon","aria-hidden":!0}),r.a.createElement("span",{className:"sidebar__text"},"All assets"))),!!i.length&&r.a.createElement("section",{className:"sidebar__section"},r.a.createElement("h2",{className:"sidebar__title"},"By directory"),r.a.createElement("ul",null,i.map((function(e){return r.a.createElement("li",{key:e},r.a.createElement("button",{className:J()("sidebar__item",{"is-active":e===c}),type:"button",onClick:function(){return f({dir:e})}},r.a.createElement(Ye,{className:"sidebar__icon","aria-hidden":!0}),r.a.createElement("span",{className:"sidebar__text"},e)))})))),!!u.length&&r.a.createElement("section",{className:"sidebar__section"},r.a.createElement("h2",{className:"sidebar__title"},"By grid size"),r.a.createElement("ul",null,u.map((function(e){return r.a.createElement("li",{key:e},r.a.createElement("button",{className:J()("sidebar__item",{"is-active":e===o}),type:"button",onClick:function(){return f({grid:e})}},r.a.createElement($e,{className:"sidebar__icon","aria-hidden":!0}),r.a.createElement("span",{className:"sidebar__text"},e)))})))))},tt=Object(n.forwardRef)((function(e,t){var a=e.label,n=e.placement,l=Object(be.a)(e,["label","placement"])
return r.a.createElement(Oe,{label:a,placement:n},r.a.createElement("button",Object.assign({"aria-label":a,type:"button"},l,{ref:t})))})),at=a(63),nt=a.n(at)
function rt(){return(rt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var lt=r.a.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),ct=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",rt({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),lt)},ot=r.a.forwardRef((function(e,t){return r.a.createElement(ct,rt({svgRef:t},e))}))
function it(){return(it=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var st=r.a.createElement("path",{d:"M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"}),ut=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",it({width:18,height:18,viewBox:"0 0 18 18",ref:t},a),st)},ft=r.a.forwardRef((function(e,t){return r.a.createElement(ut,it({svgRef:t},e))}))
a.p,a(123)
var mt=function(){var e,t=Object(s.c)("q"),a=Object(y.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(l),i=Object(y.a)(o,2),u=i[0],f=i[1],m=(e=c,200,Object(n.useMemo)((function(){return nt()(e,200)}),[200,e])),p=Object(n.useRef)()
function b(e){f(e),m(e)}return Object(le.a)("/",(function(e){e.preventDefault(),p.current&&p.current.focus()})),r.a.createElement("div",{className:"search-bar"},r.a.createElement("label",{className:"search-bar__label",htmlFor:"searchBarInput","aria-label":"Search assets"},r.a.createElement(ft,null)),r.a.createElement("input",{className:"search-bar__input",id:"searchBarInput",name:"searchInput",type:"text",placeholder:"Search assets...",value:u||"",ref:p,onChange:function(e){b(e.target.value)},onKeyDown:function(e){"Escape"===e.key&&(u?b(null):p.current&&p.current.blur())}}),u&&r.a.createElement("button",{className:"search-bar__reset",type:"button","aria-label":"Clear search",onClick:function(){return b(null)}},r.a.createElement(ot,null)))}
function pt(){return(pt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var bt=r.a.createElement("path",{d:"M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z"}),vt=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",pt({width:12,height:8,viewBox:"0 0 12 8",ref:t},a),bt)},dt=r.a.forwardRef((function(e,t){return r.a.createElement(vt,pt({svgRef:t},e))})),ht=(a.p,a(124),Object(n.forwardRef)((function(e,t){var a=e.children,n=e.className,l=Object(be.a)(e,["children","className"])
return r.a.createElement("button",Object.assign({className:J()("btn",n),type:"button",ref:t},l),a,r.a.createElement(dt,{className:"arrow-button__icon","aria-hidden":!0}))})))
ht.defaultProps={className:null}
var gt=ht,yt=0,Et=Object(n.createContext)()
function Ot(){var e=Object(n.useContext)(Et)
if(!e)throw new Error("useDropdown must be used within Dropdown")
return e}var jt=function(e){var t=e.children,a=Object(n.useState)(!1),l=Object(y.a)(a,2),c=l[0],o=l[1],i=Object(n.useRef)(),s=Object(n.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"jar"
return yt+=1,"".concat(e,"-").concat(yt)}("dropdown")}),[]),u=Object(n.useCallback)((function(){return o(!1)}),[]),f=Object(n.useCallback)((function(){return o((function(e){return!e}))}),[])
return r.a.createElement(Et.Provider,{value:{dropdownID:s,isOpen:c,close:u,toggle:f,isTriggerActive:i}},r.a.createElement(ye,null,t))}
function wt(e){var t=e.children,a=e.placement,l=Object(n.useRef)(),c=Ot(),o=c.dropdownID,i=c.isOpen,s=c.close,u=c.isTriggerActive,f=Object(n.useCallback)((function(){l.current&&i&&l.current.focus()}),[i])
return r.a.createElement(ye.Content,{className:"dropdown",isShown:i,placement:a,onAnimationEnd:f},(function(e){var a=e.arrowProps,n=e.style
return r.a.createElement("div",{className:"dropdown__content",style:n},r.a.createElement("ul",{className:"dropdown__list",id:o,role:"menu",tabIndex:"-1",ref:l,onKeyDown:function(e){"Escape"===e.key&&s()},onBlur:function(e){var t=e.relatedTarget
l.current.contains(t)||u.current||s()}},t),r.a.createElement("div",Object.assign({className:"dropdown__arrow"},a)))}))}a(55),wt.defaultProps={placement:"bottom"}
var _t=wt
function Nt(e){var t=e.children,a=e.onClick,n=e.active,l=Ot().close
return r.a.createElement("li",null,r.a.createElement("button",{className:J()("dropdown__item",{"is-active":n}),type:"button",role:"menuitem",onClick:function(){a(),l()}},t))}Nt.defaultProps={active:!1}
var Rt=Nt
jt.Trigger=function(e){var t=e.children,a=Ot(),l=a.dropdownID,c=a.isOpen,o=a.toggle,i=a.isTriggerActive
return r.a.createElement(ye.Target,null,Object(n.cloneElement)(t,{"aria-owns":l,"aria-expanded":c,"aria-haspopup":"menu",onMouseDown:function(){i.current=!0},onClick:function(){i.current=!1,o()}}))},jt.Menu=_t,jt.Button=Rt,jt.Trigger.displayName="Dropdown.Trigger",jt.Menu.displayName="Dropdown.Menu",jt.Button.displayName="Dropdown.Button"
var Ct=jt
function xt(){return(xt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var St=r.a.createElement("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}),kt=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",xt({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),St)},Pt=r.a.forwardRef((function(e,t){return r.a.createElement(kt,xt({svgRef:t},e))}))
function zt(){return(zt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var Mt=r.a.createElement("path",{d:"M13 2H2v14h11V2zm2 0v14h5V2h-5zM1.818 0h18.364C21.186 0 22 .895 22 2v14c0 1.105-.814 2-1.818 2H1.818C.814 18 0 17.105 0 16V2C0 .895.814 0 1.818 0zM16 7h3v1h-3V7zm0-3h3v1h-3V4zm0 6h3v1h-3v-1z",fillRule:"evenodd"}),Ht=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",zt({width:22,height:18,viewBox:"0 0 22 18",ref:t},a),Mt)},Vt=r.a.forwardRef((function(e,t){return r.a.createElement(Ht,zt({svgRef:t},e))}))
a.p,a(125)
var It=function(){var e=Object(s.c)("sort"),t=Object(y.a)(e,2),a=t[0],n=t[1],l=j(),c=l.toggleSidebar,o=l.togglePane,i=h()
return r.a.createElement("div",{className:"actions-bar"},r.a.createElement("section",{className:"actions-bar__section"},!i.includes(W)&&r.a.createElement(tt,{className:"btn btn--icon-only actions-bar__item",label:"Show sidebar",onClick:c},r.a.createElement(Pt,null)),r.a.createElement(mt,null)),r.a.createElement("section",{className:"actions-bar__section"},r.a.createElement(Ct,null,r.a.createElement(Ct.Trigger,null,r.a.createElement(gt,{className:"actions-bar__item"},"Sort by")),r.a.createElement(Ct.Menu,null,r.a.createElement(Ct.Button,{onClick:function(){return n(null)},active:!a},"None"),r.a.createElement(Ct.Button,{onClick:function(){return n("name")},active:"name"===a},"File name"),r.a.createElement(Ct.Button,{onClick:function(){return n("grid")},active:"grid"===a},"Grid size"))),!i.includes(q)&&r.a.createElement(tt,{className:"btn btn--icon-only actions-bar__item",label:"Show pane",onClick:o},r.a.createElement(Vt,null))))},Bt=a(29),Dt=a(64),Lt=a(33)
function At(e){var t=e.icon,a=e.title,n=e.text,l=e.className
return r.a.createElement("div",{className:J()("placeholder",l)},r.a.createElement(t,{className:"placeholder__icon","aria-hidden":"true"}),r.a.createElement("h2",{className:"placeholder__title"},a),n&&r.a.createElement("p",{className:"placeholder__text",dangerouslySetInnerHTML:{__html:n}}))}a(126),At.defaultProps={text:null,className:null}
var Tt=At
function Ft(){return(Ft=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Gt=r.a.createElement("g",{fill:"none",fillRule:"evenodd"},r.a.createElement("path",{d:"M2 2h48v48H2z"}),r.a.createElement("path",{d:"M3 37H0v11c0 2.2 1.8 4 4 4h11v-3H3V37zM3 3h12V0H4C1.8 0 0 1.8 0 4v11h3V3zm45-3H37v3h12v12h3V4c0-2.2-1.8-4-4-4zm1 49H37v3h11c2.2 0 4-1.8 4-4V37h-3v12z",fill:"#9EA3D4"}),r.a.createElement("rect",{fill:"#E0E1EE",x:16,y:16,width:20,height:20,rx:4})),qt=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Ft({width:52,height:52,ref:t},a),Gt)},Wt=r.a.forwardRef((function(e,t){return r.a.createElement(qt,Ft({svgRef:t},e))}))
function Ut(){return(Ut=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var Kt=r.a.createElement("g",{fill:"none",fillRule:"evenodd"},r.a.createElement("path",{d:"M49.8 7.125H26L20.8 2H5.2C2.34 2 .026 4.306.026 7.125L0 43.875C0 46.694 2.34 49 5.2 49h44.6c2.86 0 5.2-2.306 5.2-5.125V12.25c0-2.819-2.34-5.125-5.2-5.125zM50 46H5a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h45a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2z",fill:"#E0E1EE",fillRule:"nonzero"}),r.a.createElement("path",{d:"M16.352 32.84c.725 0 1.253-.123 1.584-.368.33-.245.496-.592.496-1.04 0-.267-.056-.496-.168-.688a1.757 1.757 0 0 0-.48-.52 4.02 4.02 0 0 0-.76-.432c-.299-.133-.64-.264-1.024-.392-.384-.139-.755-.29-1.112-.456a3.747 3.747 0 0 1-.944-.616 2.837 2.837 0 0 1-.656-.88c-.165-.341-.248-.752-.248-1.232 0-1.003.347-1.79 1.04-2.36.693-.57 1.637-.856 2.832-.856.693 0 1.31.077 1.848.232.539.155.963.323 1.272.504l-.624 1.632a4.779 4.779 0 0 0-1.192-.464 5.553 5.553 0 0 0-1.336-.16c-.544 0-.968.112-1.272.336-.304.224-.456.539-.456.944 0 .245.05.456.152.632.101.176.245.333.432.472.187.139.405.267.656.384.25.117.525.23.824.336.523.192.99.387 1.4.584.41.197.757.432 1.04.704.283.272.499.592.648.96.15.368.224.813.224 1.336 0 1.003-.355 1.779-1.064 2.328-.71.55-1.747.824-3.112.824a8.237 8.237 0 0 1-2.264-.304 6.87 6.87 0 0 1-.76-.264 4.678 4.678 0 0 1-.512-.248l.592-1.648c.288.16.677.32 1.168.48.49.16 1.083.24 1.776.24zm9.42 1.504a99.291 99.291 0 0 1-2.312-5.424 127.421 127.421 0 0 1-2.072-5.664h2.224l.784 2.288c.267.779.533 1.544.8 2.296.267.752.533 1.48.8 2.184.267.704.528 1.35.784 1.936.245-.587.501-1.23.768-1.928.267-.699.536-1.427.808-2.184a193.333 193.333 0 0 0 1.576-4.592h2.16a151.515 151.515 0 0 1-2.08 5.664 95.306 95.306 0 0 1-2.304 5.424h-1.936zm13.004-9.568c-1.141 0-2.013.355-2.616 1.064-.603.71-.904 1.693-.904 2.952 0 .597.072 1.144.216 1.64.144.496.357.92.64 1.272.283.352.635.627 1.056.824.421.197.915.296 1.48.296.352 0 .656-.013.912-.04.256-.027.459-.061.608-.104v-3.984h2.016v5.328c-.277.107-.747.224-1.408.352-.661.128-1.424.192-2.288.192-.8 0-1.53-.128-2.192-.384a4.547 4.547 0 0 1-1.688-1.12c-.464-.49-.824-1.093-1.08-1.808-.256-.715-.384-1.536-.384-2.464 0-.928.141-1.75.424-2.464.283-.715.67-1.32 1.16-1.816a4.879 4.879 0 0 1 1.728-1.128A5.799 5.799 0 0 1 38.568 23c.512 0 .968.035 1.368.104.4.07.744.147 1.032.232.288.085.525.176.712.272.187.096.317.165.392.208l-.608 1.648a4.896 4.896 0 0 0-1.192-.488 5.507 5.507 0 0 0-1.496-.2z",fill:"#9EA3D4",fillRule:"nonzero"})),Jt=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Ut({width:55,height:52,ref:t},a),Kt)},Yt=r.a.forwardRef((function(e,t){return r.a.createElement(Jt,Ut({svgRef:t},e))})),Xt=(a.p,Q.a.shape({id:Q.a.string.isRequired,svg:Q.a.string.isRequired,gridWidth:Q.a.number,gridHeight:Q.a.number,fileName:Q.a.string.isRequired,fileDir:Q.a.string.isRequired,fileSize:Q.a.number.isRequired,helper:Q.a.string.isRequired,strategy:Q.a.oneOf(["inline","symbol"]).isRequired}),a(127),Object(n.memo)((function(e){var t=e.asset,a=Object(be.a)(e,["asset"]),n=T(),l=n.currentAsset,c=n.setCurrentAsset
return r.a.createElement("button",Object.assign({className:J()("asset",{"is-active":t===l}),type:"button",onClick:function(){return c(t)},dangerouslySetInnerHTML:{__html:t.svg}},a))}),Lt.b)),Qt=(a(128),64),Zt={name:function(e,t){var a=e.fileName,n=t.fileName
return a.localeCompare(n)},dir:function(e,t){var a=e.fileDir,n=t.fileDir
return a.localeCompare(n)},grid:function(e,t){var a=e.gridWidth,n=e.gridHeight,r=t.gridWidth,l=t.gridHeight,c=Number(a)-Number(r)
return 0!==c?c:Number(n)-Number(l)}},$t=Object(n.forwardRef)((function(e,t){var a=e.style,n=Object(be.a)(e,["style"])
return r.a.createElement("div",Object.assign({style:Object(E.a)({},a,{width:"".concat(parseFloat(a.width)+16,"px"),height:"".concat(parseFloat(a.height)+32,"px")}),ref:t},n))})),ea=function(){var e=V().assets,t=Object(s.d)({dir:s.b,grid:s.b,q:s.b,sort:s.b}),a=Object(y.a)(t,1)[0],n=a.dir,l=a.grid,c=a.q,o=a.sort,i=Object(Bt.a)(e)
if(i=n?i.filter((function(e){return e.fileDir===n})):i,i=l?i.filter((function(e){return We(e)===l})):i,i=c&&c.length>1?i.filter((function(e){return e.fileName.includes(c)})):i,(i=Object.keys(Zt).includes(o)?i.sort(Zt[o]):i).length)return r.a.createElement("div",{className:"assets"},r.a.createElement(Dt.a,null,(function(e){var t=e.width,a=e.height,n=t-32,l=i.length,c=Math.trunc(n/Qt),o=Math.min(l,c),s=Math.ceil(l/o),u=l>=c?n/o-Qt:0
function f(e){var t=e.columnIndex,a=e.rowIndex
return i[a*o+t]}return r.a.createElement(Lt.a,{itemKey:function(e){var t,a=f(e)
return a?a.id:(t=e).columnIndex*t.rowIndex},innerElementType:$t,width:t,height:a,columnCount:o,columnWidth:Qt+u,rowCount:s,rowHeight:Qt+u,overscanRowCount:1},(function(e){var t=e.style,a=f(Object(be.a)(e,["style"]))
if(!a)return null
var n=Object(E.a)({},t,{top:"".concat(parseFloat(t.top)+16,"px"),left:"".concat(parseFloat(t.left)+16,"px")})
return r.a.createElement(Xt,{style:n,asset:a})}))})))
var u=[n,l].filter(Boolean).map((function(e){return"<b>".concat(e,"</b>")})).join(" + ")
return c?r.a.createElement(Tt,{className:"assets assets--placeholder",icon:Wt,title:"No assets were found",text:"Your search <b>".concat(c,"</b> did not match any assets").concat(u&&" at ".concat(u))}):n||l?r.a.createElement(Tt,{className:"assets assets--placeholder",icon:Wt,title:"No assets were found",text:"Can't find any assets at ".concat(u)}):r.a.createElement(Tt,{className:"assets assets--placeholder",icon:Yt,title:"Your assets library is empty",text:"Drop some SVG files to your <b>public</b> directory"})}
a(129)
var ta=function(){return r.a.createElement("main",{className:"main"},r.a.createElement(It,null),r.a.createElement(ea,null))},aa=a(65),na=a.n(aa)
function ra(e){var t=e.code,a=e.language,l=e.className,c=e.numbers
Object(n.useEffect)((function(){na.a.highlightAll()}),[t])
var o=J()("code-block",l,{"line-numbers":c})
return r.a.createElement("pre",{className:o},r.a.createElement("code",{className:J()(Object(G.a)({},"language-".concat(a),a))},t))}a(130),a(131),a(132),a(133),a(134),a(135),ra.defaultProps={className:null,numbers:!1}
var la=ra
function ca(){return(ca=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var oa=r.a.createElement("path",{d:"M19.854 6.147l-6-6A.5.5 0 0 0 13.5 0H.5a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.146-.353zM5.5 19c-.919 0-1.683-.752-1.739-1.712a.499.499 0 1 1 .998-.06c.025.433.351.772.741.772.408 0 .74-.37.74-.827 0-.586-.351-.547-.879-.692-1.089-.204-1.603-.756-1.603-1.656C3.758 13.819 4.539 13 5.5 13c.917 0 1.681.752 1.737 1.71a.499.499 0 1 1-.998.06c-.025-.432-.35-.77-.739-.77-.409 0-.742.37-.742.825 0 .446.229.568.713.658 1.04.197 1.77.587 1.77 1.69C7.24 18.181 6.46 19 5.5 19zm6.479-5.356l-1.5 5a.5.5 0 0 1-.957 0l-1.5-5a.5.5 0 1 1 .957-.288L10 16.76l1.021-3.404a.5.5 0 1 1 .958.288zM15 19c-2 0-2-2.102-2-3 0-.898 0-3 2-3 1.06 0 1.631.429 1.847 1.39a.5.5 0 1 1-.975.22c-.105-.466-.239-.61-.872-.61-.547 0-1 .15-1 2s.453 2 1 2c.231 0 .731 0 .932-1H15a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 .499.536C16.854 18.573 15.831 19 15 19zM13 7V1l6 6h-6z"}),ia=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",ca({width:20,height:24,viewBox:"0 0 20 24",ref:t},a),oa)},sa=r.a.forwardRef((function(e,t){return r.a.createElement(ia,ca({svgRef:t},e))}))
function ua(){return(ua=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var fa=r.a.createElement("path",{d:"M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",fillRule:"evenodd"}),ma=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",ua({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),fa)},pa=r.a.forwardRef((function(e,t){return r.a.createElement(ma,ua({svgRef:t},e))}))
function ba(){return(ba=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p
var va=r.a.createElement("g",{fillRule:"nonzero",fill:"none",opacity:.802},r.a.createElement("path",{d:"M43 50H33a3 3 0 0 1-3-3V33a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v11h2V33a5 5 0 0 0-5-5H33a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h10v-2z",fill:"#525BB3",opacity:.702}),r.a.createElement("path",{d:"M4 28h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V32a2 2 0 0 0-2-2H4zM4 0h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zM32 0h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H32a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H32z",fill:"#CACCDB"}),r.a.createElement("path",{d:"M46.2 43.3l8.2 8.2-3.694-.001 2.265 5.396-1.844.775-2.369-5.644L46.2 54.5V43.3z",fill:"#525BB3",opacity:.702})),da=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",ba({width:55,height:58,ref:t},a),va)},ha=r.a.forwardRef((function(e,t){return r.a.createElement(da,ba({svgRef:t},e))}))
function ga(){return(ga=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.p,a(136)
var ya=r.a.createElement("path",{fillRule:"evenodd",d:"M9.707 14.293L19 5l1.414 1.414L9.707 17.121 4 11.414 5.414 10z"}),Ea=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",ga({width:24,height:24,viewBox:"0 0 24 24",ref:t},a),ya)},Oa=r.a.forwardRef((function(e,t){return r.a.createElement(Ea,ga({svgRef:t},e))})),ja=(a.p,a(137),Object(n.forwardRef)((function(e,t){var a=e.children,l=e.className,c=e.onClick,o=Object(be.a)(e,["children","className","onClick"]),i=Object(n.useState)(!1),s=Object(y.a)(i,2),u=s[0],f=s[1],m=Object(Y.b)({opacity:u?1:0,onRest:function(){return u&&f(!1)}}).opacity
return r.a.createElement("button",Object.assign({className:J()("status-button",l),type:"button",onClick:function(e){f((function(e){return!e})),c(e)},ref:t},o),r.a.createElement(Y.a.span,{className:"status-button__content",style:{opacity:m.interpolate((function(e){return 1-e}))}},a),r.a.createElement(Y.a.span,{className:"status-button__icon",style:{opacity:m,transform:m.interpolate({range:[0,.5,1],output:[0,1.5,1]}).interpolate((function(e){return"scale(".concat(e,")")}))}},r.a.createElement(Oa,{"aria-hidden":!0})))})))
ja.defaultProps={className:null}
var wa=ja,_a=function(){var e=Object(n.useState)(2),t=Object(y.a)(e,2),a=t[0],l=t[1],c=T(),o=c.currentAsset,i=c.copyHelper,s=c.copySVG,u=c.copyCSS,f=c.downloadSVG
return o?r.a.createElement("div",{className:"pane"},r.a.createElement("section",{className:"pane__section"},r.a.createElement("div",{className:"pane__content"},r.a.createElement("div",{className:"pane__file"},r.a.createElement(sa,{className:"pane__file-icon","aria-hidden":!0}),r.a.createElement("span",{className:"pane__file-name"},o.fileName),r.a.createElement(Ct,null,r.a.createElement(Ct.Trigger,null,r.a.createElement("button",{className:"btn btn--icon-only btn--small u-ml-auto",type:"button","aria-label":"Actions menu"},r.a.createElement(pa,null))),r.a.createElement(Ct.Menu,null,r.a.createElement(Ct.Button,{onClick:s},"Copy SVG content"),r.a.createElement(Ct.Button,{onClick:u},"Copy CSS background")))))),r.a.createElement("section",{className:"pane__section"},r.a.createElement("header",{className:"pane__header"},r.a.createElement("h2",{className:"pane__title"},"Preview"),r.a.createElement("div",{className:"range pane__range"},r.a.createElement("input",{type:"range",max:"5",min:"0.5",step:"0.1",value:a,onChange:function(e){var t=e.target
return l(t.value)}}))),r.a.createElement("div",{className:"pane__content"},r.a.createElement("div",{className:"pane__preview"},r.a.createElement("div",{style:{transform:"scale(".concat(a,")")},dangerouslySetInnerHTML:{__html:o.svg}})))),r.a.createElement("section",{className:"pane__section"},r.a.createElement("header",{className:"pane__header"},r.a.createElement("h2",{className:"pane__title"},"Helper"),r.a.createElement(wa,{className:"btn btn--small btn--primary",onClick:i},"Copy")),r.a.createElement("div",{className:"pane__content"},r.a.createElement(la,{code:o.helper,language:"handlebars"}))),r.a.createElement("section",{className:"pane__section"},r.a.createElement("header",{className:"pane__header"},r.a.createElement("h2",{className:"pane__title"},"Info")),r.a.createElement("div",{className:"pane__content"},r.a.createElement("ul",null,r.a.createElement("li",{className:"pane__info-item"},r.a.createElement("span",{className:"pane__info-title"},"Directory"),o.fileDir.length>15?r.a.createElement(Oe,{label:o.fileDir},r.a.createElement("span",{className:"pane__info-text"},o.fileDir)):r.a.createElement("span",{className:"pane__info-text"},o.fileDir)),r.a.createElement("li",{className:"pane__info-item"},r.a.createElement("span",{className:"pane__info-title"},"Grid size"),r.a.createElement("span",{className:"pane__info-text"},We(o))),r.a.createElement("li",{className:"pane__info-item"},r.a.createElement("span",{className:"pane__info-title"},"File size"),r.a.createElement("span",{className:"pane__info-text"},o.fileSize," ","KB")),r.a.createElement("li",{className:"pane__info-item"},r.a.createElement("span",{className:"pane__info-title"},"Strategy"),r.a.createElement("span",{className:"pane__info-text"},o.strategy))))),r.a.createElement("section",{className:"pane__section pane__section--footer"},r.a.createElement("div",{className:"pane__content"},r.a.createElement("button",{className:"btn btn--full btn--outline",type:"button",onClick:f},"Download")))):r.a.createElement(Tt,{className:"pane",icon:ha,title:"No selection",text:"Click an asset to see its info"})}
function Na(){return(Na=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]
for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var Ra=r.a.createElement("g",{fill:"none",fillRule:"evenodd"},r.a.createElement("path",{d:"M19.432 16.604l-2.828 2.828L0 2.828 2.828 0z",fill:"#48A9F9",fillRule:"nonzero"}),r.a.createElement("path",{d:"M48 53.237V65c0 3.133-2.081 6.148-5.096 7-5.214 1.474-10.473 2-15.78 2-4.308 0-8.617-.333-12.926-1.246L48 53.237z",fill:"#F66362"}),r.a.createElement("path",{d:"M48 35.147v13.471L9.135 71.058C7.216 69.716 6 67.395 6 65v-5.989l41.994-24.245c.004.127.006.254.006.381z",fill:"#FFB733"}),r.a.createElement("path",{d:"M44 18.597V23a1 1 0 0 1-1 1h-2.65c3.052.974 5.516 3.553 6.763 6.657L6 54.393V40.537l38-21.94z",fill:"#329FF9"}),r.a.createElement("path",{d:"M40.499 16L6 35.918v-.743C6 30.248 9.245 25.392 13.741 24H11a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h29.499z",fill:"#666EFF"})),Ca=function(e){var t=e.svgRef,a=function(e,t){if(null==e)return{}
var a,n,r=function(e,t){if(null==e)return{}
var a,n,r={},l=Object.keys(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a])
return r}(e,t)
if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e)
for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["svgRef"])
return r.a.createElement("svg",Na({width:48,height:74,viewBox:"0 0 48 74",ref:t},a),Ra)},xa=r.a.forwardRef((function(e,t){return r.a.createElement(Ca,Na({svgRef:t},e))}))
a.p,a(138)
function Sa(e){9===e.keyCode&&(document.body.classList.add("is-tabbing"),window.removeEventListener("keydown",Sa),window.addEventListener("mousedown",ka))}function ka(){document.body.classList.remove("is-tabbing"),window.removeEventListener("mousedown",ka),window.addEventListener("keydown",Sa)}Z&&window.addEventListener("keydown",Sa),a(139),c.a.render(r.a.createElement(o.a,null,r.a.createElement(s.a,{ReactRouterRoute:i.a},r.a.createElement(g,{breakpoints:U},r.a.createElement((function(e){var t=e.children,a=Object(n.useReducer)(k,S),l=Object(y.a)(a,2),c=l[0],o=l[1],i=Object(n.useCallback)((function(){o(_)}),[]),s=Object(n.useCallback)((function(){o(w)}),[]),u=Object(n.useCallback)((function(){o(R)}),[]),f=Object(n.useCallback)((function(){o(N)}),[]),m=Object(n.useCallback)((function(){o(x)}),[]),p=Object(n.useCallback)((function(){o(C)}),[])
return r.a.createElement(O.Provider,{value:Object(E.a)({},c,{toggleSidebar:s,closeSidebar:i,togglePane:f,closePane:u,toggleShortcuts:p,closeShortcuts:m})},t)}),null,r.a.createElement((function(e){var t=e.children,a=Object(P.a)(M),n=Object(y.a)(a,1)[0],l=n.data,c=n.loading,o=n.error
return r.a.createElement(H.Provider,{value:Object(E.a)({},l||{assets:[]},{isLoading:c,isError:!!o})},t)}),null,r.a.createElement((function(e){var t=e.children,a=Object(n.useState)(null),l=Object(y.a)(a,2),c=l[0],o=l[1],i=Object(n.useCallback)((function(){c&&D(c.helper)}),[c]),s=Object(n.useCallback)((function(){c&&D(c.svg)}),[c]),u=Object(n.useCallback)((function(){var e
c&&D((e=c.svg,'background-image: url("'.concat(B()(e),'")')))}),[c]),f=Object(n.useCallback)((function(){c&&function(e){var t=e.fileName,a=e.svg,n=new Blob([a],{type:"image/svg+xml"})
Object(L.saveAs)(n,t)}(c)}),[c])
return r.a.createElement(A.Provider,{value:{currentAsset:c,setCurrentAsset:o,copyHelper:i,copySVG:s,copyCSS:u,downloadSVG:f}},t)}),null,r.a.createElement((function(){var e=V(),t=e.isLoading,a=e.isError,n=h(),l=j(),c=l.isSidebarOpen,o=l.isPaneOpen,i=l.isShortcutsOpen,s=l.closeSidebar,u=l.closePane,f=l.closeShortcuts
return t?r.a.createElement(Tt,{className:"app app--placeholder",icon:xa,title:"Loading assets..."}):a?r.a.createElement(Tt,{className:"app app--placeholder",icon:xa,title:"Unable to load assets file"}):r.a.createElement("div",{className:"app"},r.a.createElement(ce,null),r.a.createElement(qe,null),n.includes(W)?r.a.createElement(et,null):r.a.createElement(re,{placement:"left",isOpen:c,onClose:s},r.a.createElement(et,null)),r.a.createElement(ta,null),n.includes(q)?r.a.createElement(_a,null):r.a.createElement(re,{placement:"right",isOpen:o,onClose:u},r.a.createElement(_a,null)),r.a.createElement(re,{placement:"bottom",isOpen:i,onClose:f},r.a.createElement(fe,{onClose:f})))}),null))))))),document.getElementById("root"))},55:function(e,t,a){},69:function(e,t,a){e.exports=a(145)},99:function(e,t,a){}},[[69,1,2]]])
