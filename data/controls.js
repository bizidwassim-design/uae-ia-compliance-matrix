/* UAE IA Compliance Matrix — control catalogue. MIT License.
 *
 * The 15 control families of the UAE Information Assurance Regulation (IAR), version 1.1, March 2020, issued by
 * the TDRA: six management families (M1–M6) and nine technical families (T1–T9). Family names follow the IAR.
 *
 * Mappings are derived, not hand-written: `iso` is the union of the ISO/IEC 27001:2022 Annex A controls and ISMS
 * clauses that the verified IAR overlay of grc-control-crosswalk 1.1.0 gives for the family's sub-families
 * (snapshot: data/iar-v1.1-subfamilies.csv); `csf` is the set of NIST CSF 2.0 categories that the same crosswalk
 * gives for those Annex A controls (snapshot: data/iso27001-to-nist-csf.csv). scripts/check_controls.js fails
 * if they drift. Descriptions and evidence hints are this project's own wording. No regulation text is reproduced.
 */
(function (root) {
  "use strict";

  var FAMILIES = [
    { id: "M1", group: "management", name: "Strategy and Planning",
      desc: "Information security governance: policy set, roles and accountability, management commitment, planning and resourcing of the security programme.",
      iso: ["5.1", "5.2", "5.4", "5.5", "5.6", "5.19", "5.20", "5.37", "6.6", "Cl. 4.1", "Cl. 4.2", "Cl. 4.3", "Cl. 5.1", "Cl. 5.2", "Cl. 5.3", "Cl. 7.1", "Cl. 7.4", "Cl. 7.5"],
      csf: ["GV.PO", "GV.RR", "GV.SC", "ID.RA", "PR.PS", "RS.CO"],
      evidence: "Approved security policy, security organisation chart, programme plan and budget, management review minutes." },
    { id: "M2", group: "management", name: "Information Security Risk Management",
      desc: "Risk assessment method, risk register, treatment decisions, risk acceptance and periodic re-assessment.",
      iso: ["5.1", "Cl. 6.1.1", "Cl. 6.1.2", "Cl. 6.1.3", "Cl. 6.2", "Cl. 7.4", "Cl. 8.2", "Cl. 8.3", "Cl. 9.1"],
      csf: ["GV.PO"],
      evidence: "Risk methodology, current risk register, treatment plan, risk acceptance records." },
    { id: "M3", group: "management", name: "Awareness and Training",
      desc: "Security awareness for everyone, role-based training for staff with security duties, and measurement of both.",
      iso: ["5.1", "6.3", "Cl. 7.2", "Cl. 7.3"],
      csf: ["GV.PO", "PR.AT"],
      evidence: "Awareness plan, completion rates, phishing simulation results, training records for privileged roles." },
    { id: "M4", group: "management", name: "Human Resources Security",
      desc: "Screening, terms of employment, duties during employment, disciplinary process and responsibilities when people leave or change role.",
      iso: ["5.1", "5.4", "5.11", "5.18", "6.1", "6.2", "6.4", "6.5"],
      csf: ["GV.PO", "GV.RR", "PR.AA"],
      evidence: "Screening procedure, signed terms and confidentiality agreements, joiner/mover/leaver checklist." },
    { id: "M5", group: "management", name: "Compliance",
      desc: "Identification of legal, regulatory and contractual obligations, protection of records and personal data, and verification that policies are followed.",
      iso: ["5.10", "5.31", "5.32", "5.33", "5.34", "5.36", "8.8", "8.34", "Cl. 9.2"],
      csf: ["GV.OC", "GV.OV", "GV.PO", "ID.RA", "PR.DS", "PR.PS"],
      evidence: "Register of obligations, records retention schedule, privacy notices, internal compliance checks." },
    { id: "M6", group: "management", name: "Performance Evaluation and Improvement",
      desc: "Monitoring and measurement of the programme, internal audit, management review and corrective action.",
      iso: ["5.1", "5.35", "Cl. 9.1", "Cl. 9.2", "Cl. 10.1", "Cl. 10.2"],
      csf: ["GV.OV", "GV.PO"],
      evidence: "Security metrics, internal audit programme and reports, corrective action log, management review outputs." },

    { id: "T1", group: "technical", name: "Asset Management",
      desc: "Inventory and ownership of information and assets, acceptable use, classification and labelling, handling and return of assets.",
      iso: ["5.1", "5.9", "5.10", "5.12", "5.13", "7.10", "7.14", "8.1"],
      csf: ["GV.PO", "ID.AM", "PR.DS", "PR.PS"],
      evidence: "Asset inventory with owners, classification scheme, acceptable use policy, media disposal records." },
    { id: "T2", group: "technical", name: "Physical and Environmental Security",
      desc: "Secure areas, physical entry control, protection against environmental threats, equipment siting, maintenance and secure disposal.",
      iso: ["5.1", "7.1", "7.2", "7.3", "7.5", "7.6", "7.7", "7.8", "7.9", "7.11", "7.12", "7.13", "7.14", "8.1"],
      csf: ["GV.PO", "PR.AA", "PR.DS", "PR.IR", "PR.PS"],
      evidence: "Access logs for secure areas, visitor records, environmental monitoring, maintenance and disposal records." },
    { id: "T3", group: "technical", name: "Operations Management",
      desc: "Documented operating procedures, change management, capacity, malware protection, vulnerability and patch management, configuration, backup, logging and monitoring.",
      iso: ["5.1", "5.3", "5.37", "8.6", "8.7", "8.9", "8.13", "8.15", "8.16", "8.17", "8.29", "8.31", "8.32"],
      csf: ["GV.PO", "GV.RR", "PR.DS", "PR.IR", "PR.PS", "DE.CM"],
      evidence: "Operating procedures, change records, patch compliance report, backup test results, log retention settings." },
    { id: "T4", group: "technical", name: "Communications",
      desc: "Network security and segregation, security of network services, information transfer, cryptography and data leakage prevention.",
      iso: ["5.1", "5.6", "5.14", "7.10", "8.20", "8.21", "8.22", "8.26"],
      csf: ["GV.PO", "ID.RA", "PR.DS", "PR.IR", "PR.PS"],
      evidence: "Network diagram with zones, firewall rule review, encryption standard, transfer agreements, DLP policy." },
    { id: "T5", group: "technical", name: "Access Control",
      desc: "Access control policy, identity lifecycle, authentication, privileged access, access rights review and secure authentication.",
      iso: ["5.15", "5.16", "5.17", "5.18", "6.7", "8.1", "8.2", "8.3", "8.5", "8.18", "8.20", "8.22"],
      csf: ["PR.AA", "PR.IR", "PR.PS"],
      evidence: "Access control policy, joiner/mover/leaver evidence, MFA coverage, privileged account inventory, access review sign-offs." },
    { id: "T6", group: "technical", name: "Third-Party Security",
      desc: "Security in supplier relationships: requirements in agreements, supply chain, monitoring and review of supplier services, cloud services.",
      iso: ["5.19", "5.20", "5.22", "5.23"],
      csf: ["GV.SC"],
      evidence: "Supplier inventory with tiering, security clauses in contracts, supplier assessments, service review records." },
    { id: "T7", group: "technical", name: "Information Systems Acquisition, Development and Maintenance",
      desc: "Security requirements for new systems, secure development lifecycle, test data, outsourced development, change and acceptance testing.",
      iso: ["5.1", "5.21", "5.22", "8.4", "8.8", "8.12", "8.19", "8.24", "8.25", "8.26", "8.27", "8.28", "8.29", "8.30", "8.32", "8.33"],
      csf: ["GV.PO", "GV.SC", "ID.RA", "PR.AA", "PR.DS", "PR.PS"],
      evidence: "Security requirements checklist, secure coding standard, code review and test results, environment separation." },
    { id: "T8", group: "technical", name: "Information Security Incident Management",
      desc: "Incident response planning, reporting of events and weaknesses, assessment and decision, response, lessons learned and evidence collection.",
      iso: ["5.7", "5.24", "5.25", "5.26", "5.27", "5.28", "6.8"],
      csf: ["ID.IM", "ID.RA", "DE.AE", "RS.AN", "RS.MA"],
      evidence: "Incident response plan, incident register, post-incident reviews, regulator notification records." },
    { id: "T9", group: "technical", name: "Information Systems Continuity Management",
      desc: "Continuity planning for ICT, redundancy, recovery objectives, testing and maintenance of continuity arrangements.",
      iso: ["5.29", "5.30", "8.14"],
      csf: ["PR.IR", "RC.RP"],
      evidence: "Business impact analysis, ICT continuity plan with RTO/RPO, test reports, redundancy design." }
  ];

  var STATUSES = [
    { id: "na",   label: "Not applicable", score: null },
    { id: "none", label: "Not started",    score: 0 },
    { id: "plan", label: "Planned",        score: 1 },
    { id: "part", label: "Partially implemented", score: 2 },
    { id: "done", label: "Implemented",    score: 3 },
    { id: "ver",  label: "Implemented and verified", score: 4 }
  ];

  var PRIORITIES = ["P1", "P2", "P3", "P4"];

  var CATALOGUE = {
    framework: "UAE Information Assurance Regulation v1.1 (TDRA, March 2020)",
    version: "families-1.1",
    mappingSource: "grc-control-crosswalk 1.1.0, UAE IAR v1.1 overlay (sources accessed 2026-11-01)",
    families: FAMILIES,
    statuses: STATUSES,
    priorities: PRIORITIES
  };

  if (typeof module === "object" && module.exports) module.exports = CATALOGUE;
  else root.UAE_IA = CATALOGUE;
})(typeof window !== "undefined" ? window : this);
