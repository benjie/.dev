"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[7916],{4955:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>h});var a=n(5893),i=n(1151);const r={identifier:"939",title:"allow unions to declare implementation of interfaces",stage:"1",champion:"yaacovCR",prUrl:"https://github.com/graphql/graphql-spec/pull/939",events:[{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-06-02.md",date:new Date("2022-06-02T00:00:00.000Z"),actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2022/2022-06-02.md",date:new Date("2022-06-02T00:00:00.000Z"),actor:null},{type:"commitsPushed",date:new Date("2022-05-23T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/dfb92227479440be4727ac4e0caa018d26223134",actor:"yaacovCR",commits:[{href:"https://github.com/graphql/graphql-spec/commit/dfb92227479440be4727ac4e0caa018d26223134",headline:"unions implementing interfaces have fields",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"}]},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-04-07.md",date:new Date("2022-04-07T00:00:00.000Z"),actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2022/2022-04-07.md",date:new Date("2022-04-07T00:00:00.000Z"),actor:null},{type:"commitsPushed",date:new Date("2022-04-06T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/1f0f1e0113f1685c362c77bc8a96cd614a401e61",actor:"yaacovCR",commits:[{href:"https://github.com/graphql/graphql-spec/commit/1f0f1e0113f1685c362c77bc8a96cd614a401e61",headline:"review feedback",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"},{href:"https://github.com/graphql/graphql-spec/commit/2b42f6b564df54bd4ef8eeb2a4a6ed92357fd3d6",headline:"adjust validation text",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"}]},{type:"prCreated",date:new Date("2022-04-05T09:07:33.000Z"),href:"https://github.com/graphql/graphql-spec/pull/939",actor:"yaacovCR"},{type:"commitsPushed",date:new Date("2022-04-05T00:00:00.000Z"),href:"https://github.com/graphql/graphql-spec/commit/f973735bae6f2124cb9d188d6dc241a0b24b685e",actor:"yaacovCR",commits:[{href:"https://github.com/graphql/graphql-spec/commit/f973735bae6f2124cb9d188d6dc241a0b24b685e",headline:"Add spec text for unions implementing interfaces",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"}]}],related:"373, ExpandingSubtyping, wg944",shortname:"allow unions to declare implementation of interfaces",image:"/img/rfc_tracker.png"},c=void 0,s={id:"939",title:"allow unions to declare implementation of interfaces",description:"At a glance",source:"@site/rfcs/939.md",sourceDirName:".",slug:"/939",permalink:"/rfcs/939",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"939",title:"allow unions to declare implementation of interfaces",stage:"1",champion:"yaacovCR",prUrl:"https://github.com/graphql/graphql-spec/pull/939",events:[{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-06-02.md",date:"2022-06-02T00:00:00.000Z",actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2022/2022-06-02.md",date:"2022-06-02T00:00:00.000Z",actor:null},{type:"commitsPushed",date:"2022-05-23T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/dfb92227479440be4727ac4e0caa018d26223134",actor:"yaacovCR",commits:[{href:"https://github.com/graphql/graphql-spec/commit/dfb92227479440be4727ac4e0caa018d26223134",headline:"unions implementing interfaces have fields",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"}]},{type:"wgAgenda",href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-04-07.md",date:"2022-04-07T00:00:00.000Z",actor:null},{type:"wgNotes",href:"https://github.com/graphql/graphql-wg/blob/main/notes/2022/2022-04-07.md",date:"2022-04-07T00:00:00.000Z",actor:null},{type:"commitsPushed",date:"2022-04-06T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/1f0f1e0113f1685c362c77bc8a96cd614a401e61",actor:"yaacovCR",commits:[{href:"https://github.com/graphql/graphql-spec/commit/1f0f1e0113f1685c362c77bc8a96cd614a401e61",headline:"review feedback",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"},{href:"https://github.com/graphql/graphql-spec/commit/2b42f6b564df54bd4ef8eeb2a4a6ed92357fd3d6",headline:"adjust validation text",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"}]},{type:"prCreated",date:"2022-04-05T09:07:33.000Z",href:"https://github.com/graphql/graphql-spec/pull/939",actor:"yaacovCR"},{type:"commitsPushed",date:"2022-04-05T00:00:00.000Z",href:"https://github.com/graphql/graphql-spec/commit/f973735bae6f2124cb9d188d6dc241a0b24b685e",actor:"yaacovCR",commits:[{href:"https://github.com/graphql/graphql-spec/commit/f973735bae6f2124cb9d188d6dc241a0b24b685e",headline:"Add spec text for unions implementing interfaces",ghUser:"yaacovCR",authorName:"Yaacov Rydzinski"}]}],related:"373, ExpandingSubtyping, wg944",shortname:"allow unions to declare implementation of interfaces",image:"/img/rfc_tracker.png"},sidebar:"rfcsSidebar",previous:{title:"allow unions to include interfaces and unions",permalink:"/rfcs/950"},next:{title:"Add support for directives on directives",permalink:"/rfcs/907"}},o={},h=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Identifier"}),": #939"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Stage"}),": ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-1-proposal",children:"RFC1: Proposal"})]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Champion"}),": ",(0,a.jsx)(t.a,{href:"https://github.com/yaacovCR",children:"@yaacovCR"})]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"PR"}),": ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/939",children:"allow unions to declare implementation of interfaces"})]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Related"}),":","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"/rfcs/373",title:"Allow interfaces to implement other interfaces / RFC3",children:"#373"})," (Allow interfaces to implement other interfaces)"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"/rfcs/ExpandingSubtyping",title:"Expanding Subtyping (for output types) / RFC0",children:"ExpandingSubtyping"})," (Expanding Subtyping (for output types))"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"/rfcs/wg944",title:"New Intersection Type / RFC0",children:"wg#944"})," (New Intersection Type)"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(t.h2,{id:"timeline",children:"Timeline"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsxs)(t.strong,{children:["Added to ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-06-02.md",children:"2022-06-02 WG agenda"})]})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsxs)(t.strong,{children:["Mentioned in ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2022/2022-06-02.md",children:"2022-06-02 WG notes"})]})}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Commit pushed"}),": ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/dfb92227479440be4727ac4e0caa018d26223134",children:"unions implementing interfaces have fields"})," on 2022-05-23 by ",(0,a.jsx)(t.a,{href:"https://github.com/yaacovCR",children:"@yaacovCR"})]}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsxs)(t.strong,{children:["Added to ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-04-07.md",children:"2022-04-07 WG agenda"})]})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsxs)(t.strong,{children:["Mentioned in ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-wg/blob/main/notes/2022/2022-04-07.md",children:"2022-04-07 WG notes"})]})}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"2 commits pushed"})," on 2022-04-06:","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/1f0f1e0113f1685c362c77bc8a96cd614a401e61",children:"review feedback"})," by ",(0,a.jsx)(t.a,{href:"https://github.com/yaacovCR",children:"@yaacovCR"})]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/2b42f6b564df54bd4ef8eeb2a4a6ed92357fd3d6",children:"adjust validation text"})," by ",(0,a.jsx)(t.a,{href:"https://github.com/yaacovCR",children:"@yaacovCR"})]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsxs)(t.strong,{children:[(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/939",children:"Spec PR"})," created"]})," on 2022-04-05 by yaacovCR"]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"Commit pushed"}),": ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/commit/f973735bae6f2124cb9d188d6dc241a0b24b685e",children:"Add spec text for unions implementing interfaces"})," on 2022-04-05 by ",(0,a.jsx)(t.a,{href:"https://github.com/yaacovCR",children:"@yaacovCR"})]}),"\n"]}),"\n",(0,a.jsx)(t.hr,{}),"\n",(0,a.jsxs)(t.blockquote,{children:["\n",(0,a.jsxs)(t.p,{children:["Cf. ",(0,a.jsx)(t.a,{href:"https://github.com/graphql/graphql-spec/pull/373#issuecomment-375489730",children:"https://github.com/graphql/graphql-spec/pull/373#issuecomment-375489730"})]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-graphql",children:"# generic types\ninterface Node {\n  id: ID!\n}\n\ninterface Connection {\n  pageInfo: PageInfo!\n  edges: [Edge]\n}\n\ninterface Edge {\n  cursor: String\n  node: Node\n}\n\ntype PageInfo {\n  hasPreviousPage: Boolean\n  hasNextPage: Boolean\n  startCursor: String\n  endCursor: String\n}\n\n# schema-specific types\ninterface Pet {\n  id: ID!\n  name: String\n}\n\ntype Cat implements Pet & Node {\n  id: ID!\n  name: String\n}\n\ntype Dog implements Pet & Node {\n  id: ID!\n  name: String\n}\n\nunion HousePet implements Pet & Node = Cat | Dog\n\n# house-pet-specific types\ntype HousePetEdge implements Edge {\n  cursor: String\n  node: HousePet  # <<< This is what is unlocked by this PR\n}\n\ntype HousePetConnection implements Connection {\n  pageInfo: PageInfo!\n  edges: [HousePetEdge]\n}\n\n# query\ntype Query {\n  housePets: HousePetConnection\n}\n"})}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>c});var a=n(7294);const i={},r=a.createContext(i);function c(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);