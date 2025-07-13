import type { SecurityParadigm } from "@/data";

export const WalledGardenParadigm: SecurityParadigm = {
    id: "paradigm-walled-garden",
    name: "Walled Garden",
    metadata: {
        version: "1.0",
        lastUpdated: "2025-06-22",
        description: "Cloud security paradigm for sensitive data processing"
    },
    attributionThreats: { 
        DoDThreatTier: 'Tier-4',
        Custom: [
            'Commercial Off the Shelf',
            'Nation State',
            'Supply chain threats',
        ]
    },
    assumptions: [
        {
            id: "a-1",
            name: "Assume Breach",
            description: 
                `Adversary is capable of running code inside organizational environments with clear text access to data.` +
                `Applies primarily to environments with permissive data ingestion or frequent ecosystem changes.`,
            scope: ["data-plane", "development-environments"],
        },
        {
            id: "a-2",
            name: "Familiarity with the organizational technology landscape",
            description: 
                `Threat actors possess comprehensive knowledge of organizational technology landscape, including cloud architectures, platform configurations, and operational practices.`,
            scope: ["all-environments"],
        },
        {
            id: "a-3",
            name: "Single Operation Constraint",
            description: 
                `Attack vectors must include both infiltration and exfiltration in a single operation.
                 The adversary must execute the entire attack vector "blindly" and utilize an exfiltration path in the target environment in order to establish an initial connection. It is assumed that an adversary can't infiltrate multiple environments (such as the data plane and control plane) simultaneously, and then later on exfiltrate data via a connection between the two infiltrated environments. 
                 An alternative phrasing might be that an adversary can't infiltrate and exfiltrate (in the scope of a single cyber operation) more than one environment in the same "shot".`,
            scope: ["all-environments"],
        },
        {
            id: "a-4",
            name: "Trusted CSP Supply Chain",
            description: "Cloud service provider's supply chain is completely trusted and not prone to attacks by addressed adversaries.",
            scope: ["cloud-infrastructure", 'CSP-backend', 'CSP-managed-services'],
        },
        {
            id: "a-5",
            name: "Internet Access (including SaaS Services & the CSP's Management Console) are prone to Data Exfiltration",
            description: 
                `All internet access is untrusted, including SaaS services and CSP management consoles. 
                Data exfiltration cannot be entirely prevented in such environments.`,
            scope: ["internet-facing-services", 'internet-facing-resources', 'CSP-management-console'],
        },
        {
            id: "a-6",
            name: "Service Clearance a mean to prevent Data Exfiltration channels",
            description: "Clearance process required to understand, mitigate, and prevent data exfiltration channels in managed services.",
            scope: ["managed-services", 'service-clearance'],
        }
    ],
    businessObjectives: [
        {
            id: "BO-1",
            name: "Ensure complete confidentiality",
            description: 
                `Protect sensitive data & assets from unauthorized access and disclosure. 
                Security measures relevant to sensitive data might apply to sensitive methodologies, algorithms, organizational characteristics, personal details, and all other assets defines as "sensitive".`,
            priority: "critical",
            tags: ["data protection", "confidentiality"],
        },
        {
            id: "BO-2",
            name: "Maintain System Reliability & Integrity",
            description: `Prevent adversaries from disrupting system operations or tampering with data that compromises business processes.`,
            priority: "high",
            tags: ["availability", "integrity", "business-continuity"],
        },
        {
            id: "BO-3",
            name: "Enhance business capabilities",
            description: "Use managed services by default, and resort to self-managed services only when the managed services present a serious security risk.",
            priority: "medium",
            tags: ["managed-services", "operational-efficiency"],
        },
        {
            id: "BO-4",
            name: "Secure Cloud Processing for Internal Analytics",
            description: "Enable the secure processing of sensitive organizational data on commercial public cloud platforms to generate business intelligence and organizational insights. This includes supporting supplementary processes such as data analytics, system debugging, technical support operations, and related data processing activities. The objective is to establish a cloud-based data processing capability that ingests sensitive data, transforms it into actionable organizational knowledge through analysis and computation, and securely delivers the resulting insights to on-premise networks for internal consumption by business stakeholders and decision-makers. This goal specifically focuses on internal-facing analytical workloads rather than customer-facing applications that directly serve or expose data to external users.",
            priority: "high",
            tags: ["cloud-security", "data-processing", "analytics", "hybrid-architecture"],
        },
    ],
    controlObjectives: [
        {
            id: "CO-1",
            name: "Prevent data exfiltration",
            description: 
                `Prevent data exfiltration from the organizational cloud environment to any destination (this refers to the sensitive data or other types of properties in cloud environment that are classified as "sensitive").`,
            type: 'preventive',
            priority: "critical",
            scope: ["data-plane"],
            relatedBusinessObjectives: ["BO-1"],
            measurableOutcomes: [
                "Any environment that processes sensitive data is isolated from the internet and other environments.",
                "Any managed service that is used for processing sensitive data is cleared for such use.",
                "Any environment that processes sensitive data is using only cleared services.",
            ],
            securityGoals: ["Confidentiality"],
            tags: ["data-protection", "exfiltration-prevention"]
        },
        {
            id: "CO-2",
            name: "Minimize Blast Radius",
            description: "Minimize impact of compromised cloud environment through strong isolation boundaries and prevention of lateral movement.",
            type: 'preventive',
            priority: "high",
            scope: ["all-environments"],
            relatedBusinessObjectives: ["BO-2"],
            measurableOutcomes: [
                "Network segmentation between different business flows",
                "Identity isolation across trust boundaries"
            ],
            securityGoals: ["Integrity", "Availability"],
            tags: ["isolation", "lateral-movement-prevention"],
        },
        {
            id: "CO-3",
            name: "Disrupt Adversary Operations",
            description: "Harden environments to disrupt adversary operations (focus on lateral movement) and create detection opportunities.",
            type: "detective",
            priority: "medium",
            scope: ["all-environments"],
            relatedBusinessObjectives: ["BO-2"],
            measurableOutcomes: [
                "Hardening controls deployed across all environments",
            ],
            securityGoals: [],
            tags: ["hardening", "detection", 'lateral-movement'],
        },
        {
            id: "CO-4",
            name: "Secure the Control Plane from infiltration",
            description: `
                The control plane is where the data plane is configured, and it is assumed that an adversary in the control plane could re-configure all security measures imposed on the data plane and exfiltrate data. 
                The security paradigm aims to make such scenarios hard to implement for an attacker and easy to detect by making the control plane as secure as possible.
            `,
            type: 'preventive',
            priority: "high",
            scope: ["control-plane"],
            relatedBusinessObjectives: ["BO-1", "BO-2"],
            measurableOutcomes: [
                "Change management process for all control plane modifications.",
                "Automated detection of unauthorized control plane changes.",
                "Access to control plane environments is restricted to trusted identities and locations.",
            ],
            securityGoals: ["Integrity", "Availability", "Non-Repudiation"],
            tags: ["change-management", "static-configuration"]
        },        
        {
            id: "CO-5",
            name: "Secured promotions from development to production",
            description: `
                Prevent adversary in the development plane from sabotaging the production environment. 
                The security paradigm aims to make such scenarios hard to implement for an attacker and easy to detect by using CI/CD and automation promotions of code from development environments to production environments.`,
            type: "preventive",
            priority: "medium",
            scope: ["development-plane", "production-plane"],
            relatedBusinessObjectives: ["BO-2"],
            measurableOutcomes: [
                "100% automated promotion pipeline",
                "Zero manual production deployments"
            ],
            securityGoals: ["Integrity", "Availability"],
            tags: ["ci-cd", "development-security"]
        },
        {
            id: "CO-6",
            name: "Minimize On-Premise Risk",
            description: "Prevent cloud environment from being used as attack vector against on-premise networks.",
            type: "preventive",
            priority: "high",
            scope: ["cloud-to-onprem-boundary"],
            relatedBusinessObjectives: ["BO-4"],
            measurableOutcomes: [
                "Network isolation between cloud and on-premise",
                "Secured channels between cloud and to-onprem"
            ],
            securityGoals: ["Integrity", "Availability", "Confidentiality"],
            tags: ["network-isolation", "hybrid-security"]
        },
        {
            id: "CO-7",
            name: 'Minimize External Attack Surface',
            description: "Keep internet-facing endpoints to absolute minimum.",
            type: "soft",
            priority: "medium",
            scope: ["all-environments"],
            relatedBusinessObjectives: ["BO-2"],
            measurableOutcomes: [
                "Small number of internet-facing endpoints",
                "Regular attack surface assessment",
                "Justify and document all public endpoints",
                "Centralized governance of public endpoints"
            ],
            securityGoals: [],
            tags: ["attack-surface", "exposure-minimization"]
        }
    ],
    securityGuidelines: [
        {
            id: 'G-1',
            name: 'Two Lines of Defense',
            description: "Implement at least two independent configuration mechanisms and security controls to create strong defense lines.",
            category: 'architecture',
            priority: 'high',
            applicableScopes: ["all-environments"],
            relatedControlObjectives: ["CO-2", "CO-3"],
            implementationPrinciples: `
                1. At least two <b>configuration mechanisms</b> that are completely independent are required to make a security control a "strong" line of defense, due to the concern of configuration mistakes and potential exploits. For instance, two policies which both prevent the same undesired outcome/operation independently would not be considered two lines of defense if they are always configured simultaneously and are in effect two instances of the same mechanism.
                    a.	This principle applies to other areas as well, such as detection mechanisms. When two detection opportunities are required for a mitigation, two separate indications are required. Those indications could be later on forwarded to the same log analysis service; the important principle is that neutralizing one detection mechanism wouldn't harm the indication generated by the other one.
                2. At least two independents <b>security controls</b> are required to prevent an attack vector; the adversaries described by the threat model are assumed to not be capable of such complex operations (surpassing 2 independent mechanisms in the same operation) and raising the bar higher has little marginal value. 
                3. Mechanisms similar to Azure Policy, AWS SCP, GCP organization constraints could be considered a second line of defense given that they are managed separately (i.e., different users, deployments/configurations, etc.) from the resources' deployment itself.
            `,
            tags: ["defense-in-depth", "redundancy"]
        },
        {
            id: 'G-2',
            name: 'Control and Data Plane Separation',
            description: "Separate environment into data plane (sensitive data processing) and control plane (data plane configuration) with maximum isolation.",
            category: "architecture",
            priority: "critical",
            applicableScopes: ["data-plane", "control-plane"],
            relatedControlObjectives: ["CO-1", "CO-2"],
            implementationPrinciples: `
            1.	The separation of the environment into two as-separate-as-possible sub-environments with two different purposes: the <b>data plane</b> is where sensitive data is stored and processed, and the <b>control plane</b> is where the structure of the data plane is configured. The main motivation is to deny the ability to create new exfiltration paths from inside the data plane (where adversaries are assumed to be present) – thus moving all of the identities, network access and other conditions required for the configuration of the data plane into another separate environment.
            2.	This separation is implemented as thoroughly as possible in the context of a specific cloud provider (for instance, using the separation of networks, identities, policies, scopes of governance, IDPs, etc.), with the functional requirements in mind (as some separations are possible to implement but would make many user-stories/flows impractical and difficult).
            3.  Due to the nature of the cloud, it is assumed that some connections inherently exist between the data and the control plane (in both directions), and in some cases might not be mitigable. This creates a branch of attack vectors in which an adversary in the data plane (where his presence is assumed) manages to perform lateral movement to the control plane, using various mechanisms.
            To name a few prominent ones:
            a. Performing actions in the data plane that logged into the control plane ), using an XSS vulnerability to execute code on the control plane device/application reading the log. 
            b. Metadata fields and high-level settings of cloud services might be configurable from the data plane and accessible from the control plane. Any text accessible from both planes is prone to XSS attacks, as described previously.
            Although that those are not a straightforward exfiltration path, consuming data (i.e., logs and metrics) generated from the data plane outside the data plane is a bad practice that should be discouraged (and perhaps viewed as a waiver) without a proper security controls.
            `,
            tags: ["separation", "architecture"]
        },
        {
            id: 'G-3',
            name: 'Trust-Based Communication Control',
            description: "Higher-trusted environments must initiate all connections to lower-trusted environments.",
            category: "network-security",
            priority: "high",
            applicableScopes: ["all-environments"],
            relatedControlObjectives: ["CO-1", "CO-2", "CO-6"],
            implementationPrinciples: 
            `   1. Communication must follow a trust-based pull model where higher-trusted environments initiate all connections.
                2. Lower-trusted environments are prohibited from initiating communications with more-trusted environment endpoints.
                3. All data transfers—both uploads and downloads—between trust zones must be initiated by the higher-trusted environment to maintain security boundaries.
            `,
            tags: ["trust-model", "communication-control"]
        },
        {
            id: 'G-4',
            name: 'Private Communication Channels',
            description: "Use private connectivity between environments and resources to prevent data traversing public internet.",
            category: "network-security",
            priority: "high",
            applicableScopes: ["inter-environment-communication"],
            relatedControlObjectives: ["CO-1", "CO-4", "CO-6", "CO-7"],
            implementationPrinciples: `
                Private links, VPC peering, Direct connect or equivalent secure methods
                Avoid public endpoints for sensitive data transfers
                End-to-end private connectivity
            `,
            tags: ["private-connectivity", "network-isolation"]
        },
        {
            id: "G-5",
            name: "Encryption in Transit",
            description: "Encrypt all communications to negate transport medium attacks.",
            category: "network-security",
            priority: "medium",
            applicableScopes: ["all-communications"],
            relatedControlObjectives: ["CO-3"],
            implementationPrinciples: `
                1. HTTPS or VPN for all communications.
                2. Double encryption preferred for high-impact scenarios.
            `,
            tags: ["encryption", "transport-security"],
        },
        {
            id: "G-6",
            name: "Data Perimeter & Zero Trust",
            description: "Implement comprehensive data perimeter controls and zero trust principles.",
            category: "access-control", 
            priority: "critical",
            applicableScopes: ["all-environments"],
            relatedControlObjectives: ["CO-1", "CO-2", "CO-3", "CO-7"],
            implementationPrinciples:
            `
            1.	Data Perimeter is consisting from the following guidelines:
                a.	Organizational identities can only authenticate and access resources from within organizational environment (networks, endpoints, resources, etc.).
                b.	Only organizational identities can authenticate and access resources from within organizational environment (networks, endpoints, resources, etc.).
                c.	Organizational identities cannot access resources outside of organizational governance (including anonymous access).
                d.	Organizational identities can access only trusted resources.
                e.	Organizational resources can be accessed by only trusted identities.
                f.	Ensure organizational resources can only be accessed from trusted locations.
                g.	Ensure that only trusted resources can be accessed from organizational networks.
                h.	Whenever access to a service is discussed, the mentioned access should be performed using only non-publicly routable IP addresses (in other words - public endpoints or addressed should not be used)
                i.	Organizational identities cannot be part of other scopes of governance.
                j.	Ensure that an allow-list of permitted actions exists per resource instance.
            2.	These guidelines should also be enforced during post authentication (token verification).
            `,
            tags: ["zero-trust", "data-perimeter", "access-control"]
        },
        {
            id: "G-7",
            name: "Normally Closed Mechanisms",
            description: "Build security mechanisms to fail closed, requiring explicit configuration for access.",
            category: "architecture",
            priority: "medium",
            applicableScopes: ["all-security-controls"],
            relatedControlObjectives: ["CO-1", "CO-3", "CO-7"],
            implementationPrinciples: `
            It is desired to build all security mechanisms in the cloud in a "normally closed" fashion, which means that in the case of a configuration error or mismatch the mechanism will not work. 
            A few examples of this principle:
            1.	Allow-list permissions with no default privileges - Permissions (and access lists, in general) should be an "allow-list" where users have no privileges by default.
            2.	Policies should enable features, rather than disable them.
            3.	Managed services should not be accessible by default and allow access given specific conditions (the default behavior should be configured in a separate location from the list of allowed interactions, so that a configuration error in that list would not make the service accessible by default).
            `,
            tags: ["fail-closed", "secure-defaults"]
        },
        {
            id: "G-8",
            name: "Principle of Least Privilege",
            description: "Grant minimum necessary permissions for required functions.",
            category: "access-control",
            priority: "high",
            applicableScopes: ["all-environments"],
            relatedControlObjectives: ["CO-2", "CO-3"],
            implementationPrinciples: `
              - Role-based access control
              - Regular permission reviews
              - Just-in-time access where possible
              - Granular permission assignment
            `,
            tags: ["least-privilege", "access-control"]
        },
        {
            id: "G-9",
            name: "Secure by Design",
            description: "Integrate security considerations into all design phases of all workloads.",
            category: "architecture",
            priority: "medium",
            applicableScopes: ["all-environments"],
            relatedControlObjectives: ["CO-3"],
            implementationPrinciples: `
             - Security requirements in design phase
             - Threat modeling for all new systems
             - Security review gates in development lifecycle
            `,
            tags: ["secure-design", "security-lifecycle"]
        },
        {
            id: "G-10",
            name: "Network Communication Hub in the same Blast Radius",
            description: "Inspect intra-cloud inter-blast-radius network traffic between projects through centralized governance network controls.",
            category: "network-security",
            priority: "medium",
            applicableScopes: ["inter-project-communication"],
            relatedControlObjectives: ["CO-2", "CO-3"],
            implementationPrinciples: `
            In the case where Intra-cloud network traffic between projects in the same blast radius is needed, it should be inspected by a network controls (such as firewall) in order to create detection opportunities of adversaries in the data plane.
            - Centralized firewall for inter-project traffic.
            - Network-based inspection and filtering.
            - Detection opportunities for lateral movement.
            `,
            tags: ["network-inspection", "centralized-control"]
        },
        {
            id: "G-11",
            name: "Egress Data Inspection",
            description: "Inspect and filter all egress traffic through centralize governance choke-points to prevent data exfiltration.",
            category: "egress-security",
            priority: "critical",
            applicableScopes: ["egress-traffic"],
            relatedControlObjectives: ["CO-1", "CO-7"],
            implementationPrinciples: `
            Egress traffic from the cloud should be inspected and filtered using mechanism such as a TLS terminating proxy, DNS firewall etc., in order to prevent data exfiltration.
            The mechanism should support the following:
             - TLS terminating proxy for inspection
             - DNS firewall implementation
             - Egress choke-points managed by a centralized governance.
             - Compensating controls for single point of failure
             - High-privilege configuration requirements.
            The two lines of defense may not be enforceable there. 
            However, it is desired to have some compensating security controls (such as making it as static as possible, requiring high privileges to configure it, denying access to those services except what's necessary etc.).
             `,
            tags: ["egress-filtering", "dlp", "traffic-inspection"]
        },
        {
            id: "G-12",
            name: "Secure Configuration Enforcement",
            description: "Implement enforcement mechanisms to guarantee resources maintain secure configuration.",
            category: "configuration-management",
            priority: "high",
            applicableScopes: ["all-resources"],
            relatedControlObjectives: ["CO-5"],
            implementationPrinciples: `
            An enforcement mechanism is required in order to guarantee that all the resources created remain in their secure configuration;
            same applies to identities, security controls, and any other cloud service. 
            This allows the organization to define a "safe" configuration which guarantees the security of sensitive data, as long as no changes (contradicting the organizational policies) are made to the environment. 
            - Policy-based configuration enforcement
            - Automated compliance checking
            - Configuration drift detection and remediation
            - Immutable infrastructure where possible
            `,
            tags: ["configuration-enforcement", "compliance"]
        },
        {
            id: "G-13",
            name: "Small, Static, Well-Defined Environments",
            description: "Keep critical environments small, static, and predictable to enable easy detection of anomalies.",
            category: "architecture",
            priority: "high",
            applicableScopes: ["critical-environments", "control-plane"],
            relatedControlObjectives: ["CO-3", "CO-4"],
            implementationPrinciples: `
            Keep environment or components that are required to be secured from infiltration as relatively small, static, and with well-defined data flows. 
            This creates easy detection opportunities for unexpected operations, and reduces the number of potential attack vectors (as fewer features and services are enabled and used, and as the ways they are being used are very predictable).
                - Minimize services and features in critical environments.
                - Predictable and well-documented data flows.
                - Change control for environment modifications.
                - Anomaly detection based on baseline behavior.
            `,
            tags: ["static-environment", "infiltration-prevention", "anomaly-detection"]
        },
        {
            id: "G-14",
            name: "Governance & Operations Separation",
            description: "Separate control plane security governance from standard DevOps operations to make security control removal detectable.",
            category: "architecture",
            priority: "high",
            applicableScopes: ["control-plane"],
            relatedControlObjectives: ["CO-3", "CO-4"],
            implementationPrinciples: `
            The separation of control plane security measures (governance, policies, etc.) from standard administration work (DevOps operations for customers).
            This makes the mentioned above scenario of an adversary removing the security controls of one of the planes and exfiltration data a very "noisy" and easy to detect attack vector.
            - Separate roles for governance and operations.
            - Different approval processes for security vs operational changes.
            - Automated detection of security control modifications.
            - Audit trail for all governance activities.
            `,
            tags: ["governance-separation", "role-separation"]
        },
        {
            id: "G-15",
            name: "Incident Response & Monitoring",
            description: "Implement robust incident response and monitoring capabilities for timely detection and response.",
            category: "monitoring",
            priority: "high",
            applicableScopes: ["all-environments"],
            relatedControlObjectives: ["CO-3"],
            implementationPrinciples: `
                Comprehensive logging and alerting
                Defined incident response procedures
                Regular incident response testing
                Integration with threat intelligence
            `,
            tags: ["incident-response", "monitoring", "logging"]
        },
        {
            id: "G-16",
            name: "Managed Services & Private Channels for Inter-Project Communications", 
            description: "Use managed services and private channels for inter-project communications to ensure secure data transfer and minimize attack surface.",
            category: "inter-project-communication",
            priority: "high",
            applicableScopes: ["inter-project-communication"],
            relatedControlObjectives: ["CO-2", "CO-3"],
            implementationPrinciples: `
            In the case where inter-cloud is required, it should be used by a managed service instead of network traffic in order to minimize the attack surface between projects.
            Use managed services (SQS, Service Bus, etc.) instead of direct network traffic for inter-project communication.
            Implement private endpoints and service connections to avoid direct network routing.
            - Establish centralized governance for managing inter-projects communications with inspection capabilities.
            - Maintain allow-list of permitted inter-project communication patterns.
            - Log and monitor all inter-project message flows for anomaly detection.
            `,
            tags: ["network-inspection", "inter-project-communication", "centralized-control"]
        },
        {
            id: "G-17",
            name: "Restrictive Data Ingestion",
            description: "Implement restrictive data ingestion policies to prevent adversary foothold through untargeted attacks.",
            category: "network-control",
            priority: "medium",
            applicableScopes: ["data-ingestion-points"],
            relatedControlObjectives: ["CO-3"],
            implementationPrinciples: `
            Adopt a "restrictive data ingestion" attitude, which reduces the likelihood of an adversary gaining a foothold using untargeted attacks.
                - Authority approval for all ingested data.
                - Content inspection and validation.
                - Supply chain attack prevention measures.
                - Graduated inspection levels based on risk.
            `,
            tags: ["data-ingestion", "supply-chain-security"]
        },
        {
            id: "G-18",
            name: "Governance on the External Attack Surface",
            description: "Establish comprehensive governance controls for all externally-facing assets to minimize exposure, ensure consistent security posture, and maintain visibility across the organization's attack surface.",
            category: "attack-surface-governance",
            priority: "critical",
            applicableScopes: ["internet-facing-services", "public-endpoints", "external-apis"],
            relatedControlObjectives: ["CO-1", "CO-3", "CO-7"],
            implementationPrinciples: `
                Maintain comprehensive inventory of all externally-facing assets and services.
                Implement mandatory approval workflow for any new external exposure.
                Establish standardized security baselines for all external-facing components.
                Require regular security assessments and penetration testing for public endpoints.
                Implement automated discovery and monitoring of unauthorized external exposures.
                Enforce consistent authentication and authorization controls across all external services.
                Mandate security review gates before external service deployment or modification.
                Establish clear ownership and accountability for each external-facing asset.
                Implement automated compliance checking against external exposure policies.
                Require documented business justification for all external endpoints and services.
            `,
            tags: ["attack-surface-management", "external-security-governance"]
        },
        {
            id: "G-19",
            name: "Processing Business Data Must Occur in the Data Plane",
            description: "Ensure all processing of business and sensitive organizational data occurs exclusively within the designated data plane to maintain data confidentiality and prevent unauthorized access through control plane compromise.",
            category: "data-processing",
            priority: "critical",
            applicableScopes: ["data-processing", "business-intelligence", "data-plane"],
            relatedControlObjectives: ["CO-1", "CO-3"],
            implementationPrinciples: `
                All processing of business and sensitive organizational data must occur exclusively within the designated data plane.
                Logs which are generated from the data plane should be processed in the data plane, and not in the control plane.
                The control plane monitoring plane should not include business data or sensitive organizational data.
            `,
            tags: ["data-confidentiality", "data-plane-security"],
        },
        {
            id: "G-20",
            name: "Small, Static, Well-Defined Control Plane",
            description: "Keep the control plane small, static, and predictable to enable easy detection of anomalies and prevent unauthorized modifications.",
            category: "architecture",
            priority: "high",
            applicableScopes: ["control-plane"],
            relatedControlObjectives: ["CO-3", "CO-4"],
            implementationPrinciples: `
            Keep the control plane or components that are required to be secured from infiltration as relatively small, static, and with well-defined data flows.
            `,
            tags: ["anomaly-detection", "infiltration-prevention"]
        }
    ],
    threatCatalog: [
        {
            id: 'T-1',
            name: 'Domain Fronting Attack',
            description: "Attack where SNI header and Host header don't match, bypassing filtering based on these headers.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                'Adversary can send traffic to external IPs',
                'Adversary can create resources under the same IP address as the target resource',
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment'
            ],
            attackVectors: [
                "Traffic to malicious IP with permitted headers while mismatched SNI/Host headers"
            ],
            category: "C2",
            severity: "high",
            relatedControlObjectives: ["CO-1"],
            tags: ["network-attack", "header-manipulation"],
            affectedComponents: ["egress-gateways", "proxy-services"],
            affectedDataFlows: ["egress-gateways", "proxy-services"],
        },
        {
            id: "T-2",
            name: "DNS Tunneling",
            description: "Data exfiltration through DNS resolution requests, encoding data in DNS queries.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                "Adversary can send DNS queries to external DNS servers",
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment'
            ],
            category: "C2",
            severity: "medium",
            affectedComponents: ["dns-resolvers", "data-plane-services"],
            attackVectors: [
                "Encoded data in DNS query names mean for adversary-controlled DNS servers & response data in DNS records."
            ],
            relatedControlObjectives: ["CO-1"],
            mitigatedByControls: ["C-1"],
            tags: ["dns-attack", "covert-channel"]
        },
        {
            id: "T-3",
            name: "Managed Service as Proxy",
            description: "Using cloud services to proxy traffic from or to outside organizational environment.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                'Adversary know which services the organization uses'
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment'
            ],
            category: "C2",
            severity: "medium",
            affectedComponents: ["kubernetes-webhooks", "database-udfs"],
            attackVectors: [
                "Kubernetes webhook exploitation",
                "Database UDF abuse",
                "Serverless function misuse"
            ],
            relatedControlObjectives: ["CO-1"], 
            mitigatedByControls: ["control-service-hardening"],
            tags: ["service-abuse", "proxy-attack"]
        },
        {
            id: "T-4",
            name: "Direct Egress Traffic",
            description: "Direct TCP or DNS traffic sent to external addresses from compromised resources.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                'Adversary know which domains are allows from the environment'
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment'
            ],
            category: "data-exfiltration",
            severity: "high",
            affectedComponents: ["compute-instances", "containers"],
            attackVectors: [
                "Direct TCP connections to adversary-controlled IPs",
                "Unfiltered DNS requests to adversary-controlled domains",
                "Outbound network connections to adversary-controlled IPs"
            ],
            relatedControlObjectives: ["CO-1"],
            mitigatedByControls: ["control-egress-filtering"],
            tags: ["direct-exfiltration", "network-attack"]
        },
        {
            id: "T-5",
            name: "Cloud Service Backend Exploitation",
            description: "Exploiting cloud service vulnerabilities to perform lateral movement to service backend for exfiltration.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                'Adversary know which services the organization uses'
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment',
                "Adversary has vulnerability on the service backend"
            ],
            category: "lateral-movement",
            severity: "high",
            affectedComponents: ["managed-services", "cloud-service-backends"],
            attackVectors: [
                "Service vulnerability exploitation",
                "Backend lateral movement",
                "Privilege escalation in service context"
            ],
            relatedControlObjectives: ["minimize-blast-radius"],
            mitigatedByControls: ["control-service-isolation"],
            tags: ["lateral-movement", "service-exploitation"]
        },
        {
            id: "T-6",
            name: "Lateral Movement Between Environments",
            description: "Moving from initial compromised environment to connected environment with looser security restrictions.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                'Adversary know about connected environments and their security posture',
                "Adversary knows how those environments are connected"
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment',
            ],
            category: "lateral-movement",
            severity: "high",
            affectedComponents: ["environment-connections", "shared-services"],
            attackVectors: [
                "Shared service exploitation",
                "Cross-environment permissions",
                "Network connectivity abuse"
            ],
            relatedControlObjectives: ["minimize-blast-radius"],
            mitigatedByControls: ["control-environment-isolation"],
            tags: ["lateral-movement", "environment-compromise"]
        },
        {
            id: "T-7",
            name: "Cross-Tenant Communication via Shared Resources",
            description: "Accessing shared managed service backend to communicate between different tenant environments.",
            assumptions: [
                'Malicious code execute inside the organizational environment',
                'Adversary know about shared resources',
                "Adversary knows how to access shared resources"
            ],
            preconditions: [
                'Malicious code execute inside the organizational environment',
            ],
            category: "tenant-isolation-bypass",
            severity: "medium",
            affectedComponents: ["multi-tenant-services", "shared-backends"],
            attackVectors: [
                "Shared service backend access",
                "Cross-tenant data placement",
                "Service isolation bypass"
            ],
            relatedControlObjectives: ["minimize-blast-radius"],
            mitigatedByControls: ["control-tenant-isolation"],
            tags: ["tenant-isolation", "shared-service-risk"]
        }
    ],
    controlCatalog: [
        {
            id: "C-1",
            name: "SNI and Host Header Matching",
            description: "Ensure SNI header and Host header match when accessing resources to prevent domain fronting attacks.",
            category: "network-security",
            type: "preventive",
            priority: "high",
            implementationComplexity: "medium",
            relations: {
                mitigatesThreats: ["domain-fronting"],
                supportsControlObjectives: ["prevent-data-exfiltration"],
            },
            implementationGuidelines: `
                TLS inspection of egress traffic with SNI/Host header comparison and re-resolution
            `,
            effectiveness: 'high',
            remainingThreats: [],
            tags: ["domain-fronting-prevention", "header-validation"],
            affectedComponentsType: [],
            affectedDataflowsType: []
        },
        {
            id: "C-2",
            name: "DNS Filtering",
            description: "Filter and allow-list all egress DNS traffic to prevent tunneling scenarios.",
            category: "network-security",
            type: "preventive",
            priority: "high",
            implementationComplexity: "medium",
            relations: {
                mitigatesThreats: ["dns-tunneling"],
                supportsControlObjectives: ["CO-1"],
            },
            implementationGuidelines: `
                DNS Allow-listing - Maintain allow-list of permitted DNS domains and queries"
            `,
            effectiveness: 'high',
            remainingThreats: [],
            tags: ["dns-security", "tunneling-prevention"],
            affectedComponentsType: [],
            affectedDataflowsType: []
        },
        {
            id: "C-3",
            name: "Encryption in Transit",
            description: "Encrypt all communications to negate transport medium attacks.",
            category: "network-security",
            type: "architectural",
            implementationComplexity: 'low',
            priority: "medium",
            relations: {
                mitigatesThreats: [],
                supportsControlObjectives: ["CO-3"],
            },
            implementationGuidelines: `
                1. HTTPS or VPN for all communications.
                2. Double encryption preferred for high-impact scenarios.
            `,
            tags: ["encryption", "transport-security"],
            effectiveness: 'medium',
            remainingThreats: [],
            affectedComponentsType: [
                'API Gateway',
                'Load Balancer',
                'Web Application Firewall',
                'VPN Gateway',
                'Transit Gateway',
                'Internet Gateway',
            ],
            affectedDataflowsType: ['*']
        },
    ]
};