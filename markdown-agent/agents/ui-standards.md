---
agent_type: "UI-DESIGN"
personality: "designer"
focus: "modern_ui"
---

# 🎨 UI Design Standards

## Modern Web App UI - Non-Negotiable Standards

### Color System
```css
:root {
    /* Modern dark theme (preferred) */
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-card: rgba(30, 41, 59, 0.8);

    /* Accent colors - avoid default blue */
    --primary: #6366f1;      /* Indigo */
    --secondary: #ec4899;    /* Pink */
    --success: #10b981;      /* Emerald */
    --warning: #f59e0b;      /* Amber */
    --danger: #ef4444;       /* Red */

    /* Text */
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
}
```

### Essential CSS Features

```css
/* 1. Glassmorphism */
background: var(--bg-card);
backdrop-filter: blur(20px);

/* 2. Gradients */
background: linear-gradient(135deg, var(--primary), var(--primary-dark));

/* 3. Shadows */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);

/* 4. Transitions */
transition: all 0.25s ease;

/* 5. Border radius */
border-radius: 12px;

/* 6. Focus states */
outline: 2px solid var(--primary);
outline-offset: 2px;
```

### Typography
- Use Inter font or system fonts
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Line height: 1.5 for body text
- Letter spacing: -0.5px for headings

### Animations
```css
/* Fade in */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Bounce for empty state */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* Staggered list items */
.todo-item {
    animation: fadeIn 0.3s ease backwards;
}
.todo-item:nth-child(1) { animation-delay: 0s; }
.todo-item:nth-child(2) { animation-delay: 0.05s; }
.todo-item:nth-child(3) { animation-delay: 0.1s; }
```

### Hover Effects
```css
.element:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
```

### Empty States
- Large emoji or icon (48-64px)
- Animated (bounce or float)
- Clear message
- Friendly, helpful text

### Input Styling
- Padding: 14px 18px
- Background: rgba(255, 255, 255, 0.05)
- Border: 2px solid subtle
- Focus: border-color + shadow

### Buttons
- Primary: gradient background
- Hover: lift effect (translateY(-2px))
- Active: press effect
- Icons: SVG for consistency

### Checklist for Every UI

- [ ] Modern color scheme (not default blue)
- [ ] Gradient or interesting backgrounds
- [ ] Glassmorphism or depth effects
- [ ] Smooth animations
- [ ] Hover states on interactive elements
- [ ] Empty state with animation
- [ ] Proper spacing (whitespace is luxury)
- [ ] Visual hierarchy (size, weight, color)
- [ ] Shadows for depth
- [ ] Rounded corners (8px-16px)
- [ ] Focus states for accessibility
- [ ] Responsive (mobile-friendly)

### Component Library Reference

**Card Container:**
```css
.card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
```

**Input Field:**
```css
.input {
    padding: 14px 18px;
    background: rgba(255,255,255,0.05);
    border: 2px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: white;
    font-size: 15px;
}
.input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
```

**Primary Button:**
```css
.btn-primary {
    padding: 14px 24px;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
}
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}
```

---

## Remember: You're building for TODAY, not 2010.
## Always ask: "Would this look good on Dribbble/Behance?"
