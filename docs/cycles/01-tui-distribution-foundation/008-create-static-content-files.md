# Task 001: Create Static Content Data Files

**Estimated Time**: 1 hour  
**Difficulty**: Junior  
**Prerequisites**: Basic knowledge of Markdown and JSON

## Overview

This task sets up the foundational static content files that power the Bsquared portfolio's slash commands. These files will be used by the `/skills`, `/achievements`, `/tldr`, `/links`, and `/references` commands.

Your goal is to create placeholder content files with the correct structure so that other developers can integrate them into the command system.

## Directory Structure

Create a new directory at the workspace root:

```
/data
```

All content files will go in this directory.

## Files to Create

You'll create 5 files total. Each file has a specific format and purpose.

### 1. `data/skills.md`

**Purpose**: Lists technical skills organized by category.

**Format**: Markdown with level-2 headings for categories and bullet lists for skills.

**Example Structure**:

```markdown
## Languages

- JavaScript/TypeScript
- Python
- Go

## Frameworks & Libraries

- React/Next.js
- Node.js
- FastAPI

## Tools & Platforms

- Docker
- AWS
- PostgreSQL
```

**Your Task**: Create this file with 4-6 categories and 3-5 skills per category using placeholder/example technical skills.

---

### 2. `data/achievements.md`

**Purpose**: Highlights 3-5 key career achievements.

**Format**: Markdown with bullet list, each item should be 1-2 sentences.

**Example Structure**:

```markdown
- Built a real-time analytics platform that processes 10M+ events per day, reducing data latency from hours to seconds.

- Led a team of 5 engineers to migrate a legacy monolith to microservices, improving deployment frequency by 300%.

- Open-sourced a popular CLI tool that has 5K+ GitHub stars and is used by 100+ companies.
```

**Your Task**: Create this file with 3-5 placeholder achievements that sound like realistic career highlights for a senior software engineer.

---

### 3. `data/tldr.md`

**Purpose**: A concise self-pitch (too long; didn't read summary).

**Format**: Markdown with 2-3 paragraphs.

**Example Structure**:

```markdown
I'm a full-stack software engineer with 8+ years of experience building scalable web applications and distributed systems. I specialize in TypeScript, Python, and cloud infrastructure, with a passion for developer tools and excellent UX.

I've led engineering teams, architected systems handling millions of users, and contributed to open-source projects. I thrive at the intersection of product, engineering, and user experience.

Currently looking for opportunities to work on impactful products with talented teams. Let's build something great together.
```

**Your Task**: Create this file with a 2-3 paragraph placeholder pitch for a software engineer.

---

### 4. `data/links.json`

**Purpose**: Stores URLs for GitHub, LinkedIn, and project links.

**Format**: Valid JSON object with specific keys.

**Example Structure**:

```json
{
  "github": "https://github.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "projects": [
    {
      "name": "Project Name",
      "url": "https://example.com",
      "description": "A brief description of the project"
    }
  ],
  "website": "https://example.com"
}
```

**Your Task**: Create this file with placeholder URLs (you can use `https://github.com/placeholder`, etc.). Include at least 2 projects in the projects array.

---

### 5. `data/references.md`

**Purpose**: Lists professional references with quotes.

**Format**: Markdown with level-3 headings for each reference, followed by a blockquote and contact info.

**Example Structure**:

```markdown
### Jane Doe – Senior Engineering Manager at Tech Corp

> "John is one of the most talented engineers I've worked with. His ability to solve complex problems and mentor junior developers is exceptional."

**Contact**: jane.doe@example.com

---

### John Smith – CTO at Startup Inc

> "An outstanding engineer who consistently delivers high-quality work. John's technical leadership was instrumental in our platform's success."

**Contact**: john.smith@example.com
```

**Your Task**: Create this file with 2-3 placeholder references. Use realistic-sounding names, job titles, and testimonial quotes.

---

## Acceptance Criteria

Before submitting your work, verify:

- [ ] `/data` directory exists at the workspace root
- [ ] All 5 files exist in the `/data` directory:
  - `skills.md`
  - `achievements.md`
  - `tldr.md`
  - `links.json`
  - `references.md`
- [ ] `links.json` has valid JSON syntax (test by running it through a JSON validator)
- [ ] All markdown files use proper markdown formatting (headings, lists, blockquotes)
- [ ] Each file contains placeholder content that follows the structure described above
- [ ] Content is professional and realistic (no "lorem ipsum" or obvious dummy text)

## Testing Your Work

1. **JSON Validation**: You can validate `links.json` by running:

   ```bash
   cat data/links.json | jq .
   ```

   If there are no errors, the JSON is valid.

2. **Markdown Preview**: Open each markdown file in your editor's preview mode to ensure formatting looks correct.

## Questions?

If you have questions about:

- **Content**: Use your best judgment for realistic placeholder content
- **Format**: Follow the examples provided as closely as possible
- **Structure**: The examples show the exact structure expected

## Next Steps

Once this task is complete, the content files will be integrated into the command system by another developer. Your placeholder content may be replaced with real content later, but having the correct structure is the key deliverable.
