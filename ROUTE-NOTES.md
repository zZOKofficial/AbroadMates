# Original route map (recovered from scrape evidence)

Evidence: HTTrack `<!-- Mirrored from ... -->` comments (original URL) and
escaped RSC payload canonicals (HTTrack did not rewrite those).

## Confirmed original URLs

| Page | Original route | Evidence |
|---|---|---|
| Home | `/` | mirrored comment |
| Mentors listing | `/mentors` | mirrored comment |
| Mentor profile | `/<slug>` (ROOT level, no prefix!) | mirrored: `abroadmates.com/md-ahnaf-farhan` |
| Sessions listing | `/sessions` | mirrored comment |
| Session detail | `/sessions/<slug>` | og:url in payload |
| Session register | `/sessions/<slug>/register` | directory layout |
| Scholarship page | `/scholarships-<slug>` (root, hyphen) | payload canonical `https://www.abroadmates.com/scholarships-daad-scholarships` |
| Country page | `/study-in-<country>` (root, hyphen) | mirrored: `abroadmates.com/study-in-germany` |
| Services detail | `/services/<slug>` | directory layout |
| Legals | `/legals/<x>` | directory layout |
| FAQ | `/faq`, `/contact`, `/our-story`, `/chat-with-founders`, `/become-an-abroadmate` | mirrored comments |
| Auth | `/login`, `/register`, `/register/form`, `/register/mentor/sign-up` | mirrored comments |

## Integration actions

- [ ] Decide implementation for root-level dynamic routes:
  either `app/[slug]/page.tsx` dispatch (mentor | `scholarships-*` | `study-in-*` | 404)
  or keep internal `app/mentors/[slug]` + `app/scholarships/[slug]` + `app/study-in/[slug]`
  and add `afterFiles` rewrites in `next.config.ts`:
  - `{ source: '/scholarships-:slug', destination: '/scholarships/:slug' }`
  - `{ source: '/study-in-:slug', destination: '/study-in/:slug' }`
  - `{ source: '/:slug', destination: '/mentors/:slug' }` (fires only when no static route matches)
- [ ] `data/scholarships.ts` header comment says route `/scholarships/[slug]` — external must be `/scholarships-<slug>`.
- [ ] Homepage link `mentors1227.html?scholarship=true` → `/mentors?scholarship=true`
  (`mentors1227.html` was HTTrack's duplicate save of `/mentors?...`).
- [ ] All remaining HTTrack `.html` links in components must map to clean routes above.
- [ ] Strip `?dpl=dpl_FrGjLbW7ratf1qXwMRe6o5a91D1e` from any asset URLs that leaked in.

## Scratch: original URL == HTTrack filename rule

- `foo.html` at root => original `/foo`
- `dir\foo.html` => original `/dir/foo`
- Query strings become part of the flat filename (`formc553.html` = `/register/form` + query hash)
