# Validation Visual Examples 🎨

## Example Error Messages

### Location Validation Errors

#### Empty Location
```
┌─────────────────────────────────────┐
│ Search city...                      │
└─────────────────────────────────────┘
┃ ⚠️ Location is required
```

#### Too Short
```
┌─────────────────────────────────────┐
│ A                                   │
└─────────────────────────────────────┘
┃ ⚠️ Location must be at least 2 characters
```

#### Too Long
```
┌─────────────────────────────────────┐
│ Verylonglocationnamethatexceeds...  │
└─────────────────────────────────────┘
┃ ⚠️ Location must be less than 100 characters
```

#### No Letters
```
┌─────────────────────────────────────┐
│ 12345                               │
└─────────────────────────────────────┘
┃ ⚠️ Location must contain at least one letter
```

#### Invalid Characters
```
┌─────────────────────────────────────┐
│ Amsterdam@#$                        │
└─────────────────────────────────────┘
┃ ⚠️ Location contains invalid characters
```

### Date Validation Errors

#### Past Date
```
┌─────────────────────────────────────┐
│ 📅 2025-10-03                       │
└─────────────────────────────────────┘
┃ ⚠️ Date cannot be in the past
```

#### Too Far in Future
```
┌─────────────────────────────────────┐
│ 📅 2025-10-25                       │
└─────────────────────────────────────┘
┃ ⚠️ Date cannot be more than 14 days in the future
```

### Valid Inputs (No Errors)

#### Valid Location
```
┌─────────────────────────────────────┐
│ Amsterdam                           │
└─────────────────────────────────────┘
✅ No error
```

#### Valid Date
```
┌─────────────────────────────────────┐
│ 📅 2025-10-10                       │
└─────────────────────────────────────┘
✅ No error
```

## UI States

### 1. Initial State (Form Invalid)
```
┌─────────────────────────────────────┐
│          Location & Date            │
├─────────────────────────────────────┤
│                                     │
│ Search city...                      │
│ [                                ]  │
│                                     │
│ 📅 2025-10-04                       │
│ [                                ]  │
│                                     │
│     [🔍 Get Forecast] (disabled)    │
│                                     │
└─────────────────────────────────────┘
```

### 2. After Invalid Submit
```
┌─────────────────────────────────────┐
│          Location & Date            │
├─────────────────────────────────────┤
│                                     │
│ Search city...                      │
│ [                                ]  │
│ ┃ ⚠️ Location is required           │ ← Animated error
│                                     │
│ 📅 2025-10-04                       │
│ [                                ]  │
│                                     │
│     [🔍 Get Forecast] (disabled)    │
│                                     │
└─────────────────────────────────────┘
```

### 3. User Starts Typing
```
┌─────────────────────────────────────┐
│          Location & Date            │
├─────────────────────────────────────┤
│                                     │
│ Am                                  │
│ [Am                              ]  │
│                                     │ ← Error cleared
│                                     │
│ 📅 2025-10-04                       │
│ [                                ]  │
│                                     │
│     [🔍 Get Forecast] (disabled)    │
│                                     │
└─────────────────────────────────────┘
```

### 4. Valid Form
```
┌─────────────────────────────────────┐
│          Location & Date            │
├─────────────────────────────────────┤
│                                     │
│ Amsterdam                           │
│ [Amsterdam                       ]  │
│                                     │
│                                     │
│ 📅 2025-10-10                       │
│ [                                ]  │
│                                     │
│     [🔍 Get Forecast] (enabled)     │ ← Button enabled
│                                     │
└─────────────────────────────────────┘
```

### 5. Loading State
```
┌─────────────────────────────────────┐
│          Location & Date            │
├─────────────────────────────────────┤
│                                     │
│ Amsterdam                           │
│ [Amsterdam                       ]  │
│                                     │
│                                     │
│ 📅 2025-10-10                       │
│ [                                ]  │
│                                     │
│     [⏳ Loading...] (disabled)       │ ← Loading
│                                     │
└─────────────────────────────────────┘
```

## Color Scheme

### Error Message
- **Background**: `rgba(231, 76, 60, 0.1)` (light red tint)
- **Text**: `#e74c3c` (red)
- **Border**: `3px solid #e74c3c` (left border)
- **Font**: `0.875rem`, weight 500
- **Animation**: Slide down 0.3s ease-out

### Normal Inputs
- **Background**: Gradient blue
- **Text**: Primary color
- **Border**: Standard border radius

## Animation Timeline

### Error Appearance
```
0ms  ─────────────────┐
                      │ opacity: 0
                      │ translateY(-5px)
                      │
150ms ────────────────┤
                      │ opacity: 0.5
                      │ translateY(-2.5px)
                      │
300ms ────────────────┤
                      │ opacity: 1
                      │ translateY(0)
                      └─────────────────
```

## Responsive Behavior

### Desktop (> 768px)
```
┌─────────────────────────────────────────────┐
│              Location & Date                │
│                                             │
│  [Search city...                        ]   │
│  ┃ ⚠️ Error message with full width        │
│                                             │
│  [📅 Date                               ]   │
│                                             │
│         [🔍 Get Forecast]                   │
└─────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────┐
│   Location & Date       │
│                         │
│  [Search city...     ]  │
│  ┃ ⚠️ Error wraps      │
│  ┃ to multiple lines   │
│                         │
│  [📅 Date            ]  │
│                         │
│  [🔍 Get Forecast]      │
└─────────────────────────┘
```

## Accessibility Annotations

### Screen Reader Flow
1. **Focus on location input**
   - Announces: "City or location name, text input"
   
2. **Type invalid input and submit**
   - Announces: "Alert: Location is required"
   
3. **Start typing**
   - Error dismissed (no announcement needed)
   
4. **Type valid input**
   - Announces: "Amsterdam" (input value)
   
5. **Focus on submit button**
   - Announces: "Get weather forecast for selected location and date, button, enabled"

### ARIA Attributes
- `role="alert"` on error messages (immediate announcement)
- `aria-label` on inputs (descriptive labels)
- `disabled` on button (prevents invalid submission)

## Real-World Test Cases

### Accepted Locations ✅
- Amsterdam
- New York
- São Paulo
- San Francisco, CA
- London, UK
- Saint-Tropez
- O'Fallon
- München
- Zürich
- Montréal
- Paris 75001

### Rejected Locations ❌
- "" (empty)
- "   " (whitespace)
- "A" (too short)
- "123" (no letters)
- "Amsterdam@#$" (invalid chars)
- "A very long location name that exceeds..." (> 100 chars)

### Accepted Dates ✅
- Today
- Tomorrow
- Next week
- 14 days from now

### Rejected Dates ❌
- Yesterday
- Last week
- 15 days from now
- 30 days from now
- Invalid Date

---

**Legend:**
- `[    ]` = Input field
- `┃` = Left border of error
- `⚠️` = Warning icon
- `✅` = Valid state
- `❌` = Invalid state
- `(disabled)` = Button disabled
- `(enabled)` = Button enabled
