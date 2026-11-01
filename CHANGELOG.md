# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
