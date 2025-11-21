---
sidebar_position: 33
collapsed: false
---

# Modelling Errors

There's a lot of discussion about how to model errors in GraphQL, and a lot of
different approaches. Here's my take on it.

## Categorising errors

I find it easiest to think in these terms; there are two broad categories of
errors applicable to GraphQL schemas: **domain errors** and **exceptions**.

:::note[Application-level errors only]

Client misuse (malformed or malicious requests) and protocol-level errors such
as document validation are outside the scope of this article - these are
generally handled by the GraphQL server/engine before reaching your schema
logic.

:::

### Domain errors

These are errors that are part of your business domain logic, for example:

- data constraints: username is too short, email address is already registered,
  etc
- authn/authz: you must be logged in to do that, only admins may do that, etc
- business logic: you don't have enough credits to create that, etc

In most cases, domain errors are "non-recoverable" - the user must take some
action to fix the problem in their request.

### Exceptions

Essentially exceptions are everything that isn't a domain error: things that you
wouldn't generally _expect_ to happen, like `us-east-1` going down [/irony].

Typically exceptions are things that, in a perfect world (bug-free technology,
infinitely scalable, zero cost, latency was zero, no bad actors existed, and
user requests were serialized) would not happen:

- network errors: DNS resolution, can't connect, etc
- storage errors: disk full, quota reached, read/write error, etc
- order-of-operations errors: deadlocks, transaction conflicts, etc
- service errors: downtime, load shedding, downstream service failure, etc
- operational policy: rate limiting, blocking abuse, rejecting robots, etc
- timeouts: execution took too long, request timed out, etc
- resource exhaustion: memory limits, CPU limits, storage limits, I/O limits,
  etc

In most cases, exceptions are "recoverable" - temporary failure, retry in a few
hours time.

## No modelling for exceptions

In my opinion, exceptions should not be modelled in the schema - there's way too
many types of them, and they can happen basically anywhere. Adding them to the
schema would add a lot of noise, would require frontend developers to put in a
lot of boilerplate code to handle them all, and would slow down time to market
without delivering significant value. Users don't typically care why it went
wrong, they just care whether it's their fault or not, and if not when they
should try again.

Instead, exceptions should be handled through standard GraphQL error handling.
Developers should make use of the `extensions` property to indicate common
information that's useful for the error page:

- A specific `errorCode` that uniquely identifies the error
- An error category that indicates the type of failure (this may be a prefix of
  the `errorCode`, or indicated separately)
- A `retryAfter` timestamp or duration indicating when a good time to retry
  would be

The GraphQL client (Relay, Apollo Client, URQL, gql.tada, Graffle, GraphQL-TOE +
window.fetch, etc) should ensure that errors are suitably represented in the
response fed to application code. There are a number of options for this:

1. application developers can indicate specifically where and how in the
   response errors should be handled via
   [a client-side `@catch` directive](https://relay.dev/docs/guides/catch-directive/),
   for example they may wish that position to take on a `Result` type where
   success must be explicitly checked to access the underlying data (and thus
   errors can be explicitly handled)
2. the GraphQL client can throw the error when the application code attempts to
   read from an errored field (for example, using
   [GraphQL Throw On Error](https://www.npmjs.com/package/graphql-toe)) or
   fragment; application code can then handle errors with traditional
   `try`/`catch` or `<ErrorBoundary />` patterns.

Either way, the application should render a standard error details page about
the error, using the `extensions` property to guide the information to share
with and instructions to supply to the user.

## Domain error general principles

Domain errors are where things get a bit more nuanced. Let's start by thinking
about some general principles:

### Existence

`null` means "does not exist".

If you request an item of data through GraphQL, and that datum does not exist,
then the GraphQL schema should return `null`, not an error, since `null` already
means the data does not exist. (Corollary: if you request a collection of data
and there is no data to return then an empty array should be returned, rather
than `null`.)

**Requested data not existing is not an error.** Most things you can imagine
don't exist.

### Forbidden access

Telling someone "this exists, but you're not allowed to see it" and "this does
not exist _in the set of things you're allowed to see_" are two different
things. The first reveals the existence of the thing, the latter does not say
one way or the other whether it actually exists or not.

From a security/privacy perspective, it's preferred to reveal as little as
possible about things that a user is not permitted to know about, including
whether or not they exist. Thus I subscribe to the idea that `403 Forbidden`
should not be used for data access unless _all_ instances of that resource
(extant or not) are forbidden to the user. Instead, `404 Not Found` should be
used to indicate that the resource does not exist within the set of things the
user is allowed to see.

Take GitHub for example:

- https://github.com/graphql/tsc - if you're a GraphQL TSC member (and logged in
  to GitHub) you'll be able to see this repository, but otherwise it will render
  as a 404 Not Found page.
- https://github.com/benjie/world-domination-plan - this repository may or may
  not exist, and you'll never know unless I reveal it

Mapping this same principle to GraphQL:

**Requests to data you are not permitted to access should be equivalent to the
data not existing** - the data _does not exist in the set of things you're
allowed to see_. (If you request a single item you're not allowed to see,
GraphQL should return `null`. If you're requesting a list of things and some of
them you're not allowed to see, the list should _skip over_ those items. If
you're not allowed to see any of them, you get an empty list.)

### No side effects in queries

The GraphQL specification states (emphasis mine):

<figure>

> Because **the resolution of fields other than top-level mutation fields must
> always be side effect-free and idempotent**, the execution order must not
> affect the result, and hence the service has the freedom to execute the field
> entries in whatever order it deems optimal.

<figcaption>
<a href="https://spec.graphql.org/draft/#sel-GANVLDCB2BBiKn6D">6.3.4 Normal and Serial Execution</a>
</figcaption>
</figure>

**Queries must be side-effect free and idempotent.**

This means, for example, that simply accessing a value should not change
anything. So you cannot have fields that have a limited number of accesses in a
query (for example "read this article three times then it's forbidden") - if you
need a side-effect like this then this access must be modelled as a mutation to
be GraphQL compliant.

This is actually pretty critical for doing GraphQL well - applications should be
able to refetch data at will, with fragments that describe their data
requirements, and not need to keep count of how many times they've accessed
something. If they're doing something dangerous (in this example: increasing the
access count) then they must explicitly opt to do that through a mutation.

### No domain errors in queries

Combining the above principles, we can conclude that it's very unlikely that
domain errors should ever be returned from queries. And since the only remaining
errors are exceptions, and these should not be modelled in the schema, query
fields should never contain error types modelled in the schema. (Similar logic
applies to subscriptions.)

Thus, the _only_ place where we need to consider modelling errors in the schema
is in mutations.

## Modelling domain errors in mutations

So now we've limited our scope to mutation fields only, our job is much simpler!

We have essentially three choices:

1. Handle domain errors the same way as we would exceptions
2. Model domain errors as mutation fields returning a union type
3. Model domain errors as a list on the mutation result payload

### Option 1: handling domain errors as exceptions

Option 1 is simple and Just Works (we already have exception handling code!);
but is not very helpful for users of our application. Domain errors typically
include information that users can act on to fix their request, so it's better
to outline to the application which types of errors are expected, so that they
can be handled explicitly.

### Option 2: mutation fields return union

Option 2 makes it explicit what errors are expected (helping application
developers ensure they've handled all the expected domain errors), but stops as
soon as the first error occurs. This isn't ideal for helping the user fix the
form they were submitting:

- Server: "that username is already in use"
- Them: _fix and submit_
- Server: "that email address is invalid"
- Them: _fix and submit_
- Server: "you have not agreed to the terms of service"
- Them: _fix and submit_
- Server: "your password must contain at least one symbol"
- Them: _leaves your website for a competitors_

Instead, all errors should be returned at once, so the user can fix them all in
one go.

We could encompass all of these errors into an aggregate error type
(`AggregateConstraintError` with `errors: [ConstraintError!]!`), but not all the
errors are necessarily errors from data constraints... There might be constraint
errors _and_ business errors such as they have insufficient balance. Go too far
down this route, and you start reusing massive error types, and this becomes
less useful to the application developers again.

Further, maybe we _did_ perform the mutation, but there was a non-fatal error
that occurred that the user ought to deal with or be aware of (e.g. "we created
your account, but we had to change your username due to a conflict").

### Option 3: mutation payloads contain a list of errors

Option 3 contains a list of errors (using a mutation-specific error union), and
lets you indicate separately the result of the mutation. It also has the
advantage that anyone following
[solid mutation design advice](https://www.apollographql.com/blog/designing-graphql-mutations)
can integrate it into existing schemas without a breaking change.

### My personal preference

None of options 1-3 are wrong; you should choose the one that best suits your
business logic and development model.

My personal preference is to duplicate as many domain errors on the client as
possible (simple validation of data: username length, password makeup and match;
ahead of time checking to see if username is available, user has sufficient
balance) such that they are indicated to the user in realtime (with no or
minimal server cost); this significantly limits the number of domain errors that
would be expected to come from the server for a valid submission. If these
remaining domain errors are few enough, then Option 1 may be sufficient and
doesn't have the modelling overhead of options 2 and 3. If you indicate the data
validation rules on your fields through field metadata, and your client
retrieves them through runtime introspection, then your legacy deployed clients
can even evolve to handling changes in your data validation logic automatically!

If you cannot duplicate this logic on the client because it evolves too rapidly
or because application development and server development are handled by
separate teams, or if you have too many server-only domain errors, then I think
both options 2 and 3 are valid; I'd lean gently towards option 3 for its
flexibility, power, and simplicity, but option 2 does have the advantage of
modelling essentially a `Result` type in the schema, forcing application
developers to handle the polymorphism to be able to access the result data.
