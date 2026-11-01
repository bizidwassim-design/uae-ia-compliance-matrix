# Framework notes: sources, version and mapping rationale

## Source and version

| Item | Value |
|------|-------|
| Regulation | UAE Information Assurance Regulation (IAR), **version 1.1, March 2020**, issued by the TDRA |
| Source read | TDRA, *UAE Information Assurance Regulation* v1.1. <https://tdra.gov.ae/-/media/About/regulations-and-ruling/EN/UAE-Information-Assurance-Regulation-v1-1-pdf.ashx> |
| Access date | 2026-11-01 |
| Taken from it | Family names M1–M6 and T1–T9, the 66 sub-family identifiers and short titles, the P1–P4 priority concept and the priority of each control (Annex B: 188 controls). Identifiers and short titles only; no regulation text is reproduced. |
| Verification | `verified` against the TDRA text, as recorded in the crosswalk's [sources.md](https://github.com/bizidwassim-design/grc-control-crosswalk/blob/main/docs/sources.md). |
| Unverified | Whether a newer IAR edition exists, and the relation between the IAR and the earlier NESA *UAE Information Assurance Standards*. That lineage is widely reported but the v1.1 text does not state it. |

| Group | Families |
|-------|----------|
| Management (M) | M1 Strategy and Planning · M2 Information Security Risk Management · M3 Awareness and Training · M4 Human Resources Security · M5 Compliance · M6 Performance Evaluation and Improvement |
| Technical (T) | T1 Asset Management · T2 Physical and Environmental Security · T3 Operations Management · T4 Communications · T5 Access Control · T6 Third-Party Security · T7 Information Systems Acquisition, Development and Maintenance · T8 Information Security Incident Management · T9 Information Systems Continuity Management |

Each control in the IAR carries a priority, P1 to P4. Entities start with P1 controls and may re-prioritise after
risk assessment, except that P1 controls may not be demoted. The matrix uses the same scale.

## Where the mappings come from

This repository does not map the IAR by hand. It takes the mappings from the UAE IAR overlay of the
[GRC Control Crosswalk](https://github.com/bizidwassim-design/grc-control-crosswalk) (version 1.1.0), which maps each
of the 66 sub-families to ISO/IEC 27001:2022 with a confidence rating and a written rationale for every partial
match. Two snapshots of that data are kept here so the matrix works offline and the link is testable:

| File | Content |
|------|---------|
| [`data/iar-v1.1-subfamilies.csv`](../data/iar-v1.1-subfamilies.csv) | The 66 sub-families: identifier, title, family, Annex A controls, ISMS clauses, confidence, priorities |
| [`data/iso27001-to-nist-csf.csv`](../data/iso27001-to-nist-csf.csv) | The crosswalk's NIST CSF 2.0 subcategory for each of the 93 Annex A controls |

The family-level values are **derived**:

* `iso` = the union of the Annex A controls and ISMS clauses of the family's sub-families;
* `csf` = the NIST CSF 2.0 categories of those Annex A controls (ISMS clauses have no CSF mapping);
* the sub-family catalogue `data/subfamilies.js` (used by *Work at the 66 IAR v1.1 sub-families*) is generated
  from the same snapshot, with the highest priority of the sub-family's controls as its default priority.

`scripts/check_controls.js` fails if a family name differs from the IAR, if a family mapping is not exactly the
derivation above, or if the generated sub-family file is out of date. The rationale for each sub-family mapping
(why `high`, why `medium`) is in the crosswalk: see its
[mapping rationale](https://github.com/bizidwassim-design/grc-control-crosswalk/blob/main/docs/mapping-rationale.md).

Descriptions and evidence hints in `data/controls.js` are this project's own wording.

## Source and mapping changes

| Date | Change | Reason |
|------|--------|--------|
| 2026-11-01 | Catalogue `families-1.1`: the regulation is named as the **UAE IA Regulation v1.1 (TDRA, March 2020)**; family names now follow the IAR exactly. | Version 1.0 called it the "UAE Information Assurance Standard" with an issuer history that was not verified against the text. |
| 2026-11-01 | Family ISO/IEC 27001 and NIST CSF mappings **replaced** by values derived from the crosswalk's verified IAR overlay (see above). Examples: M1 now includes clauses 4.1–4.3, 7.1, 7.4, 7.5 and A.5.19/A.5.20 (security in projects and supplier terms); M2 is mapped to the ISMS risk clauses only plus A.5.1. | The 1.0 mappings were hand-written approximations made without the sub-family structure. Deriving them makes every family value traceable to a sub-family row with a rationale. |
| 2026-11-01 | Added the 66 sub-families, the dated worked example and the consistency checks. | Validation of the matrix against its source. |
| 2026-11-01 | Version 1.0, first release. | — |

## What to verify against the official text

* The family names, the sub-family list and the priority of each control you rely on.
* Whether the IAR applies to your organisation, and any overlay you are subject to: for a Dubai government
  entity the Dubai Information Security Regulation (DESC), for financial institutions the Central Bank's
  requirements, for personal data the federal PDPL or the DIFC or ADGM regimes. These are mapped in the
  crosswalk's overlays, not in this matrix.

See also [limitations.md](limitations.md) and [review.md](review.md).
