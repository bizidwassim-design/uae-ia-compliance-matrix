# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- The headline score is labelled *Self-assessed score · family level* (or *control level* once controls are imported) and marked as indicative, not an audit result.

### Added
- *Work at the 66 IAR v1.1 sub-families*: the regulation's sub-families with priorities and mappings (`data/subfamilies.js`, generated).
- Snapshots of the crosswalk data the matrix depends on: `data/iar-v1.1-subfamilies.csv`, `data/iso27001-to-nist-csf.csv`.
- Dated fictional worked example `examples/falcon-bay-worked-example.md`; `docs/limitations.md`; `docs/review.md` (no review recorded yet).
- `scripts/check_controls.js` now checks family names against the IAR, family mappings against the crosswalk derivation, the sub-family catalogue and the worked-example figures.

### Changed
- The regulation is named as the UAE Information Assurance Regulation v1.1 (TDRA, March 2020); family names follow it exactly (catalogue `families-1.1`).
- Family ISO/IEC 27001 and NIST CSF mappings replaced by values derived from the verified IAR overlay of grc-control-crosswalk 1.1.0 (see `docs/framework-notes.md`, "Source and mapping changes").

### Changed
- The first visit opens on the fictional sample, with a banner and a *Start with a blank assessment* button that is remembered, so visitors see real-looking results straight away.

## [1.0.0] — 2026-11-01

### Added
- Initial public release.
- Single-page compliance matrix (`index.html`, `assets/`, `data/controls.js`): 15 UAE IA Standard control
  families with ISO/IEC 27001:2022 and NIST CSF 2.0 mappings, status, priority, owner, target date and evidence
  per row, compliance score, per-family bars, prioritised gap list, filters and search, JSON and CSV export,
  JSON import, control-list import from CSV, print stylesheet, local draft, light and dark themes, strict CSP.
- Fictional "Falcon Bay Logistics FZ-LLC" sample (`data/sample.js`, `examples/falcon-bay-sample.json`, `?sample=1`).
- CI: script syntax, catalogue check, generated files up to date, HTML validation, no external resources.
