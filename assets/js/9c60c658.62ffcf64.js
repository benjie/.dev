"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[8903],{2059:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>h,default:()=>g,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var n=a(5893),r=a(1151);const l={identifier:"525",title:"Allow deprecation of input values",stage:"2",champion:"smitt04",prUrl:"https://github.com/graphql/graphql-spec/pull/525",events:[{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2021/2021-02-04.md",date:new Date("2021-02-04T00:00:00.000Z"),actor:null},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-09-03.md",date:new Date("2020-09-03T00:00:00.000Z"),actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-09-03.md",date:new Date("2020-09-03T00:00:00.000Z"),actor:null},{type:"commitsPushed",date:new Date("2020-07-02T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/ac15638ac02ac88013d838785d907c24bbaeff6b",actor:"IvanGoncharov",commits:[{href:"https://github.com/graphql/graphql-spec/commit/ac15638ac02ac88013d838785d907c24bbaeff6b",headline:"Add to the @deprecated directive to allow deprecation of inputValues",ghUser:"IvanGoncharov",authorName:"Ivan Goncharov"}]},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-07-02.md",date:new Date("2020-07-02T00:00:00.000Z"),actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-07-02.md",date:new Date("2020-07-02T00:00:00.000Z"),actor:null},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-03-05.md",date:new Date("2020-03-05T00:00:00.000Z"),actor:null},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-02-06.md",date:new Date("2020-02-06T00:00:00.000Z"),actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-02-06.md",date:new Date("2020-02-06T00:00:00.000Z"),actor:null},{type:"prCreated",date:new Date("2018-10-23T21:26:00.000Z"),href:"https://github.com/graphql/graphql-spec/pull/525",actor:"smitt04"}],shortname:"Allow deprecation of input values",image:"/img/rfc_tracker.png",closedAt:new Date("2020-12-03T16:43:14.000Z"),mergedAt:new Date("2020-12-03T16:43:14.000Z"),mergedBy:"IvanGoncharov"},h=void 0,o={id:"525",title:"Allow deprecation of input values",description:"At a glance",source:"@site/rfcs/525.md",sourceDirName:".",slug:"/525",permalink:"/rfcs/525",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"525",title:"Allow deprecation of input values",stage:"2",champion:"smitt04",prUrl:"https://github.com/graphql/graphql-spec/pull/525",events:[{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2021/2021-02-04.md",date:"2021-02-04T00:00:00.000Z",actor:null},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-09-03.md",date:"2020-09-03T00:00:00.000Z",actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-09-03.md",date:"2020-09-03T00:00:00.000Z",actor:null},{type:"commitsPushed",date:"2020-07-02T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/ac15638ac02ac88013d838785d907c24bbaeff6b",actor:"IvanGoncharov",commits:[{href:"https://github.com/graphql/graphql-spec/commit/ac15638ac02ac88013d838785d907c24bbaeff6b",headline:"Add to the @deprecated directive to allow deprecation of inputValues",ghUser:"IvanGoncharov",authorName:"Ivan Goncharov"}]},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-07-02.md",date:"2020-07-02T00:00:00.000Z",actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-07-02.md",date:"2020-07-02T00:00:00.000Z",actor:null},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-03-05.md",date:"2020-03-05T00:00:00.000Z",actor:null},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-02-06.md",date:"2020-02-06T00:00:00.000Z",actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-02-06.md",date:"2020-02-06T00:00:00.000Z",actor:null},{type:"prCreated",date:"2018-10-23T21:26:00.000Z",href:"https://github.com/graphql/graphql-spec/pull/525",actor:"smitt04"}],shortname:"Allow deprecation of input values",image:"/img/rfc_tracker.png",closedAt:"2020-12-03T16:43:14.000Z",mergedAt:"2020-12-03T16:43:14.000Z",mergedBy:"IvanGoncharov"},sidebar:"rfcsSidebar",previous:{title:"GraphQL RFC Tracker: Activity",permalink:"/rfcs/activity"},next:{title:"operation expressions",permalink:"/rfcs/823"}},i={},s=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2}];function c(e){const t={a:"a",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Identifier"}),": #525"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Stage"}),": ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-2-draft",children:"RFC2: Draft"})]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Champion"}),": ",(0,n.jsx)(t.a,{href:"https://github.com/smitt04",children:"@smitt04"})]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"PR"}),": ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/525",children:"Allow deprecation of input values"})]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"timeline",children:"Timeline"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Mentioned in ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2021/2021-02-04.md",children:"2021-02-04 WG notes"})]})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Added to ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-09-03.md",children:"2020-09-03 WG agenda"})]})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Mentioned in ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-09-03.md",children:"2020-09-03 WG notes"})]})}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Commit pushed"}),": ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/ac15638ac02ac88013d838785d907c24bbaeff6b",children:"Add to the @deprecated directive to allow deprecation of inputValues"})," on 2020-07-02 by ",(0,n.jsx)(t.a,{href:"https://github.com/IvanGoncharov",children:"@IvanGoncharov"})]}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Added to ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-07-02.md",children:"2020-07-02 WG agenda"})]})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Mentioned in ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-07-02.md",children:"2020-07-02 WG notes"})]})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Added to ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-03-05.md",children:"2020-03-05 WG agenda"})]})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Added to ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-02-06.md",children:"2020-02-06 WG agenda"})]})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsxs)(t.strong,{children:["Mentioned in ",(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-02-06.md",children:"2020-02-06 WG notes"})]})}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsxs)(t.strong,{children:[(0,n.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/525",children:"Spec PR"})," created"]})," on 2018-10-23 by smitt04"]}),"\n"]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.p,{children:"(Embedding not enabled for smitt04)"})]})}function g(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},1151:(e,t,a)=>{a.d(t,{Z:()=>o,a:()=>h});var n=a(7294);const r={},l=n.createContext(r);function h(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:h(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);