# Maximo Research Notes (May 10, 2026)

## Sources reviewed
- IBM Maximo Application Suite releases information (IBM Support): https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0
- IBM MAS architecture (IBM Docs): https://www.ibm.com/docs/en/masv-and-l/continuous-delivery?topic=models-maximo-application-suite-architecture
- IBM MAS technical overview (IBM Docs): https://www.ibm.com/docs/en/masv-and-l/cd?topic=overview-maximo-application-suite-technical
- Maximo Manage API home (IBM Docs): https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=apis-api-home
- MMI API overview (IBM Support): https://www.ibm.com/support/pages/maximo-management-interfacemmi-api-overview-and-how-use-it
- IBM Community OSLC quick start: https://community.ibm.com/community/user/viewdocument/oslc-quick-start-guide
- IBM Integration APIs (Control Desk/Maximo family docs): https://www.ibm.com/docs/en/control-desk/7.6.0?topic=applications-integration-apis
- IBM Cloud planning for MAS architecture: https://cloud.ibm.com/docs/maximo-application-suite?topic=maximo-application-suite-planning
- Red Hat OpenShift docs (cluster ops baseline): https://docs.redhat.com/en/documentation/openshift_container_platform
- Practitioner signal (implementation friction, migration/op support anecdotes): MoreMaximo, Naviam, Sharptree, InterPro, Maximo Secrets, Maximo Times, EAM360 (used as pattern corroboration; avoid direct copying)

## Version differences
- Maximo 7.6.x is typically traditional JVM deployment (WebSphere) with direct middleware administration.
- MAS 8.x moves Manage into OpenShift-operated containers with MAS Core orchestration and Suite licensing model.
- MAS 9.x expands feature-channel cadence and stronger platform-coupled operations (OpenShift + operators + pipeline discipline).

## Deployment differences
- Traditional/WebSphere: JVM tuning, EAR deployment, middleware patch sequencing, direct filesystem habits.
- MAS/OpenShift: Operator lifecycle, namespace isolation, route/ingress/TLS controls, storage classes, container resource limits.
- Hybrid: split responsibility boundaries increase drift risk between integration/security teams.

## Integration differences
- OSLC is mature and commonly used for query/navigation patterns.
- MIF remains critical for enterprise object structures and async messaging.
- JSON REST/NextGen improves payload ergonomics but governance/versioning must be standardized.
- API strategy must align with idempotency, retry policy, and monitoring ownership.

## Operational lessons
- Most failures are ownership and environment-governance problems, not code-only issues.
- OpenShift infra readiness (DNS, storage, certs, backup) is a leading predictor for MAS stability.
- Cron task and integration queue hygiene is essential to avoid silent backlog debt.

## Tribal knowledge patterns
- Security group sprawl creates hidden access conflicts.
- Automation scripts become fragile when business rules are undocumented.
- Migration Manager moves config but not always operational intent; post-migration validation is mandatory.
- Reporting and heavy queries often degrade prod without guardrails.

## Upgrade traps
- Underestimating customizations and script side effects.
- Assuming non-prod data shape equals prod behavior.
- Skipping integration contract testing during cutover windows.
- In MAS, treating OpenShift patching as independent from app release compatibility.

## MAS observations
- MAS ops is a platform discipline (SRE-style) as much as application administration.
- Day-2 operations require runbooks across app, integration, platform, and security teams.

## Implementation anti-patterns
- “Big-bang everything” deployments.
- No interface ownership matrix.
- No explicit RACI for monitoring and incident response.
- Customization before process baseline stabilization.

## Support realities
- Escalation delay often comes from missing reproducible evidence (logs, traces, payload snapshots).
- Handover packages frequently miss environment-specific operational constraints.

## Assumptions / limitations
- This pack uses publicly available sources and generalized practitioner patterns.
- No client-confidential or credential-gated content was used.
