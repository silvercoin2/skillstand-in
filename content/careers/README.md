# Careers content

Job descriptions live here as Markdown. The careers page and homepage teaser load these files at build time.

## Add a role

1. Copy `roles/_template.md` to `roles/your-role-slug.md`.
2. The filename (without `.md`) is the role URL: `/careers/your-role-slug`.
3. Fill in the frontmatter and the three body sections.
4. Leave `applyUrl` off to use `defaultApplyUrl` from `config.md`.
5. Quote YAML values that contain a colon, e.g. `helpfulIntro: "Examples include:"`.

## Remove a role

Delete its file in `roles/`. Empty categories are hidden automatically.

## Hide a role without deleting it

Set `draft: true` in frontmatter.

## Apply links

- **Default form** (most roles): `defaultApplyUrl` in `config.md`.
- **Role-specific form** (Technical Consultant, Account Manager): set `applyUrl` on that role’s file.

Do not put Google Form URLs in `.env`.
