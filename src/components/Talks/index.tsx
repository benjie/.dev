import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { talks, type Talk } from "./talks";
import styles from "./styles.module.css";

const topics = Array.from(new Set(talks.flatMap((talk) => talk.topics)));
const topicTagStyles: Record<string, string> = {
  GraphQL: styles.graphqlTag,
  PostGraphile: styles.postgraphileTag,
  Grafast: styles.grafastTag,
  "Gra*fast*": styles.grafastTag,
};

// Support lightweight emphasis in talk data, e.g. "Gra*fast*".
function InlineText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\*([^*]+)\*/g)
        .map((part, index) =>
          index % 2 === 1 ? <em key={index}>{part}</em> : part,
        )}
    </>
  );
}

function Description({ description }: { description: Talk["description"] }) {
  return (
    <div className={styles.description}>
      {description.map((block, index) =>
        typeof block === "string" ? (
          <p key={index}>
            <InlineText text={block.trim()} />
          </p>
        ) : (
          <ul key={index}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <InlineText text={item} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function Topics({ talk }: { talk: Talk }) {
  return (
    <div className={styles.tags}>
      {talk.topics.map((topic) => (
        <span
          key={topic}
          className={`${styles.topicTag} ${topicTagStyles[topic] || ""}`}
        >
          <InlineText text={topic} />
        </span>
      ))}
      {talk.subcategory && (
        <span className={styles.meta}>
          <InlineText text={talk.subcategory} />
        </span>
      )}
    </div>
  );
}

export default function Talks() {
  const [activeTopic, setActiveTopic] = useState("");
  const featured = talks.find((talk) => talk.featured);
  const filteredTalks = talks.filter(
    (talk) => !activeTopic || talk.topics.includes(activeTopic),
  );

  return (
    <div className={styles.page}>
      <header>
        <div>
          <h1>Conference talks & appearances</h1>
          <p className={styles.intro}>
            A collection of talks, workshops, and conversations about building
            better software — from GraphQL to Postgres to security.
          </p>
        </div>
      </header>

      {featured && (
        <section className={styles.section} aria-labelledby="featured-heading">
          <div>
            <h2>Featured video</h2>
          </div>
          <div
            className={`${styles.featuredGrid} ${
              featured.embedUrl ? "" : styles.featuredWithoutVideo
            }`}
          >
            {featured.embedUrl && (
              <iframe
                className={styles.video}
                src={featured.embedUrl}
                title={featured.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
            <div className={styles.featuredCopy}>
              <Topics talk={featured} />
              <h2 id="featured-heading">
                <InlineText text={featured.title} />
              </h2>
              <Description description={featured.description} />
              <p className={styles.eventDetails}>
                {featured.event} · {featured.location}
                {featured.sessionType && ` · ${featured.sessionType}`}
              </p>
              <div className={styles.actions}>
                {featured.replay ? (
                  <Link className="button button--primary" to={featured.replay}>
                    Watch the talk ↗
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="button button--primary"
                    disabled
                  >
                    Watch the talk
                  </button>
                )}
                {featured.resources ? (
                  <Link to={featured.resources}>View resources</Link>
                ) : (
                  <span className={styles.unavailable}>View resources</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="archive-heading">
        <div className={styles.archiveHeading}>
          <div>
            <h2 id="archive-heading">Conference appearances</h2>
          </div>
        </div>
        <div
          className={styles.topicFilters}
          role="group"
          aria-label="Filter by topic"
        >
          {["", ...topics].map((topic) => (
            <button
              key={topic}
              type="button"
              className={`${styles.topicFilter} ${topicTagStyles[topic] || ""}`}
              aria-pressed={activeTopic === topic}
              onClick={() => setActiveTopic(topic)}
            >
              {topic ? <InlineText text={topic} /> : "All talks"}
            </button>
          ))}
        </div>
        <p className={styles.resultCount} role="status">
          {filteredTalks.length} {filteredTalks.length === 1 ? "talk" : "talks"}{" "}
          found
        </p>
        {filteredTalks.map((talk) => (
          <article
            className={styles.talkRow}
            key={`${talk.year}-${talk.title}`}
          >
            <div className={styles.year}>{talk.year}</div>
            <div className={styles.talkBody}>
              <Topics talk={talk} />
              <h3>
                <InlineText text={talk.title} />
              </h3>
              <Description description={talk.description} />
              <p className={styles.eventDetails}>
                {talk.event} · {talk.location}
                {talk.sessionType && ` · ${talk.sessionType}`}
              </p>
            </div>
            <div className={styles.talkLinks}>
              {talk.replay ? (
                <Link to={talk.replay}>{talk.replayLabel} ↗</Link>
              ) : (
                <span className={styles.unavailable}>
                  {talk.replayLabel || "Replay unavailable"}
                </span>
              )}
              {talk.resources ? (
                <Link to={talk.resources}>{talk.resourcesLabel}</Link>
              ) : (
                <span className={styles.unavailable}>
                  {talk.resourcesLabel}
                </span>
              )}
            </div>
          </article>
        ))}
        {filteredTalks.length === 0 && (
          <div className={styles.emptyState}>
            <p>No talks found. Try a different filter.</p>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setActiveTopic("")}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
