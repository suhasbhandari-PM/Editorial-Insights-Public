# Quintype Website API (QT API Documentation JSON)

## Scope

This document consolidates findings from all `QT API Documentation.json` files in the repo (website/public API spec surface).

## Source files and variants

| SHA256 | File paths |
| --- | --- |
| `5E18EB7A3504F1578E53E8A483D3E7D73F4591AC4DFEC22B64E3C998BF9A40C6` | `Automation experiments/SEO scraper/V2/QT API Documentation.json`<br>`Experiments/BoldQTAPItesting/QT API Documentation.json` |
| `F833B9433E42C8FE99EB872A9BA2D31DDEC8F6A9A9BADF3908E3D41B1F7680F6` | `Experiments/Premium/QT API Documentation.json`<br>`Experiments/Budget Updates/QT API Documentation.json` |

Spec metadata (both variants observed):

- `swagger`: `2.0`
- `host`: `madrid.quintype.io`
- `schemes`: `http`
- path count: `47`
- definition count: `243`

## Endpoint inventory

| Method | Path | Summary |
| --- | --- | --- |
| `GET` | `/api/domains/{domain-slug}/stories.rss` | An Api for RSS Feed for a given sub-domain. |
| `POST` | `/api/member` | Creates a user |
| `POST` | `/api/member/forgot-password` | An Api for forgot password |
| `POST` | `/api/member/login` | An api for user login. |
| `GET` | `/api/member/metadata` | To get the metadata of the user |
| `POST` | `/api/member/metadata` | Creates or updates metadata of the user if the user is logged in |
| `POST` | `/api/member/welcome-email` | Send welcome email based on `Welcome Email on User Verification` feature toggle |
| `GET` | `/api/route-data.json` |  |
| `GET` | `/api/sign` | Sign the image |
| `GET` | `/api/story/attributes` | Fetches accesstype story-attributes |
| `GET` | `/api/story-collection` | List all published collections |
| `GET` | `/api/v1/advanced-search` | An Api which supports advanced search of entities and stories |
| `GET` | `/api/v1/amp/config` | Amp configuration required to display the amp story page |
| `GET` | `/api/v1/authors` | API to fetch list of authors |
| `GET` | `/api/v1/authors/{author-id}` | Fetches details about a particular author for the given id or slug |
| `GET` | `/api/v1/authors/{id}/collection` | Author-Collection API |
| `GET` | `/api/v1/breaking-news` | Breaking news API |
| `GET` | `/api/v1/collections/{slug}` | Gets a Collection |
| `GET` | `/api/v1/config` | Config |
| `GET` | `/api/v1/custom-urls/{path}` | Custom URL or Static page details |
| `GET` | `/api/v1/entities` | Get a list of entities. |
| `GET` | `/api/v1/entities/{id}` | Get an entity with the given id or slug. |
| `GET` | `/api/v1/entities/{id}/{subentity}` | Get entity and nested entities |
| `GET` | `/api/v1/entity/{id}/collections` | Get collections linked with the entity. |
| `POST` | `/api/v1/emails/unsubscribe` | API for unsubscribe newsletters |
| `GET` | `/api/v1/forms` | Fetch a list of form details based on various filters |
| `GET` | `/api/v1/forms/{slug}` | Fetch form details by id or slug |
| `GET` | `/api/v1/magazines` | Fetch a list of magazines details based on various filters |
| `GET` | `/api/v1/magazines/{id-or-slug}` | Fetch magazine details by id or slug |
| `GET` | `/api/v1/magazines/{id-or-slug}/issues` | Fetch issues under a magazine |
| `GET` | `/api/v1/magazines/{id-or-slug}/issues/{issues-id-or-slug}` | Fetch issue and its items |
| `GET` | `/api/v1/members/me` | Returns the current user. |
| `PATCH` | `/api/v1/members/profile` | Update member profile |
| `PATCH` | `/api/v1/members/{id}` | Update a member |
| `POST` | `/api/v1/members/verification-email` | Send a verification email |
| `GET` | `/api/v1/menu-groups` | To get all the menu groups |
| `GET` | `/api/v1/preview/story/{public-preview-key}` | Fetches the story given the correct public-preview-key |
| `GET` | `/api/v1/search` | Search for Published Stories |
| `GET` | `/api/v1/stories` | Stories Index |
| `GET` | `/api/v1/stories-by-slug` | Gets a Story |
| `GET` | `/api/v1/stories/{story-id}` | Gets a Story |
| `GET` | `/api/v1/stories/{story-id}/related-stories` | Fetches Related Stories |
| `GET` | `/api/v1/tags/{slug}` | To get all the tags |
| `GET` | `/api/v1/trending/authors` | API to get trending authors for a given time period |
| `GET` | `/api/v1/trending/tags` | API to get trending tags for a given time period |
| `GET` | `/api/v1/uc-news` | description |
| `POST` | `/logout` | An api for user logout. |
| `GET` | `/stories.rss` | An Api for RSS Feed. |

## Response-shape examples

### Story attributes shape (`AccesstypeStoryAttributes`)

```json
{
  "visibility": "subscription|login|public",
  "access-level": "string_or_numeric_access_level",
  "published-at": 1571716286097
}
```

### Story response wrapper (`StoryResponse`)

```json
{
  "story": {
    "id": "uuid",
    "headline": "...",
    "slug": "...",
    "story-template": "...",
    "cards": [],
    "metadata": {}
  }
}
```

`Story` definition fields observed in spec (sample):

- `updated-at`
- `seo`
- `assignee-id`
- `author-name`
- `tags`
- `headline`
- `storyline-id`
- `story-content-id`
- `slug`
- `last-published-at`
- `subheadline`
- `alternative`
- `sections`
- `read-time`
- `access-level-value`

### Stories index wrapper (`StoriesResponse`)

```json
{
  "stories": [
    {
      "id": "uuid",
      "headline": "...",
      "slug": "..."
    }
  ]
}
```

### Publisher config wrapper (`ConfigResponse`)

```json
{
  "publisher-id": 0,
  "publisher-name": "...",
  "cdn-image": "https://media.assettype.com",
  "domains": [],
  "sections": [],
  "story-attributes": []
}
```

`ConfigResponse` fields observed in spec (sample):

- `cdn-video`
- `stripe-publishable-key`
- `sketches-host`
- `public-integrations`
- `theme-attributes`
- `facebook`
- `sections`
- `social-links`
- `layout`
- `domains`
- `cdn-name`
- `publisher-id`
- `publisher-settings`
- `num-headlines`
- `publisher-name`

## AccessType linkage captured in QT spec

- Endpoint present: `GET /api/story/attributes`.
- Definition present: `AccesstypeStoryAttributes`.
- This is the data contract used for story-level access/paywall attributes.

## Notes

- Use `api docs/quintype-cms-api.md` for editor/CMS-domain behaviors and template parsing differences.
- Use this file for website/public endpoint inventory from the JSON specs.

## Live validation notes

Observed on `https://www.prajavani.net` during live inspection on 2026-03-30:

- `GET /api/v1/stories?template=syndicated-print&limit={n}&offset={n}` works as a public FE listing endpoint for stories with `story-template = syndicated-print`.
- The query parameter that worked was `template`. The variants `story-template`, `story_template`, and `page` were tested and did not behave as the template filter/pagination controls.
- `offset` paginates correctly on `/api/v1/stories`; `page` did not.
- The list response for `/api/v1/stories?template=syndicated-print...` already includes:
  - `id`
  - `headline`
  - `slug`
  - `url`
  - `story-template`
  - `hero-image-s3-key`
  - `hero-image-metadata`
- Example validated story:
  - ID: `7bd59df2-8c97-45c0-8678-e03bece85dd5`
  - Story URL: `https://www.prajavani.net/story/7bd59df2-8c97-45c0-8678-e03bece85dd5`
  - Story template: `syndicated-print`
- `GET /api/v1/stories/7bd59df2-8c97-45c0-8678-e03bece85dd5` on the website domain returned `200` and preserved `story-template: syndicated-print`.
