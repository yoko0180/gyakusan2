(this.webpackJsonpgyakusan2=this.webpackJsonpgyakusan2||[]).push([[0],{30:function(e){e.exports=JSON.parse('{"name":"gyakusan2","version":"0.5.0","private":true,"dependencies":{"@testing-library/jest-dom":"^5.11.4","@testing-library/react":"^11.1.0","@testing-library/user-event":"^12.1.10","@types/jest":"^26.0.15","@types/node":"^12.0.0","@types/react":"^17.0.0","@types/react-dom":"^17.0.0","date-fns":"^2.28.0","react":"^17.0.2","react-copy-to-clipboard":"^5.0.3","react-dom":"^17.0.2","react-router-dom":"^5.2.0","react-scripts":"4.0.3","typescript":"^4.1.2","web-vitals":"^1.0.1"},"scripts":{"start":"react-scripts start","test":"react-scripts test","show:css-size":"dir src\\\\*.css && dir work\\\\*.css","dev:build:css:stock":"postcss src/style.css -o work/post.css","dev:replace:css:from-stock":"copy work\\\\post.css src\\\\post.css","dev:build:tailwind":"tailwindcss build src/style.css -o src/post.css","dev:build:tailwind-prod":"set NODE_ENV=production tailwindcss build src/style.css -o src/post.css","build:css":"postcss src/style.css -o src/post.css","build:css-prod":"set NODE_ENV=production postcss src/style.css -o src/post.css","build:react":"react-scripts build","build:404":"copy build\\\\index.html build\\\\404.html","deploy":"gh-pages -d build","build-deploy":"npm run build:react && npm run deploy","eject":"react-scripts eject"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/react-copy-to-clipboard":"^5.0.0","@types/react-router-dom":"^5.1.7","autoprefixer":"^10.2.5","fast-xml-parser":"^3.19.0","gh-pages":"^4.0.0","he":"^1.2.0","postcss":"^8.2.15","postcss-cli":"^8.3.1","react-redux":"^7.2.4","tailwind":"^4.0.0","tailwindcss":"^2.2.0"}}')},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n.n(c),i=n(29),r=n.n(i),a=(n(38),n(39),n(40),n(41),n(33)),o=n(6),l=n(5),u=n(7),d=n(55),j=n(50),b=n(56),m=n(30);var f=function(e,t){var n=function(e){return void 0===e||null===e?0:e},c=function(e,t,n){return e<t?t:e>n?n:e},s=n(e.hours)+n(t.hours),i=n(e.minutes)+n(t.minutes),r=Object(l.a)(Object(l.a)({},e),{},{hours:c(s,0,99),minutes:c(i,0,59)});return console.log("addDuration",e,t,r),r},O=n(0),h=function(e){var t=e.show,n=e.onClose,c=e.children;return Object(O.jsxs)("div",{className:"modal-panel",children:[Object(O.jsx)("div",{className:"modal-overlay "+(t?"":" closed"),id:"modal-overlay"}),Object(O.jsxs)("div",{className:"modal "+(t?"":" closed"),id:"modal",children:[Object(O.jsx)("button",{className:"close-button",id:"close-button",onClick:n,children:"\u9589\u3058\u308b"}),Object(O.jsxs)("div",{className:"modal-guts",children:[Object(O.jsx)("h4",{children:"\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u30a6\u30a3\u30f3\u30c9\u30a6"}),Object(O.jsx)("p",{children:"\u3053\u306e\u7a93\u304c\u8868\u793a\u3055\u308c\u3066\u3044\u308b\u9593\u306f\u7a93\u306e\u5916\u306e\u64cd\u4f5c\u306f\u3067\u304d\u307e\u305b\u3093\u3002\u30a6\u30a3\u30f3\u30c9\u30a6\u3092\u9589\u3058\u3066\u64cd\u4f5c\u3057\u3066\u4e0b\u3055\u3044\u3002"}),Object(O.jsx)("div",{className:"",children:c})]})]})]})},x=n(49),v=n(57);function p(e){var t=localStorage.getItem(e);return t?JSON.parse(t):void 0}var g=function(e){return void 0===e||null===e?[]:Array.isArray(e)?e.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{timeJisseki:e.timeJisseki?x.a(e.timeJisseki):null})})):[]},k=function(e){var t=null;return e.map((function(e,n,c){var s=Object(l.a)(Object(l.a)({},e),{},{costOfTimeJisseki:Object(l.a)({},t)});if(n===c.length-1)return s;var i=c[n+1].timeJisseki;return e.timeJisseki&&i?(t=v.a({start:e.timeJisseki,end:i}),console.log("nextItemCost",t,"index",n)):t=null,s}))};var N="save-datas";var y=function(e){var t=e.onClickLoad,n=e.items,s=(e.children,Object(c.useState)("")),i=Object(u.a)(s,2),r=i[0],a=i[1],o=Object(c.useState)([]),d=Object(u.a)(o,2),j=d[0],b=d[1];return Object(c.useEffect)((function(){var e=p(N)||[];b(e.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{items:g(e.items)})})))}),[]),Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)("div",{className:"border p-2 rounded",children:[Object(O.jsx)("div",{className:"",children:"save list"}),Object(O.jsx)("div",{className:"",children:j.map((function(e){return Object(O.jsxs)("div",{className:"",children:[e.name,Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return t(e)},children:"load"}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return function(e){var t=p(N)||[],n=t.findIndex((function(t){return t.name===e}));n<0||(t.splice(n,1),localStorage.setItem(N,JSON.stringify(t)),b(t))}(e.name)},children:"del"})]})}))}),Object(O.jsxs)("div",{className:"",children:[Object(O.jsx)("input",{type:"text",name:"label",id:"input-save-name",className:"input p-2 m-2",onChange:function(e){return a(e.target.value)},value:r}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return function(e,t,n){var c=(s=p(N)||[],i={name:t,items:e},function(e,t,n){var c=e.findIndex(n),s=e.slice();return c>-1&&s.splice(c,1),s.push(t),s}(s,i,(function(e){return e.name===i.name})));var s,i;localStorage.setItem(N,JSON.stringify(c)),n(c)}(n,r,b)},children:"save"})]})]})})},C=n(58),w=n(16),J=n(31),S=n(51),F=n(52),T=n(53),I=n(54);function D(e,t){console.log("save...");try{localStorage.setItem(e,JSON.stringify(t))}catch(n){}}function E(e){try{var t=localStorage.getItem(e);return"string"===typeof t?JSON.parse(t):null}catch(n){return null}}var M="items",_="goal";function L(e){var t=Object(c.useState)(function(){var e=E(M);return console.log("load value",e),void 0===e||null===e?[]:Array.isArray(e)?g(e):[]}()),n=Object(u.a)(t,2),s=n[0],i=n[1],r=Object(c.useState)([]),a=Object(u.a)(r,2),o=a[0],d=a[1],b=Object(c.useState)(function(){var e=E(_),t=C.a(j.a(new Date,{hours:10}),{minutes:0});return e?x.a(e):t}()),m=Object(u.a)(b,2),f=m[0],O=m[1];Object(c.useEffect)((function(){}),[]),Object(c.useEffect)((function(){if(D(M,s),D(_,f),f){var t=f,n=("edit"===e||"delete"===e?s:s.filter((function(e){return void 0===e.off||!1===e.off}))).map((function(e,n){var c=f,i=e.costOfTime;if(0===n&&(c=w.a(f,i)),0!==n){s[n-1];c=w.a(t,i)}void 0!==e.off&&!1!==e.off||(t=c),e.off&&(c=null);var r=c&&e.timeJisseki?J.a(S.a(e.timeJisseki,0),c):0,a={raw:r,label:r>0?r+"\u5206\u9045\u308c":r<0?Math.abs(r)+"\u5206\u65e9\u3044":"0"};return Object(l.a)(Object(l.a)({},e),{},{time:c,diffJissekiMins:a})})).reverse(),c=function(){var e=-1;return n.forEach((function(t,n){t.timeJisseki&&(e=n)})),e}();console.log("lastJissekiTimeIndex",c);var i={},r=0===n.length?n:n[0].timeJisseki?n.map((function(e,t){return n[0].timeJisseki?(e.timeJisseki||(s=j.a(n[c].timeJisseki,i),console.log("yosokuJisseki",i,s)),e,t>=c&&(i=function(e,t){var n=function(e){return void 0===e||null===e?0:e},c=n(e.hours)+n(t.hours),s=n(e.minutes)+n(t.minutes);return Object(l.a)(Object(l.a)({},e),{},{hours:c,minutes:s})}(i,e.costOfTime)),Object(l.a)(Object(l.a)({},e),{},{yosokuJisseki:s})):e;var s})):n;d(r)}}),[s,f,e]);return Object(c.useEffect)((function(){console.log("itemsView",o)}),[o]),{itemsView:o,items:s,setItems:i,resetGoalToToday:function(){console.log("reset goal",F.a(new Date)),O(C.a(f,{year:T.a(new Date),month:I.a(new Date),date:F.a(new Date)}))},goalDate:f,setGoalDate:O}}var A=function(e){e.lang;var t=Object(c.useRef)(null),n=Object(c.useState)(!1),s=Object(u.a)(n,2),i=s[0],r=s[1],a=Object(c.useState)(!1),x=Object(u.a)(a,2),v=x[0],p=x[1],g=Object(c.useState)(),N=Object(u.a)(g,2),C=N[0],w=N[1],J=Object(c.useState)("view"),S=Object(u.a)(J,2),F=S[0],T=S[1],I=L(F),D=I.itemsView,E=I.items,M=I.setItems,_=I.resetGoalToToday,A=I.goalDate,V=I.setGoalDate,G=Object(o.f)(),B=Object(c.useState)(""),H=Object(u.a)(B,2),P=H[0],z=H[1],R=Object(c.useState)(""),q=Object(u.a)(R,2),K=q[0],Q=q[1],U=Object(c.useState)(""),W=Object(u.a)(U,2),X=W[0],Y=W[1],Z=Object(c.useState)(""),$=Object(u.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)(""),ce=Object(u.a)(ne,2),se=ce[0],ie=ce[1];Object(c.useEffect)((function(){document.title="\u9006\u7b97"}),[G.location,"\u9006\u7b97"]);var re=function(e,t){M(k(function(e,t){return E.map((function(n){return e.id===n.id?t(n):n}))}(e,(function(e){return Object(l.a)(Object(l.a)({},e),{},{timeJisseki:t})}))))},ae=function(e,t){console.log("items",E),M(E.map((function(n){return e.id===n.id?Object(l.a)(Object(l.a)({},n),{},{costOfTime:f(n.costOfTime,t)}):n})))},oe=function(e,t){M(E.map((function(n){return e.id===n.id?Object(l.a)(Object(l.a)({},n),{},{off:t}):n})))};Object(c.useEffect)((function(){var e;i&&(null===(e=t.current)||void 0===e||e.focus())}),[i]);var le=function(e){var t=e.onClick,n=e.color,c=void 0===n?"green":n,s=e.children;return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("button",{className:("green"===c?"bg-green-900 ":"")+("red"===c?"bg-red-900 ":"")+"ctrl-btn  p-2 m-1 rounded ",onClick:t,children:s})})},ue=function(e){var t=e.du,n=d.a(t),c="-"===n.slice(0,1)?"":"+";return Object(O.jsx)(O.Fragment,{children:c+n})},de=function(e){var t=e.onClick,n=e.num,c=e.label;e.children;return Object(O.jsxs)(le,{onClick:t,children:[n>0&&"+",n,c]})},je=function(e){var t=e.onClick,n=e.du;return Object(O.jsx)(le,{onClick:t,children:Object(O.jsx)(ue,{du:n})})},be=function(e){var t=e.item,n=e.nums,c=e.cb;e.children;return Object(O.jsx)(O.Fragment,{children:n.map((function(e){return Object(O.jsx)(de,{onClick:function(){c(t,e)},num:e},e)}))})},me=function(e){var t=e.item,n=e.nums;e.children;return Object(O.jsx)(be,{item:t,nums:n,cb:function(e,t){return ae(e,{hours:t})}})},fe=function(e){var t=e.du;return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(je,{onClick:function(){V(j.a(A,t))},du:t})})},Oe=function(e){var t=e.dus;return Object(O.jsx)(O.Fragment,{children:t.map((function(e){return Object(O.jsx)(fe,{du:e})}))})},he=function(e){var t=e.children;return Object(O.jsx)(O.Fragment,{children:Object(O.jsx)("span",{className:"text-xl",children:t})})},xe=function(e){var t=e.num,n=e.label,c=e.color,s=void 0===c?"white":c;return Object(O.jsx)(O.Fragment,{children:void 0!==t&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("span",{className:("red"===s?"text-red-500 ":"")+"hours-label text-2xl",children:t}),Object(O.jsx)("span",{children:n})]})})},ve=function(e){var t=e.time;if(!t)return Object(O.jsx)(O.Fragment,{});var n=function(e,t){if(!e)return"";try{return Object(b.a)(e,t)}catch(n){return""}};return Object(O.jsx)(O.Fragment,{children:void 0!==t&&null!==t?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("span",{className:"hours-label text-gray-300",children:t&&n(t,"MM-dd")}),"\xa0",Object(O.jsx)("span",{className:"hours-label text-2xl",children:t&&n(t,"HH:mm")})]}):Object(O.jsx)("span",{})})};return Object(O.jsxs)("div",{className:"App p-5",children:[Object(O.jsx)("div",{children:Object(O.jsxs)("span",{children:["ver ",m.version]})}),Object(O.jsx)(y,{items:E,onClickLoad:function(e){return M(e.items)}}),Object(O.jsxs)("label",{htmlFor:"",children:["\u9805\u76ee\u8ffd\u52a0",Object(O.jsx)("input",{type:"text",name:"label",id:"input-label",className:"p-2 m-2",onChange:function(e){return z(e.target.value)},value:P})]}),Object(O.jsxs)("div",{className:"m-2",children:[Object(O.jsx)("input",{className:"input-time p-2",type:"number",name:"hour",maxLength:2,min:0,onChange:function(e){return Q(e.target.value)},value:K}),"hours",Object(O.jsx)("input",{className:"input-time p-2",type:"number",name:"minutes",maxLength:2,min:0,onChange:function(e){return Y(e.target.value)},value:X}),"minutes"]}),Object(O.jsx)("button",{className:"add-btn bg-green-900 p-2 m-1 rounded ",onClick:function(){var e=function(e){return""===e?0:+e},t={id:"item_"+Date.now(),label:P,costOfTime:{hours:e(K),minutes:e(X)},off:!1,timeJisseki:null};M(E.concat([t]))},children:"\u8ffd\u52a0"}),Object(O.jsxs)("div",{className:"view-mode border rounded p-2",children:[Object(O.jsx)("div",{className:"",children:"view mode"}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return T("view")},children:"view"}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return T("edit")},children:"edit"}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return T("move")},children:"move"}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){return T("delete")},children:"delete"})]}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:function(){ie(JSON.stringify(E)),p(!0)},children:"import/export"}),Object(O.jsx)("button",{className:"bg-green-900 p-2 m-1 rounded ",onClick:_,children:"reset goal today"}),Object(O.jsxs)("div",{className:"goal-offset-days",children:[Object(O.jsx)("label",{htmlFor:"",children:"goal offset days"}),Object(O.jsx)(Oe,{dus:[{days:1},{days:-1}]})]}),Object(O.jsx)(le,{onClick:function(){M(k(E.map((function(e){return Object(l.a)(Object(l.a)({},e),{},{timeJisseki:null})}))))},color:"red",children:"clear all jisseki"}),Object(O.jsxs)(h,{show:i,onClose:function(){return r(!1)},children:[Object(O.jsx)("input",{className:"input input-edit-label text-2xl p-2 rounded",ref:t,type:"text",name:"",id:"",value:ee,onChange:function(e){return te(e.target.value)}}),Object(O.jsx)("button",{className:"btn bg-green-900 p-2 m-1 rounded ",onClick:function(){C&&(M(E.map((function(e){return e.id===C.id?Object(l.a)(Object(l.a)({},e),{},{label:ee}):e}))),r(!1))},children:"update"})]}),Object(O.jsxs)(h,{show:v,onClose:function(){return p(!1)},children:[Object(O.jsx)("textarea",{className:"input",name:"",id:"",cols:70,rows:6,value:se,onChange:function(e){return ie(e.target.value)}}),Object(O.jsx)("button",{className:"btn bg-green-900 p-2 m-1 rounded ",onClick:function(){try{M(JSON.parse(se))}catch(e){console.log("import error",e)}},children:"import"})]}),Object(O.jsxs)("table",{className:"border",children:[Object(O.jsxs)("thead",{children:[Object(O.jsx)("th",{children:"label"}),Object(O.jsx)("th",{colSpan:2,children:"\u6240\u8981\u6642\u9593"}),Object(O.jsx)("th",{children:"start\u6642\u523b"}),Object(O.jsx)("th",{children:"ji\u6642\u523b"})]}),Object(O.jsxs)("tbody",{children:[D.map((function(e){return Object(O.jsxs)("tr",{className:!0===e.off?"off":"",children:[Object(O.jsxs)("td",{children:[Object(O.jsx)(he,{children:e.label}),"delete"===F&&Object(O.jsx)("div",{className:"",children:Object(O.jsx)(le,{onClick:function(){return function(e){M(E.filter((function(t){return t.id!==e.id})))}(e)},children:"delete"})}),"edit"===F&&Object(O.jsxs)("div",{className:"ctrl",children:[Object(O.jsx)(le,{onClick:function(){w(e),te(e.label),r(!0)},children:"edit"}),(void 0===e.off||!1===e.off)&&Object(O.jsx)(le,{onClick:function(){return oe(e,!0)},children:"off"}),!0===e.off&&Object(O.jsx)(le,{onClick:function(){return oe(e,!1)},children:"on"})]}),"move"===F&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(le,{onClick:function(){return function(e){var t=E.reverse(),n=t.findIndex((function(t){return t.id===e.id}));if(!(n<1)){var c=t.slice(0,n-1),s=t.slice(n+1);s.unshift(t[n-1]),console.log("front",c),console.log("back",s);var i=c.concat([e]).concat(s);console.log("new_items",i),M(i.reverse())}}(e)},children:"up"}),Object(O.jsx)(le,{onClick:function(){return function(e){var t=E.reverse(),n=t.findIndex((function(t){return t.id===e.id}));if(n!==E.length-1){var c=t.slice(0,n),s=t.slice(n+2);c.push(t[n+1]),console.log("front",c),console.log("back",s);var i=c.concat([e]).concat(s);console.log("new_items",i),M(i.reverse())}}(e)},children:"down"}),Object(O.jsx)(le,{onClick:function(){return function(e){var t=E.reverse(),n=t.findIndex((function(t){return t.id===e.id}));if(console.log("index",n),!(n<0)){var c=[e].concat(t.filter((function(t){return t.id!==e.id})));M(c.reverse())}}(e)},children:"up end"}),Object(O.jsx)(le,{onClick:function(){return function(e){console.log("moveDownEndItem");var t=E.reverse(),n=t.findIndex((function(t){return t.id===e.id}));if(console.log("index",n),!(n<0)){var c=t.filter((function(t){return t.id!==e.id})).concat([e]);console.log("new_array",c),M(c.reverse())}}(e)},children:"down end"})]})]}),Object(O.jsxs)("td",{children:[Object(O.jsx)(xe,{num:e.costOfTime.hours,label:"h"}),e.costOfTimeJisseki&&Object(O.jsx)("div",{className:"",children:Object(O.jsx)(xe,{num:e.costOfTimeJisseki.hours,label:"h",color:"red"})}),"edit"===F&&Object(O.jsx)("div",{className:"ctrl",children:Object(O.jsx)(me,{item:e,nums:[1,-1]})})]}),Object(O.jsxs)("td",{children:[Object(O.jsx)(xe,{num:e.costOfTime.minutes,label:"m"}),e.costOfTimeJisseki&&Object(O.jsx)("div",{className:"",children:Object(O.jsx)(xe,{num:e.costOfTimeJisseki.minutes,label:"m",color:"red"})}),Object(O.jsx)("div",{className:"ctrl",children:"edit"===F&&Object(O.jsx)(be,{item:e,nums:[5,10,-5,-10],cb:function(e,t){return ae(e,{minutes:t})}})})]}),Object(O.jsx)("td",{children:Object(O.jsx)(ve,{time:e.time})}),Object(O.jsxs)("td",{children:[Object(O.jsx)("div",{className:"",children:e.yosokuJisseki&&Object(O.jsxs)("div",{className:"text-cyan-400",children:[Object(O.jsx)("span",{children:"\u4e88\u6e2c"}),Object(O.jsx)(ve,{time:e.yosokuJisseki})]})}),void 0===e.timeJisseki||null===e.timeJisseki?Object(O.jsx)(le,{onClick:function(){return re(e,new Date)},children:"\u8a18\u9332"}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(ve,{time:e.timeJisseki}),Object(O.jsx)("div",{className:e.diffJissekiMins.raw>0?"bg-red-900":e.diffJissekiMins.raw<0?"bg-blue-900":"",children:e.diffJissekiMins.label}),Object(O.jsx)(le,{color:"red",onClick:function(){return re(e,null)},children:"\u524a\u9664"}),"edit"===F&&Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(be,{item:e,nums:[1,-1],cb:function(e,t){return re(e,j.a(e.timeJisseki,{minutes:t}))}})})]})]})]},e.id)})),Object(O.jsxs)("tr",{children:[Object(O.jsxs)("td",{colSpan:3,children:["goal",("move"===F||"edit"===F)&&Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(Oe,{dus:[{hours:1},{hours:-1},{minutes:10},{minutes:-10}]})})]}),Object(O.jsx)("td",{children:Object(O.jsx)(ve,{time:A})})]})]})]}),"delete"===F&&Object(O.jsx)("button",{className:"deleteall-btn bg-red-900 p-2 m-5 rounded ",onClick:function(){M([])},children:"delete all items"}),Object(O.jsx)("div",{className:"three wide column text-left mt-5",children:"\xa9 2022"})]})};var V=function(){return Object(O.jsx)(a.a,{basename:"/7dtd-integration",children:Object(O.jsxs)(o.c,{children:[Object(O.jsx)(o.a,{path:"/en",children:Object(O.jsx)(A,{lang:"en"})}),Object(O.jsx)(o.a,{path:"/",children:Object(O.jsx)(A,{lang:"ja"})})]})})},G=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,59)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),i(e),r(e)}))};r.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(V,{})}),document.getElementById("root")),G()}},[[48,1,2]]]);