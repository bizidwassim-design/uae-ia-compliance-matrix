# Worked example: Falcon Bay Logistics FZ-LLC against the UAE IA Regulation v1.1

> **Fictional example.** Falcon Bay Logistics FZ-LLC, its people, systems and findings are invented to show how
> the matrix is used. Any resemblance to a real organisation is coincidental. This is not legal advice and not an
> official TDRA assessment format.

| Item | Fictional data |
|------|----------------|
| Organisation | Falcon Bay Logistics FZ-LLC: freight and warehousing, a Dubai free-zone company with an office, two warehouses and an OT network for conveyors and cold rooms |
| Dates | Assessment date (fictional): 2026-10-20; report issued the same day by the information security manager |
| Scope | All 15 IAR families, rated at family level |
| Data used | Matrix catalogue `families-1.1`; family mappings derived from the UAE IAR v1.1 overlay of [grc-control-crosswalk](https://github.com/bizidwassim-design/grc-control-crosswalk) 1.1.0 (sources accessed 2026-11-01) |
| Example written | 2026-11-01; the figures below are checked against `data/sample.js` by `scripts/check_controls.js` |
| Try it | Open the [live matrix](https://bizidwassim-design.github.io/uae-ia-compliance-matrix/): it loads this sample on the first visit |

## Method

1. For each family, the information security manager and the control owner agreed a status on the six-level
   scale (Not applicable, Not started, Planned, Partially implemented, Implemented, Implemented and verified) and
   wrote down the evidence they could show an assessor.
2. Each family got a priority, P1 to P4, following the IAR rule that P1 controls come first.
3. Open items got an owner and a target date.
4. The matrix computed the score (status points over 4 per applicable family) and ranked the gaps by priority,
   then status, then family.

## Results

* Compliance score: **50 %**
* Implemented or verified: **5 of 15**
* Partially implemented: **6**
* Not started or planned: **4**
* P1 items still open: **6**

| Family | Status | Priority | Owner | Target | Evidence and notes (fictional) |
|--------|--------|:--------:|-------|--------|---------------------------------|
| M1 Strategy and Planning | Implemented | P1 | CISO | — | Policy set v3 approved by the board on 2026-03-12; security steering committee meets quarterly. |
| M2 Information Security Risk Management | Partially implemented | P1 | CISO | 2026-12-31 | Risk register exists (42 risks); treatment plan approved; annual re-assessment not yet scheduled. |
| M3 Awareness and Training | Partially implemented | P2 | HR and security | 2027-01-31 | Awareness e-learning at 78 % completion; role-based training for administrators not started. |
| M4 Human Resources Security | Implemented | P2 | HR | — | Screening and confidentiality terms in every contract; leaver checklist in the ITSM. |
| M5 Compliance | Planned | P1 | Legal | 2027-02-28 | Obligations register drafted (UAE PDPL, free-zone regulations, customer contracts); records retention schedule pending. |
| M6 Performance Evaluation and Improvement | Not started | P2 | CISO | 2027-03-31 | No internal audit yet; metrics reported ad hoc. |
| T1 Asset Management | Partially implemented | P1 | IT operations | 2026-12-15 | CMDB covers servers and laptops (94 %); OT and IoT assets not inventoried; classification scheme approved. |
| T2 Physical and Environmental Security | Implemented | P3 | Facilities | — | Badge access with logs on server rooms; UPS and fire suppression maintained under contract. |
| T3 Operations Management | Partially implemented | P1 | IT operations | 2027-01-15 | Patch SLA met for 91 % of endpoints; backup restore tested in September; central logging covers identity and endpoints, not yet OT. |
| T4 Communications | Partially implemented | P1 | Network team | 2027-02-15 | Segmentation between office, warehouse and OT in place; firewall rule review overdue; TLS 1.2+ enforced. |
| T5 Access Control | Implemented | P1 | Identity team | — | MFA on 100 % of accounts; privileged access through PIM; quarterly access review with sign-off. |
| T6 Third-Party Security | Planned | P2 | Procurement and security | 2027-03-31 | Supplier inventory with 68 suppliers tiered; security clauses in new contracts only; assessments not started. |
| T7 Information Systems Acquisition, Development and Maintenance | Not started | P3 | Applications | 2027-06-30 | No secure development standard; outsourced development without security acceptance criteria. |
| T8 Information Security Incident Management | Implemented and verified | P1 | SOC lead | — | IR plan tested in a tabletop exercise in August; incident register maintained; regulator notification path documented. |
| T9 Information Systems Continuity Management | Partially implemented | P1 | IT operations | 2027-01-31 | BIA completed; ICT continuity plan drafted with RTO 4 h; failover test planned for December. |

## Gaps to close first

The order the matrix gives (priority, then status, then family): **M5, M2, T1, T3, T4, T9** (all P1), then **M6,
T6, M3** (P2), then **T7** (P3).

## Next step: from family to sub-family

The family view is a first pass. In the live matrix, *Work at the 66 IAR v1.1 sub-families* replaces the families
with the sub-families of the regulation (identifiers, short titles, priorities and ISO/IEC 27001:2022 mappings
from the crosswalk). Rate them the same way; the family rows stay as headings and the score switches to the
sub-families. For M2, for example, the sub-families M2.1 to M2.4 map to ISO 27001 clauses 6.1, 8.2, 8.3 and 9.1,
so Falcon Bay can reuse its existing ISO risk method and only add what the IAR asks on top.

*Fictional data for illustration only. Check the current IAR edition and its applicability to your organisation
with the regulator before planning real work.*
