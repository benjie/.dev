"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[6968],{6309:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var r=n(5893),a=n(1151);const i={identifier:"598",title:"Avoid parse ambiguity on types & extensions",stage:"3",champion:"leebyron",prUrl:"https://github.com/graphql/graphql-spec/pull/598",events:[{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-08-01.md",date:new Date("2019-08-01T00:00:00.000Z"),actor:null},{type:"prCreated",date:new Date("2019-07-23T01:15:15.000Z"),href:"https://github.com/graphql/graphql-spec/pull/598",actor:"leebyron"},{type:"commitsPushed",date:new Date("2019-07-23T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/a91fdd55583a6bb9b372a6485c2358d1979f9b23",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/a91fdd55583a6bb9b372a6485c2358d1979f9b23",headline:"Avoid parse ambiguity on type extensions",ghUser:"leebyron",authorName:"Lee Byron"}]}],shortname:"Avoid parse ambiguity on types & extensions",image:"/img/rfc_tracker.png",closedAt:new Date("2021-04-08T04:40:55.000Z"),mergedAt:new Date("2021-04-08T04:40:55.000Z"),mergedBy:"leebyron"},s=void 0,o={id:"598",title:"Avoid parse ambiguity on types & extensions",description:"At a glance",source:"@site/rfcs/598.md",sourceDirName:".",slug:"/598",permalink:"/rfcs/598",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"598",title:"Avoid parse ambiguity on types & extensions",stage:"3",champion:"leebyron",prUrl:"https://github.com/graphql/graphql-spec/pull/598",events:[{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-08-01.md",date:"2019-08-01T00:00:00.000Z",actor:null},{type:"prCreated",date:"2019-07-23T01:15:15.000Z",href:"https://github.com/graphql/graphql-spec/pull/598",actor:"leebyron"},{type:"commitsPushed",date:"2019-07-23T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/a91fdd55583a6bb9b372a6485c2358d1979f9b23",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/a91fdd55583a6bb9b372a6485c2358d1979f9b23",headline:"Avoid parse ambiguity on type extensions",ghUser:"leebyron",authorName:"Lee Byron"}]}],shortname:"Avoid parse ambiguity on types & extensions",image:"/img/rfc_tracker.png",closedAt:"2021-04-08T04:40:55.000Z",mergedAt:"2021-04-08T04:40:55.000Z",mergedBy:"leebyron"},sidebar:"rfcsSidebar",previous:{title:"Number value literal lookahead restrictions",permalink:"/rfcs/601"},next:{title:"Allow directives on variable definitions",permalink:"/rfcs/510"}},l={},h=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Identifier"}),": #598"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Stage"}),": ",(0,r.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted",children:"RFC3: Accepted"})]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Champion"}),": ",(0,r.jsx)(t.a,{href:"https://github.com/leebyron",children:"@leebyron"})]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"PR"}),": ",(0,r.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/598",children:"Avoid parse ambiguity on types & extensions"})]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"timeline",children:"Timeline"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsxs)(t.strong,{children:["Added to ",(0,r.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-08-01.md",children:"2019-08-01 WG agenda"})]})}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsxs)(t.strong,{children:[(0,r.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/598",children:"Spec PR"})," created"]})," on 2019-07-23 by leebyron"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Commit pushed"}),": ",(0,r.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/a91fdd55583a6bb9b372a6485c2358d1979f9b23",children:"Avoid parse ambiguity on type extensions"})," on 2019-07-23 by ",(0,r.jsx)(t.a,{href:"https://github.com/leebyron",children:"@leebyron"})]}),"\n"]}),"\n",(0,r.jsx)(t.hr,{}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"Partial fix to #564, adds lookahead constraints to type system extensions to remove ambiguity or inefficiency from the grammar."}),"\n",(0,r.jsxs)(t.p,{children:["The GraphQL grammar should be parsed in linear type with at most one lookahead. Since extensions have an optional ",(0,r.jsx)(t.code,{children:"{ }"})," body, finding the token ",(0,r.jsx)(t.code,{children:"{"})," should always attempt to parse the relevant portion of the type extension rather than completing the type extension and attempting to parse the query shorthand SelectionSet."]}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>s});var r=n(7294);const a={},i=r.createContext(a);function s(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);