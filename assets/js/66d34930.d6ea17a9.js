"use strict";(self.webpackChunk_localrepo_benjie_dev=self.webpackChunk_localrepo_benjie_dev||[]).push([[4147],{5641:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>h});var i=t(5893),n=t(1151);const r={identifier:"Subscriptions",stage:"0",title:"NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/).",events:[{type:"docUpdated",date:new Date("2020-08-19T08:49:50.000Z"),href:"https://github.com/graphql/graphql-wg/blob/5db83c773d7950a05a9306d1cd8d7e0704e77bda/rfcs/Subscriptions.md",actor:"Benjie Gillam"},{type:"docUpdated",date:new Date("2018-02-08T20:30:34.000Z"),href:"https://github.com/graphql/graphql-wg/blob/a04a5af71b87b10de34b214ad99191a21502f8f5/rfcs/Subscriptions.md",actor:"Ivan Goncharov"},{type:"docUpdated",date:new Date("2017-05-02T15:44:35.000Z"),href:"https://github.com/graphql/graphql-wg/blob/f31ea10c73f6cc500df896c3470fcaf01131ad6b/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:new Date("2017-05-01T22:45:14.000Z"),href:"https://github.com/graphql/graphql-wg/blob/33bf11ba564bf939e97bc9424fafd9b5cf913739/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:new Date("2017-05-01T22:21:14.000Z"),href:"https://github.com/graphql/graphql-wg/blob/252acc477ac3df38f306a0acdbb4e70b7bf5ccd1/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:new Date("2017-04-28T18:21:55.000Z"),href:"https://github.com/graphql/graphql-wg/blob/509433383c3649219d2668423995aa8ae127860e/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:new Date("2017-04-01T19:37:26.000Z"),href:"https://github.com/graphql/graphql-wg/blob/f2c3127b463582dc4928cb17dad438f0816f7203/rfcs/Subscriptions.md",actor:"Brad Fults"},{type:"docUpdated",date:new Date("2017-03-28T19:09:04.000Z"),href:"https://github.com/graphql/graphql-wg/blob/b6d97ffb5a9a5a94ca52449771248182ae699765/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docCreated",date:new Date("2017-03-07T03:25:21.000Z"),href:"https://github.com/graphql/graphql-wg/blob/e30eccecf77304e6bd22e4bba0b808edfed4d198/rfcs/Subscriptions.md",actor:"Robert Zhu"}],shortname:"NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/).",image:"/img/rfc_tracker.png"},a=void 0,o={id:"Subscriptions",title:"NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/).",description:"At a glance",source:"@site/rfcs/Subscriptions.md",sourceDirName:".",slug:"/Subscriptions",permalink:"/rfcs/Subscriptions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{identifier:"Subscriptions",stage:"0",title:"NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/).",events:[{type:"docUpdated",date:"2020-08-19T08:49:50.000Z",href:"https://github.com/graphql/graphql-wg/blob/5db83c773d7950a05a9306d1cd8d7e0704e77bda/rfcs/Subscriptions.md",actor:"Benjie Gillam"},{type:"docUpdated",date:"2018-02-08T20:30:34.000Z",href:"https://github.com/graphql/graphql-wg/blob/a04a5af71b87b10de34b214ad99191a21502f8f5/rfcs/Subscriptions.md",actor:"Ivan Goncharov"},{type:"docUpdated",date:"2017-05-02T15:44:35.000Z",href:"https://github.com/graphql/graphql-wg/blob/f31ea10c73f6cc500df896c3470fcaf01131ad6b/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:"2017-05-01T22:45:14.000Z",href:"https://github.com/graphql/graphql-wg/blob/33bf11ba564bf939e97bc9424fafd9b5cf913739/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:"2017-05-01T22:21:14.000Z",href:"https://github.com/graphql/graphql-wg/blob/252acc477ac3df38f306a0acdbb4e70b7bf5ccd1/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:"2017-04-28T18:21:55.000Z",href:"https://github.com/graphql/graphql-wg/blob/509433383c3649219d2668423995aa8ae127860e/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docUpdated",date:"2017-04-01T19:37:26.000Z",href:"https://github.com/graphql/graphql-wg/blob/f2c3127b463582dc4928cb17dad438f0816f7203/rfcs/Subscriptions.md",actor:"Brad Fults"},{type:"docUpdated",date:"2017-03-28T19:09:04.000Z",href:"https://github.com/graphql/graphql-wg/blob/b6d97ffb5a9a5a94ca52449771248182ae699765/rfcs/Subscriptions.md",actor:"Robert Zhu"},{type:"docCreated",date:"2017-03-07T03:25:21.000Z",href:"https://github.com/graphql/graphql-wg/blob/e30eccecf77304e6bd22e4bba0b808edfed4d198/rfcs/Subscriptions.md",actor:"Robert Zhu"}],shortname:"NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/).",image:"/img/rfc_tracker.png"},sidebar:"rfcsSidebar",previous:{title:"__fulfilled meta field",permalink:"/rfcs/879"},next:{title:"Add namedType and punctuatedName to __Type",permalink:"/rfcs/710"}},c={},h=[{value:"At a glance",id:"at-a-glance",level:2},{value:"Timeline",id:"timeline",level:2},{value:"RFC: GraphQL Subscriptions",id:"rfc-graphql-subscriptions",level:2}];function l(e){const s={a:"a",blockquote:"blockquote",em:"em",h2:"h2",hr:"hr",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h2,{id:"at-a-glance",children:"At a glance"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Identifier"}),": Subscriptions"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Stage"}),": ",(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman",children:"RFC0: Strawman"})]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Champion"}),": -"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"PR"}),": -"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"timeline",children:"Timeline"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/5db83c773d7950a05a9306d1cd8d7e0704e77bda/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2020-08-19 by Benjie Gillam"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/a04a5af71b87b10de34b214ad99191a21502f8f5/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2018-02-08 by Ivan Goncharov"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/f31ea10c73f6cc500df896c3470fcaf01131ad6b/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2017-05-02 by Robert Zhu"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/33bf11ba564bf939e97bc9424fafd9b5cf913739/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2017-05-01 by Robert Zhu"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/252acc477ac3df38f306a0acdbb4e70b7bf5ccd1/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2017-05-01 by Robert Zhu"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/509433383c3649219d2668423995aa8ae127860e/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2017-04-28 by Robert Zhu"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/f2c3127b463582dc4928cb17dad438f0816f7203/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2017-04-01 by Brad Fults"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/b6d97ffb5a9a5a94ca52449771248182ae699765/rfcs/Subscriptions.md",children:"RFC document updated"})})," on 2017-03-28 by Robert Zhu"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.a,{href:"https://github.com/graphql/graphql-wg/blob/e30eccecf77304e6bd22e4bba0b808edfed4d198/rfcs/Subscriptions.md",children:"RFC document created"})})," on 2017-03-07 by Robert Zhu"]}),"\n"]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:["NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official ",(0,i.jsx)(s.a,{href:"https://spec.graphql.org/June2018/",children:"June 2018 GraphQL Specification"}),"."]}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h2,{id:"rfc-graphql-subscriptions",children:"RFC: GraphQL Subscriptions"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.em,{children:"Working Draft - February 2017"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Introduction"})}),"\n",(0,i.jsx)(s.p,{children:"Modern applications increasingly include scenarios where users receive immediate feedback when something interesting happens. When these applications outgrow simple polling solutions, they turn to stateful, bi-directional solutions that push data from server to client. There are many ways to extend GraphQL to support push-based solutions. By standardizing these concepts and solutions, we can keep the community cohesive, and ensure sustainable future improvements."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Background"})}),"\n",(0,i.jsx)(s.p,{children:"Using the standard request/response GraphQL model, apps can support realtime scenarios by repeatedly issuing the same GraphQL query. However, this solution is inefficient and large scale apps may prefer push-based solutions. Compared to polling, push-based solutions trade off statelessness and simplicity for efficiency while raising new questions and challenges. For example: how is an \u201cinteresting event\u201d detected and propagated? How does the GraphQL language express these semantics? How does this affect the client-side GraphQL API?"}),"\n",(0,i.jsx)(s.p,{children:"There are multiple valid answers to these questions, several of which have been proposed by the open-source community already [1][2][3]. At Facebook, we have been using \u201cGraphQL Subscriptions\u201d [4] at scale since 2015. Following our open-source philosophy, we now believe this system is useful and generalizable. We would like to contribute our ideas to the conversation."}),"\n",(0,i.jsx)(s.p,{children:'One of GraphQL\'s superpowers is allowing clients to specify exactly the data they need, sidestepping two problems known as \u201coverfetching" and "underfetching\u201d. With push-based solutions, we have a similar problems: \u201coverpushing" and "underpushing". Underpushing means we didn\'t send enough data, and the client now needs to make a follow-up network request. Overpushing means we sent the client too much data; in the best case this data is irrelevant and wastes network resources. In the worst case, this data contains sensitive information that the client should not see. Just as request/response GraphQL addresses overfetching and underfetching, GraphQL Subscriptions addresses overpushing/underpushing.'}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Possible Solutions"})}),"\n",(0,i.jsx)(s.p,{children:"We broadly categorize realtime API solutions into three types:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Polling"}),"- the client periodically issues a request to check on the state of the data it cares about. Polling solutions are simple, stateless, and work with existing GraphQL applications with little extra code. However, polling is difficult to tune. When updates are infrequent/unpredictable, polling is wasteful. When updates are frequent, polling introduces additional latency. If apps outgrow polling-based solutions, they should evaluate Event-based Subscriptions and Live Queries."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Event-based Subscriptions"}),"- the client tells the server that it cares about one or more events. Whenever those events trigger, the server notifies the client. This model requires the server to identify a well-known set of events, and how to raise/propagate them, ahead of time. Subscriptions require\u200b server-side state, such as which subscriptions are active, what events they are listening to, and the mapping of client connections to subscriptions. Among event-based subscriptions, we see a few sub-classes:"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Fixed-payload Subscriptions"}),"- clients only tell the server about the event(s) they're interested in and are then pushed fixed payloads. That is, the payload contents are determined by the server. For example, a flight tracker broadcasts \u201cFlight 123 is delayed by 30 minutes\u201d to all subscribers. This type of solution works for cases where all clients should receive the same payload. For cases where the payload is more complex or differs between users, fixed-payloads potentially send data that the client doesn't need, resulting in over-pushing."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Zero-payload Subscriptions"}),"- this type of subscription sends empty events to the client where it triggers a data fetch or client-side state invalidation. Essentially, this style always under-pushes. This style simplifies the server, but the client is now responsible for interpreting and reacting events coming from the server. This technique also has higher latency since the client must issue a network request in response to any non-trivial event to fetch more data."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Data-transform pipelines"}),"- for cases where data payloads differ between subscribers, there is a class\u200b of systems that uses dynamically configurable data streams. These systems require\u200b a more sophisticated event layer capable of dynamically specifying per-subscriber data-transform logic. This way, the output payload from the event layer is already subscriber-specific. The drawback of these systems is high complexity and distributed business logic. Our proposal (GraphQL Subscriptions) builds on this type of solution."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Live Queries"}),"- the client issues a standard query. Whenever the answer to the query changes, the server pushes the new data to the client. The key difference between Live Queries and Event-based Subscriptions is that Live Queries do not depend on the notion of events. The data itself is live and includes mechanisms to communicate changes. Note that many event-based use cases can be modeled as live queries and vice versa. Live Queries require\u200b reactive data layers, polling, or a combination of the two [5]."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"In the case of subscriptions and live queries, the addition of server-side state means production-grade systems will need to consider scalability, high-availability, throttling, buffering, and event/delivery rate mismatches in their designs."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Proposed Solution: GraphQL Subscriptions"})}),"\n",(0,i.jsx)(s.p,{children:'With "GraphQL Subscriptions", clients send the server a GraphQL query and query variables. The server maps these inputs to an event stream and executes the query when the events trigger. This model avoids overpushing/underpushing but requires a GraphQL backend. GraphQL Subscriptions provides an abstraction over business-domain events and exposes an API where the client subscribes to a query. Compared with existing data-transform pipeline techniques, GraphQL Subscriptions produces privacy-aware, right-sized payloads without pushing business logic to the event/messaging layer.'}),"\n",(0,i.jsx)(s.p,{children:"At Facebook, we believe GraphQL Subscriptions exhibits a set of useful tradeoffs and warrants definition and inclusion in the GraphQL specification. By specifying GraphQL Subscriptions, we hope to achieve the following goals:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Make GraphQL Subscriptions a great API choice for building realtime applications."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Enable interoperability between GraphQL Subscription clients and servers without restricting implementation."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Enable a strong tooling ecosystem (including GraphiQL)."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Provide concrete guidance to anyone currently building/operating systems to support GraphQL Subscriptions."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Provide clarity to teams evaluating GraphQL Subscriptions."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"We'll try to define the irreducible components of a GraphQL Subscriptions system below:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Bi-directional communication:"})," the client initializes the establishment of a bi-directional communication channel with the server. Once initialized, either the client or server can send data across the channel or close it."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Subscriptions System:"})," a component with the following responsibilities:"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Subscribe:"})," handle incoming subscription operations sent by clients."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Parse:"})," parse, validate, and store queries, variables, and context send by clients (aka subscribers)."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Map:"})," for valid subscription operations, map the combination of root field and query variables to an event stream. The event stream is deterministic with respect to the root field and query variables, and nothing else: that is, if two subscriptions with identical queries and variables are created at the same time, regardless of execution context, they will map to identical event streams."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Execute:"})," whenever any event from the mapped event stream triggers, the stored GraphQL query is executed, using the combination of saved variables, context, and event payload as input. Note that this means two different subscribers that send two identical GraphQL subscriptions do not necessarily receive the same publish stream. In other words publish streams for identical event streams are not necessarily equivalent."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Publish:"})," the execution result from above is published to the originating subscriber."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Unsubscribe:"}),' detect cases of client-initiated "unsubscribe" operations and shut down the subscription. The server may also choose to unsubscribe the client at any time due to errors, load, or timeouts.']}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Events"}),': any \u201cinteresting thing\u201d the system cares about, such as "friend logged on" or "new message received". Events may contain payload data. The combination of query, query variables, and event data is executed to create a GraphQL response in the shape that the client requested.']}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{src:"https://github.com/graphql/graphql-wg/raw/main/rfcs/subscriptions_01.png",alt:""})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.em,{children:"Above, the blue boxes on the left are components needed to support traditional request/response GraphQL system. The green box on the right contains new components needed to support GraphQL Subscriptions."})}),"\n",(0,i.jsx)(s.p,{children:"The lifetime of a subscription looks like this:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Subscribe:"})," the Client initializes a subscription by sending a query and its variables to the server. When the Subscription is created, the input query and variables are mapped to a stream of events to which the Subscription listens. The server ",(0,i.jsx)(s.em,{children:"may"})," send an initial publish from executing the subscription operation."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Publish:"})," when any of the events associated with the subscription are triggered, the subscription executes the query, variables, and payload and sends the result to the client."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Unsubscribe:"})," when a client becomes unsubscribed from a subscription, it will no longer receive payloads. This can happen when the client explicitly unsubscribes or when the server determines that unsubscription should occur, for example when the client has disconnected."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Subscribe/Unsubscribe:"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{src:"https://github.com/graphql/graphql-wg/raw/main/rfcs/subscriptions_02.png",alt:""})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"Single Publish:"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.img,{src:"https://github.com/graphql/graphql-wg/raw/main/rfcs/subscriptions_03.png",alt:""})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.em,{children:"Note: the notion of a \u201cSingle Subscription\u201d is logical. The implementation does not need to create one subscription object per client."})}),"\n",(0,i.jsx)(s.p,{children:"We look forward to comments, feedback, and discussion on this RFC."}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:"References"})}),"\n",(0,i.jsxs)(s.p,{children:["[1] ",(0,i.jsx)(s.a,{href:"https://dev-blog.apollodata.com/a-proposal-for-graphql-subscriptions-1d89b1934c18",children:"Proposal for GraphQL Subscriptions by Apollo"})]}),"\n",(0,i.jsxs)(s.p,{children:["[2] ",(0,i.jsx)(s.a,{href:"https://gist.github.com/OlegIlyenko/a5a9ab1b000ba0b5b1ad",children:"Event-stream based GraphQL Subscriptions"})]}),"\n",(0,i.jsxs)(s.p,{children:["[3] ",(0,i.jsx)(s.a,{href:"https://kadira.io/blog/graphql/subscriptions-in-graphql",children:"Subscriptions in GraphQL by Kadira"})]}),"\n",(0,i.jsxs)(s.p,{children:["[4] ",(0,i.jsx)(s.a,{href:"http://graphql.org/blog/subscriptions-in-graphql-and-relay/",children:"Subscriptions in GraphQL and Relay"})]}),"\n",(0,i.jsxs)(s.p,{children:["[5] ",(0,i.jsx)(s.a,{href:"http://graphql.org/blog/subscriptions-in-graphql-and-relay/#why-not-live-queries",children:"Why not live queries?"})]}),"\n"]})]})}function d(e={}){const{wrapper:s}={...(0,n.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},1151:(e,s,t)=>{t.d(s,{Z:()=>o,a:()=>a});var i=t(7294);const n={},r=i.createContext(n);function a(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);