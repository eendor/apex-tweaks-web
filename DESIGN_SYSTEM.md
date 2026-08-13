# Apex Design System

This lightweight system follows the principles represented in the Awesome Design Systems collection: reusable coded components, documented visual rules, accessible interaction patterns, and consistent voice.

## Foundations

- Canvas: warm neutral `#f4f1ea`; ink `#101216`; action `#e9472c`.
- Type: Space Grotesk for display text and DM Sans for interface/body text.
- Spacing: an 8px base rhythm, with dense app controls and more generous marketing sections.
- Focus and state must never rely on color alone. Controls use labels, icons, borders, and status text.
- Light surfaces always use dark ink; white is reserved for dark or action surfaces.

## Product voice

Use direct, calm language. Explain what will happen before asking for a system-level action. Never describe a tweak as risk-free. Pair destructive or elevated actions with rollback and recovery guidance.

## Components

Buttons, toggles, tabs, cards, banners, form fields, disclosure panels, status badges, navigation, and toast/status messages share the same tokens in `src/styles.css`. Authentication vendor styles remain scoped to `.auth-page` and must not set global page colors.
