"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[9262],{8699:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>i,contentTitle:()=>s,default:()=>p,frontMatter:()=>c,metadata:()=>l,toc:()=>h});var a=t(5893),n=t(1151);const c={identifier:"701",title:"Disallow non-breakable chains of circular references in Input Objects",stage:"3",champion:"spawnia",prUrl:"https://github.com/graphql/graphql-spec/pull/701",events:[{type:"commitsPushed",date:new Date("2021-01-11T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/3ecdb33b8a945619fc32bac09b68cb807c8d8ca6",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/3ecdb33b8a945619fc32bac09b68cb807c8d8ca6",headline:"Editorial changes",ghUser:"leebyron",authorName:"Lee Byron"},{href:"https://github.com/graphql/graphql-spec/commit/90744b14e01027a200541d48c2772e605df959f8",headline:"Editorial",ghUser:"leebyron",authorName:"Lee Byron"}]},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-12-03.md",date:new Date("2020-12-03T00:00:00.000Z"),actor:null},{type:"prCreated",date:new Date("2020-03-24T14:38:08.000Z"),href:"https://github.com/graphql/graphql-spec/pull/701",actor:"spawnia"},{type:"commitsPushed",date:new Date("2020-03-24T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/d4f6ad8b6201087a9ddfdbb5559adf5536b31b09",actor:"spawnia",commits:[{href:"https://github.com/graphql/graphql-spec/commit/d4f6ad8b6201087a9ddfdbb5559adf5536b31b09",headline:"Disallow non-breakable chains of circular references in Input Objects",ghUser:"spawnia",authorName:"Benedikt Franke"}]}],related:"445",shortname:"Disallow non-breakable chains of circular references in Input Objects",image:"/img/rfc_tracker.png",closedAt:new Date("2021-01-11T01:08:11.000Z"),mergedAt:new Date("2021-01-11T01:08:10.000Z"),mergedBy:"leebyron"},s=void 0,l={id:"701",title:"Disallow non-breakable chains of circular references in Input Objects",description:"At a glance",source:"@site/rfcs/701.md",sourceDirName:".",slug:"/701",permalink:"/rfcs/701",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"701",title:"Disallow non-breakable chains of circular references in Input Objects",stage:"3",champion:"spawnia",prUrl:"https://github.com/graphql/graphql-spec/pull/701",events:[{type:"commitsPushed",date:"2021-01-11T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/3ecdb33b8a945619fc32bac09b68cb807c8d8ca6",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/3ecdb33b8a945619fc32bac09b68cb807c8d8ca6",headline:"Editorial changes",ghUser:"leebyron",authorName:"Lee Byron"},{href:"https://github.com/graphql/graphql-spec/commit/90744b14e01027a200541d48c2772e605df959f8",headline:"Editorial",ghUser:"leebyron",authorName:"Lee Byron"}]},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-12-03.md",date:"2020-12-03T00:00:00.000Z",actor:null},{type:"prCreated",date:"2020-03-24T14:38:08.000Z",href:"https://github.com/graphql/graphql-spec/pull/701",actor:"spawnia"},{type:"commitsPushed",date:"2020-03-24T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/d4f6ad8b6201087a9ddfdbb5559adf5536b31b09",actor:"spawnia",commits:[{href:"https://github.com/graphql/graphql-spec/commit/d4f6ad8b6201087a9ddfdbb5559adf5536b31b09",headline:"Disallow non-breakable chains of circular references in Input Objects",ghUser:"spawnia",authorName:"Benedikt Franke"}]}],related:"445",shortname:"Disallow non-breakable chains of circular references in Input Objects",image:"/img/rfc_tracker.png",closedAt:"2021-01-11T01:08:11.000Z",mergedAt:"2021-01-11T01:08:10.000Z",mergedBy:"leebyron"},sidebar:"rfcsSidebar",previous:{title:"Replace 'query error' with 'request error'",permalink:"/rfcs/803"},next:{title:"Allow interfaces to implement other interfaces",permalink:"/rfcs/373"}},i={},h=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2}];function o(e){const r={a:"a",blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,n.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Identifier"}),": #701"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Stage"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted",children:"RFC3: Accepted"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Champion"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/spawnia",children:"@spawnia"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"PR"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/pull/701",children:"Disallow non-breakable chains of circular references in Input Objects"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Related"}),":","\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"/rfcs/445",title:"Disallow non-breakable chains of circular references in Input Objects / RFCX",children:"#445"})," (Disallow non-breakable chains of circular references in Input Objects)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(r.h2,{id:"timeline",children:"Timeline"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"2 commits pushed"})," on 2021-01-11:","\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/3ecdb33b8a945619fc32bac09b68cb807c8d8ca6",children:"Editorial changes"})," by ",(0,a.jsx)(r.a,{href:"https://github.com/leebyron",children:"@leebyron"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/90744b14e01027a200541d48c2772e605df959f8",children:"Editorial"})," by ",(0,a.jsx)(r.a,{href:"https://github.com/leebyron",children:"@leebyron"})]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(r.li,{children:(0,a.jsxs)(r.strong,{children:["Mentioned in ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-12-03.md",children:"2020-12-03 WG notes"})]})}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsxs)(r.strong,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/pull/701",children:"Spec PR"})," created"]})," on 2020-03-24 by spawnia"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Commit pushed"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/d4f6ad8b6201087a9ddfdbb5559adf5536b31b09",children:"Disallow non-breakable chains of circular references in Input Objects"})," on 2020-03-24 by ",(0,a.jsx)(r.a,{href:"https://github.com/spawnia",children:"@spawnia"})]}),"\n"]}),"\n",(0,a.jsx)(r.hr,{}),"\n",(0,a.jsxs)(r.blockquote,{children:["\n",(0,a.jsxs)(r.p,{children:["@leebyron I accidentally nuked the previous PR ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/pull/445",children:"https://github.com/graphql/graphql-spec/pull/445"})," by adding the ",(0,a.jsx)(r.a,{href:"https://probot.github.io/apps/pull/",children:"Pull Probot"}),", which hard-reset my ",(0,a.jsx)(r.code,{children:"master"})," branch. Sorry!"]}),"\n"]})]})}function p(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>l,a:()=>s});var a=t(7294);const n={},c=a.createContext(n);function s(e){const r=a.useContext(c);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(c.Provider,{value:r},e.children)}}}]);