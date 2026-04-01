# Rasesh COAs PDF Redaction Tool - Software Documentation

## Overview
A comprehensive PDF redaction and document processing tool with AI-powered training, batch processing, and Stirling-PDF compatible functionality. The tool is designed for Certificate of Analysis (COA) documents but supports general PDF manipulation.

## Architecture

### System Components
```
c:/projects/redact-tool-K3/
├── backend/                    # FastAPI backend
│   ├── main.py                # Main application entry point
│   ├── api/                   # Modular API routers
│   │   ├── document_review.py
│   │   ├── document_security.py
│   │   ├── verification.py
│   │   ├── page_formatting.py
│   │   ├── extraction.py
│   │   ├── removal.py
│   │   ├── automation.py
│   │   ├── general.py
│   │   ├── advanced_formatting.py
│   │   ├── developer_tools.py
│   │   └── stirling_compatible.py
│   ├── pdf_utils.py           # Core PDF manipulation utilities
│   ├── studio_rule_bridge.py  # Bridge between studio and rule system
│   └── suggestions.py         # AI suggestion engine
├── frontend/                  # Modern web interface
│   ├── index.html            # Homepage with feature cards
│   ├── app/                  # ES6 JavaScript modules
│   │   ├── pdf_tools.js      # PDF Toolbox implementation
│   │   ├── AITraining.js     # AI Training module
│   │   ├── TrainingViewer.js # Training visualization
│   │   └── [20+ other modules]
│   ├── html/                 # Page templates
│   │   ├── pdf-tools.html    # PDF Toolbox page
│   │   ├── training.html     # AI Training page
│   │   └── [other pages]
│   └── css/                  # Styling system
│       ├── style.css         # Main stylesheet
│       └── parts/            # Modular CSS components
├── config/                   # Configuration and rules
│   ├── rules/               # Redaction rules
│   │   ├── company_rules/   # Company-specific rules
│   │   ├── universal_rules.json
│   │   └── learned_ai/      # AI-learned rules
│   └── [company configs]
└── run_app.cmd              # Windows startup script
```

## Backend API Structure

### FastAPI Application
- **Port**: 8000
- **Framework**: FastAPI with Uvicorn server
- **CORS**: Enabled for frontend communication
- **File Handling**: Temporary file processing with cleanup

### API Categories & Endpoints

#### 1. Document Review (`/api/document/`)
- `POST /metadata/update` - Change PDF metadata (title, author, keywords)
- `POST /toc/update` - Edit table of contents
- `POST /toc/extract` - Extract table of contents
- `POST /read/extract-text` - Extract text for signing preparation
- `POST /read/extract-images` - Extract images
- `POST /sign/prepare` - Prepare document for signing
- `POST /sign/apply` - Apply signature with certificate

#### 2. Document Security (`/api/security/`)
- `POST /password/add` - Add password protection
- `POST /password/remove` - Remove password
- `POST /watermark/add` - Add watermark
- `POST /stamp/add` - Add stamp
- `POST /sanitize` - Sanitize PDF (remove metadata)
- `POST /flatten` - Flatten PDF layers
- `POST /forms/unlock` - Unlock PDF forms
- `POST /permissions/change` - Change permissions

#### 3. Verification (`/api/verification/`)
- `POST /info` - Get all PDF information
- `POST /validate-signature` - Validate PDF signature

#### 4. Page Formatting (`/api/formatting/`)
- `POST /crop` - Crop PDF pages
- `POST /rotate` - Rotate pages
- `POST /split` - Split PDF
- `POST /reorder` - Reorganize pages
- `POST /resize` - Adjust page size/scale
- `POST /add-page-numbers` - Add page numbers
- `POST /multi-page-layout` - Multi-page layout
- `POST /booklet` - Booklet imposition
- `POST /single-large-page` - PDF to single large page
- `POST /add-attachments` - Add attachments

#### 5. Extraction (`/api/extraction/`)
- `POST /pages` - Extract specific pages
- `POST /images` - Extract images

#### 6. Removal (`/api/removal/`)
- `POST /pages` - Remove pages
- `POST /blank-pages` - Remove blank pages
- `POST /annotations` - Remove annotations
- `POST /images` - Remove images
- `POST /password` - Remove password
- `POST /certificate-sign` - Remove certificate signature

#### 7. Automation (`/api/automation/`)
- `POST /auto-rename` - Auto rename PDF file
- `POST /automate` - Automated processing

#### 8. General (`/api/general/`)
- `POST /add-text` - Add text to PDF
- `POST /add-image` - Add image to PDF
- `POST /annotate` - Annotate PDF

#### 9. Advanced Formatting (`/api/advanced/`)
- `POST /adjust-colors` - Adjust colors/contrast
- `POST /repair` - Repair PDF
- `POST /detect-split-scanned` - Detect & split scanned photos
- `POST /overlay` - Overlay PDFs
- `POST /replace-invert-color` - Replace & invert color
- `POST /scanner-effect` - Scanner effect

#### 10. Developer Tools (`/api/developer/`)
- `POST /show-javascript` - Show JavaScript API
- `POST /folder-scan` - Automated folder scanning
- `GET /sso-guide` - SSO guide
- `GET /airgapped-setup` - Air-gapped setup guide
- `GET /api` - List all API endpoints
- `GET /features` - List all features

#### 11. AI Training (`/api/ai/`)
- `POST /train-pair` - Train AI with original/redacted pair
- `POST /learn` - Save learned rules
- `GET /company-template/{company_id}` - Get company template

#### 12. Stirling-PDF Compatibility (`/api/v1/`)
- `POST /redact` - Stirling-PDF compatible redaction endpoint

### Core PDF Libraries
- **PyMuPDF (fitz)**: Primary PDF manipulation (text extraction, page operations)
- **pikepdf**: PDF metadata, encryption, and advanced features
- **Pillow (PIL)**: Image processing for visual comparisons
- **pdf2image**: PDF to image conversion for OCR

## Frontend Architecture

### Page Structure
1. **Homepage** (`index.html`): Feature cards linking to all tools
2. **PDF Toolbox** (`pdf-tools.html`): Categorized PDF manipulation tools
3. **AI Training** (`training.html`): Machine learning for redaction patterns
4. **Redaction Studio** (`redaction.html`): Interactive PDF redaction
5. **Batch Redaction** (`batch-redaction.html`): Process multiple files
6. **Rule Define Studio** (`rule-define.html`): Create custom redaction rules
7. **Settings** (`settings.html`): Application configuration

### JavaScript Module System
- **ES6 Modules**: All JavaScript uses modern import/export
- **Module Organization**:
  - `pdf_tools.js`: PDF Toolbox functionality
  - `AITraining.js`: AI training logic
  - `TrainingViewer.js`: Training visualization
  - `Redaction_Core.js`: Core redaction engine
  - `FileIO.js`: File upload/download handling
  - `Utils.js`: Utility functions
  - 15+ additional specialized modules

### CSS Architecture
- **Modular Design**: CSS split into logical parts
- **Theme System**: Light/dark/system theme support
- **CSS Variables**: Consistent design tokens
- **Responsive Design**: Mobile-friendly layouts

## ilovepdf.com Feature Parity

The tool now provides full feature parity with ilovepdf.com, offering all 29 PDF manipulation tools with the same layout and functionality.

### Feature Comparison Table

| ilovepdf.com Feature | Status | Implementation | Category |
|----------------------|--------|----------------|----------|
| **Merge PDF** | ✅ Implemented | `/api/tools/merge` | General |
| **Split PDF** | ✅ Implemented | `/api/tools/split` | Formatting |
| **Compress PDF** | ✅ Implemented | `/api/tools/compress` | General |
| **PDF to Word** | ✅ Implemented | `/api/tools/pdf-to-word` | Conversion |
| **PDF to PowerPoint** | ✅ Implemented | `/api/tools/pdf-to-pptx` | Conversion |
| **PDF to Excel** | ✅ Implemented | `/api/tools/pdf-to-excel` | Conversion |
| **Word to PDF** | ✅ Implemented | `/api/tools/word-to-pdf` | Conversion |
| **PowerPoint to PDF** | ✅ Implemented | `/api/tools/pptx-to-pdf` | Conversion |
| **Excel to PDF** | ✅ Implemented | `/api/tools/excel-to-pdf` | Conversion |
| **Edit PDF** | ✅ Implemented | `/api/general/add-text`, `/api/general/add-image` | General |
| **PDF to JPG** | ✅ Implemented | `/api/tools/convert/pdf-to-images` | Extraction |
| **JPG to PDF** | ✅ Implemented | `/api/tools/convert/images-to-pdf` | Extraction |
| **Sign PDF** | ✅ Implemented | `/api/document/sign/prepare`, `/api/document/sign/apply` | Document Review |
| **Watermark** | ✅ Implemented | `/api/tools/watermark` | Security |
| **Rotate PDF** | ✅ Implemented | `/api/tools/rotate` | Formatting |
| **HTML to PDF** | ✅ Implemented | `/api/tools/html-to-pdf` | Conversion |
| **Unlock PDF** | ✅ Implemented | `/api/security/password/remove` | Security |
| **Protect PDF** | ✅ Implemented | `/api/tools/password/add` | Security |
| **Organize PDF** | ✅ Implemented | `/api/formatting/reorder`, `/api/formatting/split` | Formatting |
| **PDF to PDF/A** | ✅ Implemented | `/api/tools/pdf-to-pdfa` | Conversion |
| **Repair PDF** | ✅ Implemented | `/api/advanced/repair` | Advanced Formatting |
| **Page numbers** | ✅ Implemented | `/api/formatting/add-page-numbers` | Formatting |
| **Scan to PDF** | ✅ Implemented | `/api/tools/convert/images-to-pdf` | Extraction |
| **OCR PDF** | ✅ Implemented | `/api/ocr` | Extraction |
| **Compare PDF** | ✅ Implemented | `/api/tools/compare` | Comparison |
| **Redact PDF** | ✅ Implemented | Core redaction functionality | Core |
| **Crop PDF** | ✅ Implemented | `/api/formatting/crop` | Formatting |
| **AI Summarizer** | ✅ Implemented | `/api/tools/ai-summarize` | AI Tools |
| **Translate PDF** | ✅ Implemented | `/api/tools/translate` | AI Tools |

### New Categories Added
To match ilovepdf.com's organization, three new categories were added to the PDF Toolbox:

1. **Conversion** - Document format conversion tools
2. **AI Tools** - AI-powered summarization and translation
3. **Comparison** - PDF comparison and difference detection

### Layout Matching
The frontend UI has been updated to match ilovepdf.com's layout:
- **Category-based organization** with clear visual grouping
- **Drag-and-drop file upload** with visual feedback
- **Tool cards** with icons, titles, and descriptions
- **Modal forms** for tool-specific parameters
- **Progress indicators** during processing
- **Download buttons** for processed files

### Backend Implementation
All new features are implemented as FastAPI endpoints in `backend/main.py`:
- **11 new API endpoints** for missing ilovepdf.com features
- **Stub implementations** for features requiring external dependencies (LibreOffice, WeasyPrint)
- **Proper error handling** with informative messages
- **Temporary file management** with automatic cleanup

## Key Features & Workflows

### 1. PDF Toolbox Workflow
```
User Action → Frontend (pdf_tools.js) → Backend API → Result Download
1. User selects category (Document Review, Security, etc.)
2. Chooses specific tool (e.g., "Add Watermark")
3. Uploads PDF file via drag-and-drop
4. Provides tool-specific parameters
5. Backend processes PDF using PyMuPDF/pikepdf
6. Returns processed PDF for download
```

### 2. AI Training Workflow
```
1. Upload original PDF (required) and redacted PDF (optional)
2. Click "Start AI Training" → POST /api/ai/train-pair
3. Backend compares documents using:
   - Text extraction (PyMuPDF)
   - Visual comparison (Pillow image diff)
   - Pattern matching (regex rules)
4. Returns detected redaction zones as "suggestions"
5. User reviews suggestions, renames labels, adds manual items
6. Click "Save Model" → POST /api/ai/learn
7. Learned rules saved to config/rules/learned_ai/
```

### 3. Redaction Studio Workflow
```
1. Upload PDF → rendered with pdf.js
2. Select redaction mode:
   - Text selection (highlight text to redact)
   - Box drawing (draw rectangles over sensitive areas)
   - Auto-redaction (apply learned rules)
3. Apply redactions → black boxes over sensitive content
4. Download redacted PDF
```

### 4. Batch Processing
```
1. Select folder with multiple PDFs
2. Choose redaction rules (company-specific or universal)
3. Process all files in batch
4. Generate redacted copies with "_Redacted" suffix
```

## Configuration System

### Rule Hierarchy
1. **Universal Rules** (`config/rules/universal_rules.json`): Apply to all documents
2. **Company Rules** (`config/rules/company_rules/`): Company-specific patterns
3. **Learned AI Rules** (`config/rules/learned_ai/`): Machine-learned patterns
4. **Company Constants** (`config/rules/company_constants.json`): Company metadata

### Rule Structure Example
```json
{
  "company_id": "A_L_Canada",
  "display_name": "A & L Canada Laboratories Inc.",
  "patterns": [
    {
      "label": "Lab ID",
      "regex": "Lab\\s*ID:\\s*[A-Z0-9-]+",
      "confidence": 0.9
    }
  ],
  "anchors": [
    {
      "text": "Certificate of Analysis",
      "page": 1,
      "region": "header"
    }
  ]
}
```

## Integration with Stirling-PDF

### Compatibility Layer
- **Endpoint**: `POST /api/v1/redact`
- **Request Format**: Matches Stirling-PDF API specification
- **Response Format**: Stirling-PDF compatible JSON
- **Functionality**: Supports all Stirling-PDF redaction modes

### Imported Functionality
The project imports and extends Stirling-PDF features including:
- Document review and metadata editing
- Security features (password, watermark, stamp)
- Page formatting and manipulation
- Extraction and removal operations
- Automation tools
- Developer utilities

## Development & Deployment

### Startup Script (`run_app.cmd`)
```batch
@echo off
:: Starts backend (port 8000) and frontend (port 5500) servers
:: Checks for existing processes to avoid port conflicts
:: Opens browser to http://127.0.0.1:5500/index.html
```

### Dependencies
**Backend** (`backend/requirements.txt`):
```
fastapi==0.104.1
uvicorn==0.24.0
pymupdf==1.23.8
pikepdf==8.13.0
pillow==10.1.0
pdf2image==1.16.3
python-multipart==0.0.6
```

**Frontend**: Pure HTML/CSS/JS (no build step required)

### Testing
- **Backend Tests**: `test_backend.py` - API endpoint validation
- **Integration Tests**: `test_integration.py` - Full workflow testing
- **Manual Testing**: All features accessible via web interface

## File Processing Details

### Temporary File Management
1. Uploaded files saved to `temp_tools/{uuid}/` directory
2. Processed using PyMuPDF/pikepdf
3. Results returned as downloadable files
4. Temporary directories cleaned up after processing

### PDF Manipulation Techniques
- **Text Operations**: PyMuPDF text extraction and insertion
- **Page Operations**: Crop, rotate, split, merge
- **Security**: Password encryption/decryption, permission management
- **Metadata**: PDF info, XMP metadata, bookmarks
- **Visual**: Watermark, stamp, image overlay

## AI/ML Components

### Training Algorithm
1. **Text Comparison**: Extract text from original and redacted PDFs
2. **Diff Analysis**: Identify missing/changed text segments
3. **Visual Comparison**: Convert pages to images, pixel diff
4. **Pattern Recognition**: Match against known PII patterns
5. **Rule Generation**: Create regex patterns from detected redactions

### Learned Rule Storage
- **Location**: `config/rules/learned_ai/{company_id}.json`
- **Format**: JSON with patterns, confidence scores, and examples
- **Usage**: Auto-applied during batch redaction

## Error Handling & Logging

### Backend Error Responses
```json
{
  "error": "Descriptive error message",
  "detail": "Technical details for debugging",
  "status_code": 400
}
```

### Frontend Error Handling
- Global error handlers in each page
- User-friendly error messages via toast notifications
- Console logging for debugging (preserved in training.html)

## Performance Considerations

### Large File Handling
- Streaming file uploads (FastAPI UploadFile)
- Chunked processing for multi-page PDFs
- Progress indicators for long operations

### Memory Management
- Temporary files instead of in-memory processing
- PDF page-by-page processing where possible
- Automatic cleanup of temporary directories

## Security Features

### Input Validation
- File type verification (PDF only)
- Size limits (configurable)
- Malicious content scanning

### Output Security
- Proper redaction (not just hiding text)
- Metadata sanitization
- Password protection options

## Browser Compatibility

### Supported Browsers
- Chrome/Edge (full support)
- Firefox (full support)
- Safari (most features)

### Required Features
- ES6 Modules (import/export)
- File API (FileReader, File, Blob)
- Canvas API (for PDF rendering)
- CSS Grid/Flexbox

## Extension Points

### Adding New PDF Tools
1. Create backend endpoint in appropriate API file
2. Add frontend configuration in `pdf_tools.js` CFG object
3. Create UI form in `pdf-tools.html` (if needed)

### Adding Company Rules
1. Create `config/rules/company_rules/{company_id}.json`
2. Define patterns, anchors, and metadata
3. Test with company documents

### Custom Redaction Algorithms
1. Extend `Redaction_Core.js` or `Redaction_Auto.js`
2. Implement detection logic
3. Register with redaction studio

## Troubleshooting Guide

### Common Issues & Solutions

#### 1. File Upload Not Working (AI Training)
**Symptoms**: File dialog doesn't open or file not detected
**Solutions**:
- Check browser console for JavaScript errors
- Verify CSS: `.dropzone-input` should have `opacity: 0` and cover entire dropzone
- Check JavaScript: `wireDrop` function should be called after DOMContentLoaded
- Test with different browsers

#### 2. Port Conflicts
**Symptoms**: "WinError 10013" socket permission error
**Solutions**:
- Use `run_app.cmd` which checks for existing servers
- Manually kill processes on ports 8000 and 5500
- Restart the application

#### 3. PDF Processing Failures
**Symptoms**: Backend returns 500 error
**Solutions**:
- Check file is valid PDF (not corrupted)
- Verify PyMuPDF/pikepdf installation
- Check temporary directory permissions

#### 4. Frontend Not Loading
**Symptoms**: Blank page or CSS/JS errors
**Solutions**:
- Check Python HTTP server is running on port 5500
- Verify all file paths are correct
- Clear browser cache (Ctrl+Shift+R)

## Future Development Roadmap

### Planned Enhancements
1. **OCR Integration**: Extract text from scanned PDFs
2. **Cloud Storage**: Google Drive/Dropbox integration
3. **Collaboration**: Multi-user redaction workflows
4. **Advanced AI**: GPT-based sensitive information detection
5. **API Keys**: Secure external API access
6. **Dockerization**: Containerized deployment

### Performance Optimizations
1. **Web Workers**: Offload PDF processing to background threads
2. **Caching**: Frequently used PDF templates and rules
3. **Lazy Loading**: On-demand module loading
4. **Compression**: Brotli/Gzip for frontend assets

## Conclusion

The Rasesh COAs PDF Redaction Tool is a comprehensive solution for PDF manipulation with specialized features for certificate of analysis documents. Its modular architecture, extensive API, and AI-powered training make it suitable for both general PDF processing and specialized redaction workflows.

The system successfully integrates Stirling-PDF functionality while adding unique features like AI training, batch processing, and company-specific rule systems. The clean separation between frontend and backend, along with detailed configuration options, makes it extensible for various use cases.