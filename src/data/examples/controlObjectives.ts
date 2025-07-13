import type { ControlObjective } from "@/data";

export const exampleControlObjectives: ControlObjective[] = [
	{
		id: "550e8400-e29b-41d4-a716-446655440001",
		name: "Data Encryption at Rest",
		description: "Ensure all sensitive data stored in databases and file systems is encrypted using approved encryption algorithms and key management practices",
		type: "preventive",
		priority: "critical",
		scope: ["Database", "File System"],
		relatedBusinessObjectives: ["bo-1"],
		measurableOutcomes: [
			"All databases containing PII are encrypted with AES-256",
			"Encryption keys are managed through approved key management system",
			"Regular audits confirm encryption is properly implemented",
		],
		tags: ["encryption", "data-protection", "storage"],
		securityGoals: ["Confidentiality"],
	},
	{
		id: "550e8400-e29b-41d4-a716-446655440002",
		name: "Multi-Factor Authentication",
		description: "Require multi-factor authentication for all administrative access and sensitive user operations",
		type: "preventive",
		priority: "high",
		scope: ["Admin Panel", "User Accounts"],
		relatedBusinessObjectives: ["bo-2"],
		measurableOutcomes: [
			"100% of administrative accounts use MFA",
			"MFA is required for accessing sensitive data",
			"MFA bypass procedures are documented and monitored",
		],
		tags: ["authentication", "access-control", "mfa"],
		securityGoals: ["Authenticity"],
	},
];