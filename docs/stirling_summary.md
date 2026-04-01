# Stirling-PDF Documentation Summary

This document summarizes key documentation from the Stirling-PDF project (https://github.com/Stirling-Tools/stirling-pdf) that may be relevant to our Redactio COA Redaction Tool.

## 1. Developer Guide

### Overview
Stirling-PDF is a locally hosted web-based PDF manipulation tool with a React frontend and Spring Boot backend. Key technologies:
- **Backend**: Spring Boot (Java 21+), PDFBox, LibreOffice, qpdf, Spring Security, Lombok.
- **Frontend**: React + TypeScript, Vite, Mantine UI, TailwindCSS, PDF.js, PDF-LIB.js, IndexedDB.
- **Desktop**: Tauri (Rust) with bundled JRE.

### Development Environment Setup
- Requires Docker, JDK 21+, Node.js 18+, Gradle, Rust (for Tauri).
- Frontend runs on Vite dev server (localhost:5173) proxying to backend (localhost:8080).

### File Storage Architecture
- Uses client-side IndexedDB for file storage and thumbnail generation.
- PDF.js for client-side rendering and processing.
- URL parameters for deep linking and tool state persistence.

### Takeaways for Our Project
- Consider using IndexedDB for caching PDFs and thumbnails in the frontend.
- URL state persistence could enhance user experience.
- PDF.js + overlay canvas pattern is well implemented.

## 2. Exception Handling Guide

### General Principles
- Fail fast and log clearly.
- Use consistent user messages from localization files.
- Avoid silent failures.

### Java (Backend)
- Create custom exceptions for specific failure cases.
- Use `try-with-resources` for streams.
- Return meaningful HTTP status codes via `ResponseStatusException`.
- Log with context (identifiers).
- Internationalize messages via property files.

### JavaScript (Frontend)
- Use `try/catch` around async operations (fetch).
- Validate input before sending to server.
- Log unexpected errors to console (no sensitive data).

### HTML/CSS
- Reserve space for error messages in templates.
- Use CSS classes for styling errors accessibly.

### Python
- Wrap file operations in `try/except`.
- Log errors consistently; use translatable messages if needed.

### Internationalization (i18n)
- All user-visible strings should be defined in translation files.
- Reference message keys in code, not hardcoded text.

### Takeaways for Our Project
- Implement a custom exception hierarchy in Python (e.g., `RedactionError`, `PDFProcessingError`).
- Ensure all API errors return consistent JSON responses with HTTP status codes.
- Add logging with context (request IDs, file names).
- Plan for i18n by extracting user-facing strings.

## 3. Contributing Guidelines

### Issue & Pull Request Process
- Comment on issues before starting work to avoid duplication.
- Keep commits atomic; one change per commit.
- Reference issue numbers in PRs/commits.

### Translations
- Translations are managed via separate files; contributions welcome.

### Documentation
- Documentation is hosted in a separate repository.

### Takeaways
- Adopt similar contribution guidelines for our open‑source project.

## 4. Security Policy

### Reporting Vulnerabilities
- Use GitHub Security Advisory or email security@stirlingpdf.com.
- Include description, steps, impact, and contact info.

### Supported Versions
- Only latest version receives security updates.

### Security Best Practices
- Always use latest version.
- Follow deployment guidelines.
- Regularly apply updates.

### Takeaways
- Establish a security policy for our project.
- Encourage responsible disclosure.

## 5. Style Linting (STYLELINT.md)

### CSS/SCSS Linting
- Uses Stylelint with custom rules.
- Ensures consistent styling across the codebase.

### Takeaways
- Consider adopting a linter for our CSS (if we have significant CSS).

## 6. Database Guide (DATABASE.md)

### Database Setup
- Stirling-PDF uses H2 (embedded) and PostgreSQL (production).
- Configuration via environment variables.

### Takeaways
- Our project currently does not require a database, but if we add one, consider similar patterns.

## 7. OCR Guide (HowToUseOCR.md)

### OCR Integration
- Supports Tesseract and PaddleOCR.
- Can be enabled/disabled via configuration.

### Takeaways
- Our redaction tool already uses OCR (Tesseract/PaddleOCR). We can review Stirling-PDF's configuration for best practices.

## 8. File Sharing & Signing (FILE_SHARING.md, SHARED_SIGNING.md)

### File Sharing
- Stirling-PDF includes secure file sharing with expiration and password protection.

### Digital Signing
- Supports digital signatures with certificates.

### Takeaways
- These features are beyond our current scope but could be future enhancements.

## 9. Windows Signing (WINDOWS_SIGNING.md)

### Code Signing for Windows
- Describes process for signing Windows executables.

### Takeaways
- Relevant if we distribute a Windows desktop version.

## 10. Agents & AI (AGENTS.md)

### AI‑Powered PDF Editing
- Stirling-PDF includes an AI engine (Python) that can plan and execute PDF edits based on natural language.

### Takeaways
- Our redaction tool already uses AI for suggestions; we could explore Stirling-PDF's agent architecture for inspiration.

## Recommended Actions for Our Project

### Immediate
1. **Exception Handling**: Create a Python exception module (`backend/exceptions.py`) with custom exceptions and a global error handler for FastAPI.
2. **Logging**: Enhance logging with request IDs and structured context.
3. **Error Responses**: Standardize API error responses (JSON with `error`, `message`, `code`, `details`).

### Short‑Term
4. **Frontend Storage**: Evaluate using IndexedDB for caching PDFs and redaction overlays.
5. **URL State**: Implement URL parameters to save tool state (page, zoom, redactions).
6. **i18n Preparation**: Extract all user‑facing strings into a translation file.

### Long‑Term
7. **Security Policy**: Draft a security policy document.
8. **Contributing Guidelines**: Adopt a CONTRIBUTING.md based on Stirling-PDF's.
9. **Desktop Version**: Consider Tauri for a cross‑platform desktop app (like Stirling-PDF).

## Code Examples to Adapt

### Python Exception Handling (from EXCEPTION_HANDLING_GUIDE.md)
```python
class RedactionError(Exception):
    """Base exception for redaction-related errors."""
    pass

class PDFProcessingError(RedactionError):
    """Raised when PDF processing fails."""
    pass

# In FastAPI route:
try:
    process_pdf()
except PDFProcessingError as e:
    raise HTTPException(status_code=400, detail=str(e))
```

### Consistent Error Response
```json
{
  "error": "PDFProcessingError",
  "message": "The PDF could not be processed.",
  "code": "PDF_001",
  "details": {"file": "example.pdf", "page": 5}
}
```

### Logging with Context
```python
import logging
import uuid

logger = logging.getLogger(__name__)

def process_pdf(file_path, request_id=None):
    request_id = request_id or str(uuid.uuid4())
    logger.info("Processing PDF", extra={"request_id": request_id, "file": file_path})
```

---

*Summary generated from Stirling-PDF documentation in `MD files/`.*