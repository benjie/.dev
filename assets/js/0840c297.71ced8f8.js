"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[2074],{2673:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>h});var s=n(5893),a=n(1151);const r={identifier:"454",title:"Add validation steps for schema extensions",stage:"3",champion:"IvanGoncharov",prUrl:"https://github.com/graphql/graphql-spec/pull/454",events:[{type:"prCreated",date:new Date("2018-06-04T15:30:59.000Z"),href:"https://github.com/graphql/graphql-spec/pull/454",actor:"IvanGoncharov"},{type:"commitsPushed",date:new Date("2018-06-04T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/63e7a70779e41f31824e39f6c2075bfd1aa64227",actor:"IvanGoncharov",commits:[{href:"https://github.com/graphql/graphql-spec/commit/63e7a70779e41f31824e39f6c2075bfd1aa64227",headline:"Add validation steps for schema extensions",ghUser:"IvanGoncharov",authorName:"Ivan Goncharov"}]}],shortname:"Add validation steps for schema extensions",image:"/img/rfc_tracker.png",closedAt:new Date("2018-06-11T00:14:15.000Z"),mergedAt:new Date("2018-06-11T00:14:15.000Z"),mergedBy:"leebyron"},o=void 0,i={id:"454",title:"Add validation steps for schema extensions",description:"At a glance",source:"@site/rfcs/454.md",sourceDirName:".",slug:"/454",permalink:"/rfcs/454",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"454",title:"Add validation steps for schema extensions",stage:"3",champion:"IvanGoncharov",prUrl:"https://github.com/graphql/graphql-spec/pull/454",events:[{type:"prCreated",date:"2018-06-04T15:30:59.000Z",href:"https://github.com/graphql/graphql-spec/pull/454",actor:"IvanGoncharov"},{type:"commitsPushed",date:"2018-06-04T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/63e7a70779e41f31824e39f6c2075bfd1aa64227",actor:"IvanGoncharov",commits:[{href:"https://github.com/graphql/graphql-spec/commit/63e7a70779e41f31824e39f6c2075bfd1aa64227",headline:"Add validation steps for schema extensions",ghUser:"IvanGoncharov",authorName:"Ivan Goncharov"}]}],shortname:"Add validation steps for schema extensions",image:"/img/rfc_tracker.png",closedAt:"2018-06-11T00:14:15.000Z",mergedAt:"2018-06-11T00:14:15.000Z",mergedBy:"leebyron"},sidebar:"rfcsSidebar",previous:{title:"Remove Interface is implemented by 1+ Objects validation",permalink:"/rfcs/459"},next:{title:"Add 'extensions' to request",permalink:"/rfcs/976"}},c={},h=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2}];function l(e){const t={a:"a",blockquote:"blockquote",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Identifier"}),": #454"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Stage"}),": ",(0,s.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted",children:"RFC3: Accepted"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Champion"}),": ",(0,s.jsx)(t.a,{href:"https://github.com/IvanGoncharov",children:"@IvanGoncharov"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"PR"}),": ",(0,s.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/454",children:"Add validation steps for schema extensions"})]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"timeline",children:"Timeline"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsxs)(t.strong,{children:[(0,s.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/454",children:"Spec PR"})," created"]})," on 2018-06-04 by IvanGoncharov"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Commit pushed"}),": ",(0,s.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/63e7a70779e41f31824e39f6c2075bfd1aa64227",children:"Add validation steps for schema extensions"})," on 2018-06-04 by ",(0,s.jsx)(t.a,{href:"https://github.com/IvanGoncharov",children:"@IvanGoncharov"})]}),"\n"]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:["Reported by @OlegIlyenko in ",(0,s.jsx)(t.a,{href:"https://github.com/facebook/graphql/issues/429#issuecomment-392990065",children:"https://github.com/facebook/graphql/issues/429#issuecomment-392990065"}),"\nI think it should be added in upcomming release for consistency with other definition extensions."]}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>o});var s=n(7294);const a={},r=s.createContext(a);function o(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);