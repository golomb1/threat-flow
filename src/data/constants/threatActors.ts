export const DoDThreatActorTiers: Record<string, string> = {
    'Tier-1': 'Practitioners who rely on others to develop the malicious code, delivery mechanisms, and execution strategy (use known exploits).',
    'Tier-2': 'Practitioners with a greater depth of experience, with the ability to develop their own tools (from publicly known vulnerabilities).',
    'Tier-3': 'Practitioners who focus on the discovery and use of unknown malicious code, are adept at installing user and kernel mode root kits, frequently use data mining tools, target corporate executives, and key users (government and industry) for the purpose of stealing personal and corporate data with the expressed purpose of selling the information to other criminal elements.',
    'Tier-4': 'Criminal or state actors who are organized, highly technical, proficient, well-funded professionals working in teams to discover new vulnerabilities and develop exploits.',
    'Tier-5': 'State actors who create vulnerabilities through an active program to "influence" commercial products and services during design, development, or manufacturing, or with the ability to impact products while in the supply chain to enable exploitation of networks and systems of interest.',
    'Tier-6': 'States with the ability to successfully execute full spectrum (cyber capabilities in combination with all of their military and intelligence capabilities) operations to achieve a specific outcome in political, military, economic, etc. domains and apply at scale.',
}

export const ThreatActors = [
    'Commercial Off the Shelf',
    'Nation State',
    'Apex threats',
    'Malicious insiders',
    'Supply chain threats',
]