"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[6214],{3011:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>n,metadata:()=>i,toc:()=>l});var a=t(5893),h=t(1151);const n={identifier:"1127",closedAt:null,mergedAt:null,title:"When `sourceStream` errors, yield a `{ errors: [...] }` response",stage:"0",champion:"benjie",prUrl:"https://github.com/graphql/graphql-spec/pull/1127",events:[{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2025/01-Jan/09-wg-primary.md",date:new Date("2025-01-09T00:00:00.000Z"),actor:null},{type:"commitsPushed",date:new Date("2024-12-05T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/19519699d9f32afac4bc61395e239431137feb33",actor:"benjie",commits:[{href:"https://github.com/graphql/graphql-spec/commit/19519699d9f32afac4bc61395e239431137feb33",headline:"Merge branch 'main' into streams-editorial-suggestions",ghUser:"benjie",authorName:"Benjie"}]},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2024/12-Dec/05-wg-primary.md",date:new Date("2024-12-05T00:00:00.000Z"),actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2024/2024-12.md",date:"2024-12",actor:null},{type:"prCreated",date:new Date("2024-11-21T15:11:21.000Z"),href:"https://github.com/graphql/graphql-spec/pull/1127",actor:"benjie"},{type:"commitsPushed",date:new Date("2024-11-21T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/2ef903c4a4fd6a0793c0274c67a42d53ca419170",actor:"benjie",commits:[{href:"https://github.com/graphql/graphql-spec/commit/2ef903c4a4fd6a0793c0274c67a42d53ca419170",headline:"Don't complete with error.",ghUser:"benjie",authorName:"Benjie Gillam"},{href:"https://github.com/graphql/graphql-spec/commit/5257c92869451ae79134ecd8e3f3b13a6005b652",headline:"Don't use a new algorithm, no need to DRY",ghUser:"benjie",authorName:"Benjie Gillam"},{href:"https://github.com/graphql/graphql-spec/commit/f49aab72ea487dd47fc1e1f72dcf939b3d0b221e",headline:"Internal errors should be passed up the chain",ghUser:"benjie",authorName:"Benjie Gillam"}]},{type:"commitsPushed",date:new Date("2024-06-11T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/75f10e0a9ea07920b6a6ceb6ec0009aa5be974c7",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/75f10e0a9ea07920b6a6ceb6ec0009aa5be974c7",headline:"feedback and use definition syntax",ghUser:"leebyron",authorName:"Lee Byron"}]},{type:"commitsPushed",date:new Date("2024-06-06T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/5bb1e07a6058a54af437d3814e6b705f573f552e",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/5bb1e07a6058a54af437d3814e6b705f573f552e",headline:"Editorial changes for Event Streams",ghUser:"leebyron",authorName:"Lee Byron"}]}],related:"1099",shortname:"When `sourceStream` errors, yield a `{ errors: [...] }` response",image:"/img/rfc_tracker.png"},s=void 0,i={id:"1127",title:"When `sourceStream` errors, yield a `{ errors: [...] }` response",description:"At a glance",source:"@site/rfcs/1127.md",sourceDirName:".",slug:"/1127",permalink:"/rfcs/1127",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"1127",closedAt:null,mergedAt:null,title:"When `sourceStream` errors, yield a `{ errors: [...] }` response",stage:"0",champion:"benjie",prUrl:"https://github.com/graphql/graphql-spec/pull/1127",events:[{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2025/01-Jan/09-wg-primary.md",date:"2025-01-09T00:00:00.000Z",actor:null},{type:"commitsPushed",date:"2024-12-05T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/19519699d9f32afac4bc61395e239431137feb33",actor:"benjie",commits:[{href:"https://github.com/graphql/graphql-spec/commit/19519699d9f32afac4bc61395e239431137feb33",headline:"Merge branch 'main' into streams-editorial-suggestions",ghUser:"benjie",authorName:"Benjie"}]},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2024/12-Dec/05-wg-primary.md",date:"2024-12-05T00:00:00.000Z",actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2024/2024-12.md",date:"2024-12",actor:null},{type:"prCreated",date:"2024-11-21T15:11:21.000Z",href:"https://github.com/graphql/graphql-spec/pull/1127",actor:"benjie"},{type:"commitsPushed",date:"2024-11-21T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/2ef903c4a4fd6a0793c0274c67a42d53ca419170",actor:"benjie",commits:[{href:"https://github.com/graphql/graphql-spec/commit/2ef903c4a4fd6a0793c0274c67a42d53ca419170",headline:"Don't complete with error.",ghUser:"benjie",authorName:"Benjie Gillam"},{href:"https://github.com/graphql/graphql-spec/commit/5257c92869451ae79134ecd8e3f3b13a6005b652",headline:"Don't use a new algorithm, no need to DRY",ghUser:"benjie",authorName:"Benjie Gillam"},{href:"https://github.com/graphql/graphql-spec/commit/f49aab72ea487dd47fc1e1f72dcf939b3d0b221e",headline:"Internal errors should be passed up the chain",ghUser:"benjie",authorName:"Benjie Gillam"}]},{type:"commitsPushed",date:"2024-06-11T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/75f10e0a9ea07920b6a6ceb6ec0009aa5be974c7",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/75f10e0a9ea07920b6a6ceb6ec0009aa5be974c7",headline:"feedback and use definition syntax",ghUser:"leebyron",authorName:"Lee Byron"}]},{type:"commitsPushed",date:"2024-06-06T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/5bb1e07a6058a54af437d3814e6b705f573f552e",actor:"leebyron",commits:[{href:"https://github.com/graphql/graphql-spec/commit/5bb1e07a6058a54af437d3814e6b705f573f552e",headline:"Editorial changes for Event Streams",ghUser:"leebyron",authorName:"Lee Byron"}]}],related:"1099",shortname:"When `sourceStream` errors, yield a `{ errors: [...] }` response",image:"/img/rfc_tracker.png"},sidebar:"rfcsSidebar",previous:{title:"Allow singular variables in list locations",permalink:"/rfcs/509"},next:{title:"add __directive meta field parallel to __type",permalink:"/rfcs/1114"}},c={},l=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2}];function o(e){const r={a:"a",blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,h.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Identifier"}),": #1127"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Stage"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman",children:"RFC0: Strawman"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Champion"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/benjie",children:"@benjie"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"PR"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/pull/1127",children:"When `sourceStream` errors, yield a `{ errors: [...] }` response"})]}),"\n"]}),"\n",(0,a.jsx)(r.h2,{id:"timeline",children:"Timeline"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsx)(r.li,{children:(0,a.jsxs)(r.strong,{children:["Added to ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2025/01-Jan/09-wg-primary.md",children:"2025-01-09 WG agenda"})]})}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Commit pushed"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/19519699d9f32afac4bc61395e239431137feb33",children:"Merge branch 'main' into streams-editorial-suggestions"})," on 2024-12-05 by ",(0,a.jsx)(r.a,{href:"https://github.com/benjie",children:"@benjie"})]}),"\n",(0,a.jsx)(r.li,{children:(0,a.jsxs)(r.strong,{children:["Added to ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2024/12-Dec/05-wg-primary.md",children:"2024-12-05 WG agenda"})]})}),"\n",(0,a.jsx)(r.li,{children:(0,a.jsxs)(r.strong,{children:["Mentioned in ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2024/2024-12.md",children:"2024-12 WG notes"})]})}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsxs)(r.strong,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/pull/1127",children:"Spec PR"})," created"]})," on 2024-11-21 by benjie"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"3 commits pushed"})," on 2024-11-21:","\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/2ef903c4a4fd6a0793c0274c67a42d53ca419170",children:"Don't complete with error."})," by ",(0,a.jsx)(r.a,{href:"https://github.com/benjie",children:"@benjie"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/5257c92869451ae79134ecd8e3f3b13a6005b652",children:"Don't use a new algorithm, no need to DRY"})," by ",(0,a.jsx)(r.a,{href:"https://github.com/benjie",children:"@benjie"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/f49aab72ea487dd47fc1e1f72dcf939b3d0b221e",children:"Internal errors should be passed up the chain"})," by ",(0,a.jsx)(r.a,{href:"https://github.com/benjie",children:"@benjie"})]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Commit pushed"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/75f10e0a9ea07920b6a6ceb6ec0009aa5be974c7",children:"feedback and use definition syntax"})," on 2024-06-11 by ",(0,a.jsx)(r.a,{href:"https://github.com/leebyron",children:"@leebyron"})]}),"\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.strong,{children:"Commit pushed"}),": ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/commit/5bb1e07a6058a54af437d3814e6b705f573f552e",children:"Editorial changes for Event Streams"})," on 2024-06-06 by ",(0,a.jsx)(r.a,{href:"https://github.com/leebyron",children:"@leebyron"})]}),"\n"]}),"\n",(0,a.jsx)(r.hr,{}),"\n",(0,a.jsxs)(r.blockquote,{children:["\n",(0,a.jsxs)(r.p,{children:["See ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-spec/pull/1099/files#r1799509253",children:"https://github.com/graphql/graphql-spec/pull/1099/files#r1799509253"})]}),"\n",(0,a.jsxs)(r.p,{children:["Currently if ",(0,a.jsx)(r.code,{children:"sourceStream"})," generates an error, then ",(0,a.jsx)(r.code,{children:"responseStream"})," repeats the error. This is the behavior implemented in graphql-js and ",(0,a.jsx)(r.a,{href:"https://github.com/graphql/graphql-js/issues/4001",children:"is problematic"}),"."]}),"\n",(0,a.jsxs)(r.p,{children:["GraphQL captures execution errors and wraps them in an ",(0,a.jsx)(r.code,{children:"{ errors: [...] }"})," payload for query and mutation operations; it should do the same for stream errors in a subscription operation."]}),"\n",(0,a.jsx)(r.p,{children:"This PR makes this change. It is technically a breaking change, I think, so will require\u200b careful thought."}),"\n"]})]})}function p(e={}){const{wrapper:r}={...(0,h.a)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>i,a:()=>s});var a=t(7294);const h={},n=a.createContext(h);function s(e){const r=a.useContext(n);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(h):e.components||h:s(e.components),a.createElement(n.Provider,{value:r},e.children)}}}]);