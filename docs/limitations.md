# Limitations

* **One edition.** The matrix follows the UAE IA Regulation v1.1 (TDRA, March 2020), read on 2026-11-01. A later
  edition may change families, sub-families or priorities. Check before relying on it.
* **Not the regulation.** Only identifiers, short titles and priorities are used. The requirements themselves are
  in the official text, which you must read.
* **Derived mappings, not equivalence.** Family and sub-family mappings to ISO/IEC 27001:2022 come from an
  expert-judgement crosswalk. A mapped ISO control supports the objective; it does not make an entity compliant.
  23 of the 66 sub-families are rated `medium` (partial match) in that crosswalk, each with a note on what differs.
* **NIST CSF is indirect.** CSF categories are reached through the ISO controls (IAR → ISO 27001 → CSF), so they
  inherit both mappings' approximations, and ISMS clauses do not reach CSF at all (M2, for example, shows only
  GV.PO).
* **Coarse unit.** The family view is a first pass. The sub-family view is finer but still above the 188 controls
  of Annex B; control-level gaps inside a sub-family are not visible.
* **Default priority per sub-family** is the highest priority among its controls. Individual controls in the same
  sub-family can have lower priorities.
* **Score.** The compliance score is a weighted count of statuses, not a measure of risk or of assessor opinion.
* **Applicability.** The matrix does not decide whether the IAR applies to an organisation.
* **Not yet independently reviewed.** See [review.md](review.md). Until a review is recorded there, treat the
  mappings as a maintainer draft.
* **Sample data is fictional.** Falcon Bay Logistics FZ-LLC and everything about it are invented.
